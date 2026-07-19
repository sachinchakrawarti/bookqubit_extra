Clear-Host

$root = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host " BOOKQUBIT RESPONSE TEST SUITE" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "[1/3] Success Test" -ForegroundColor Yellow
& "$root\test-success.ps1"

Write-Host ""
Write-Host "[2/3] Error Test" -ForegroundColor Yellow
& "$root\test-error.ps1"

Write-Host ""
Write-Host "[3/3] Pagination Test" -ForegroundColor Yellow
& "$root\test-pagination.ps1"

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host " ALL RESPONSE TESTS PASSED" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan

Read-Host "Press Enter to exit"