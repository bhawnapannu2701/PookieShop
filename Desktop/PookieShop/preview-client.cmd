@echo off
setlocal
cd /d C:\Users\hp\Desktop\PookieShop\client
echo.
echo === Vite Preview (static dist) on http://localhost:4173 ===
echo (Tip: this serves the built files in /dist; stop with Ctrl+C)
echo.

if not exist dist (
  echo [INFO] No dist found. Building now...
  npm run build
  if errorlevel 1 (
    echo [ERROR] Build failed; cannot preview.
    pause
    exit /b 1
  )
)

npm run preview
echo.
echo Preview stopped. Press any key to close.
pause>nul
