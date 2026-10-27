param(
  [Parameter(Mandatory = $true)]
  [string] $SourceFolder,
  [string] $PublicFolder,
  [int] $PollSeconds = 10,
  [int] $RefreshMinutes = 30
)

$ErrorActionPreference = 'Stop'
$scriptFolder = Split-Path -Parent $MyInvocation.MyCommand.Path
$importScript = Join-Path $scriptFolder 'import-website-data.ps1'

if ([string]::IsNullOrWhiteSpace($PublicFolder)) {
  $PublicFolder = Join-Path $scriptFolder '..\public\monitoring-data'
}
$sourceRoot = (Resolve-Path -LiteralPath $SourceFolder).Path

function Get-SourceSignature {
  $files = @(Get-ChildItem -LiteralPath $sourceRoot -Recurse -File | Where-Object { $_.Name -eq 'list.csv' -or $_.Name -eq 'main.png' } | Sort-Object -Property FullName)
  return ($files | ForEach-Object { "$($_.FullName)|$($_.Length)|$($_.LastWriteTimeUtc.Ticks)" }) -join "`n"
}

Write-Host "Watching website data: $sourceRoot"
Write-Host "Changes to list.csv or main.png are checked every $PollSeconds seconds. Full refresh runs every $RefreshMinutes minutes. Press Ctrl+C to stop."
& $importScript -SourceFolder $sourceRoot -PublicFolder $PublicFolder
if ($LASTEXITCODE -and $LASTEXITCODE -ne 0) { throw 'Initial data import failed.' }
$lastSignature = Get-SourceSignature
$lastImportAt = Get-Date

while ($true) {
  Start-Sleep -Seconds ([Math]::Max(1, $PollSeconds))
  $signature = Get-SourceSignature
  $hasChanges = $signature -ne $lastSignature
  $refreshDue = ((Get-Date) - $lastImportAt).TotalMinutes -ge [Math]::Max(1, $RefreshMinutes)
  if (-not $hasChanges -and -not $refreshDue) { continue }

  if ($hasChanges) {
    # Allow a CSV or screenshot copy to finish before reading it.
    Start-Sleep -Milliseconds 750
    $stableSignature = Get-SourceSignature
    if ($stableSignature -ne $signature) { continue }
  }

  try {
    & $importScript -SourceFolder $sourceRoot -PublicFolder $PublicFolder
    if ($LASTEXITCODE -and $LASTEXITCODE -ne 0) { throw 'Import script returned a failure code.' }
    $lastSignature = Get-SourceSignature
    $lastImportAt = Get-Date
  } catch {
    Write-Warning "Import failed; will retry after the next change. $($_.Exception.Message)"
  }
}
