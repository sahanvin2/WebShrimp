# Web Shrimp Studio - Deployment Documentation

## Quick Start (30 Minutes)

### Option 1: Automated Deployment (Recommended)

```bash
# 1. Clone your repository
git clone YOUR_GITHUB_REPO_URL webshrimp
cd webshrimp

# 2. Make deploy script executable
chmod +x deploy.sh

# 3. Run deployment
./deploy.sh production

# 4. Access your site
# Frontend: http://YOUR_SERVER_IP
# Backend: http://YOUR_SERVER_IP/api/content
```

### Option 2: Manual Deployment

Follow the detailed guide: [DIGITAL_OCEAN_DEPLOYMENT_GUIDE.md](./DIGITAL_OCEAN_DEPLOYMENT_GUIDE.md)

---

## Prerequisites

### Before You Begin

1. **Digital Ocean Account**
   - Sign up at [digitalocean.com](https://www.digitalocean.com/)
   - Add payment method (required for droplet creation)

2. **Domain Name** (Optional but Recommended)
   - Purchase from Namecheap, GoDaddy, or similar
   - Or use a free domain from Freenom

3. **SSH Key Pair**
   ```bash
   # Generate SSH key (if you don't have one)
   ssh-keygen -t ed25519 -C "your_email@example.com"
   
   # Copy public key
   cat ~/.ssh/id_ed25519.pub
   ```

4. **Database Credentials**
   - Create a strong password for PostgreSQL
   - Store securely (use a password manager)

---

## Deployment Steps

### Step 1: Create Digital Ocean Droplet

1. **Login to Digital Ocean**
2. **Create Droplet**
   - Image: Ubuntu 22.04 LTS
   - Plan: Standard - 4 vCPU, 8GB RAM ($48/month)
   - Datacenter: Singapore (closest to Sri Lanka)
   - Authentication: Add your SSH public key
   - Hostname: `webshrimp-prod`

3. **Wait for Droplet Creation** (~2 minutes)

4. **Get Droplet IP**
   ```bash
   # In Digital Ocean dashboard, find your droplet's IP address
   ```

### Step 2: Connect to Server

```bash
ssh root@YOUR_DROPLET_IP
# or if using a custom user:
ssh your_username@YOUR_DROPLET_IP
```

### Step 3: Run Automated Deployment

```bash
# Clone your repository
git clone YOUR_GITHUB_REPO_URL webshrimp
cd webshrimp

# Run deployment script
chmod +x deploy.sh
./deploy.sh production
```

### Step 4: Configure Domain (Optional)

```bash
# Point your domain DNS to DigitalOcean nameservers:
ns1.digitalocean.com
ns2.digitalocean.com
ns3.digitalocean.com

# Or add A record pointing to your droplet IP
```

### Step 5: Install SSL Certificate

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Follow the prompts and choose to redirect HTTP to HTTPS
```

---

## Post-Deployment Checklist

### ✅ Services Running

```bash
# Check PM2 processes
pm2 status

# Check Nginx
sudo systemctl status nginx

# Check PostgreSQL
sudo systemctl status postgresql
```

### ✅ Website Accessible

```bash
# Test frontend
curl http://YOUR_SERVER_IP

# Test backend API
curl http://YOUR_SERVER_IP/api/content

# Test health endpoint (if added)
curl http://YOUR_SERVER_IP/api/health
```

### ✅ Database Connected

```bash
# Test database connection
psql -U webshrimp_user -d webshrimp -h 127.0.0.1 -c "SELECT 1"

# Check database tables
psql -U webshrimp_user -d webshrimp -h 127.0.0.1 -c "\dt"
```

### ✅ Backups Working

```bash
# Test backup script
~/backup-db.sh

# Check backup directory
ls -la ~/webshrimp/backups/
```

---

## Environment Variables

### Backend (.env)

```bash
# Database Configuration
DATABASE_URL=postgresql://webshrimp_user:your_password@localhost:5432/webshrimp

# Server Configuration
PORT=3000
NODE_ENV=production

# Optional: CORS Configuration
# CORS_ORIGIN=https://your-domain.com
```

### Frontend (vite.config.ts)

```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
```

---

## Troubleshooting

### Common Issues

#### 1. Backend Not Starting

```bash
# Check logs
pm2 logs webshrimp-backend

# Common fixes:
# - Verify .env file exists
# - Check database connection
# - Ensure port 3000 is not in use
```

#### 2. Frontend Not Loading

```bash
# Check Nginx
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log

# Verify build exists
ls -la ~/webshrimp/frontend/dist
```

#### 3. Database Connection Failed

```bash
# Check PostgreSQL
sudo systemctl status postgresql

# Test connection
psql -U webshrimp_user -d webshrimp -h 127.0.0.1 -c "SELECT 1"
```

#### 4. SSL Certificate Issues

```bash
# Check certificate
openssl s_client -connect your-domain.com:443 2>/dev/null | openssl x509 -noout -dates

# Renew manually
sudo certbot renew
```

### Debug Commands

```bash
# View all logs
pm2 logs

# Check disk space
df -h

# Check memory
free -h

# View running processes
htop

# Check firewall
sudo ufw status
```

---

## Maintenance

### Daily Tasks

- [ ] Check system logs: `pm2 logs`
- [ ] Verify backups: `ls -la ~/webshrimp/backups/`
- [ ] Monitor disk space: `df -h`

### Weekly Tasks

- [ ] Update system: `sudo apt update && sudo apt upgrade -y`
- [ ] Database vacuum: `~/vacuum-db.sh`
- [ ] Security audit: `~/security-check.sh`

### Monthly Tasks

- [ ] Review performance metrics
- [ ] Check SSL expiration: `openssl s_client -connect your-domain.com:443 2>/dev/null | openssl x509 -noout -dates`
- [ ] Backup verification

### Quarterly Tasks

- [ ] Security audit
- [ ] Backup restoration test
- [ ] Infrastructure review

---

## Performance Optimization

### 1. Enable Gzip Compression

```bash
# Nginx already configured with gzip
# Verify it's working:
curl -H "Accept-Encoding: gzip" -I http://your-domain.com
```

### 2. Database Indexes

```sql
-- Run in psql
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at);
CREATE INDEX IF NOT EXISTS idx_portfolio_works_category ON portfolio_works(category);
```

### 3. Node.js Optimization

```bash
# Use PM2 cluster mode
pm2 start dist/index.js --name webshrimp-backend -i max
```

---

## Security Best Practices

### 1. SSH Security

```bash
# Disable root login
sudo nano /etc/ssh/sshd_config
# Set: PermitRootLogin no

