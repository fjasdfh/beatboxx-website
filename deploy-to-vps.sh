#!/bin/bash

# Beatboxx Website VPS Deployment Script
# This script will deploy your Next.js website to your Ionos VPS
# 
# VPS Details:
# IP: 82.165.92.234
# Domain: beatboxx.app
# Username: root

set -e  # Exit on any error

echo "🚀 Beatboxx Website VPS Deployment Script"
echo "=========================================="
echo "VPS IP: 82.165.92.234"
echo "Domain: beatboxx.app"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Test SSH connection first
print_status "Testing SSH connection to your VPS..."
if ! ssh -o ConnectTimeout=10 -o BatchMode=yes root@82.165.92.234 'echo "Connection successful"' 2>/dev/null; then
    print_warning "SSH connection test failed. You'll need to enter your password during deployment."
    print_warning "Your password is: xPiFF01G"
fi

echo ""
echo "This script will:"
echo "1. Connect to your VPS server"
echo "2. Set up the server environment (Node.js, PM2, Nginx)"
echo "3. Deploy your website from GitHub"
echo "4. Configure your domain (beatboxx.app)"
echo "5. Set up HTTPS/SSL certificates"
echo ""

read -p "Do you want to continue? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_error "Deployment cancelled."
    exit 1
fi

# Create a temporary script to run on the server
cat > /tmp/vps_setup.sh << 'EOF'
#!/bin/bash

set -e

echo "🔧 Starting VPS setup..."

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install essential packages
echo "📦 Installing essential packages..."
apt install -y curl wget git unzip software-properties-common ufw

# Create beatboxx user
echo "👤 Creating beatboxx user..."
if ! id "beatboxx" &>/dev/null; then
    adduser --disabled-password --gecos "" beatboxx
    usermod -aG sudo beatboxx
    echo "beatboxx:beatboxx2024" | chpasswd
    echo "User 'beatboxx' created with password 'beatboxx2024'"
fi

# Install Node.js 18
echo "🟢 Installing Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install PM2
echo "⚡ Installing PM2..."
npm install -g pm2

# Install and configure Nginx
echo "🌐 Installing and configuring Nginx..."
apt install -y nginx

# Configure firewall
echo "🔒 Configuring firewall..."
ufw allow 22    # SSH
ufw allow 80    # HTTP
ufw allow 443   # HTTPS
ufw --force enable

# Start services
echo "🚀 Starting services..."
systemctl start nginx
systemctl enable nginx

# Switch to beatboxx user and deploy
echo "📁 Deploying website..."
sudo -u beatboxx bash << 'USEREOF'
cd /home/beatboxx

# Remove existing directory if it exists
if [ -d "beatboxx-website" ]; then
    rm -rf beatboxx-website
fi

# Clone the repository
git clone https://github.com/fjasdfh/beatboxx-website.git
cd beatboxx-website

# Install dependencies
npm install

# Build the project
npm run build

# Create PM2 ecosystem file
cat > ecosystem.config.js << 'EOFPM2'
module.exports = {
  apps: [{
    name: 'beatboxx-website',
    script: 'npm',
    args: 'start',
    cwd: '/home/beatboxx/beatboxx-website',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
EOFPM2

# Start the application with PM2
pm2 start ecosystem.config.js
pm2 save

# Set PM2 to start on boot
pm2 startup
USEREOF

# Configure Nginx for beatboxx.app
echo "🌐 Configuring Nginx for beatboxx.app..."
cat > /etc/nginx/sites-available/beatboxx << 'EOFNGINX'
server {
    listen 80;
    server_name beatboxx.app www.beatboxx.app;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOFNGINX

# Enable the site
ln -sf /etc/nginx/sites-available/beatboxx /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# Reload Nginx
systemctl reload nginx

# Install Certbot for SSL
echo "🔒 Installing Certbot for SSL..."
apt install -y certbot python3-certbot-nginx

echo ""
echo "✅ VPS setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Configure your domain DNS to point to this server (82.165.92.234)"
echo "2. Once DNS is propagated, run SSL certificate setup"
echo ""
echo "Your website should be accessible at:"
echo "http://beatboxx.app (once DNS is configured)"
echo ""
echo "To check status:"
echo "- PM2 status: sudo -u beatboxx pm2 status"
echo "- Nginx status: systemctl status nginx"
echo "- Application logs: sudo -u beatboxx pm2 logs"
EOF

# Upload and execute the setup script
print_status "Uploading setup script to VPS..."
scp /tmp/vps_setup.sh root@82.165.92.234:/tmp/

print_status "Executing setup script on VPS..."
print_warning "You may need to enter your password: xPiFF01G"
ssh root@82.165.92.234 'chmod +x /tmp/vps_setup.sh && /tmp/vps_setup.sh'

print_success "VPS setup completed!"

echo ""
echo "🎉 Deployment Summary:"
echo "======================"
echo "✅ Server environment set up"
echo "✅ Website deployed from GitHub"
echo "✅ PM2 process manager configured"
echo "✅ Nginx web server configured"
echo "✅ Domain configured for beatboxx.app"
echo ""
echo "🌐 Next Steps - DNS Configuration:"
echo "1. Go to your domain provider (where you bought beatboxx.app)"
echo "2. Set these DNS records:"
echo "   - A record: @ → 82.165.92.234"
echo "   - A record: www → 82.165.92.234"
echo ""
echo "⏰ DNS propagation takes 1-24 hours"
echo "🔍 Check DNS status at: https://dnschecker.org"
echo ""
echo "Once DNS is working, run this command to set up SSL:"
echo "ssh root@82.165.92.234 'certbot --nginx -d beatboxx.app -d www.beatboxx.app'"

# Clean up
rm -f /tmp/vps_setup.sh

print_success "Deployment script completed! 🚀"
