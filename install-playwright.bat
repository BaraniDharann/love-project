@echo off
echo Installing Playwright for video recording...
cd backend
call npm install playwright
echo.
echo Installing Playwright browsers...
call npx playwright install chromium
echo.
echo Installation complete!
pause
