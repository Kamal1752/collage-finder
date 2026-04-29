@echo off
echo ========================================
echo   CollegeFinder - Setup Script
echo ========================================

echo.
echo [1/4] Installing Backend dependencies...
cd backend
call npm install
echo Backend deps installed!

echo.
echo [2/4] Running Database Migrations...
call npx ts-node src/migrate.ts
echo Migrations done!

echo.
echo [3/4] Seeding College Data...
call npx ts-node src/seed.ts
echo Data seeded!

echo.
echo [4/4] Installing Frontend dependencies...
cd ../frontend
call npm install
echo Frontend deps installed!

echo.
echo ========================================
echo   Setup Complete!
echo   Now run: start-backend.bat and start-frontend.bat
echo ========================================
pause
