# 🐳 Docker Guide for Spice Bazaar

Complete guide for containerizing and deploying the Spice Bazaar application using Docker.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Development](#development)
- [Production](#production)
- [Docker Compose Profiles](#docker-compose-profiles)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

## 🚀 Quick Start

### Development Environment

```bash
# Start development server with hot reloading
./scripts/docker.sh start-dev

# View logs
./scripts/docker.sh logs spice-bazaar-dev

# Access at http://localhost:3000
```

### Production Environment

```bash
# Build and start production
./scripts/docker.sh build-prod
./scripts/docker.sh start-prod

# Or with nginx reverse proxy
./scripts/docker.sh start-nginx
```

## 📋 Prerequisites

- **Docker Desktop** 20.10+ or Docker Engine 20.10+
- **Docker Compose** v2.0+
- **4GB+ RAM** available for Docker
- **Ports available**: 3000 (dev/prod), 80/443 (nginx)

### Verify Installation

```bash
docker --version
docker-compose --version
```

## 🛠️ Development

### Start Development Server

```bash
./scripts/docker.sh start-dev
```

This will:
- Build the development image
- Start the container with hot reloading
- Mount your local code for live updates
- Expose port 3000

### Development Workflow

```bash
# Start services
./scripts/docker.sh start-dev

# Make code changes (auto-reloads)

# View logs
./scripts/docker.sh logs spice-bazaar-dev

# Rebuild if needed
./scripts/docker.sh rebuild dev

# Stop services
./scripts/docker.sh stop
```

### Development Features

- ✅ Hot module replacement (HMR)
- ✅ Fast refresh
- ✅ Volume mounting for live code updates
- ✅ Polling for file changes (works on all OS)
- ✅ Development dependencies included

## 🚀 Production

### Build Production Image

```bash
./scripts/docker.sh build-prod
```

### Run Production Container

```bash
./scripts/docker.sh start-prod
```

### Production with Nginx

For production with SSL and reverse proxy:

```bash
./scripts/docker.sh start-nginx
```

This will:
- Build production image
- Start Next.js app container
- Start nginx reverse proxy
- Create self-signed SSL certificates (if needed)
- Expose ports 80 (HTTP) and 443 (HTTPS)

## 🎯 Docker Compose Profiles

The project uses Docker Compose profiles for different environments:

### `dev` Profile

Development environment with hot reloading:

```bash
docker-compose --profile dev up -d
```

**Features:**
- Volume mounting for live code updates
- Development dependencies
- Hot module replacement
- Polling for file changes

### `prod` Profile

Standalone production environment:

```bash
docker-compose --profile prod up -d
```

**Features:**
- Optimized production build
- Standalone Next.js output
- Minimal image size
- Non-root user execution
- Health checks

### `nginx` Profile

Production with nginx reverse proxy:

```bash
docker-compose --profile nginx up -d
```

**Features:**
- SSL/TLS encryption
- HTTP to HTTPS redirect
- Gzip compression
- Static asset caching
- Rate limiting
- Security headers

## ⚙️ Configuration

### Environment Variables

Create `.env` file for environment-specific variables:

```bash
# Development
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1

# Production
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
NODE_OPTIONS=--max-old-space-size=4096
```

### Docker Compose Override

For local customization, create `docker-compose.override.yml`:

```yaml
services:
  spice-bazaar-dev:
    ports:
      - "3001:3000"  # Use different port
    environment:
      - CUSTOM_VAR=value
```

### Nginx Configuration

Customize `nginx.conf` for:
- SSL certificates location
- Rate limiting rules
- Caching strategies
- Security headers

## 🔧 Available Commands

### Management Script

```bash
# Build images
./scripts/docker.sh build-dev      # Development image
./scripts/docker.sh build-prod     # Production image

# Start services
./scripts/docker.sh start-dev      # Development
./scripts/docker.sh start-prod     # Production
./scripts/docker.sh start-nginx    # Production + nginx

# Management
./scripts/docker.sh stop          # Stop all services
./scripts/docker.sh logs [service] # View logs
./scripts/docker.sh status        # Show status
./scripts/docker.sh clean         # Clean up resources
./scripts/docker.sh rebuild [profile] # Rebuild and restart

# Help
./scripts/docker.sh help
```

### Docker Compose Commands

```bash
# Start services
docker-compose --profile dev up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild
docker-compose --profile dev build --no-cache

# Execute commands in container
docker-compose exec spice-bazaar-dev sh
```

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Check what's using the port
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use different port in docker-compose.yml
```

### Permission Denied

```bash
# Make script executable
chmod +x scripts/docker.sh

# Fix Docker socket permissions (Linux)
sudo usermod -aG docker $USER
# Then log out and back in
```

### Build Failures

```bash
# Clean Docker cache
./scripts/docker.sh clean

# Rebuild without cache
./scripts/docker.sh rebuild dev --no-cache

# Check Docker logs
docker-compose logs spice-bazaar-dev
```

### Container Won't Start

```bash
# Check container logs
docker logs spice-bazaar-dev

# Inspect container
docker inspect spice-bazaar-dev

# Check health status
docker ps -a
```

### Memory Issues

```bash
# Increase Docker memory limit
# Docker Desktop → Settings → Resources → Memory: 4GB+

# Or reduce Node.js memory
# In docker-compose.yml: NODE_OPTIONS=--max-old-space-size=2048
```

### Hot Reload Not Working

```bash
# Ensure volumes are mounted correctly
docker-compose config

# Check file permissions
ls -la

# Enable polling explicitly
# Already set in Dockerfile.dev: WATCHPACK_POLLING=true
```

### SSL Certificate Issues (nginx)

```bash
# Generate new self-signed certificates
mkdir -p ssl
openssl req -x509 -newkey rsa:4096 \
  -keyout ssl/key.pem \
  -out ssl/cert.pem \
  -days 365 -nodes \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
```

## 📊 Performance Optimization

### Image Size

The production image uses:
- ✅ Multi-stage builds
- ✅ Alpine Linux base
- ✅ Standalone Next.js output
- ✅ Production dependencies only
- ✅ Layer caching optimization

### Build Time

Optimize build time with:
- ✅ Layer caching (package.json copied first)
- ✅ Parallel builds
- ✅ BuildKit cache mounts

### Runtime

- ✅ Health checks for container orchestration
- ✅ Non-root user for security
- ✅ Resource limits (configurable)
- ✅ Gzip compression (nginx)

## 🔒 Security

### Production Hardening

- ✅ Non-root user execution
- ✅ Minimal base image (Alpine)
- ✅ Security headers (nginx)
- ✅ Rate limiting
- ✅ SSL/TLS encryption (nginx profile)

### Best Practices

1. **Never commit secrets** - Use environment variables
2. **Keep images updated** - Regularly update base images
3. **Scan for vulnerabilities** - Use `docker scan`
4. **Use specific tags** - Avoid `latest` in production
5. **Limit resources** - Set memory/CPU limits

## 📈 Monitoring

### Health Checks

All services include health checks:

```bash
# Check container health
docker ps

# Manual health check
curl http://localhost:3000
```

### Logs

```bash
# View all logs
./scripts/docker.sh logs

# Follow specific service
./scripts/docker.sh logs spice-bazaar-dev

# Export logs
docker-compose logs > logs.txt
```

### Metrics

Monitor container resources:

```bash
# Container stats
docker stats

# Detailed inspection
docker inspect spice-bazaar-dev
```

## 🚢 Deployment

### Local Testing

```bash
# Test production build locally
./scripts/docker.sh start-prod

# Test with nginx
./scripts/docker.sh start-nginx
```

### Cloud Deployment

#### Docker Hub

```bash
# Build and tag
docker build -t yourusername/spice-bazaar:latest .

# Push to Docker Hub
docker push yourusername/spice-bazaar:latest
```

#### AWS ECS / Fargate

1. Build and push to ECR
2. Create task definition
3. Deploy service

#### Google Cloud Run

```bash
# Build and deploy
gcloud builds submit --tag gcr.io/PROJECT_ID/spice-bazaar
gcloud run deploy --image gcr.io/PROJECT_ID/spice-bazaar
```

#### Azure Container Instances

```bash
# Build and push to ACR
az acr build --registry REGISTRY_NAME --image spice-bazaar:latest .
```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/)
- [Next.js Docker Guide](https://nextjs.org/docs/deployment#docker-image)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

## 🤝 Contributing

When updating Docker configuration:

1. Test all profiles (dev, prod, nginx)
2. Update this documentation
3. Ensure backward compatibility
4. Add appropriate error handling
5. Test on multiple platforms (Linux, macOS, Windows)

## 📞 Support

For Docker-related issues:

1. Check this documentation
2. Review troubleshooting section
3. Check Docker logs
4. Verify system requirements
5. Create issue with logs and error details

---

**Happy Containerizing! 🐳**

