#!/bin/bash

# Web Shrimp Studio - Restore Backup Script
# Usage: ./restore-backup.sh BACKUP_NAME

set -e

# Configuration
BACKUP_DIR="/home/ubuntu/webshrimp/backups"

# Check if backup name is provided
if [ -z "$1" ]; then
    echo "❌ Error: Backup name required"
    echo "Usage: $0 BACKUP_NAME"
    echo ""
    echo "Available backups:"
    ls -la "$BACKUP_DIR" | grep "webshrimp_full_backup" | awk '{print $NF}'
    exit 1
fi

BACKUP_NAME="$1"
BACKUP_PATH="$BACKUP_DIR/$BACKUP_NAME"

echo "🚀 Starting restore from backup: $BACKUP_NAME"
echo "📁 Backup location: $BACKUP_PATH"

# Verify backup exists
if [ ! -d "$BACKUP_PATH" ]; then
    echo "❌ Error: Backup not found: $BACKUP_PATH"
    exit 1
fi

# Step 1: Stop Services
echo "🛑 Stopping services..."
pm2 stop webshrimp-backend 2>/dev/null || true
sudo systemctl stop nginx 2>/dev/null || true
echo "✅ Services stopped"

# Step 2: Restore Database
echo "💾 Restoring database..."
SQL_FILE="$BACKUP_PATH/${BACKUP_NAME}.sql.gz"

if [ -f "$SQL_FILE" ]; then
    echo "Restoring from: $SQL_FILE"
    gunzip -c "$SQL_FILE" | psql -U webshrimp_user -d webshrimp -h 127.0.0.1
    echo "✅ Database restored"
else
    echo "⚠️  SQL backup not found, skipping database restore"
fi

# Step 3: Restore Backend Configuration
echo "🔧 Restoring backend configuration..."
if [ -d "$BACKUP_PATH/backend_config" ]; then
    if [ -f "$BACKUP_PATH/backend_config/.env" ]; then
        cp "$BACKUP_PATH/backend_config/.env" backend/.env
        echo "✅ Backend .env restored"
    fi
    if [ -f "$BACKUP_PATH/backend_config/schema.sql" ]; then
        cp "$BACKUP_PATH/backend_config/schema.sql" backend/schema.sql
        echo "✅ Backend schema restored"
    fi
else
    echo "⚠️  Backend config backup not found"
fi

# Step 4: Restore Frontend Configuration
echo "🎨 Restoring frontend configuration..."
if [ -f "$BACKUP_PATH/frontend_config/.env" ]; then
    cp "$BACKUP_PATH/frontend_config/.env" .env
    echo "✅ Frontend .env restored"
else
    echo "⚠️  Frontend config backup not found"
fi

# Step 5: Restore Nginx Configuration
echo "🌐 Restoring Nginx configuration..."
if [ -f "$BACKUP_PATH/nginx/webshrimp" ]; then
    sudo cp "$BACKUP_PATH/nginx/webshrimp" /etc/nginx/sites-available/webshrimp
    sudo ln -sf /etc/nginx/sites-available/webshrimp /etc/nginx/sites-enabled/webshrimp
    sudo nginx -t && sudo systemctl restart nginx
    echo "✅ Nginx configuration restored"
else
    echo "⚠️  Nginx config backup not found"
fi

# Step 6: Restore SSL Certificates
echo "🔒 Restoring SSL certificates..."
if [ -d "$BACKUP_PATH/ssl/live" ]; then
    sudo cp -r "$BACKUP_PATH/ssl/live" /etc/letsencrypt/
    sudo cp -r "$BACKUP_PATH/ssl/archive" /etc/letsencrypt/
    echo "✅ SSL certificates restored"
else
    echo "⚠️  SSL certificates backup not found"
fi

# Step 7: Restore PM2 Configuration
echo "⚙️  Restoring PM2 configuration..."
if [ -d "$BACKUP_PATH/pm2" ]; then
    cp -r "$BACKUP_PATH/pm2" ~/.pm2
    echo "✅ PM2 configuration restored"
else
    echo "⚠️  PM2 config backup not found"
fi

# Step 8: Restore System Configuration
echo "⚙️  Restoring system configuration..."
if [ -f "$BACKUP_PATH/system/ufw.rules" ]; then
    sudo ufw enable
    sudo ufw reload
    echo "✅ Firewall rules restored"
else
    echo "⚠️  Firewall rules backup not found"
fi

if [ -f "$BACKUP_PATH/system/crontab" ]; then
    crontab "$BACKUP_PATH/system/crontab"
    echo "✅ Crontab restored"
else
    echo "⚠️  Crontab backup not found"
fi

# Step 9: Start Services
echo "🚀 Starting services..."
sudo systemctl start nginx
pm2 start webshrimp-backend 2>/dev/null || true
pm2 save
echo "✅ Services started"

# Step 10: Verify Restore
echo "🔍 Verifying restore..."
sleep 5

# Test database connection
if psql -U webshrimp_user -d webshrimp -h 127.0.0.1 -c "SELECT 1" > /dev/null 2>&1; then
    echo "✅ Database connection successful"
else
    echo "❌ Database connection failed"
fi

# Test backend API
if curl -s http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "✅ Backend API responding"
else
    echo "❌ Backend API not responding"
fi

# Test frontend
if curl -s http://localhost > /dev/null 2>&1; then
    echo "✅ Frontend responding"
else
    echo "❌ Frontend not responding"
fi

echo ""
echo "=========================================="
echo "Restore completed!"
echo "=========================================="
echo "Backup Name: $BACKUP_NAME"
echo "Restore Time: $(date)"
echo "=========================================="
