param(
  [Parameter(Mandatory = $true)]
  [string] $SourceFolder,
  [string] $PublicFolder
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
if ([string]::IsNullOrWhiteSpace($PublicFolder)) {
  $scriptFolder = Split-Path -Parent $MyInvocation.MyCommand.Path
  $PublicFolder = Join-Path $scriptFolder '..\public\monitoring-data'
}

$sourceRoot = (Resolve-Path -LiteralPath $SourceFolder).Path
$captureRoot = Join-Path $PublicFolder 'captures'
New-Item -ItemType Directory -Force -Path $captureRoot | Out-Null
$records = [System.Collections.Generic.List[object]]::new()
$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg' | Select-Object -First 1

foreach ($labelId in 1..5) {
  $labelFolder = Join-Path $sourceRoot "label_$labelId"
  $listFile = Join-Path $labelFolder 'list.csv'
  if (-not (Test-Path -LiteralPath $listFile)) { throw "Missing category list: $listFile" }

  foreach ($row in (Import-Csv -LiteralPath $listFile -Encoding UTF8)) {
    if (-not $row.id -or -not $row.fld) { continue }
    $captureName = "label_${labelId}_$($row.id).jpg"
    $imageFile = Join-Path $labelFolder "$($row.id)\main.png"
    $capturePath = $null

    if (Test-Path -LiteralPath $imageFile) {
      $sourceImage = [System.Drawing.Image]::FromFile($imageFile)
      try {
        $scale = [Math]::Min([double]1, [Math]::Min(640 / [double]$sourceImage.Width, 420 / [double]$sourceImage.Height))
        $width = [Math]::Max(1, [int][Math]::Round($sourceImage.Width * $scale))
        $height = [Math]::Max(1, [int][Math]::Round($sourceImage.Height * $scale))
        $bitmap = [System.Drawing.Bitmap]::new($sourceImage, $width, $height)
        try {
          $parameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
          try {
            $parameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [long]72)
            $bitmap.Save((Join-Path $captureRoot $captureName), $jpegEncoder, $parameters)
          } finally { $parameters.Dispose() }
        } finally { $bitmap.Dispose() }
        $capturePath = "/monitoring-data/captures/$captureName"
      } finally { $sourceImage.Dispose() }
    }

    $records.Add([ordered]@{
      id = [string]$row.id
      labelId = $labelId
      domain = ([string]$row.fld).Trim()
      insertedAt = ([string]$row.insertDate).Trim()
      capture = $capturePath
    })
  }
}

$data = [ordered]@{
  generatedAt = (Get-Date).ToString('yyyy-MM-dd HH:mm:ss')
  sites = @($records | Sort-Object -Property @{ Expression = 'insertedAt'; Descending = $true }, @{ Expression = 'labelId'; Descending = $false })
}

New-Item -ItemType Directory -Force -Path $PublicFolder | Out-Null
$json = ConvertTo-Json -InputObject $data -Depth 6
$jsonPath = Join-Path $PublicFolder 'sites.json'
$jsonTempPath = "$jsonPath.tmp"
[System.IO.File]::WriteAllText($jsonTempPath, $json, [System.Text.UTF8Encoding]::new($false))
Move-Item -LiteralPath $jsonTempPath -Destination $jsonPath -Force
"Imported $($records.Count) site records. Captures are optimized to 640x420 max, JPEG quality 72."
