. "$PSScriptRoot\_common.ps1"

Write-Host "API: http://127.0.0.1:8000/  |  Admin: http://127.0.0.1:8000/admin/" -ForegroundColor Cyan
Invoke-Django runserver
