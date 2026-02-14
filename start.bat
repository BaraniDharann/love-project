@echo off
echo ========================================
echo   Love Day Project - Starting Servers
echo ========================================
echo.

echo Installing Backend Dependencies...
cd backend
call npm install
echo.

echo Installing Frontend Dependencies...
cd ..\frontend
call npm install
echo.

echo ========================================
echo   Starting Backend Server...
echo ========================================
cd ..\backend
start cmd /k "npm start"

timeout /t 3

echo ========================================
echo   Starting Frontend Server...
echo ========================================
cd ..\frontend
start cmd /k "npm start"

echo.
echo ========================================
echo   Both servers are starting!
echo   Backend: http://localhost:5000
echo   Frontend: http://localhost:3000
echo ========================================
echo.
pause
