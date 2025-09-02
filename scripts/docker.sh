#!/bin/bash

# Docker management script for Spice Bazaar
# Usage: ./scripts/docker.sh [command]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Function to build development image
build_dev() {
    print_status "Building development Docker image..."
    docker build -f Dockerfile.dev -t spice-bazaar:dev .
    print_success "Development image built successfully!"
}

# Function to build production image
build_prod() {
    print_status "Building production Docker image..."
    docker build -f Dockerfile -t spice-bazaar:prod .
    print_success "Production image built successfully!"
}

# Function to start development environment
start_dev() {
    print_status "Starting development environment..."
    docker-compose --profile dev up -d
    print_success "Development environment started!"
    print_status "Access your app at: http://localhost:3000"
}

# Function to start production environment
start_prod() {
    print_status "Starting production environment..."
    docker-compose --profile prod up -d
    print_success "Production environment started!"
    print_status "Access your app at: http://localhost:3000"
}

# Function to start production with nginx
start_nginx() {
    print_status "Starting production environment with nginx..."
    
    # Check if SSL certificates exist
    if [ ! -f "./ssl/cert.pem" ] || [ ! -f "./ssl/key.pem" ]; then
        print_warning "SSL certificates not found. Creating self-signed certificates..."
        mkdir -p ssl
        openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
    fi
    
    docker-compose --profile nginx up -d
    print_success "Production environment with nginx started!"
    print_status "Access your app at: https://localhost"
}

# Function to stop all services
stop() {
    print_status "Stopping all services..."
    docker-compose down
    print_success "All services stopped!"
}

# Function to view logs
logs() {
    local service=${1:-""}
    if [ -z "$service" ]; then
        docker-compose logs -f
    else
        docker-compose logs -f "$service"
    fi
}

# Function to clean up
clean() {
    print_status "Cleaning up Docker resources..."
    docker-compose down --volumes --remove-orphans
    docker system prune -f
    print_success "Cleanup completed!"
}

# Function to rebuild and restart
rebuild() {
    local profile=${1:-"dev"}
    print_status "Rebuilding and restarting $profile environment..."
    docker-compose --profile "$profile" down
    docker-compose --profile "$profile" build --no-cache
    docker-compose --profile "$profile" up -d
    print_success "$profile environment rebuilt and restarted!"
}

# Function to show status
status() {
    print_status "Docker services status:"
    docker-compose ps
}

# Function to show help
show_help() {
    echo "Docker management script for Spice Bazaar"
    echo ""
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  build-dev     Build development Docker image"
    echo "  build-prod    Build production Docker image"
    echo "  start-dev     Start development environment"
    echo "  start-prod    Start production environment"
    echo "  start-nginx   Start production with nginx reverse proxy"
    echo "  stop          Stop all services"
    echo "  logs [service] View logs (all or specific service)"
    echo "  clean         Clean up Docker resources"
    echo "  rebuild [profile] Rebuild and restart (dev/prod/nginx)"
    echo "  status        Show services status"
    echo "  help          Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start-dev"
    echo "  $0 rebuild prod"
    echo "  $0 logs spice-bazaar-dev"
}

# Main script logic
main() {
    check_docker
    
    case "${1:-help}" in
        "build-dev")
            build_dev
            ;;
        "build-prod")
            build_prod
            ;;
        "start-dev")
            start_dev
            ;;
        "start-prod")
            start_prod
            ;;
        "start-nginx")
            start_nginx
            ;;
        "stop")
            stop
            ;;
        "logs")
            logs "$2"
            ;;
        "clean")
            clean
            ;;
        "rebuild")
            rebuild "$2"
            ;;
        "status")
            status
            ;;
        "help"|*)
            show_help
            ;;
    esac
}

# Run main function with all arguments
main "$@"
