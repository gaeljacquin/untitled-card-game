# Function to start Docker services
function Start-DockerServices {
    Write-Host "Starting Docker services..." -ForegroundColor Blue

    # Check if docker-compose is installed
    if (-not (Get-Command docker-compose -ErrorAction SilentlyContinue)) {
        Write-Host "❌ docker-compose is not installed" -ForegroundColor Red
        exit 1
    }

    # Start server services
    Write-Host "Starting server containers..." -ForegroundColor Blue
    Push-Location server
    docker-compose up -d
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Server containers started successfully" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to start server containers" -ForegroundColor Red
        Pop-Location
        exit 1
    }
    Pop-Location

    # Start client services
    Write-Host "Starting client containers..." -ForegroundColor Blue
    Push-Location client
    docker-compose up -d
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Client containers started successfully" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to start client containers" -ForegroundColor Red
        Pop-Location
        exit 1
    }
    Pop-Location

    # Show running containers
    Write-Host "`nRunning containers:" -ForegroundColor Cyan
    docker ps
}

# Main execution
Write-Host "🚀 Starting containers..." -ForegroundColor Cyan
Start-DockerServices
Write-Host "✅ All containers started!" -ForegroundColor Green
