param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$Args
)

. "$PSScriptRoot\_common.ps1"

if ($Args.Count -eq 0) {
    Write-Host "Использование: npm run django -- <команда manage.py>"
    Write-Host "Примеры:"
    Write-Host "  npm run django -- migrate"
    Write-Host "  npm run django -- createsuperuser"
    Write-Host "  npm run django -- shell"
    exit 0
}

Invoke-Django @Args
