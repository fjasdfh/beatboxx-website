#!/bin/bash

# Beatboxx Website Deployment Script
# This script helps you deploy your website to your Ionos VPS

set -e

# Configuration (EDIT THESE VALUES)
VPS_IP="82.165.92.234"
VPS_USER="beatboxx"
DOMAIN="beatboxx.app"
PROJECT_DIR="/home/beatboxx/beatboxx-website"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Beatboxx Website Deployment Script${NC}"
echo "=================================="

# Check if configuration is set
if [[ "$VPS_IP" == "YOUR_VPS_IP" ]] || [[ "$DOMAIN" == "YOUR_DOMAIN.com" ]]; then
    echo -e "${RED}❌ Please edit this script and set your VPS_IP and DOMAIN${NC}"
    echo "Edit deploy.sh and replace:"
    echo "  VPS_IP=\"YOUR_VPS_IP\" with your actual VPS IP"
    echo "  DOMAIN=\"YOUR_DOMAIN.com\" with your actual domain"
    exit 1
fi

echo -e "${YELLOW}📋 Configuration:${NC}"
echo "  VPS IP: $VPS_IP"
echo "  Domain: $DOMAIN"
echo "  Remote directory: $PROJECT_DIR"
echo ""

# Function to run commands on VPS
run_on_vps() {
    ssh -o StrictHostKeyChecking=no $VPS_USER@$VPS_IP "$1"
}

# Build the project locally
echo -e "${YELLOW}🔨 Building project locally...${NC}"
npm run build

# Create deployment package
echo -e "${YELLOW}📦 Creating deployment package...${NC}"
tar --exclude='.git' --exclude='node_modules' --exclude='.next' -czf beatboxx-website.tar.gz .

# Upload to VPS
echo -e "${YELLOW}⬆️  Uploading to VPS...${NC}"
scp -o StrictHostKeyChecking=no beatboxx-website.tar.gz $VPS_USER@$VPS_IP:~/

# Deploy on VPS
echo -e "${YELLOW}🎯 Deploying on VPS...${NC}"

# Create backup of current version
run_on_vps "if [ -d '$PROJECT_DIR' ]; then cp -r $PROJECT_DIR ${PROJECT_DIR}-backup-\$(date +%Y%m%d-%H%M%S); fi"

# Create project directory if it doesn't exist
run_on_vps "mkdir -p $PROJECT_DIR"

# Extract new version
run_on_vps "cd $PROJECT_DIR && tar -xzf ~/beatboxx-website.tar.gz"

# Install dependencies and build
echo -e "${YELLOW}📚 Installing dependencies...${NC}"
run_on_vps "cd $PROJECT_DIR && npm install --production"

echo -e "${YELLOW}🔨 Building on VPS...${NC}"
run_on_vps "cd $PROJECT_DIR && npm run build"

# Restart the application
echo -e "${YELLOW}🔄 Restarting application...${NC}"
run_on_vps "pm2 restart beatboxx-website || pm2 start $PROJECT_DIR/ecosystem.config.js"

# Clean up
run_on_vps "rm ~/beatboxx-website.tar.gz"
rm beatboxx-website.tar.gz

echo -e "${GREEN}✅ Deployment completed!${NC}"
echo ""
echo -e "${GREEN}🌐 Your website should be available at:${NC}"
echo "  https://$DOMAIN"
echo "  http://$DOMAIN"
echo ""
echo -e "${YELLOW}📊 To check status:${NC}"
echo "  ssh $VPS_USER@$VPS_IP"
echo "  pm2 status"
echo "  pm2 logs beatboxx-website"
