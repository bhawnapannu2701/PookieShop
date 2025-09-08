@echo off
setlocal
echo.
echo == Stopping common dev ports (8080, 5173, 4173) ==
call :kill 8080
call :kill 5173
call :kill 4173
echo.
echo Done. Press any key to close.
pause>nul
goto :eof

:kill
set PORT=%1
for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":%PORT% " ^| findstr LISTENING') do (
  echo Killing PID %%p on port %PORT% ...
  taskkill /PID %%p /F >nul 2>&1
)
goto :eof
