#!/bin/bash

# Web Shrimp Studio - Full Backup Script
# This script creates a complete backup of your deployment

set -e

# Configuration
BACKUP_DIR="/home/ubuntu/webshrimp/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="webshrimp_full_backup_${DATE}"

echo "🚀 Starting full backup..."
echo "📅 Date: $(date)"
echo "📁 Backup directory: $BACKUP_DIR"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Step 1: Backup Database
echo "💾 Backing up database..."
BACKUP_FILE="$BACKUP_DIR/${BACKUP_NAME}.sql.gz"

if command -v pg_dump &> /dev/null; then
    pg_dump -U webshrimp_user -h 127.0.0.1 webshrimp | gzip > "$BACKUP_FILE"
    echo "✅ Database backup created: $BACKUP_FILE"
else
    echo "⚠️  PostgreSQL not found, skipping database backup"
fi

# Step 2: Backup Backend Configuration
echo "🔧 Backing up backend configuration..."
BACKEND_CONFIG_DIR="$BACKUP_DIR/${BACKUP_NAME}_backend_config"
mkdir -p "$BACKEND_CONFIG_DIR"

if [ -d "backend" ]; then
    cp -r backend/.env "$BACKEND_CONFIG_DIR/" 2>/dev/null || true
    cp -r backend/schema.sql "$BACKEND_CONFIG_DIR/" 2>/dev/null || true
    echo "✅ Backend configuration backed up"
else
    echo "⚠️  Backend directory not found"
fi

# Step 3: Backup Frontend Configuration
echo "🎨 Backing up frontend configuration..."
FRONTEND_CONFIG_DIR="$BACKUP_DIR/${BACKUP_NAME}_frontend_config"
mkdir -p "$FRONTEND_CONFIG_DIR"

if [ -f ".env" ]; then
    cp .env "$FRONTEND_CONFIG_DIR/" 2>/dev/null || true
    echo "✅ Frontend configuration backed up"
else
    echo "⚠️  Frontend .env not found"
fi

# Step 4: Backup Nginx Configuration
echo "🌐 Backing up Nginx configuration..."
NGINX_CONFIG_DIR="$BACKUP_DIR/${BACKUP_NAME}_nginx"
mkdir -p "$NGINX_CONFIG_DIR"

if [ -f "/etc/nginx/sites-available/webshrimp" ]; then
    cp /etc/nginx/sites-available/webshrimp "$NGINX_CONFIG_DIR/" 2>/dev/null || true
    echo "✅ Nginx configuration backed up"
else
    echo "⚠️  Nginx configuration not found"
fi

# Step 5: Backup SSL Certificates
echo "🔒 Backing up SSL certificates..."
SSL_CONFIG_DIR="$BACKUP_DIR/${BACKUP_NAME}_ssl"
mkdir -p "$SSL_CONFIG_DIR"

if [ -d "/etc/letsencrypt/live" ]; then
    cp -r /etc/letsencrypt/live "$SSL_CONFIG_DIR/" 2>/dev/null || true
    cp -r /etc/letsencrypt/archive "$SSL_CONFIG_DIR/" 2>/dev/null || true
    echo "✅ SSL certificates backed up"
else
    echo "⚠️  SSL certificates not found"
fi

# Step 6: Backup PM2 Process List
echo "⚙️  Backing up PM2 process list..."
pm2 save --force 2>/dev/null || true
cp -r ~/.pm2 "$BACKUP_DIR/${BACKUP_NAME}_pm2" 2>/dev/null || true
echo "✅ PM2 configuration backed up"

# Step 7: Backup System Configuration
echo "⚙️  Backing up system configuration..."
SYSTEM_CONFIG_DIR="$BACKUP_DIR/${BACKUP_NAME}_system"
mkdir -p "$SYSTEM_CONFIG_DIR"

# Backup firewall rules
ufw export "$SYSTEM_CONFIG_DIR/ufw.rules" 2>/dev/null || true

# Backup crontab
crontab -l > "$SYSTEM_CONFIG_DIR/crontab" 2>/dev/null || true

# Backup user list
getent passwd > "$SYSTEM_CONFIG_DIR/users.txt" 2>/dev/null || true

echo "✅ System configuration backed up"

# Step 8: Create Backup Manifest
echo "📝 Creating backup manifest..."
MANIFEST_FILE="$BACKUP_DIR/${BACKUP_NAME}_manifest.txt"

cat > "$MANIFEST_FILE" << EOF
Web Shrimp Studio - Full Backup Manifest
=========================================
Backup Date: $(date)
Backup Name: $BACKUP_NAME
Backup Type: Full

Contents:
---------
1. Database: $BACKUP_FILE
2. Backend Config: $BACKEND_CONFIG_DIR
3. Frontend Config: $FRONTEND_CONFIG_DIR
4. Nginx Config: $NGINX_CONFIG_DIR
5. SSL Certificates: $SSL_CONFIG_DIR
6. PM2 Configuration: $BACKUP_DIR/${BACKUP_NAME}_pm2
7. System Configuration: $SYSTEM_CONFIG_DIR

Files Size:
-----------
EOF

# Calculate sizes
du -sh "$BACKUP_DIR/${BACKUP_NAME}*" >> "$MANIFEST_FILE" 2>/dev/null || true

echo "✅ Manifest created: $MANIFEST_FILE"

# Step 9: Cleanup Old Backups
echo "🧹 Cleaning up old backups..."
find "$BACKUP_DIR" -name "webshrimp_full_backup_*" -type d -mtime +30 -exec rm -rf {} \; 2>/dev/null || true
find "$BACKUP_DIR" -name "webshrimp_*.sql.gz" -mtime +30 -delete 2>/dev/null || true
echo "✅ Old backups cleaned up"

# Step 10: Display Backup Summary
echo ""
echo "=========================================="
echo "Backup completed successfully!"
echo "=========================================="
echo "Backup Name: $BACKUP_NAME"
echo "Backup Location: $BACKUP_DIR"
echo "Backup Size: $(du -sh "$BACKUP_DIR/${BACKUP_NAME}*" 2>/dev/null | awk '{sum+=$1} END {print sum}')"
echo "Files Created: $(ls -1 "$BACKUP_DIR/${BACKUP_NAME}*" 2>/dev/null | wc -l)"
echo ""
echo "To restore this backup, run:"
echo "  ./restore-backup.sh $BACKUP_NAME"
echo "=========================================="

# Step 11: Upload to Remote Storage (Optional)
# Uncomment and configure if you want to upload to cloud storage

# echo "☁️  Uploading to cloud storage..."
# aws s3 cp "$BACKUP_DIR/${BACKUP_NAME}.sql.gz" s3://your-bucket/backups/ 2>/dev/null || true
# echo "✅ Uploaded to S3"

# echo "Backup script completed at $(date)"
