# Deployment script for www.pryro.com (Windows)
# Usage: .\deploy.ps1 -ServerIP "your-ip" -SSHUser "your-user"

param(
    [Parameter(Mandatory=$true)]
    [string]$ServerIP,
    
    [Parameter(Mandatory=$true)]
    [string]$SSHUser
)

$DeployPath = "/home/www.pryro.com/public_html"

Write-Host "Deploying to $SSHUser@$ServerIP`:$DeployPath"

$commands = @"
cd /home/www.pryro.com/public_html

if [ -d ".git" ]; then
    echo "Pulling latest changes..."
    git pull origin main
else
    echo "Cloning repository..."
    git clone https://github.com/sentore1/pr.git .
fi

echo "Installing dependencies..."
npm install

echo "Building project..."
npm run build

echo "Restarting application..."
pm2 delete pryro 2>/dev/null || true
pm2 start npm --name "pryro" -- start
pm2 save

echo "Deployment complete!"
"@

ssh "$SSHUser@$ServerIP" $commands
