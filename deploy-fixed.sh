#!/bin/bash

# Beatboxx Website Fixed Deployment Script
# This script builds locally and deploys to your Ionos VPS using working authentication

set -e

# Configuration
VPS_IP="82.165.92.234"
VPS_USER="root"
DOMAIN="beatboxx.app"
PROJECT_DIR="/home/beatboxx/beatboxx-website"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Beatboxx Website Fixed Deployment Script${NC}"
echo "============================================"

echo -e "${YELLOW}📋 Configuration:${NC}"
echo "  VPS IP: $VPS_IP"
echo "  Domain: $DOMAIN"
echo "  Remote directory: $PROJECT_DIR"
echo ""

# Function to run commands on VPS with password
run_on_vps() {
    sshpass -p 'xPiFF01G' ssh -o StrictHostKeyChecking=no $VPS_USER@$VPS_IP "$1"
}

# Build the project locally
echo -e "${YELLOW}🔨 Building project locally...${NC}"
npm run build

# Create deployment package (exclude .git, node_modules, but INCLUDE .next build)
echo -e "${YELLOW}📦 Creating deployment package...${NC}"
tar --exclude='.git' --exclude='node_modules' --exclude='*.log' -czf beatboxx-website.tar.gz .

# Upload to VPS
echo -e "${YELLOW}⬆️  Uploading to VPS...${NC}"
sshpass -p 'xPiFF01G' scp -o StrictHostKeyChecking=no beatboxx-website.tar.gz $VPS_USER@$VPS_IP:~/

# Deploy on VPS
echo -e "${YELLOW}🎯 Deploying on VPS...${NC}"

# Create backup of current version
run_on_vps "if [ -d '$PROJECT_DIR' ]; then cp -r $PROJECT_DIR ${PROJECT_DIR}-backup-\$(date +%Y%m%d-%H%M%S); fi"

# Create project directory if it doesn't exist
run_on_vps "mkdir -p $PROJECT_DIR"

# Remove old content and extract new version
run_on_vps "cd $PROJECT_DIR && rm -rf ./* && tar -xzf ~/beatboxx-website.tar.gz"

# Fix ownership
run_on_vps "chown -R beatboxx:beatboxx $PROJECT_DIR"

# Install dependencies (using production flag)
echo -e "${YELLOW}📚 Installing dependencies...${NC}"
run_on_vps "cd $PROJECT_DIR && sudo -u beatboxx npm install --omit=dev"

# Since we already built locally, we don't need to build again on server
# But let's make sure the build directory has proper permissions
run_on_vps "cd $PROJECT_DIR && chown -R beatboxx:beatboxx .next/"

# Restart the application
echo -e "${YELLOW}🔄 Restarting application...${NC}"
run_on_vps "cd $PROJECT_DIR && sudo -u beatboxx pm2 restart beatboxx-website || sudo -u beatboxx pm2 start ecosystem.config.js"

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
echo "  sshpass -p 'xPiFF01G' ssh root@$VPS_IP 'sudo -u beatboxx pm2 status'"
echo "  sshpass -p 'xPiFF01G' ssh root@$VPS_IP 'sudo -u beatboxx pm2 logs beatboxx-website'"
