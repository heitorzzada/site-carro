param([switch]$NoBrowser)

# Servidor HTTP Local para o site Sartec Veículos
$port = 8000
$root = $PSScriptRoot
if (-not $root) { $root = (Get-Location).Path }

$mimeTypes = @{
    ".html"  = "text/html; charset=utf-8"
    ".htm"   = "text/html; charset=utf-8"
    ".css"   = "text/css; charset=utf-8"
    ".js"    = "application/javascript; charset=utf-8"
    ".json"  = "application/json; charset=utf-8"
    ".png"   = "image/png"
    ".jpg"   = "image/jpeg"
    ".jpeg"  = "image/jpeg"
    ".webp"  = "image/webp"
    ".gif"   = "image/gif"
    ".svg"   = "image/svg+xml"
    ".ico"   = "image/x-icon"
    ".woff"  = "font/woff"
    ".woff2" = "font/woff2"
    ".ttf"   = "font/ttf"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
} catch {
    Write-Host "[Aviso] Porta $port indisponivel. Tentando porta 8080..." -ForegroundColor Yellow
    $port = 8080
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$port/")
    $listener.Start()
}

$url = "http://localhost:$port/"

Write-Host "==================================================" -ForegroundColor Green
Write-Host "   Sartec Veiculos - Servidor Local Ativo!       " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Green
Write-Host " URL: $url" -ForegroundColor Yellow
Write-Host " Abrindo no navegador padrao..." -ForegroundColor White
Write-Host " Pressione Ctrl + C para finalizar." -ForegroundColor DarkGray
Write-Host "==================================================" -ForegroundColor Green

if (-not $NoBrowser) {
    try { Start-Process $url } catch {}
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = [System.Uri]::UnescapeDataString($request.Url.AbsolutePath)
        if ($path -eq "/" -or [string]::IsNullOrWhiteSpace($path)) {
            $path = "/index.html"
        }

        $relative = $path.TrimStart("/").Replace("/", [System.IO.Path]::DirectorySeparatorChar)
        $filePath = Join-Path $root $relative

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = $mimeTypes[$ext]
            if (-not $contentType) { $contentType = "application/octet-stream" }

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.LongLength
            $response.StatusCode = 200

            if ($request.HttpMethod -ne "HEAD") {
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            }
        } else {
            $response.StatusCode = 404
            $errContent = "<!DOCTYPE html><html><body><h1>404 - Nao encontrado</h1><p>Arquivo nao encontrado: $path</p></body></html>"
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes($errContent)
            $response.ContentType = "text/html; charset=utf-8"
            $response.ContentLength64 = $errBytes.LongLength

            if ($request.HttpMethod -ne "HEAD") {
                $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
            }
        }

        $response.Close()
    } catch {
        Write-Host "[$([DateTime]::Now.ToString('HH:mm:ss'))] Aviso na requisicao: $_" -ForegroundColor DarkGray
        try {
            if ($response) { $response.Close() }
        } catch {}
    }
}
