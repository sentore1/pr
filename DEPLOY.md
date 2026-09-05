# Pryro CMS — Contabo Deployment Guide

## Server Requirements
- Contabo VPS: Ubuntu 22.04 LTS (minimum 4GB RAM, 2 vCPU)
- MySQL 8.0+
- Node.js 20 LTS
- Nginx
- PM2

---

## 1. Initial Server Setup

```bash
# Update packages
apt update && apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PM2 globally
npm install -g pm2

# Install Nginx
apt install -y nginx

# Install MySQL 8
apt install -y mysql-server
mysql_secure_installation
```

---

## 2. MySQL Setup

```bash
# Log in as root
mysql -u root -p

# Inside MySQL:
CREATE DATABASE pryro_cms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'pryro'@'localhost' IDENTIFIED BY 'your_strong_password';
GRANT ALL PRIVILEGES ON pryro_cms.* TO 'pryro'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## 3. Deploy the Application

```bash
# Create app directory
mkdir -p /var/www/pryro
mkdir -p /var/log/pryro

# Clone or upload your project
# Option A — git clone
git clone https://github.com/yourrepo/pryro.git /var/www/pryro

# Option B — rsync from local machine (run on your local machine)
# rsync -avz --exclude node_modules --exclude .next ./ root@YOUR_SERVER_IP:/var/www/pryro/

cd /var/www/pryro

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
nano .env.local   # fill in your values (see section 4)
```

---

## 4. Environment Variables

Edit `/var/www/pryro/.env.local`:

```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=pryro_cms
DATABASE_USER=pryro
DATABASE_PASSWORD=your_strong_password

# Auth — generate with: openssl rand -base64 32
NEXTAUTH_SECRET=CHANGE_THIS_TO_A_RANDOM_64_CHAR_STRING
NEXTAUTH_URL=https://yourdomain.com
JWT_SECRET=ANOTHER_RANDOM_SECRET

# App URLs
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Node env
NODE_ENV=production
```

---

## 5. Run Database Migration

```bash
cd /var/www/pryro

# Apply schema (creates all tables)
npm run db:migrate

# Optional: include seed data
npm run db:migrate:seed

# Create the admin user
npm run setup:admin
```

The default admin credentials are:
- **Email:** admin@pryro.com  
- **Password:** Admin@1234!  
- **⚠️ Change the password immediately** at `/admin/login`

---

## 6. Build and Start the App

```bash
cd /var/www/pryro

# Production build
npm run build

# Start with PM2
npm run pm2:start

# Check it's running
pm2 status
pm2 logs pryro-cms

# Make PM2 auto-start on reboot
pm2 startup
pm2 save
```

---

## 7. Configure Nginx

```bash
# Copy nginx config
cp /var/www/pryro/nginx/pryro.conf /etc/nginx/sites-available/pryro

# Edit and replace yourdomain.com with your actual domain
nano /etc/nginx/sites-available/pryro

# Enable the site
ln -s /etc/nginx/sites-available/pryro /etc/nginx/sites-enabled/

# Remove default site (optional)
rm /etc/nginx/sites-enabled/default

# Test config
nginx -t

# Reload Nginx
systemctl reload nginx
```

---

## 8. SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get certificate (replace with your domain)
certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renew is set up automatically. Test it:
certbot renew --dry-run
```

---

## 9. Firewall

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
ufw status
```

---

## 10. Uploads Directory Permissions

```bash
mkdir -p /var/www/pryro/public/uploads
chown -R www-data:www-data /var/www/pryro/public/uploads
chmod -R 755 /var/www/pryro/public/uploads
```

---

## 11. Verify Everything

| Check | URL |
|-------|-----|
| Landing page | https://yourdomain.com |
| Admin login | https://yourdomain.com/admin/login |
| Admin dashboard | https://yourdomain.com/admin |
| Sitemap | https://yourdomain.com/sitemap.xml |
| CMS API | https://yourdomain.com/api/cms/data |

---

## Maintenance Commands

```bash
# Restart app (after code changes)
cd /var/www/pryro
git pull
npm install
npm run build
npm run pm2:restart

# View logs
npm run pm2:logs

# MySQL backup
mysqldump -u pryro -p pryro_cms > /backup/pryro_$(date +%Y%m%d).sql

# Restore backup
mysql -u pryro -p pryro_cms < /backup/pryro_YYYYMMDD.sql
```

---

## Project Structure Summary

```
/var/www/pryro/
├── app/
│   ├── admin/            # CMS admin dashboard (protected)
│   │   ├── login/        # Login page
│   │   ├── navigation/   # Nav + logo editor
│   │   ├── content/      # Content blocks editor
│   │   ├── footer/       # Footer editor
│   │   ├── theme/        # Colors, fonts, borders
│   │   ├── media/        # Image library
│   │   ├── analytics/    # Traffic dashboard
│   │   └── seo/          # Meta, redirects, sitemap
│   └── api/
│       ├── admin/        # Protected CMS APIs
│       ├── cms/data/     # Public CMS data endpoint
│       └── analytics/    # Page view tracking
├── components/
│   ├── cms-provider.tsx  # Injects CMS vars, tracks views
│   ├── cms-header.tsx    # CMS-driven header
│   └── cms-footer.tsx    # CMS-driven footer
├── lib/
│   ├── auth.ts           # JWT auth helpers
│   ├── cms.ts            # CMS data fetcher
│   └── db/               # MySQL connection + models
├── database/
│   ├── schema.sql        # Full DB schema
│   └── seed.sql          # Initial seed data
├── scripts/
│   ├── db-migrate.ts     # Migration runner
│   └── setup-admin.ts    # Admin user creator
├── nginx/pryro.conf      # Nginx config
├── ecosystem.config.js   # PM2 config
└── .env.example          # Environment template
```
