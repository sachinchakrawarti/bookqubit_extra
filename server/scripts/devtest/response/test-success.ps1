Clear-Host

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Response System - Success Test" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "GET /health" -ForegroundColor Yellow

Invoke-RestMethod http://localhost:5000/health | ConvertTo-Json -Depth 10

Write-Host ""
Read-Host "Press Enter to continue"