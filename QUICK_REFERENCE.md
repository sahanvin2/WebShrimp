# Web Shrimp Studio - Quick Reference Card

## 🚀 Quick Commands

### Server Management
```bash
# Check system status
htop
df -h
free -h

# View logs
pm2 logs
sudo tail -f /var/log/nginx/access.log

# Restart services
pm2 restart webshrimp-backend
sudo systemctl restart nginx
sudo systemctl restart postgresql
```

### Deployment
```bash
# Deploy latest code
cd ~/webshrimp && git pull
cd backend && npm run build && pm2 restart webshrimp-backend
cd frontend && npm run build
```

### Backups
```bash
# Create backup
./scripts/backup-full.sh

# Restore backup
./scripts/restore-backup.sh webshrimp_full_backup_YYYYMMDD_HHMMSS

# List backups
ls -la ~/webshrimp/backups/
```

### Database
```bash
# Connect to database
psql -U webshrimp_user -d webshrimp -h 127.0.0.1

# Run SQL
psql -U webshrimp_user -d webshrimp -h 127.0.0.1 -c "SELECT * FROM blog_posts;"

# Create backup
pg_dump -U webshrimp_user -d webshrimp | gzip > backup.sql.gz
```

### SSL
```bash
# Check certificate
openssl s_client -connect your-domain.com:443 2>/dev/null | openssl x509 -noout -dates

# Renew certificate
sudo certbot renew

# Test renewal
sudo certbot renew --dry-run
```

---

## 📁 File Locations

| File/Directory | Path |
|----------------|------|
| Backend | `/home/ubuntu/webshrimp/backend/` |
| Frontend | `/home/ubuntu/webshrimp/frontend/` |
| Database Backups | `/home/ubuntu/webshrimp/backups/` |
| Nginx Config | `/etc/nginx/sites-available/webshrimp` |
| SSL Certificates | `/etc/letsencrypt/live/` |
| PM2 Logs | `~/.pm2/logs/` |
| Nginx Logs | `/var/log/nginx/` |
| PostgreSQL Data | `/var/lib/postgresql/14/main/` |

---

## 🔌 Ports

| Port | Service | Status |
|------|---------|--------|
| 22 | SSH | ✅ Open |
| 80 | HTTP | ✅ Open |
| 443 | HTTPS | ✅ Open |
| 3000 | Backend API | ✅ Local |
| 5432 | PostgreSQL | ✅ Local |

---

## 📊 Service Status

```bash
# Check all services
pm2 status

# Check Nginx
sudo systemctl status nginx

# Check PostgreSQL
sudo systemctl status postgresql

# Check firewall
sudo ufw status
```

---

## 🌐 URLs

| URL | Purpose |
|-----|---------|
| `http://YOUR_SERVER_IP` | Frontend (HTTP) |
| `https://your-domain.com` | Frontend (HTTPS) |
| `http://YOUR_SERVER_IP/api/content` | Backend API |
| `http://YOUR_SERVER_IP/api/health` | Health Check |
| `http://YOUR_SERVER_IP/nginx-status` | Nginx Status |

---

## 🔐 Credentials

### Database
- **Host**: localhost
- **Port**: 5432
- **Database**: webshrimp
- **User**: webshrimp_user
- **Password**: [Check .env file]

### SSH
- **User**: ubuntu (or custom)
- **Host**: YOUR_SERVER_IP
- **Key**: ~/.ssh/id_ed25519

---

## 🛠️ Common Tasks

### Update Application
```bash
cd ~/webshrimp
git pull origin main
cd backend && npm install && npm run build && pm2 restart webshrimp-backend
cd frontend && npm install && npm run build
```

### View Recent Logs
```bash
pm2 logs webshrimp-backend --lines 50
sudo tail -n 50 /var/log/nginx/access.log
```

### Check Disk Usage
```bash
du -sh /home/ubuntu/webshrimp/*
df -h /
```

### Check Memory Usage
```bash
free -h
ps aux --sort=-%mem | head -10
```

### Check CPU Usage
```bash
top -bn1 | head -20
```

---

## 📝 Environment Variables

### Backend (.env)
```bash
DATABASE_URL=postgresql://webshrimp_user:password@localhost:5432/webshrimp
PORT=3000
NODE_ENV=production
```

### Frontend (vite.config.ts)
```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
```

---

## 🎯 Health Check

```bash
# Test all services
curl -f http://localhost:3000/api/health && echo "✅ Backend OK" || echo "❌ Backend FAIL"
curl -f http://localhost && echo "✅ Frontend OK" || echo "❌ Frontend FAIL"
psql -U webshrimp_user -d webshrimp -h 127.0.0.1 -c "SELECT 1" && echo "✅ Database OK" || echo "❌ Database FAIL"
```

---

## 🆘 Emergency Commands

```bash
# Stop all services
pm2 stop all
sudo systemctl stop nginx

# Start all services
sudo systemctl start nginx
pm2 start webshrimp-backend

# Restart from scratch
pm2 delete all
cd ~/webshrimp/backend && npm run build && pm2 start dist/index.js --name webshrimp-backend
cd ~/webshrimp/frontend && npm run build
sudo systemctl restart nginx
```

---

## 📅 Maintenance Schedule

| Task | Frequency | Command |
|------|-----------|---------|
| System Update | Weekly | `sudo apt update && sudo apt upgrade -y` |
| Backup | Daily | `./scripts/backup-full.sh` |
| Security Check | Hourly | `~/security-check.sh` |
| Database Vacuum | Weekly | `~/vacuum-db.sh` |
| Log Rotation | Daily | Auto-configured |

---

## 🎨 Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Blue | `#1E88E5` | Primary, Links |
| Orange | `#FF6F00` | CTAs, Highlights |
| Yellow | `#FDD835` | Accents |
| Navy | `#1A237E` | Footer, Headers |

---

## 📞 Support Contacts

| Service | Contact |
|---------|---------|
| Digital Ocean | help.digitalocean.com |
| Let's Encrypt | community.letsencrypt.org |
| PM2 | github.com/Unitech/pm2 |
| PostgreSQL | www.postgresql.org/support/ |

---

**Last Updated**: April 2026
**Version**: 1.0.0
