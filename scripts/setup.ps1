$ErrorActionPreference = "Stop"

. "$PSScriptRoot\_common.ps1"

Write-Host "=== TravelWithUs: первичная настройка ===" -ForegroundColor Cyan
Write-Host "Корень проекта: $ProjectRoot"
Write-Host ""

$py = Get-Command python -ErrorAction SilentlyContinue
if (-not $py) {
    Write-Error "Python не найден в PATH. Установите Python 3.11+ и повторите."
}

if (-not (Test-Path $VenvDir)) {
    Write-Host "Создаю виртуальное окружение в backend\.venv ..."
    Push-Location $BackendDir
    python -m venv .venv
    Pop-Location
}

Write-Host "Устанавливаю зависимости Python ..."
& $PipExe install -r (Join-Path $BackendDir "requirements.txt")

Write-Host "Применяю миграции ..."
Invoke-Django migrate

Write-Host "Устанавливаю npm-зависимости (корень + frontend) ..."
Push-Location $ProjectRoot
npm install
Pop-Location

Push-Location $FrontendDir
npm install
Pop-Location

$envExample = Join-Path $FrontendDir ".env.example"
$envLocal = Join-Path $FrontendDir ".env.local"
if ((Test-Path $envExample) -and -not (Test-Path $envLocal)) {
    Copy-Item $envExample $envLocal
    Write-Host "Создан frontend\.env.local из .env.example"
}

Write-Host ""
Write-Host "Готово." -ForegroundColor Green
Write-Host "  npm run dev      — сайт + API"
Write-Host "  npm run db:open  — показать файл БД в проводнике"
Write-Host "  npm run admin    — суперпользователь для /admin/"
Write-Host ""
