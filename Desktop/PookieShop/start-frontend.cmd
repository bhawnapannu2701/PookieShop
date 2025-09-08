@echo off
setlocal
cd /d C:\Users\hp\Desktop\PookieShop\client
echo.
echo == Starting PookieShop FRONTEND on http://localhost:5173 ==
echo (Close this window or press Ctrl+C to stop)
echo.
npm run dev
echo.
echo Frontend stopped. Press any key to close.
pause>nul
