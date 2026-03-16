#!/bin/bash

# Deployment script for www.pryro.com
# Usage: ./deploy.sh <server-ip> <ssh-user>

SERVER_IP=$1
SSH_USER=$2
DEPLOY_PATH="/home/www.pryro.com/public_html"

if [ -z "$SERVER_IP" ] || [ -z "$SSH_USER" ]; then
    echo "Usage: ./deploy.sh <server-ip> <ssh-user>"
    exit 1
fi

echo "Deploying to $SSH_USER@$SERVER_IP:$DEPLOY_PATH"

ssh $SSH_USER@$SERVER_IP << 'EOF'
cd /home/www.pryro.com/public_html

# Clone or pull latest code
if [ -d ".git" ]; then
    echo "Pulling latest changes..."
    git pull origin main
else
    echo "Cloning repository..."
    git clone https://github.com/sentore1/pr.git .
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building project..."
npm run build

# Restart with PM2
echo "Restarting application..."
pm2 delete pryro 2>/dev/null || true
pm2 start npm --name "pryro" -- start
pm2 save

echo "Deployment complete!"
EOF
