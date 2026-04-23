# Web Shrimp Studio - Scripts Documentation

## Available Scripts

### 1. Full Backup Script

**File**: `scripts/backup-full.sh`

**Description**: Creates a complete backup of your deployment including:
- Database (PostgreSQL)
- Backend configuration
- Frontend configuration
- Nginx configuration
- SSL certificates
- PM2 process list
- System configuration

**Usage**:
```bash
# Make executable
chmod +x scripts/backup-full.sh

# Run backup
./scripts/backup-full.sh
```

**Backup Location**: `/home/ubuntu/webshrimp/backups/`

**Backup Structure**:
```
backups/
├── webshrimp_full_backup_YYYYMMDD_HHMMSS/
│   ├── webshrimp_full_backup_YYYYMMDD_HHMMSS.sql.gz
│   ├── webshrimp_full_backup_YYYYMMSS_backend_config/
│   ├── webshrimp_full_backup_YYYYMMDD_HHMMSS_frontend_config/
│   ├── webshrimp_full_backup_YYYYMMDD_HHMMSS_nginx/
│   ├── webshrimp_full_backup_YYYYMMDD_HHMMSS_ssl/
│   ├── webshrimp_full_backup_YYYYMMDD_HHMMSS_pm2/
│   ├── webshrimp_full_backup_YYYYMMDD_HHMMSS_system/
│   └── webshrimp_full_backup_YYYYMMDD_HHMMSS_manifest.txt
```

### 2. Restore Backup Script

**File**: `scripts/restore-backup.sh`

**Description**: Restores a previous backup to your server

**Usage**:
```bash
# Make executable
chmod +x scripts/restore-backup.sh

# List available backups
ls -la /home/ubuntu/webshrimp/backups/

# Restore specific backup
./scripts/restore-backup.sh webshrimp_full_backup_20240423_120000
```

### 3. Database Backup Script

**File**: `scripts/backup-db.sh`

**Description**: Creates a database-only backup

**Usage**:
```bash
chmod +x scripts/backup-db.sh
./scripts/backup-db.sh
```

### 4. Database Restore Script

**File**: `scripts/restore-db.sh`

**Description**: Restores a database backup

**Usage**:
```bash
chmod +x scripts/restore-db.sh
./scripts/restore-db.sh backup_file.sql.gz
```

### 5. System Update Script

**File**: `scripts/update-system.sh`

**Description**: Updates system packages and restarts services

**Usage**:
```bash
chmod +x scripts/update-system.sh
./scripts/update-system.sh
```

### 6. Security Check Script

**File**: `scripts/security-check.sh`

**Description**: Checks for security issues and failed login attempts

**Usage**:
```bash
chmod +x scripts/security-check.sh
./scripts/security-check.sh
```

### 7. Health Check Script

**File**: `scripts/health-check.sh`

**Description**: Verifies all services are running properly

**Usage**:
```bash
chmod +x scripts/health-check.sh
./scripts/health-check.sh
```

---

## Automated Scheduling

### Cron Jobs

Add these to your crontab for automated backups and maintenance:

```bash
# Edit crontab
crontab -e

# Add these lines:
# Daily backup at 2 AM
0 2 * * * /home/ubuntu/webshrimp/scripts/backup-full.sh

# Weekly system update on Sunday at 3 AM
0 3 * * 0 /home/ubuntu/webshrimp/scripts/update-system.sh

# Hourly security check
0 * * * * /home/ubuntu/webshrimp/scripts/security-check.sh

# Daily health check at 6 AM
0 6 * * * /home/ubuntu/webshrimp/scripts/health-check.sh
```

---

## Backup Strategy

### Recommended Schedule

| Backup Type | Frequency | Retention |
|-------------|-----------|-----------|
| Full Backup | Daily | 30 days |
| Database Only | Hourly | 7 days |
| System Config | Weekly | 90 days |

### Backup Retention Policy

- **Daily backups**: Keep for 30 days
- **Weekly backups**: Keep for 90 days
- **Monthly backups**: Keep for 1 year
- **System configs**: Keep indefinitely

---

## Backup Verification

### Verify Backup Integrity

```bash
# Check SQL backup integrity
gunzip -t /path/to/backup.sql.gz

# Check backup size
ls -lh /path/to/backup.sql.gz

# Test database restore (dry run)
gunzip -c backup.sql.gz | psql -U webshrimp_user -d webshrimp --dry-run
```

