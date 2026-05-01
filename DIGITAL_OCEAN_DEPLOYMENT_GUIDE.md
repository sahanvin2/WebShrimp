# Digital Ocean Droplet Deployment Guide
## Web Shrimp Studio - Complete Production Deployment

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Droplet Setup](#droplet-setup)
3. [Continue From Current Root Setup](#continue-from-current-root-setup)
4. [Server Configuration](#server-configuration)
5. [Frontend Deployment](#frontend-deployment)
6. [Backend Deployment](#backend-deployment)
7. [Database Setup](#database-setup)
8. [Domain & SSL](#domain--ssl)
9. [Monitoring & Maintenance](#monitoring--maintenance)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### What You Need
- Digital Ocean account with billing enabled
- Domain name (e.g., webshrimp.lk) - optional but recommended
- SSH key pair (or password access)
- Basic familiarity with Linux/terminal commands

### Recommended Droplet Specs
| Tier | CPU | RAM | Storage | Monthly Cost |
|------|-----|-----|---------|--------------|
| Basic | 2 vCPU | 4GB | 80GB SSD | $24/month |
| Standard | 4 vCPU | 8GB | 160GB SSD | $48/month |
| Premium | 8 vCPU | 16GB | 320GB SSD | $96/month |

**Recommendation**: Start with **Standard** tier for production.

---

## Droplet Setup

### Step 1: Create Droplet

1. **Choose Image**: Ubuntu 22.04 LTS (Long Term Support)
2. **Choose Plan**: Standard - 4 vCPU, 8GB RAM
3. **Choose Datacenter**: Singapore (closest to Sri Lanka)
4. **Authentication**: Add your SSH public key
5. **Hostname**: `webshrimp-prod`

### Step 2: Connect to Droplet

```bash
ssh root@YOUR_DROPLET_IP
# or
ssh your_username@YOUR_DROPLET_IP
```

### Step 3: Initial Server Setup

```bash
# Update system packages
apt update && apt upgrade -y

# Install essential tools
apt install -y ufw fail2ban certbot python3-certbot-nginx git curl wget htop net-tools

# Create non-root user (if using root)
adduser sahan
usermod -aG sudo sahan

# Switch to new user
su - sahan
```

Security note:
- Do not keep real passwords in this guide or in git commits.
- If you already exposed credentials, rotate them immediately.

---

## Continue From Current Root Setup

Use this section if you already did some work as root and want to continue safely without starting over.

### Step 1: Create user and grant sudo

```bash
# As root
adduser sahan
usermod -aG sudo sahan
id sahan
```

### Step 2: Copy SSH access to new user

```bash
# As root
mkdir -p /home/sahan/.ssh
cp -a /root/.ssh/authorized_keys /home/sahan/.ssh/authorized_keys
chown -R sahan:sahan /home/sahan/.ssh
chmod 700 /home/sahan/.ssh
chmod 600 /home/sahan/.ssh/authorized_keys
```

### Step 3: Test login in a new terminal

```bash
ssh sahan@YOUR_DROPLET_IP
sudo -v
```

### Step 4: Move existing project folders from root to sahan

```bash
# As root, only if these folders already exist under /root
mv /root/webshrimp-backend /home/sahan/ 2>/dev/null || true
mv /root/webshrimp-frontend /home/sahan/ 2>/dev/null || true
chown -R sahan:sahan /home/sahan/webshrimp-backend /home/sahan/webshrimp-frontend 2>/dev/null || true
```

### Step 5: If PM2 was started as root, clean and restart under sahan

```bash
# As root
pm2 delete all || true
pm2 kill || true

# Switch to sahan
su - sahan
```

### Step 6: Optional hardening after sahan login works

```bash
# As root
nano /etc/ssh/sshd_config
# Set: PermitRootLogin no
systemctl restart ssh
```

---

## Server Configuration

### Step 1: Firewall Setup

```bash
# Enable UFW firewall
sudo ufw enable

# Allow essential ports
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 3000/tcp  # Backend API
sudo ufw allow 5432/tcp  # PostgreSQL (internal only)

# Check status
sudo ufw status
```

### Step 2: Install Node.js

```bash
# Install Node.js 20.x LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node -v  # Should show v20.x.x
npm -v   # Should show 10.x.x

# Install PM2 (Process Manager)
sudo npm install -g pm2
pm2 -v
```

### Step 3: Install PostgreSQL

```bash
# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Start and enable service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Check status
sudo systemctl status postgresql
```

---

## Database Setup

### Step 1: Configure PostgreSQL

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database
CREATE DATABASE webshrimp;

# Create database user
CREATE USER webshrimp_user WITH PASSWORD 'REPLACE_WITH_NEW_DB_PASSWORD';

# Grant privileges on database
GRANT ALL PRIVILEGES ON DATABASE webshrimp TO webshrimp_user;

# Connect into target database before schema grants
\c webshrimp

# Grant privileges on schema and existing objects
GRANT ALL ON SCHEMA public TO webshrimp_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO webshrimp_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO webshrimp_user;

# Grant default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO webshrimp_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO webshrimp_user;

# Exit psql
\q
```

If you typed a wrong SQL command and got stuck at `postgres-#`, run:

```sql
\r
```

If you need to remove broken previous attempts and recreate cleanly:

```bash
sudo -u postgres psql

DROP DATABASE IF EXISTS webshrimp;
DROP ROLE IF EXISTS webshrimp_user;

CREATE DATABASE webshrimp;
CREATE USER webshrimp_user WITH PASSWORD 'REPLACE_WITH_NEW_DB_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE webshrimp TO webshrimp_user;
\c webshrimp
GRANT ALL ON SCHEMA public TO webshrimp_user;
\q
```

### Step 2: Configure PostgreSQL for Remote Access

```bash
# Edit postgresql.conf
sudo nano /etc/postgresql/14/main/postgresql.conf

# Find and modify:
listen_addresses = '*'  # Change from 'localhost' to '*'

# Edit pg_hba.conf
sudo nano /etc/postgresql/14/main/pg_hba.conf

# Add this line at the end (for local network access):
host    webshrimp         webshrimp_user    127.0.0.1/32            md5

# Restart PostgreSQL
sudo systemctl restart postgresql
```

### Step 3: Initialize Database Schema

```bash
# Copy your schema.sql to the server
# Then run:
psql -U webshrimp_user -d webshrimp -h 127.0.0.1 -f schema.sql
```

---

## Backend Deployment

### Step 1: Upload Backend Code

```bash
# Create project directory
mkdir -p ~/webshrimp-backend
cd ~/webshrimp-backend

# Clone your repository (or upload files)
git clone YOUR_GITHUB_REPO_URL .
# OR use scp from local:
# scp -r backend/* user@droplet_ip:~/webshrimp-backend/
```

### Step 2: Configure Environment Variables

```bash
# Create .env file
nano .env

# Add these variables:
DATABASE_URL=postgresql://webshrimp_user:REPLACE_WITH_NEW_DB_PASSWORD@localhost:5432/webshrimp
PORT=3000
NODE_ENV=production

# Save and exit (Ctrl+X, then Y)
```

### Step 3: Build and Deploy

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Test the server
node dist/index.js
# Press Ctrl+C to stop

# Start with PM2
pm2 start dist/index.js --name webshrimp-backend

# Save PM2 process list
pm2 save

# Enable PM2 to start on boot
pm2 startup
# Copy and run the generated command
```

### Step 4: Verify Backend is Running

```bash
pm2 status
pm2 logs webshrimp-backend

# Test API endpoint
curl http://localhost:3000/api/content
```

---

## Frontend Deployment

### Step 1: Upload Frontend Code

```bash
# Create project directory
mkdir -p ~/webshrimp-frontend
cd ~/webshrimp-frontend

# Clone your repository
git clone YOUR_GITHUB_REPO_URL .
```

### Step 2: Install Dependencies and Build

```bash
# Install dependencies
npm install

# Build for production
npm run build

# The build output will be in the 'dist' folder
```

### Step 3: Install and Configure Nginx

```bash
# Install Nginx
sudo apt install -y nginx

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Step 4: Configure Nginx for Frontend

```bash
# Create frontend configuration
sudo nano /etc/nginx/sites-available/webshrimp-frontend
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    root /home/yourusername/webshrimp-frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/javascript application/json;
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/webshrimp-frontend /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

## Domain & SSL

### Step 1: Point Domain to Droplet

1. Log into your domain registrar
2. Update NS records to DigitalOcean's nameservers:
   - ns1.digitalocean.com
   - ns2.digitalocean.com
   - ns3.digitalocean.com
3. Or add A record pointing to your droplet IP

### Step 2: Install SSL Certificate with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Follow the prompts:
# - Enter email for urgent notices
# - Agree to terms
# - Choose whether to redirect HTTP to HTTPS (recommended: Yes)

# Verify SSL
curl -I https://your-domain.com
```

### Step 3: Auto-Renew SSL Certificate

```bash
# Test auto-renewal
sudo certbot renew --dry-run

# Certbot automatically creates a cron job
# Check it exists
sudo systemctl status certbot.timer
```

### Step 4: Force HTTPS (Optional but Recommended)

The Certbot configuration should handle this automatically. If not, update your Nginx config:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

---

## Monitoring & Maintenance

### Step 1: Setup Log Rotation

```bash
# Create log rotation config
sudo nano /etc/logrotate.d/webshrimp
```

Add:

```
/home/yourusername/.pm2/logs/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 yourusername yourusername
    sharedscripts
    postrotate
        pm2 reload all > /dev/null 2>&1
    endscript
}
```

### Step 2: Setup Monitoring with PM2

```bash
# Install PM2 monitoring (optional)
pm2 install pm2-logrotate

# Configure log rotation
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
pm2 set pm2-logrotate:compress true
pm2 set pm2-logrotate:date_format YYYY-MM-DD_HH-mm-ss
```

### Step 3: Database Backup Script

```bash
# Create backup script
nano ~/backup-db.sh
```

Add:

```bash
#!/bin/bash
BACKUP_DIR="/home/yourusername/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="webshrimp_${DATE}.sql.gz"

mkdir -p $BACKUP_DIR

pg_dump -U webshrimp_user -h 127.0.0.1 webshrimp | gzip > $BACKUP_DIR/$BACKUP_FILE

# Keep only last 30 days of backups
find $BACKUP_DIR -name "webshrimp_*.sql.gz" -mtime +30 -delete

echo "Backup completed: $BACKUP_FILE"
```

```bash
# Make executable
chmod +x ~/backup-db.sh

# Add to crontab (daily at 2 AM)
crontab -e

# Add this line:
0 2 * * * /home/yourusername/backup-db.sh
```

### Step 4: System Monitoring

```bash
# Monitor system resources
htop

# Check disk usage
df -h

# Check memory usage
free -h

# View PM2 logs
pm2 logs

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Backend Not Starting

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs webshrimp-backend

# Common fixes:
# - Check .env file exists and has correct values
# - Verify database connection
# - Check port 3000 is not in use
lsof -i :3000
```

#### 2. Frontend Not Loading

```bash
# Check Nginx status
sudo systemctl status nginx

# Test Nginx configuration
sudo nginx -t

# Check error logs
sudo tail -f /var/log/nginx/error.log

# Verify dist folder exists and has files
ls -la ~/webshrimp-frontend/dist
```

#### 3. Database Connection Issues

```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Test connection
psql -U webshrimp_user -d webshrimp -h 127.0.0.1 -c "SELECT 1"

# Check firewall
sudo ufw status
```

#### 4. SSL Certificate Issues

```bash
# Check certificate expiration
openssl s_client -connect your-domain.com:443 2>/dev/null | openssl x509 -noout -dates

# Manually renew if needed
sudo certbot renew
```

#### 5. Port Already in Use

```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 PID

# Or change port in backend .env
```

---

## Performance Optimization

### 1. Nginx Optimization

```bash
# Edit nginx.conf
sudo nano /etc/nginx/nginx.conf

# Add these settings:
worker_processes auto;
events {
    worker_connections 1024;
}
http {
    # Gzip
    gzip on;
    gzip_types application/javascript text/css;
    
    # Buffer sizes
    client_max_body_size 10M;
    client_body_buffer_size 128k;
}
```

### 2. PostgreSQL Optimization

```bash
# Edit postgresql.conf
sudo nano /etc/postgresql/14/main/postgresql.conf

# Recommended settings for 8GB RAM:
shared_buffers = 2GB
work_mem = 128MB
maintenance_work_mem = 512MB
effective_cache_size = 6GB
max_connections = 100
```

### 3. Node.js Optimization

```bash
# Create ecosystem.config.js
nano ~/webshrimp-backend/ecosystem.config.js
```

Add:

```javascript
module.exports = {
  apps: [{
    name: 'webshrimp-backend',
    script: 'dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    max_memory_restart: '1G',
    log_date_format: 'YYYY-MM-DD HH:mm Z'
  }]
};
```

Then use:

```bash
pm2 delete all
pm2 start ecosystem.config.js
```

---

## Security Best Practices

### 1. SSH Security

```bash
# Disable root login
sudo nano /etc/ssh/sshd_config

# Set:
PermitRootLogin no
PasswordAuthentication no

# Restart SSH
sudo systemctl restart ssh
```

### 2. Fail2Ban Configuration

```bash
# Configure fail2ban
sudo nano /etc/fail2ban/jail.local

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 1h

# Restart fail2ban
sudo systemctl restart fail2ban
```

### 3. Regular Updates

```bash
# Create update script
nano ~/update-system.sh
```

Add:

```bash
#!/bin/bash
apt update
apt upgrade -y
apt autoremove -y
```

```bash
chmod +x ~/update-system.sh

# Add to crontab (weekly)
0 3 * * 0 /home/yourusername/update-system.sh
```

---

## Deployment Checklist

- [ ] Droplet created with Ubuntu 22.04
- [ ] SSH access configured
- [ ] Firewall rules set up
- [ ] Node.js installed
- [ ] PostgreSQL installed and configured
- [ ] Database created and schema imported
- [ ] Backend code uploaded and built
- [ ] Backend running with PM2
- [ ] Frontend code uploaded and built
- [ ] Nginx installed and configured
- [ ] SSL certificate installed
- [ ] Domain DNS configured
- [ ] Backup script created
- [ ] Monitoring set up
- [ ] Security hardening applied

---

## Quick Start Commands

```bash
# Quick server setup
apt update && apt upgrade -y && apt install -y ufw postgresql nodejs npm pm2 nginx

# Quick backend deployment
cd ~ && git clone YOUR_REPO backend && cd backend
npm install && npm run build
pm2 start dist/index.js --name webshrimp-backend && pm2 save

# Quick frontend deployment  
cd ~ && git clone YOUR_REPO frontend && cd frontend
npm install && npm run build

# Quick Nginx setup
ln -s /etc/nginx/sites-available/webshrimp-frontend /etc/nginx/sites-enabled/
nginx -t && systemctl restart nginx

# Quick SSL setup
certbot --nginx -d your-domain.com
```

---

## End-to-End Continuation Checklist (Root -> Production)

Follow this exact order if you already started and want to continue now:

1. As root, create `sahan` and copy SSH key access.
2. Login as `sahan` in a new SSH terminal.
3. Move project folders from `/root` to `/home/sahan` and fix ownership.
4. Install and verify PostgreSQL, Node.js, PM2, Nginx.
5. In PostgreSQL, recreate database/user cleanly if needed.
6. Import `backend/schema.sql` into `webshrimp`.
7. Create backend `.env` with new rotated DB password.
8. Build backend and run with PM2 as `sahan`.
9. Build frontend and configure Nginx root to `/home/sahan/webshrimp-frontend/dist`.
10. Enable site, test `nginx -t`, restart Nginx.
11. Configure domain DNS and issue SSL with Certbot.
12. Disable root SSH login after confirming `sahan` works.
13. Configure backups and monitor PM2/Nginx/PostgreSQL logs.

---

## Support & Resources

- [Digital Ocean Documentation](https://docs.digitalocean.com/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**Last Updated**: April 2026
**Version**: 1.0.0
