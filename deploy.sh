#!/bin/bash

# Web Shrimp Studio - Automated Deployment Script
# Usage: ./deploy.sh [staging|production]

set -e

# Configuration
ENVIRONMENT=${1:-production}
PROJECT_DIR="/home/ubuntu/webshrimp"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"

echo "🚀 Starting deployment to $ENVIRONMENT environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored messages
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if running as root or sudo
if [ "$EUID" -eq 0 ]; then 
    print_error "Please run this script as a regular user, not root"
    exit 1
fi

# Create project directory
print_status "Creating project directories..."
mkdir -p "$BACKEND_DIR"
mkdir -p "$FRONTEND_DIR"
mkdir -p "$PROJECT_DIR/backups"

# Update system
print_status "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install dependencies if not present
print_status "Checking and installing dependencies..."

# Check Node.js
if ! command -v node &> /dev/null; then
    print_warning "Node.js not found, installing..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
fi

# Check PM2
if ! command -v pm2 &> /dev/null; then
    print_warning "PM2 not found, installing..."
    sudo npm install -g pm2
fi

# Check PostgreSQL
if ! command -v psql &> /dev/null; then
    print_warning "PostgreSQL not found, installing..."
    sudo apt install -y postgresql postgresql-contrib
    sudo systemctl start postgresql
    sudo systemctl enable postgresql
fi

# Check Nginx
if ! command -v nginx &> /dev/null; then
    print_warning "Nginx not found, installing..."
    sudo apt install -y nginx
    sudo systemctl start nginx
    sudo systemctl enable nginx
fi

print_status "All dependencies installed!"

# Setup firewall
print_status "Configuring firewall..."
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3000/tcp
echo "y" | sudo ufw enable

# Setup database
print_status "Setting up database..."

# Check if database exists
if ! sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw webshrimp; then
    sudo -u postgres psql -c "CREATE DATABASE webshrimp;"
    sudo -u postgres psql -c "CREATE USER webshrimp_user WITH PASSWORD 'webshrimp_2024_secure';"
    sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE webshrimp TO webshrimp_user;"
    sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON SCHEMA public TO webshrimp_user;"
    print_status "Database created!"
else
    print_warning "Database already exists, skipping creation"
fi

# Setup database schema
if [ -f "backend/schema.sql" ]; then
    print_status "Importing database schema..."
    psql -U webshrimp_user -d webshrimp -h 127.0.0.1 -f backend/schema.sql || true
    print_status "Database schema imported!"
else
    print_warning "schema.sql not found, skipping schema import"
fi

# Setup backend
print_status "Setting up backend..."
cd "$BACKEND_DIR"

# Check if .env exists
if [ ! -f ".env" ]; then
    print_warning ".env file not found, creating from .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        print_status ".env file created!"
    else
        print_error "No .env or .env.example file found!"
        exit 1
    fi
fi

# Install dependencies
print_status "Installing backend dependencies..."
npm install

# Build backend
print_status "Building backend..."
npm run build

# Start backend with PM2
print_status "Starting backend service..."
pm2 delete webshrimp-backend 2>/dev/null || true
pm2 start dist/index.js --name webshrimp-backend
pm2 save

# Setup frontend
print_status "Setting up frontend..."
cd "$FRONTEND_DIR"

# Install dependencies
print_status "Installing frontend dependencies..."
npm install

# Build frontend
print_status "Building frontend..."
npm run build

# Setup Nginx
print_status "Configuring Nginx..."

# Create Nginx configuration
sudo bash -c "cat > /etc/nginx/sites-available/webshrimp" << 'NGINX_CONFIG'
server {
    listen 80;
    server_name localhost;

    root /home/ubuntu/webshrimp/frontend/dist;
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

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/javascript application/json;
}
NGINX_CONFIG

# Enable site
sudo ln -sf /etc/nginx/sites-available/webshrimp /etc/nginx/sites-enabled/webshrimp
sudo rm -f /etc/nginx/sites-enabled/default

# Test and restart Nginx
sudo nginx -t && sudo systemctl restart nginx

# Setup backup script
print_status "Setting up database backup..."
cat > ~/backup-db.sh << 'BACKUP_SCRIPT'
#!/bin/bash
BACKUP_DIR="/home/ubuntu/webshrimp/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="webshrimp_${DATE}.sql.gz"

mkdir -p $BACKUP_DIR
pg_dump -U webshrimp_user -h 127.0.0.1 webshrimp | gzip > $BACKUP_DIR/$BACKUP_FILE
find $BACKUP_DIR -name "webshrimp_*.sql.gz" -mtime +30 -delete
echo "Backup completed: $BACKUP_FILE"
BACKUP_SCRIPT

chmod +x ~/backup-db.sh

# Setup auto-update script
cat > ~/update-system.sh << 'UPDATE_SCRIPT'
#!/bin/bash
apt update
apt upgrade -y
apt autoremove -y
pm2 save
UPDATE_SCRIPT

chmod +x ~/update-system.sh

# Setup PM2 log rotation
print_status "Configuring PM2 log rotation..."
pm2 install pm2-logrotate 2>/dev/null || true
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7

# Setup cron jobs
print_status "Setting up cron jobs..."
(crontab -l 2>/dev/null | grep -v "backup-db.sh"; echo "0 2 * * * $HOME/backup-db.sh") | crontab -
(crontab -l 2>/dev/null | grep -v "update-system.sh"; echo "0 3 * * 0 $HOME/update-system.sh") | crontab -

# Final status
print_status "Deployment completed!"
echo ""
echo "📊 Service Status:"
pm2 status
echo ""
echo "🌐 Access your site at: http://$(hostname -I | awk '{print $1}')"
echo "📝 Backend API: http://localhost:3000/api/content"
echo "💾 Database: PostgreSQL on localhost:5432"
echo "📅 Backups: Daily at 2 AM"
echo ""
echo "Next steps:"
echo "1. Point your domain DNS to this server's IP"
echo "2. Run: sudo certbot --nginx -d your-domain.com"
echo "3. Update .env with production database credentials"
echo ""
