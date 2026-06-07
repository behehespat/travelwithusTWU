# Снимает зависшие next dev: процессы node, слушающие типичные порты Next.js.
# Важно: dev у этого проекта на порту 3100 — он тоже входит в список.
$ports = 3000..3110
foreach ($port in $ports) {
  Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue | ForEach-Object {
    $owningPid = $_.OwningProcess
    $proc = Get-Process -Id $owningPid -ErrorAction SilentlyContinue
    if ($proc -and $proc.ProcessName -eq "node") {
      Write-Host "Stop node PID $owningPid (port $port)"
      Stop-Process -Id $owningPid -Force -ErrorAction SilentlyContinue
    }
  }
}
Write-Host "Done. Run: npm run dev"
