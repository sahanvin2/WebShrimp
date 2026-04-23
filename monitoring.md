# Monitoring & Maintenance Guide

## Quick Commands Reference

### System Monitoring
```bash
# View system resources
htop

# Check disk space
df -h

# Check memory usage
free -h

# View running processes
ps aux

# Check network connections
netstat -tuln
```

### Service Status
```bash
# Check PM2 processes
pm2 status
pm2 logs

# Check Nginx
sudo systemctl status nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Check PostgreSQL
sudo systemctl status postgresql
sudo -u postgres psql -c "SELECT count(*) FROM pg_stat_activity;"
```

### Performance Metrics
```bash
# CPU usage
top -bn1 | head -20

# Memory usage
vmstat 1 5

# Disk I/O
iostat -x 1 5

# Network I/O
iftop
```

## Automated Monitoring Setup

### 1. Setup Uptime Monitoring

Create a health check endpoint in your backend:

```typescript
// Add to backend/src/index.ts
app.get('/api/health', async (req, res) => {
  try {
    // Check database connection
    await pool.query('SELECT 1');
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: 'connected'
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      database: 'disconnected'
    });
  }
});
```

### 2. Setup Log Aggregation

Install and configure Filebeat:

```bash
# Install Filebeat
curl -fsSL https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elastic-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/elastic-keyring.gpg] https://artifacts.elastic.co/packages/8.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-8.x.list

sudo apt update
sudo apt install filebeat

# Configure Filebeat
sudo nano /etc/filebeat/filebeat.yml

# Add this configuration:
filebeat.inputs:
- type: filestream
  paths:
    - /var/log/nginx/access.log
    - /var/log/nginx/error.log
    - /home/ubuntu/.pm2/logs/*.log

output.elasticsearch:
  hosts: ["localhost:9200"]

# Enable and start Filebeat
sudo systemctl enable filebeat
sudo systemctl start filebeat
```

### 3. Setup Alerting

Create a monitoring script:

```bash
# Create monitoring script
nano ~/monitor.sh
```

Add:

```bash
#!/bin/bash

# Configuration
ALERT_EMAIL="your-email@example.com"
CPU_THRESHOLD=80
MEMORY_THRESHOLD=80
DISK_THRESHOLD=80

# Check CPU
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
if (( $(echo "$CPU_USAGE > $CPU_THRESHOLD" | bc -l) )); then
    echo "CPU usage critical: $CPU_USAGE%" | mail -s "Alert: High CPU Usage" $ALERT_EMAIL
fi

# Check Memory
MEMORY_USAGE=$(free | grep Mem | awk '{print $3/$2 * 100}')
if (( $(echo "$MEMORY_USAGE > $MEMORY_THRESHOLD" | bc -l) )); then
    echo "Memory usage critical: $MEMORY_USAGE%" | mail -s "Alert: High Memory Usage" $ALERT_EMAIL
fi

# Check Disk
DISK_USAGE=$(df -h / | tail -1 | awk '{print $5}' | cut -d'%' -f1)
if [ "$DISK_USAGE" -gt "$DISK_THRESHOLD" ]; then
    echo "Disk usage critical: $DISK_USAGE%" | mail -s "Alert: Low Disk Space" $ALERT_EMAIL
fi

# Check Services
if ! pgrep -x "node" > /dev/null; then
    echo "Node.js process not running!" | mail -s "Alert: Service Down" $ALERT_EMAIL
fi

if ! pgrep -x "nginx" > /dev/null; then
    echo "Nginx process not running!" | mail -s "Alert: Nginx Down" $ALERT_EMAIL
fi
```

```bash
chmod +x ~/monitor.sh

# Add to crontab (every 5 minutes)
*/5 * * * * /home/ubuntu/monitor.sh
```

## Database Maintenance

### 1. Vacuum Database

```bash
# Create vacuum script
nano ~/vacuum-db.sh
```

Add:

```bash
#!/bin/bash
sudo -u postgres psql -d webshrimp -c "VACUUM ANALYZE;"
echo "Database vacuum completed at $(date)"
```

```bash
chmod +x ~/vacuum-db.sh

# Add to crontab (weekly)
0 4 * * 0 /home/ubuntu/vacuum-db.sh
```

### 2. Database Indexes

```sql
-- Run these in psql to optimize queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at);
CREATE INDEX IF NOT EXISTS idx_portfolio_works_category ON portfolio_works(category);
CREATE INDEX IF NOT EXISTS idx_testimonials_rating ON testimonials(rating);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
```

## Backup Verification

```bash
# Create backup verification script
nano ~/verify-backup.sh
```

Add:

