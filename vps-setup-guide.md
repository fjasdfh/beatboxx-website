# Beatboxx Website - VPS Deployment Guide

## Overview
This guide will help you deploy your Next.js Beatboxx website to an Ionos VPS Linux XS server.

## Prerequisites
- Ionos VPS Linux XS (Ubuntu 22.04 recommended)
- Domain name configured with Ionos
- SSH access to your VPS

## Part 1: Initial VPS Setup

### Step 1: Connect to Your VPS
Once you receive your VPS credentials from Ionos:

```bash
# Replace YOUR_VPS_IP with the actual IP address
ssh root@YOUR_VPS_IP
```

### Step 2: Update System
```bash
# Update package lists and upgrade system
apt update && apt upgrade -y

# Install essential packages
apt install -y curl wget git unzip software-properties-common
```

### Step 3: Create Non-Root User
```bash
# Create a user for your website
adduser beatboxx
usermod -aG sudo beatboxx

# Switch to the new user
su - beatboxx
```

### Step 4: Install Node.js
```bash
# Install Node.js 18 (LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### Step 5: Install PM2 (Process Manager)
```bash
# Install PM2 globally
sudo npm install -g pm2

# Set PM2 to start on boot
pm2 startup
# Follow the command it outputs (run as root)
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u beatboxx --hp /home/beatboxx
```

### Step 6: Install and Configure Nginx
```bash
# Install Nginx
sudo apt install nginx -y

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Allow through firewall
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

## Part 2: Deploy Your Website

### Step 1: Upload Your Website
You have several options to upload your website:

#### Option A: Using Git (Recommended)
```bash
# Clone your repository
cd /home/beatboxx
git clone https://github.com/fjasdfh/beatboxx-website.git
cd beatboxx-website
```

#### Option B: Upload via SCP/SFTP
If you don't have Git, you can upload the files directly:
```bash
# From your local machine, compress the project
# tar -czf beatboxx-website.tar.gz /path/to/your/Beatboxx_website

# Upload to VPS
# scp beatboxx-website.tar.gz beatboxx@YOUR_VPS_IP:~/

# On VPS, extract
# tar -xzf beatboxx-website.tar.gz
```

### Step 2: Install Dependencies and Build
```bash
cd /home/beatboxx/beatboxx-website
npm install
npm run build
```

### Step 3: Configure PM2
```bash
# Create PM2 ecosystem file
cat > ecosystem.config.js << 'EOF'
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
EOF

# Start the application
pm2 start ecosystem.config.js
pm2 save
```

### Step 4: Configure Nginx
```bash
# Create Nginx configuration
sudo tee /etc/nginx/sites-available/beatboxx << 'EOF'
server {
    listen 80;
    server_name YOUR_DOMAIN.com www.YOUR_DOMAIN.com;

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
EOF

# Enable the site
sudo ln -s /etc/nginx/sites-available/beatboxx /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

**Important**: Replace `YOUR_DOMAIN.com` with your actual domain name!

## Part 3: Domain Configuration

### Step 1: Configure DNS in Ionos
1. Log into your Ionos control panel
2. Go to "Domains & SSL"
3. Select your domain
4. Click "DNS Settings"
5. Add/modify these records:
   - **A Record**: `@` → `YOUR_VPS_IP`
   - **A Record**: `www` → `YOUR_VPS_IP`

### Step 2: Wait for DNS Propagation
DNS changes can take 24-48 hours to fully propagate. You can check progress at:
- https://dnschecker.org

## Part 4: SSL Certificate (HTTPS)

### Install Certbot
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d YOUR_DOMAIN.com -d www.YOUR_DOMAIN.com

# Test auto-renewal
sudo certbot renew --dry-run
```

## Part 5: Verification

### Check if everything is working:
```bash
# Check PM2 status
pm2 status

# Check Nginx status
sudo systemctl status nginx

# Check if website is accessible
curl -I http://YOUR_DOMAIN.com
```

Your website should now be accessible at:
- http://YOUR_DOMAIN.com (will redirect to HTTPS)
- https://YOUR_DOMAIN.com

## Troubleshooting

### Website not loading?
```bash
# Check PM2 logs
pm2 logs

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log

# Check if port 3000 is running
netstat -tlnp | grep 3000
```

### Need to restart services?
```bash
# Restart your Next.js app
pm2 restart beatboxx-website

# Restart Nginx
sudo systemctl restart nginx
```

## Next Steps
Once everything is working:
1. Set up automatic backups
2. Configure monitoring
3. Set up automated deployments (GitHub Actions)

---

**Support**: If you encounter any issues, check the troubleshooting section or contact support with specific error messages.
