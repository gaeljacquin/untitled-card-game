# Function to stop containers first
function Stop-Containers {
    Write-Host "Stopping all containers first..." -ForegroundColor Blue

    # Stop client services
    Write-Host "Stopping client containers..." -ForegroundColor Blue
    Push-Location client
    docker-compose down
    Pop-Location

    # Stop server services
    Write-Host "Stopping server containers..." -ForegroundColor Blue
    Push-Location server
    docker-compose down
    Pop-Location
}

# Function to remove Docker images
function Remove-DockerImages {
    Write-Host "Removing Docker images..." -ForegroundColor Blue

    # List images before removal
    Write-Host "`nCurrent images:" -ForegroundColor Cyan
    docker images

    # Remove client images
    Write-Host "`nRemoving client images..." -ForegroundColor Blue
    Push-Location client
    if (Test-Path "docker-compose.yml") {
        $clientImages = (docker-compose config | Select-String "annabelle").Line
        if ($clientImages) {
            Write-Host "Found client images:" -ForegroundColor Yellow
            Write-Host $clientImages
            docker-compose down --rmi all
            Write-Host "✓ Client images removed" -ForegroundColor Green
        } else {
            Write-Host "No client images found in docker-compose.yml" -ForegroundColor Yellow
        }
    }
    Pop-Location

    # Remove server images
    Write-Host "`nRemoving server images..." -ForegroundColor Blue
    Push-Location server
    if (Test-Path "docker-compose.yml") {
        $serverImages = (docker-compose config | Select-String "annabelle").Line
        if ($serverImages) {
            Write-Host "Found server images:" -ForegroundColor Yellow
            Write-Host $serverImages
            docker-compose down --rmi all
            Write-Host "✓ Server images removed" -ForegroundColor Green
        } else {
            Write-Host "No server images found in docker-compose.yml" -ForegroundColor Yellow
        }
    }
    Pop-Location

    # Remove any dangling images
    Write-Host "`nRemoving dangling images..." -ForegroundColor Blue
    docker image prune -f

    # List remaining images
    Write-Host "`nRemaining images:" -ForegroundColor Cyan
    docker images
}

# Main execution
Write-Host "🧹 Starting cleanup process..." -ForegroundColor Cyan

# Stop containers first
Stop-Containers

# Remove images
Remove-DockerImages

Write-Host "✅ Cleanup complete!" -ForegroundColor Green
