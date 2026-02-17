@echo off
echo ========================================
echo   Playwright Video Recording Setup
echo ========================================
echo.
echo This will install Playwright to record
echo the actual webpage with all animations!
echo.
pause

cd backend

echo.
echo [1/3] Installing Playwright package...
call npm install playwright

echo.
echo [2/3] Installing Chromium browser...
call npx playwright install chromium

echo.
echo [3/3] Verifying installation...
call npx playwright --version

echo.
echo ========================================
echo   Installation Complete! ✅
echo ========================================
echo.
echo Now you can:
echo 1. Run start.bat to start servers
echo 2. Create anniversary page
echo 3. Click "Record & Download Video"
echo 4. Get 30s video with ALL animations!
echo.
pause
