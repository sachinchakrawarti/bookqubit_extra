Clear-Host

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Response System - Error Test" -ForegroundColor Red
Write-Host "=========================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "GET /error" -ForegroundColor Yellow

try {
    Invoke-RestMethod http://localhost:5000/error
}
catch {
    $_.Exception.Message
}

Write-Host ""
Read-Host "Press Enter to continue"