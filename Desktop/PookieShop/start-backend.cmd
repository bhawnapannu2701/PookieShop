@echo off
setlocal
cd /d C:\Users\hp\Desktop\PookieShop\server
echo.
echo == Starting PookieShop BACKEND on http://localhost:8080 ==
echo (Close this window or press Ctrl+C to stop)
echo.
mvn -q -DskipTests spring-boot:run
echo.
echo Backend stopped. Press any key to close.
pause>nul
