#!/bin/bash

# Function to stop Docker services
stop_services() {
    echo "Stopping Docker services..."

    # Stop client services
    echo "Stopping client containers..."
    cd client
    docker-compose down
    if [ $? -eq 0 ]; then
        echo "✓ Client containers stopped successfully"
    else
        echo "❌ Failed to stop client containers"
        exit 1
    fi
    cd ..

    # Stop server services
    echo "Stopping server containers..."
    cd server
    docker-compose down
    if [ $? -eq 0 ]; then
        echo "✓ Server containers stopped successfully"
    else
        echo "❌ Failed to stop server containers"
        exit 1
    fi
    cd ..

    # Show running containers
    echo -e "\nRemaining running containers:"
    docker ps
}

# Main execution
echo "🛑 Stopping containers..."
stop_services
echo "✅ All containers stopped!"
