#!/bin/bash

# Function to copy environment files
copy_env_files() {
    echo "Copying environment files..."

    # Client environment file
    if [ -f "./client/.env.example" ]; then
        cp "./client/.env.example" "./client/.env"
        echo "✓ Client .env file created"
    else
        echo "⚠ Client .env.example not found"
    fi

    # Server environment file
    if [ -f "./server/.env.example" ]; then
        cp "./server/.env.example" "./server/.env"
        echo "✓ Server .env file created"
    else
        echo "⚠ Server .env.example not found"
    fi
}

# Function to start Docker services
start_services() {
    echo "Starting Docker services..."

    # Check if docker-compose is installed
    if ! command -v docker-compose &> /dev/null; then
        echo "❌ docker-compose is not installed"
        exit 1
    fi

    # Start server services
    echo "Starting server containers..."
    # docker build --platform linux/amd64 -t untitled-card-game-server:latest -f Dockerfile ..
    # docker-compose up -d
    docker-compose -f server/docker-compose.yml up -d
    if [ $? -eq 0 ]; then
        echo "✓ Server containers started successfully"
    else
        echo "❌ Failed to start server containers"
        exit 1
    fi

    # Start client services
    echo "Starting client containers..."
    docker-compose -f client/docker-compose.yml up -d
    if [ $? -eq 0 ]; then
        echo "✓ Client containers started successfully"
    else
        echo "❌ Failed to start client containers"
        exit 1
    fi
    cd ..

    # Show running containers
    echo -e "\nRunning containers:"
    docker ps
}

# Main execution
echo "🚀 Starting setup process..."

# Copy environment files
copy_env_files

# Start Docker services
start_services

echo "✅ Setup complete!"
