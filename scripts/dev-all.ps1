$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$runId = Get-Date -Format "yyyyMMdd-HHmmss"
$backendOut = Join-Path $env:TEMP "loopingon-backend-dev-$runId.out.log"
$backendErr = Join-Path $env:TEMP "loopingon-backend-dev-$runId.err.log"

$backend = Start-Process `
  -FilePath "npm.cmd" `
  -ArgumentList @("run", "dev:backend") `
  -WorkingDirectory $repoRoot `
  -WindowStyle Hidden `
  -RedirectStandardOutput $backendOut `
  -RedirectStandardError $backendErr `
  -PassThru

Start-Sleep -Seconds 4

if ($backend.HasExited) {
  Write-Host "Backend failed to start." -ForegroundColor Red

  if (Test-Path $backendOut) {
    Get-Content $backendOut
  }

  if (Test-Path $backendErr) {
    Get-Content $backendErr
  }

  exit $backend.ExitCode
}

try {
  Set-Location $repoRoot
  & npm.cmd run dev:frontend
}
finally {
  if ($backend -and -not $backend.HasExited) {
    Stop-Process -Id $backend.Id -Force
  }
}
