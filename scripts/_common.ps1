$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$BackendDir = Join-Path $ProjectRoot "backend"
$FrontendDir = Join-Path $ProjectRoot "frontend"
$VenvDir = Join-Path $BackendDir ".venv"
$PythonExe = Join-Path $VenvDir "Scripts\python.exe"
$PipExe = Join-Path $VenvDir "Scripts\pip.exe"
$ManagePy = Join-Path $BackendDir "manage.py"
$DbPath = Join-Path $BackendDir "db.sqlite3"

function Assert-BackendReady {
    if (-not (Test-Path $PythonExe)) {
        Write-Host ""
        Write-Host "Виртуальное окружение не найдено: $VenvDir" -ForegroundColor Yellow
        Write-Host "Выполните один раз из корня проекта:  npm run setup" -ForegroundColor Yellow
        Write-Host ""
        exit 1
    }
}

function Invoke-Django {
    param(
        [Parameter(ValueFromRemainingArguments = $true)]
        [string[]]$Args
    )

    Assert-BackendReady
    Push-Location $BackendDir
    try {
        & $PythonExe $ManagePy @Args
        if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    }
    finally {
        Pop-Location
    }
}
