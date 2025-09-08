@echo off
setlocal
cd /d C:\Users\hp\Desktop\PookieShop
echo.
echo === Clean build artifacts ===
echo.

if exist server\target (
  echo Deleting server\target ...
  rmdir /s /q server\target
)
if exist client\dist (
  echo Deleting client\dist ...
  rmdir /s /q client\dist
)

echo.
echo Done. Press any key to close.
pause>nul
