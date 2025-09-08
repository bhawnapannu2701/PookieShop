@echo off
setlocal
echo.
echo === PookieShop: BUILD ALL (Backend JAR + Frontend dist) ===
echo.

REM ---- Backend build (Spring Boot fat JAR) ----
cd /d C:\Users\hp\Desktop\PookieShop\server
echo [Backend] mvn -DskipTests clean package
mvn -q -DskipTests clean package
if errorlevel 1 (
  echo.
  echo [ERROR] Maven build failed. Check the errors above.
  pause
  exit /b 1
)

REM ---- Frontend build (Vite dist) ----
cd /d C:\Users\hp\Desktop\PookieShop\client
if not exist node_modules (
  echo [Frontend] Installing dependencies (npm install) ...
  npm install
)
echo [Frontend] npm run build
npm run build
if errorlevel 1 (
  echo.
  echo [ERROR] Frontend build failed. Check the errors above.
  pause
  exit /b 1
)

echo.
echo === Build complete ===
echo Backend JAR:   C:\Users\hp\Desktop\PookieShop\server\target
echo Frontend dist: C:\Users\hp\Desktop\PookieShop\client\dist
echo.
pause
