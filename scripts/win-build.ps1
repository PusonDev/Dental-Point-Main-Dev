# Build on Windows when project path has spaces or E: drive sync issues.
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$temp = Join-Path $env:TEMP "drjarins-dental-build"

Write-Host "Copying project to $temp ..."
if (Test-Path $temp) { Remove-Item -Recurse -Force $temp }
New-Item -ItemType Directory -Path $temp | Out-Null

$exclude = @("node_modules", ".next", ".git")
Get-ChildItem $root -Force | Where-Object { $exclude -notcontains $_.Name } | Copy-Item -Recurse -Destination $temp

Write-Host "Installing dependencies (if needed)..."
Set-Location $temp
if (-not (Test-Path "node_modules\next")) { npm install }

Write-Host "Building..."
npm run build:internal
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Copying .next back to project..."
if (Test-Path "$root\.next") { Remove-Item -Recurse -Force "$root\.next" }
Copy-Item -Recurse "$temp\.next" "$root\.next"

Write-Host "Build complete."
