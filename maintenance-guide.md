# Beatboxx Website - Maintenance Guide

## Quick Reference

### Daily Maintenance Commands
Connect to your VPS:
```bash
ssh beatboxx@YOUR_VPS_IP
```

Check if website is running:
```bash
pm2 status
```

### Updating Your Website

#### Option 1: Using the Deploy Script (Easiest)
From your local computer:
```bash
# Edit deploy.sh first time to set your VPS IP and domain
./deploy.sh
```

#### Option 2: Manual Update
1. **Upload new files** to your VPS
2. **Connect to VPS:**
   ```bash
   ssh beatboxx@YOUR_VPS_IP
   cd /home/beatboxx/beatboxx-website
   ```
3. **Install dependencies and build:**
   ```bash
   npm install
   npm run build
   ```
4. **Restart the website:**
   ```bash
   pm2 restart beatboxx-website
   ```

### Common Issues & Solutions

#### Website is down/not loading
```bash
# Check if the app is running
pm2 status

# If stopped, start it
pm2 start beatboxx-website

# Check logs for errors
pm2 logs beatboxx-website --lines 50
```

#### Server running out of memory
```bash
# Check memory usage
free -h

# Restart the app to clear memory
pm2 restart beatboxx-website
```

#### SSL certificate expired
```bash
# Renew certificate
sudo certbot renew

# Restart Nginx
sudo systemctl restart nginx
```

#### Domain not pointing to VPS
1. Check Ionos DNS settings
2. Verify A records point to your VPS IP
3. Wait 24-48 hours for DNS propagation

### Useful Commands

#### Check website status
```bash
# Check if website responds
curl -I https://YOUR_DOMAIN.com

# Check PM2 processes
pm2 status

# Check Nginx status
sudo systemctl status nginx
```

#### View logs
```bash
# View application logs
pm2 logs beatboxx-website

# View Nginx access logs
sudo tail -f /var/log/nginx/access.log

# View Nginx error logs  
sudo tail -f /var/log/nginx/error.log
```

#### Restart services
```bash
# Restart your Next.js app
pm2 restart beatboxx-website

# Restart Nginx
sudo systemctl restart nginx

# Restart entire server (if needed)
sudo reboot
```

### Performance Monitoring

#### Check resource usage
```bash
# CPU and memory usage
htop

# Disk usage
df -h

# Check which processes use most resources
ps aux --sort=-%cpu | head -10
ps aux --sort=-%mem | head -10
```

#### PM2 monitoring
```bash
# Real-time monitoring
pm2 monit

# Process information
pm2 show beatboxx-website
```

### Backup & Security

#### Create backup
```bash
# Backup your website files
tar -czf ~/backup-$(date +%Y%m%d).tar.gz /home/beatboxx/beatboxx-website

# Download backup to local machine
scp beatboxx@YOUR_VPS_IP:~/backup-$(date +%Y%m%d).tar.gz ./
```

#### Security updates
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Node.js packages
cd /home/beatboxx/beatboxx-website
npm audit fix
```

### Emergency Contacts & Resources

- **Ionos Support**: Available in your Ionos control panel
- **DNS Checker**: https://dnschecker.org
- **SSL Checker**: https://www.sslshopper.com/ssl-checker.html

### Quick Troubleshooting Checklist

When website is not working:

1. ✅ **Check PM2**: `pm2 status`
2. ✅ **Check Nginx**: `sudo systemctl status nginx`  
3. ✅ **Check DNS**: Visit https://dnschecker.org
4. ✅ **Check SSL**: `curl -I https://YOUR_DOMAIN.com`
5. ✅ **Check logs**: `pm2 logs beatboxx-website --lines 50`
6. ✅ **Check disk space**: `df -h`
7. ✅ **Check memory**: `free -h`

If all else fails, restart everything:
```bash
pm2 restart all
sudo systemctl restart nginx
```
