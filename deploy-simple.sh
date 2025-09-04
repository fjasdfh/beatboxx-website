#!/bin/bash

# Simple Beatboxx Website Deployment Script
# This script deploys your website updates to your IONOS server

set -e

# Configuration
VPS_IP="82.165.92.234"
VPS_USER="root"
DOMAIN="beatboxx.app"
REMOTE_DIR="/home/beatboxx/beatboxx-website"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Beatboxx Website Simple Deployment${NC}"
echo "====================================="
echo "Server: $VPS_IP"
echo "Domain: $DOMAIN"
echo ""

echo -e "${YELLOW}📦 This script will update your website by pulling the latest changes from GitHub${NC}"
echo ""

# Check if we have sshpass installed for password SSH
if ! command -v sshpass &> /dev/null; then
    echo -e "${YELLOW}Installing sshpass for password authentication...${NC}"
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            brew install sshpass
        else
            echo -e "${RED}Please install Homebrew first, then run: brew install sshpass${NC}"
            exit 1
        fi
    else
        # Linux
        sudo apt-get install -y sshpass
    fi
fi

echo -e "${YELLOW}💡 You'll need to enter your server password when prompted${NC}"
echo "Password: xPiFF01G"
echo ""

read -p "Press Enter to continue with deployment..."

# Function to run commands on VPS with password
run_ssh_cmd() {
    sshpass -p 'xPiFF01G' ssh -o StrictHostKeyChecking=no $VPS_USER@$VPS_IP "$1"
}

echo -e "${YELLOW}🔄 Updating website on server...${NC}"

# Navigate to the website directory and pull latest changes
run_ssh_cmd "cd $REMOTE_DIR && git pull origin main"

echo -e "${YELLOW}📚 Installing any new dependencies...${NC}"
run_ssh_cmd "cd $REMOTE_DIR && npm install --production"

echo -e "${YELLOW}🔨 Building updated website...${NC}"
run_ssh_cmd "cd $REMOTE_DIR && npm run build"

echo -e "${YELLOW}🔄 Restarting website...${NC}"
run_ssh_cmd "cd $REMOTE_DIR && sudo -u beatboxx pm2 restart beatboxx-website"

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo ""
echo -e "${GREEN}🌐 Your updated website is now live at:${NC}"
echo "  http://$DOMAIN"
echo "  http://$VPS_IP"
echo ""
echo -e "${YELLOW}🔍 To check if everything is working:${NC}"
echo "  Visit: http://beatboxx.app"
echo "  Check status: ssh root@$VPS_IP 'sudo -u beatboxx pm2 status'"