# Restart SSH
sudo systemctl restart ssh
```

### 2. Firewall

```bash
# Verify firewall rules
sudo ufw status

# Only allow necessary ports
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

### 3. Regular Updates

```bash
# Update system weekly
sudo apt update && sudo apt upgrade -y

# Update Node.js packages
cd ~/webshrimp/backend && npm update
cd ~/webshrimp/frontend && npm update
```

---

## Monitoring

### System Monitoring

```bash
# Real-time monitoring
htop

# Disk usage
df -h

# Memory usage
free -h

# Network connections
netstat -tuln
```

### Service Monitoring

```bash
# PM2 status
pm2 status

# Nginx status
sudo systemctl status nginx

# PostgreSQL status
sudo systemctl status postgresql
```

### Logs

```bash
# PM2 logs
pm2 logs

# Nginx access log
sudo tail -f /var/log/nginx/access.log

# Nginx error log
sudo tail -f /var/log/nginx/error.log
```

---

## Backup & Recovery

### Manual Backup

```bash
# Create backup
~/backup-db.sh

# Verify backup
ls -la ~/webshrimp/backups/
```

### Restore from Backup

```bash
# Stop services
pm2 stop webshrimp-backend
sudo systemctl stop nginx

# Restore database
gunzip -c ~/webshrimp/backups/webshrimp_YYYYMMDD_HHMMSS.sql.gz | psql -U webshrimp_user -d webshrimp

# Restart services
sudo systemctl start nginx
pm2 start webshrimp-backend
```

---

## Cost Optimization

### Current Setup Cost

| Service | Cost |
|---------|------|
| Digital Ocean Droplet (Standard) | $48/month |
| Domain Name | ~$10-15/year |
| SSL Certificate | Free (Let's Encrypt) |

### Cost-Saving Options

1. **Start with Basic Tier** ($24/month)
   - Suitable for low to medium traffic
   - Upgrade if needed

2. **Use Free SSL**
   - Let's Encrypt certificates are free
   - Auto-renew with Certbot

3. **Monitor Resource Usage**
   - Upgrade only if necessary
   - Use monitoring to optimize

---

## Support & Resources

### Documentation

- [Digital Ocean Docs](https://docs.digitalocean.com/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

### Community

- [Digital Ocean Community](https://www.digitalocean.com/community)
- [Stack Overflow](https://stackoverflow.com/)

### Emergency Contacts

- Digital Ocean Support: [help.digitalocean.com](https://help.digitalocean.com/)
- Domain Registrar: Your domain provider's support

---

## Quick Reference

### Essential Commands

```bash
# Start/Stop Services
pm2 start webshrimp-backend
pm2 stop webshrimp-backend
sudo systemctl start nginx
sudo systemctl stop nginx

# View Logs
pm2 logs
sudo tail -f /var/log/nginx/access.log

# Check Status
pm2 status
df -h
free -h

# Update System
sudo apt update && sudo apt upgrade -y

# Create Backup
~/backup-db.sh
```

### File Locations

| File/Directory | Path |
|----------------|------|
| Backend | `/home/ubuntu/webshrimp/backend/` |
| Frontend | `/home/ubuntu/webshrimp/frontend/` |
| Database Backups | `/home/ubuntu/webshrimp/backups/` |
| Nginx Config | `/etc/nginx/sites-available/webshrimp` |
| SSL Certificates | `/etc/letsencrypt/live/` |
| Logs | `/var/log/nginx/` |

---

## Next Steps

1. **Customize Configuration**
   - Update `.env` with production credentials
   - Configure domain in Nginx
   - Set up email notifications

2. **Set Up Monitoring**
   - Install Grafana for dashboards
   - Configure alerting
   - Set up Uptime Robot for external monitoring

3. **Performance Tuning**
   - Optimize database queries
   - Enable caching
   - Configure CDN (Cloudflare)

4. **Security Hardening**
   - Setup fail2ban
   - Configure Web Application Firewall
   - Regular security audits

---

**Deployment Date**: [Date]
**Deployed By**: [Your Name]
**Server IP**: [Server IP]
**Domain**: [Domain Name]

---

## Changelog

### v1.0.0 (Current)
- Initial deployment guide
- Automated deployment script
- Monitoring and maintenance procedures
- Troubleshooting guide

---

**Need Help?** Check the troubleshooting section or refer to the detailed deployment guide.
