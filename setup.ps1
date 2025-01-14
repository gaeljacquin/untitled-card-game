# Function to copy environment files
function Copy-EnvFiles {
    Write-Host "Copying environment files..." -ForegroundColor Blue

    # Client environment file
    if (Test-Path ".\client\.env.example") {
        Copy-Item ".\client\.env.example" ".\client\.env" -Force
        Write-Host "✓ Client .env file created" -ForegroundColor Green
    } else {
        Write-Host "⚠ Client .env.example not found" -ForegroundColor Yellow
    }

    # Server environment file
    if (Test-Path ".\server\.env.example") {
        Copy-Item ".\server\.env.example" ".\server\.env" -Force
        Write-Host "✓ Server .env file created" -ForegroundColor Green
    } else {
        Write-Host "⚠ Server .env.example not found" -ForegroundColor Yellow
    }
}

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
    docker-compose -f docker-compose.yml up -d
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
    docker-compose -f docker-compose.yml up -d
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
Write-Host "🚀 Starting setup process..." -ForegroundColor Cyan

# Copy environment files
Copy-EnvFiles

# Start Docker services
Start-DockerServices

Write-Host "✅ Setup complete!" -ForegroundColor Green