### Verify Backup Contents

```bash
# List backup contents
ls -la /home/ubuntu/webshrimp/backups/webshrimp_full_backup_YYYYMMDD_HHMMSS/

# View manifest
cat /home/ubuntu/webshrimp/backups/webshrimp_full_backup_YYYYMMDD_HHMMSS/webshrimp_full_backup_YYYYMMDD_HHMMSS_manifest.txt
```

---

## Disaster Recovery

### Scenario 1: Complete Server Failure

1. Create new droplet with same configuration
2. Run deployment script
3. Restore from latest backup:
   ```bash
   ./scripts/restore-backup.sh webshrimp_full_backup_YYYYMMDD_HHMMSS
   ```

### Scenario 2: Database Corruption

1. Stop backend service:
   ```bash
   pm2 stop webshrimp-backend
   ```

2. Restore database:
   ```bash
   ./scripts/restore-db.sh webshrimp_YYYYMMDD_HHMMSS.sql.gz
   ```

3. Restart service:
   ```bash
   pm2 start webshrimp-backend
   ```

### Scenario 3: Configuration Loss

1. Restore from backup:
   ```bash
   ./scripts/restore-backup.sh webshrimp_full_backup_YYYYMMDD_HHMMSS
   ```

2. Verify all configurations:
   ```bash
   ./scripts/health-check.sh
   ```

---

## Cloud Storage Integration

### AWS S3 Backup Upload

Add this to your backup script:

```bash
# Upload to S3
aws s3 cp "$BACKUP_FILE" s3://your-bucket/backups/ --acl private

# List backups in S3
aws s3 ls s3://your-bucket/backups/

# Download from S3
aws s3 cp s3://your-bucket/backups/backup.sql.gz .
```

### Google Cloud Storage

```bash
# Upload to GCS
gsutil cp "$BACKUP_FILE" gs://your-bucket/backups/

# List backups
gsutil ls gs://your-bucket/backups/
```

### Digital Ocean Spaces

```bash
# Upload to Spaces
rclone copy "$BACKUP_FILE" do:your-bucket/backups/

# List backups
rclone ls do:your-bucket/backups/
```

---

## Monitoring Backups

### Check Last Backup

```bash
# Find latest backup
ls -lt /home/ubuntu/webshrimp/backups/ | head -5

# Check backup age
find /home/ubuntu/webshrimp/backups/ -name "webshrimp_full_backup_*" -mtime +1
```

### Backup Size Monitoring

```bash
# Check total backup size
du -sh /home/ubuntu/webshrimp/backups/

# Check individual backup sizes
du -sh /home/ubuntu/webshrimp/backups/*/
```

---

## Best Practices

### 1. Regular Testing

- Test backup restoration monthly
- Verify backup integrity weekly
- Check backup logs daily

### 2. Multiple Backup Locations

- Keep local backups on server
- Upload to cloud storage
- Consider off-site backup

### 3. Encryption

- Encrypt sensitive backups
- Use strong passwords
- Store encryption keys securely

### 4. Documentation

- Keep backup documentation updated
- Document restore procedures
- Maintain contact list for emergencies

---

## Troubleshooting

### Backup Fails

```bash
# Check disk space
df -h

# Check permissions
ls -la /home/ubuntu/webshrimp/backups/

# Check database connection
psql -U webshrimp_user -d webshrimp -h 127.0.0.1 -c "SELECT 1"
```

### Restore Fails

```bash
# Check backup exists
ls -la /home/ubuntu/webshrimp/backups/

# Check backup integrity
gunzip -t backup_file.sql.gz

# Check database user permissions
psql -U webshrimp_user -d webshrimp -h 127.0.0.1 -c "SELECT 1"
```

### Insufficient Disk Space

```bash
# Clean old backups
find /home/ubuntu/webshrimp/backups/ -name "webshrimp_full_backup_*" -mtime +30 -exec rm -rf {} \;

# Check disk usage
du -sh /home/ubuntu/webshrimp/backups/*
```

---

## Support

For issues or questions:
1. Check this documentation
2. Review backup logs
3. Test backup integrity
4. Contact support if needed

---

**Last Updated**: April 2026
**Version**: 1.0.0
