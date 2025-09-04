#!/bin/bash

# SSL Certificate Setup Script for Beatboxx Website
# Run this AFTER your DNS is configured and pointing to your VPS

echo "🔒 Setting up SSL Certificate for beatboxx.app"
echo "==============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_warning "Before running this script, make sure:"
print_warning "1. Your domain DNS is pointing to 82.165.92.234"
print_warning "2. You can access http://beatboxx.app in your browser"
print_warning "3. DNS propagation is complete (check at dnschecker.org)"
echo ""

read -p "Have you confirmed your DNS is working? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please configure your DNS first, then run this script again."
    exit 1
fi

print_status "Setting up SSL certificate..."
print_warning "You may need to enter your password: xPiFF01G"

ssh root@82.165.92.234 << 'EOF'
echo "🔒 Installing SSL certificate..."

# Run Certbot to get SSL certificate
certbot --nginx -d beatboxx.app -d www.beatboxx.app --non-interactive --agree-tos --email admin@beatboxx.app

# Test SSL renewal
echo "🧪 Testing SSL certificate renewal..."
certbot renew --dry-run

echo ""
echo "✅ SSL setup completed!"
echo "🌐 Your website is now accessible at:"
echo "   https://beatboxx.app"
echo "   https://www.beatboxx.app"
echo ""
echo "🔄 SSL certificates will auto-renew every 90 days"
EOF

print_success "SSL certificate installed! 🎉"
print_success "Your website is now live with HTTPS at: https://beatboxx.app"
