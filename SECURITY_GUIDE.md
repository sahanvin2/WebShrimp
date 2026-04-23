# Web Shrimp Studio - Security Guide

## Overview

This guide covers security best practices for your Web Shrimp production deployment.

---

## Table of Contents

1. [Server Security](#server-security)
2. [Network Security](#network-security)
3. [Application Security](#application-security)
4. [Database Security](#database-security)
5. [Monitoring & Logging](#monitoring--logging)
6. [Incident Response](#incident-response)

---

## Server Security

### 1. SSH Security

#### Disable Root Login

```bash
# Edit SSH configuration
sudo nano /etc/ssh/sshd_config

# Set these values:
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys

# Restart SSH
sudo systemctl restart ssh
```

#### Use SSH Keys Only

```bash
# Generate SSH key (if not already done)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key to server
ssh-copy-id username@server_ip

# Test connection
ssh username@server_ip
```

#### Change SSH Port (Optional)

```bash
# Edit SSH configuration
sudo nano /etc/ssh/sshd_config

# Change port (choose a high port number)
Port 2222

# Update firewall
sudo ufw allow 2222/tcp
sudo ufw delete allow 22/tcp

# Restart SSH
sudo systemctl restart ssh
```

### 2. User Management

#### Create Non-Root User

```bash
# Create user
sudo adduser username

# Add to sudo group
sudo usermod -aG sudo username

# Test user
su - username
```

#### Remove Unnecessary Users

```bash
# List users
cat /etc/passwd

# Remove unused users
sudo userdel username
```

### 3. Firewall Configuration

#### UFW Setup

```bash
# Enable firewall
sudo ufw enable

# Allow essential ports
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 2222/tcp  # Custom SSH port (if changed)

# Deny all other incoming
sudo ufw default deny incoming

# Allow all outgoing
sudo ufw default allow outgoing

# Check status
sudo ufw status verbose
```

#### Fail2Ban Setup

```bash
# Install Fail2Ban
sudo apt install -y fail2ban

# Configure Fail2Ban
sudo nano /etc/fail2ban/jail.local

# Add this configuration:
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 1h
findtime = 10m

[nginx-http-auth]
enabled = true
port = http,https
filter = nginx-http-auth
logpath = /var/log/nginx/error.log
maxretry = 3

# Restart Fail2Ban
sudo systemctl restart fail2ban

# Check status
sudo fail2ban-client status
```

### 4. System Updates

#### Automatic Security Updates

```bash
# Install unattended-upgrades
sudo apt install -y unattended-upgrades

# Configure automatic updates
sudo nano /etc/apt/apt.conf.d/20auto-upgrades

# Add this configuration:
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Download-Upgradeable-Packages "1";
APT::Periodic::AutocleanInterval "7";
APT::Periodic::Unattended-Upgrade "1";

# Configure which packages to update
sudo nano /etc/apt/apt.conf.d/50unattended-upgrades

# Add these lines:
Unattended-Upgrade::Allowed-Origins {
    "${distro_id}:${distro_codename}";
    "${distro_id}:${distro_codename}-security";
    "${distro_id}ESM:${distro_codename}";
};

# Test automatic updates
sudo unattended-upgrades --dry-run -d
```

---

## Network Security

### 1. HTTPS Configuration

#### SSL Certificate

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal (already configured by Certbot)
# Test renewal
sudo certbot renew --dry-run
```

#### Force HTTPS

```bash
# Nginx configuration
sudo nano /etc/nginx/sites-available/webshrimp

# Add this server block:
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

#### HSTS Header

```bash
# Add to Nginx configuration
sudo nano /etc/nginx/sites-available/webshrimp

# Add inside server block:
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

### 2. Rate Limiting

```bash
# Add to Nginx configuration
sudo nano /etc/nginx/sites-available/webshrimp

# Add these lines:
limit_req_zone $binary_remote_addr zone=one:10m rate=10r/s;
limit_conn_zone $binary_remote_addr zone=addr:10m;

# Add inside location block:
limit_req zone=one burst=20 nodelay;
limit_conn addr 10;
```

### 3. DDoS Protection

```bash
# Install ModSecurity
sudo apt install -y libmodsecurity3 modsecurity-crs

# Configure ModSecurity
sudo nano /etc/nginx/modsecurity/modsecurity.conf

# Set detection only mode
SecRuleEngine DetectionOnly

# Enable in Nginx
sudo nano /etc/nginx/sites-available/webshrimp

# Add inside http block:
modsecurity on;
modsecurity_rules_file /etc/nginx/modsecurity/modsecurity.conf;
```

---

## Application Security

### 1. Backend Security

#### Environment Variables

```bash
# Create .env file
nano .env

# Use strong passwords
DATABASE_URL=postgresql://user:StrongPassword123!@localhost:5432/db

# Never commit .env to git
echo ".env" >> .gitignore
```

#### Input Validation

```typescript
// Use Zod for validation
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
});

// Validate input
try {
  const validatedData = contactSchema.parse(req.body);
  // Process validated data
} catch (error) {
  res.status(400).json({ error: 'Invalid input' });
}
```

#### SQL Injection Prevention

```typescript
// Use parameterized queries
const result = await pool.query(
  'SELECT * FROM users WHERE email = $1',
  [userEmail]  // Parameterized
);

// Never use string concatenation
const badQuery = `SELECT * FROM users WHERE email = '${userEmail}'`; // DON'T DO THIS
```

#### XSS Prevention

```typescript
// Sanitize user input
import sanitize from 'sanitize-html';

const safeMessage = sanitize(userInput, {
  allowedTags: [],
  allowedAttributes: {},
});

// Use Content Security Policy
res.setHeader('Content-Security-Policy', "default-src 'self'");
```

### 2. Frontend Security

#### Content Security Policy

```typescript
// Add to Vite config
export default defineConfig({
  server: {
    headers: {
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.your-domain.com;",
    },
  },
});
```

#### Secure Cookies

```typescript
// Set secure cookie attributes
res.cookie('session', sessionId, {
  httpOnly: true,
  secure: true,  // Only over HTTPS
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000,  // 24 hours
});
```

#### CORS Configuration

```typescript
// Configure CORS properly
app.use(cors({
  origin: 'https://your-domain.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
```

---

## Database Security

### 1. PostgreSQL Security

#### Strong Passwords

```sql
-- Create user with strong password
CREATE USER webshrimp_user WITH PASSWORD 'StrongPassword123!@#$%';

-- Verify password complexity
SELECT usename, usecreatedb, usesuper, usecatupd FROM pg_user;
```

#### Database Permissions

```sql
-- Grant minimal required permissions
GRANT CONNECT ON DATABASE webshrimp TO webshrimp_user;
GRANT USAGE ON SCHEMA public TO webshrimp_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO webshrimp_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO webshrimp_user;

-- Revoke unnecessary permissions
REVOKE CREATE ON SCHEMA public FROM public;
REVOKE USAGE ON SCHEMA public FROM public;
```

#### SSL Connections

```bash
# Enable SSL in PostgreSQL
sudo nano /etc/postgresql/14/main/postgresql.conf

# Add these settings:
ssl = on
ssl_cert_file = '/etc/ssl/certs/ssl-cert.pem'
ssl_key_file = '/etc/ssl/private/ssl-cert.key'

# Restart PostgreSQL
sudo systemctl restart postgresql
```

#### Connection Limits

```bash
# Set connection limits
sudo nano /etc/postgresql/14/main/postgresql.conf

# Add these settings:
max_connections = 100
superuser_reserved_connections = 3

# Restart PostgreSQL
sudo systemctl restart postgresql
```

### 2. Database Backups

#### Secure Backup Storage

```bash
# Encrypt backups
gpg --symmetric --cipher-algo AES256 database.sql

# Store encrypted backup
mv database.sql.gpg /secure/backup/location/

# Decrypt when needed
gpg --decrypt database.sql.gpg > database.sql
```

#### Backup Access Control

```bash
# Set restrictive permissions
chmod 600 /home/ubuntu/webshrimp/backups/*.sql.gz
chown ubuntu:ubuntu /home/ubuntu/webshrimp/backups/*.sql.gz

# Backup directory permissions
chmod 700 /home/ubuntu/webshrimp/backups/
```

---

## Monitoring & Logging

### 1. System Logging

#### Rsyslog Configuration

```bash
# Configure log rotation
sudo nano /etc/logrotate.d/rsyslog

# Add this configuration:
/var/log/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 root adm
    sharedscripts
    postrotate
        /usr/lib/rsyslog/rsyslog-rotate
    endscript
}
```

#### Log Forwarding

```bash
# Configure log forwarding
sudo nano /etc/rsyslog.conf

# Add this line:
*.* @remote-server-ip:514
```

### 2. Application Logging

#### Backend Logging

```typescript
// Use a logging library
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Log sensitive data masking
logger.info('User login', {
  userId: maskUserId(user.id),
  email: maskEmail(user.email),
});
```

#### Frontend Logging

```typescript
// Log errors to backend
window.onerror = function(message, source, lineno, colno, error) {
  fetch('/api/log-error', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      source,
      lineno,
      colno,
      stack: error?.stack,
      userAgent: navigator.userAgent,
    }),
  });
};
```

### 3. Security Auditing

#### Audit Logs

```bash
# Install auditd
sudo apt install -y auditd

# Configure audit rules
sudo nano /etc/audit/rules.d/audit.rules

# Add these rules:
-w /etc/passwd -p wa -k identity
-w /etc/shadow -p wa -k identity
-w /etc/group -p wa -k identity
-w /etc/sudoers -p wa -k sudoers
-w /etc/ssh/ -p wa -k ssh

# Restart auditd
sudo systemctl restart auditd
```

#### Log Analysis

```bash
# Check for failed logins
grep "Failed password" /var/log/auth.log

# Check for sudo usage
grep "sudo" /var/log/auth.log

# Check for unusual activity
grep "error" /var/log/syslog
```

---

## Incident Response

### 1. Security Breach Response

#### Immediate Actions

```bash
# Isolate the server
sudo ufw deny from any to any

# Identify the breach
grep "Failed password" /var/log/auth.log | tail -100

# Check for unauthorized access
last -10
who -a

# Check running processes
ps aux
```

#### Containment

```bash
# Stop affected services
pm2 stop webshrimp-backend
sudo systemctl stop nginx

# Change all passwords
sudo passwd root
sudo passwd username

# Revoke SSH keys
rm ~/.ssh/authorized_keys
```

#### Recovery

```bash
# Restore from clean backup
./scripts/restore-backup.sh webshrimp_full_backup_YYYYMMDD_HHMMSS

# Update all software
sudo apt update && sudo apt upgrade -y

# Re-enable services
sudo systemctl start nginx
pm2 start webshrimp-backend
```

### 2. Malware Detection

```bash
# Install ClamAV
sudo apt install -y clamav clamav-daemon

# Update virus definitions
sudo freshclam

# Scan system
sudo clamscan -r /

# Check for rootkits
sudo rkhunter --update
sudo rkhunter --check
```

### 3. Data Exfiltration Detection

```bash
# Monitor network connections
sudo netstat -tuln

# Check for unusual traffic
sudo ss -tuln

# Monitor bandwidth
sudo apt install -y nethogs
sudo nethogs
```

---

## Security Checklist

### Daily
- [ ] Check system logs
- [ ] Monitor disk space
- [ ] Verify backups

### Weekly
- [ ] Update system packages
- [ ] Review access logs
- [ ] Check for security advisories

### Monthly
- [ ] Review firewall rules
- [ ] Audit user accounts
- [ ] Test backup restoration

### Quarterly
- [ ] Security audit
- [ ] Penetration testing
- [ ] Update security policies

### Annually
- [ ] Comprehensive security review
- [ ] Incident response drill
- [ ] Security policy update

---

## Security Resources

### Tools
- [Fail2Ban](https://www.fail2ban.org/)
- [ClamAV](https://www.clamav.net/)
- [Nmap](https://nmap.org/)
- [OpenVAS](https://www.openvas.org/)

### Documentation
- [CIS Benchmarks](https://www.cisecurity.org/benchmark)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [NIST Guidelines](https://www.nist.gov/)

### Monitoring
- [Uptime Robot](https://uptimerobot.com/)
- [Pingdom](https://www.pingdom.com/)
- [StatusCake](https://www.statuscake.com/)

---

## Emergency Contacts

- Security Team: security@webshrimp.lk
- Hosting Provider: Digital Ocean Support
- Domain Registrar: Your domain provider
- SSL Certificate: Let's Encrypt Support

---

**Last Updated**: April 2026
**Version**: 1.0.0
