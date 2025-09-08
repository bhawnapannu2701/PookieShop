@echo off
setlocal
cd /d C:\Users\hp\Desktop\PookieShop\server
echo.
echo === Run latest Spring Boot JAR on http://localhost:8080 ===
echo (Tip: close window or press Ctrl+C to stop)
echo.

REM Find most recent jar in target
set "JAR="
for /f "delims=" %%f in ('dir /b /o:-d "target\*.jar"') do (
  set "JAR=%%f"
  goto :havejar
)
:havejar

if "%JAR%"=="" (
  echo [WARN] No JAR found in target. Building one now...
  mvn -q -DskipTests clean package
  for /f "delims=" %%f in ('dir /b /o:-d "target\*.jar"') do (
    set "JAR=%%f"
    goto :havejar2
  )
  :havejar2
)

if "%JAR%"=="" (
  echo [ERROR] Still no JAR found. Build likely failed.
  pause
  exit /b 1
)

echo Running: java -jar "target\%JAR%"
echo.
java -jar "target\%JAR%"
echo.
echo Backend JAR stopped. Press any key to close.
pause>nul