```bash
#!/bin/bash

BACKUP_DIR="/home/ubuntu/webshrimp/backups"
LATEST_BACKUP=$(ls -t $BACKUP_DIR | head -1)

if [ -z "$LATEST_BACKUP" ]; then
    echo "No backup found!"
    exit 1
fi

echo "Verifying backup: $LATEST_BACKUP"

# Test backup integrity
gunzip -t $BACKUP_DIR/$LATEST_BACKUP
if [ $? -eq 0 ]; then
    echo "Backup integrity check: PASSED"
else
    echo "Backup integrity check: FAILED"
    exit 1
fi

# Check backup size
BACKUP_SIZE=$(du -h $BACKUP_DIR/$LATEST_BACKUP | cut -f1)
echo "Backup size: $BACKUP_SIZE"

# Verify backup contains data
BACKUP_ROWS=$(zcat $BACKUP_DIR/$LATEST_BACKUP | grep -c "INSERT INTO")
echo "Database records in backup: $BACKUP_ROWS"
```

```bash
chmod +x ~/verify-backup.sh

# Add to crontab (daily after backup)
30 2 * * * /home/ubuntu/verify-backup.sh
```

## Security Monitoring

### 1. Check for Failed SSH Attempts

```bash
# Create security script
nano ~/security-check.sh
```

Add:

```bash
#!/bin/bash

# Check for failed SSH attempts
FAILED_LOGINS=$(grep "Failed password" /var/log/auth.log | wc -l)

if [ $FAILED_LOGINS -gt 10 ]; then
    echo "Warning: $FAILED_LOGINS failed login attempts detected" | mail -s "Security Alert" your-email@example.com
fi

# Check for root login attempts
ROOT_ATTEMPTS=$(grep "Failed password for root" /var/log/auth.log | wc -l)

if [ $ROOT_ATTEMPTS -gt 5 ]; then
    echo "Warning: $ROOT_ATTEMPTS root login attempts detected" | mail -s "Security Alert" your-email@example.com
fi
```

```bash
chmod +x ~/security-check.sh

# Add to crontab (hourly)
0 * * * * /home/ubuntu/security-check.sh
```

### 2. Monitor Open Ports

```bash
# Create port monitoring script
nano ~/port-check.sh
```

Add:

```bash
#!/bin/bash

# Check for unexpected open ports
EXPECTED_PORTS="22 80 443 3000 5432"

for port in $EXPECTED_PORTS; do
    if ! netstat -tuln | grep -q ":$port "; then
        echo "Warning: Port $port is not listening" | mail -s "Port Alert" your-email@example.com
    fi
done
```

## Performance Tuning

### 1. PostgreSQL Performance

```sql
-- Check slow queries
SELECT 
    query,
    calls,
    total_time / calls as avg_time,
    total_time,
    mean_time
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;

-- Check index usage
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan ASC
LIMIT 10;
```

### 2. Nginx Performance

```bash
# Enable Nginx status page
sudo nano /etc/nginx/sites-available/webshrimp
```

Add:

```nginx
location /nginx-status {
    stub_status on;
    allow 127.0.0.1;
    deny all;
}
```

```bash
sudo systemctl restart nginx
```

Access at: `http://localhost/nginx-status`

## Dashboard Setup

### 1. Install Caddy (Alternative to Nginx)

```bash
# Install Caddy
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy

# Caddyfile configuration
sudo nano /etc/caddy/Caddyfile
```

Add:

```
your-domain.com {
    root * /home/ubuntu/webshrimp/frontend/dist
    file_server
    encode gzip
    
    @api {
        path /api*
    }
    
    reverse_proxy @api localhost:3000
    
    log {
        output file /var/log/caddy/access.log
    }
}
```

### 2. Install Prometheus + Grafana

```bash
# Install Prometheus
sudo useradd --no-create-home --shell /usr/sbin/nologin prometheus
mkdir -p /etc/prometheus /var/lib/prometheus

# Download and configure Prometheus (see official docs)

# Install Grafana
sudo apt-get install -y apt-transport-https software-properties-common
wget -q -O /usr/share/keyrings/grafana.key https://apt.grafana.com/gpg.key
echo "deb [signed-by=/usr/share/keyrings/grafana.key] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana

# Start Grafana
sudo systemctl start grafana-server
sudo systemctl enable grafana-server
```

Access Grafana at: `http://your-server-ip:3000`

## Emergency Commands

```bash
# Restart all services
pm2 restart all
sudo systemctl restart nginx
sudo systemctl restart postgresql

# Check disk space
df -h

# Check disk usage by directory
du -sh /* | sort -h

# Find large files
find / -type f -size +100M | sort -h

# Clear npm cache
npm cache clean --force

# Clear PM2 logs
pm2 flush

# Restart from scratch
pm2 delete all
cd ~/webshrimp-backend && npm run build && pm2 start dist/index.js --name webshrimp-backend
cd ~/webshrimp-frontend && npm run build
sudo systemctl restart nginx
```

## Regular Maintenance Schedule

| Frequency | Task |
|-----------|------|
| Daily | Check system logs, backup verification |
| Weekly | Database vacuum, security audit |
| Monthly | System updates, performance review |
| Quarterly | Security audit, backup testing |
| Annually | Infrastructure review, capacity planning |
