# Function to stop Docker services
function Stop-DockerServices {
    Write-Host "Stopping Docker services..." -ForegroundColor Blue

    # Stop client services
    Write-Host "Stopping client containers..." -ForegroundColor Blue
    Push-Location client
    docker-compose down
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Client containers stopped successfully" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to stop client containers" -ForegroundColor Red
        Pop-Location
        exit 1
    }
    Pop-Location

    # Stop server services
    Write-Host "Stopping server containers..." -ForegroundColor Blue
    Push-Location server
    docker-compose down
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Server containers stopped successfully" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to stop server containers" -ForegroundColor Red
        Pop-Location
        exit 1
    }
    Pop-Location

    # Show running containers
    Write-Host "`nRemaining running containers:" -ForegroundColor Cyan
    docker ps
}

# Main execution
Write-Host "🛑 Stopping containers..." -ForegroundColor Cyan
Stop-DockerServices
Write-Host "✅ All containers stopped!" -ForegroundColor Green
