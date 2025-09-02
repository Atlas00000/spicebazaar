# 🐳 Docker Setup for Spice Bazaar

This document provides comprehensive instructions for containerizing and deploying the Spice Bazaar application using Docker.

## 📋 Prerequisites

- Docker Desktop installed and running
- Docker Compose v2.0+
- At least 4GB RAM available for Docker
- Ports 3000, 80, and 443 available

## 🚀 Quick Start

### 1. Development Environment

```bash
# Start development environment
./scripts/docker.sh start-dev

# View logs
./scripts/docker.sh logs spice-bazaar-dev

# Stop services
./scripts/docker.sh stop
```

### 2. Production Environment

```bash
# Start production environment
./scripts/docker.sh start-prod

# Start with nginx reverse proxy
./scripts/docker.sh start-nginx
```

## 🏗️ Architecture

The Docker setup includes multiple configurations for different environments:

```
├── Dockerfile              # Production multi-stage build
├── Dockerfile.dev          # Development environment
├── docker-compose.yml      # Main compose configuration
├── docker-compose.override.yml # Development overrides
├── nginx.conf              # Nginx reverse proxy configuration
└── scripts/docker.sh       # Management script
```

### Service Profiles

- **`dev`**: Development environment with hot reloading
- **`prod`**: Production environment (standalone)
- **`nginx`**: Production with nginx reverse proxy

## 🔧 Configuration Files

### Dockerfile (Production)

- **Multi-stage build** for optimized image size
- **Security hardening** with non-root user
- **Standalone output** for Next.js optimization
- **Alpine Linux** base for minimal footprint

### Dockerfile.dev (Development)

- **Volume mounting** for hot reloading
- **Development dependencies** included
- **Debug-friendly** configuration
- **Fast iteration** workflow

### docker-compose.yml

- **Service orchestration** with profiles
- **Network configuration** for inter-service communication
- **Environment variable** management
- **Volume mounting** strategies

## 📱 Usage Commands

### Development Workflow

```bash
# Build development image
./scripts/docker.sh build-dev

# Start development environment
./scripts/docker.sh start-dev

# View development logs
./scripts/docker.sh logs spice-bazaar-dev

# Rebuild and restart
./scripts/docker.sh rebuild dev
```

### Production Workflow

```bash
# Build production image
./scripts/docker.sh build-prod

# Start production environment
./scripts/docker.sh start-prod

# Start with nginx
./scripts/docker.sh start-nginx

# View production logs
./scripts/docker.sh logs spice-bazaar
```

### Management Commands

```bash
# Check service status
./scripts/docker.sh status

# Stop all services
./scripts/docker.sh stop

# Clean up resources
./scripts/docker.sh clean

# View help
./scripts/docker.sh help
```

## 🌐 Access Points

| Environment | URL | Port | Notes |
|-------------|-----|-------|-------|
| Development | http://localhost:3000 | 3000 | Hot reloading enabled |
| Production | http://localhost:3000 | 3000 | Optimized build |
| Nginx | https://localhost | 80/443 | SSL + reverse proxy |

## 🔒 Security Features

### Production Hardening

- **Non-root user** execution
- **Security headers** configuration
- **Rate limiting** for API endpoints
- **SSL/TLS** encryption (nginx profile)
- **Content Security Policy** headers

### Nginx Security

- **HTTP to HTTPS** redirect
- **Modern SSL** protocols (TLS 1.2+)
- **Security headers** injection
- **Hidden file** access prevention
- **Request rate** limiting

## 📊 Performance Optimizations

### Build Optimizations

- **Multi-stage builds** for smaller images
- **Layer caching** for faster rebuilds
- **Dependency optimization** with pnpm
- **Standalone output** for Next.js

### Runtime Optimizations

- **Gzip compression** for static assets
- **Static asset caching** with long TTL
- **Connection pooling** for database (future)
- **Load balancing** ready (nginx profile)

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Check what's using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port in docker-compose.yml
```

#### Permission Denied

```bash
# Fix script permissions
chmod +x scripts/docker.sh

# Fix Docker socket permissions (Linux)
sudo usermod -aG docker $USER
```

#### Build Failures

```bash
# Clean Docker cache
./scripts/docker.sh clean

# Rebuild without cache
./scripts/docker.sh rebuild dev --no-cache
```

#### Memory Issues

```bash
# Increase Docker memory limit
# Docker Desktop → Settings → Resources → Memory: 4GB+
```

### Debug Commands

```bash
# Inspect running containers
docker ps -a

# View container details
docker inspect <container_id>

# Execute commands in container
docker exec -it <container_id> /bin/sh

# View container logs
docker logs <container_id> -f
```

## 🔄 Development Workflow

### 1. Initial Setup

```bash
# Clone repository
git clone <repository-url>
cd spice-bazaar

# Start development environment
./scripts/docker.sh start-dev
```

### 2. Daily Development

```bash
# Start services
./scripts/docker.sh start-dev

# Make code changes (auto-reloads)

# View logs if needed
./scripts/docker.sh logs spice-bazaar-dev

# Stop when done
./scripts/docker.sh stop
```

### 3. Testing Production Build

```bash
# Test production build locally
./scripts/docker.sh start-prod

# Test with nginx
./scripts/docker.sh start-nginx
```

## 🚀 Deployment

### Local Production Testing

```bash
# Build and start production
./scripts/docker.sh build-prod
./scripts/docker.sh start-prod

# Test production build
curl http://localhost:3000
```

### Production with Nginx

```bash
# Start full production stack
./scripts/docker.sh start-nginx

# Access via HTTPS
curl -k https://localhost
```

### Environment Variables

Create `.env` file for production:

```bash
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
# Add other environment variables as needed
```

## 📈 Monitoring & Logs

### Log Management

```bash
# View all service logs
./scripts/docker.sh logs

# View specific service logs
./scripts/docker.sh logs spice-bazaar-dev

# Follow logs in real-time
docker-compose logs -f --tail=100
```

### Health Checks

- **Application**: `/health` endpoint
- **Container**: Docker health checks
- **Nginx**: Reverse proxy status

## 🔧 Customization

### Adding New Services

Edit `docker-compose.yml`:

```yaml
services:
  new-service:
    image: service:latest
    ports:
      - "8080:8080"
    profiles:
      - custom
```

### Environment-Specific Configs

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'
services:
  spice-bazaar:
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/)
- [Next.js Docker Guide](https://nextjs.org/docs/deployment#docker-image)
- [Nginx Configuration](https://nginx.org/en/docs/)

## 🤝 Contributing

When adding Docker-related changes:

1. Update this documentation
2. Test all profiles (dev, prod, nginx)
3. Ensure backward compatibility
4. Add appropriate error handling

## 📞 Support

For Docker-related issues:

1. Check this documentation
2. Review troubleshooting section
3. Check Docker logs
4. Verify system requirements
5. Create issue with logs and error details
