#!/bin/bash

# Colors for output
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to stop containers
stop_containers() {
    echo -e "${BLUE}Stopping all containers first...${NC}"

    # Stop client services
    echo -e "${BLUE}Stopping client containers...${NC}"
    pushd client > /dev/null
    docker-compose down
    popd > /dev/null

    # Stop server services
    echo -e "${BLUE}Stopping server containers...${NC}"
    pushd server > /dev/null
    docker-compose down
    popd > /dev/null
}

# Function to remove Docker images
remove_docker_images() {
    echo -e "${BLUE}Removing Docker images...${NC}"

    # List images before removal
    echo -e "\n${CYAN}Current images:${NC}"
    docker images

    # Remove client images
    echo -e "\n${BLUE}Removing client images...${NC}"
    pushd client > /dev/null
    if [ -f "docker-compose.yml" ]; then
        client_images=$(docker-compose config | grep "annabelle")
        if [ ! -z "$client_images" ]; then
            echo -e "${YELLOW}Found client images:${NC}"
            echo "$client_images"
            docker-compose down --rmi all
            echo -e "${GREEN}✓ Client images removed${NC}"
        else
            echo -e "${YELLOW}No client images found in docker-compose.yml${NC}"
        fi
    fi
    popd > /dev/null

    # Remove server images
    echo -e "\n${BLUE}Removing server images...${NC}"
    pushd server > /dev/null
    if [ -f "docker-compose.yml" ]; then
        server_images=$(docker-compose config | grep "annabelle")
        if [ ! -z "$server_images" ]; then
            echo -e "${YELLOW}Found server images:${NC}"
            echo "$server_images"
            docker-compose down --rmi all
            echo -e "${GREEN}✓ Server images removed${NC}"
        else
            echo -e "${YELLOW}No server images found in docker-compose.yml${NC}"
        fi
    fi
    popd > /dev/null

    # Remove any dangling images
    echo -e "\n${BLUE}Removing dangling images...${NC}"
    docker image prune -f

    # List remaining images
    echo -e "\n${CYAN}Remaining images:${NC}"
    docker images
}

# Main execution
echo -e "${CYAN}🧹 Starting cleanup process...${NC}"

# Stop containers first
stop_containers

# Remove images
remove_docker_images

echo -e "${GREEN}✅ Cleanup complete!${NC}"
