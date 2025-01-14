#!/bin/bash

# Function to start Docker services
start_services() {
    echo "Starting Docker services..."

    # Check if docker-compose is installed
    if ! command -v docker-compose &> /dev/null; then
        echo "❌ docker-compose is not installed"
        exit 1
    }

    # Start server services
    echo "Starting server containers..."
    cd server
    docker-compose up -d
    if [ $? -eq 0 ]; then
        echo "✓ Server containers started successfully"
    else
        echo "❌ Failed to start server containers"
        exit 1
    fi
    cd ..

    # Start client services
    echo "Starting client containers..."
    cd client
    docker-compose up -d
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
echo "🚀 Starting containers..."
start_services
echo "✅ All containers started!"
