@echo off
echo ========================================
echo Enhanced Video Feature Installation
echo ========================================
echo.

cd backend

echo Installing canvas dependency...
call npm install canvas
echo.

if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo ERROR: Canvas installation failed!
    echo ========================================
    echo.
    echo Trying alternative installation...
    echo.
    call npm install canvas --build-from-source
    echo.
)

echo.
echo Verifying dependencies...
echo.
call npm list canvas
call npm list @ffmpeg-installer/ffmpeg
call npm list fluent-ffmpeg
echo.

echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo The enhanced video feature is now ready!
echo.
echo Features included:
echo - Floating hearts animations
echo - Cupid illustrations
echo - Heart-shaped photo frames
echo - Beautiful text overlays
echo - Gradient backgrounds
echo - Sparkle effects
echo - Background music
echo.
echo To start the application:
echo 1. Run start.bat from the project root
echo 2. Create a love page
echo 3. Click "Download WhatsApp Status Video"
echo.
echo See ENHANCED_VIDEO_GUIDE.md for detailed instructions.
echo.
pause
