. "$PSScriptRoot\_common.ps1"

if (-not (Test-Path $DbPath)) {
    Write-Host "Файл БД ещё не создан: $DbPath" -ForegroundColor Yellow
    Write-Host "Создайте БД:  npm run migrate" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "SQLite база проекта:" -ForegroundColor Green
Write-Host "  $DbPath"
Write-Host ""
Write-Host "Полезные команды из корня проекта (без cd backend):"
Write-Host "  npm run db          — SQL-консоль (manage.py dbshell)"
Write-Host "  npm run django -- migrate"
Write-Host "  npm run admin       — создать суперпользователя"
Write-Host "  http://127.0.0.1:8000/admin/  — веб-админка Django"
Write-Host ""

explorer.exe "/select,$DbPath"
Invoke-Item $DbPath
