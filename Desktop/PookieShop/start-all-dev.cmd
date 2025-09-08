@echo off
setlocal
cd /d C:\Users\hp\Desktop\PookieShop
echo.
echo == Launching BACKEND and FRONTEND in separate windows ==
echo.

start "PookieShop - Backend" cmd /k "cd /d C:\Users\hp\Desktop\PookieShop\server && mvn -q -DskipTests spring-boot:run"
REM small delay so backend starts first
timeout /t 2 >nul
start "PookieShop - Frontend" cmd /k "cd /d C:\Users\hp\Desktop\PookieShop\client && npm run dev"

echo Both windows launched. You can close this launcher window.
