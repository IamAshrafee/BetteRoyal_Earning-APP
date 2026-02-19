@echo off
title BetteRoyal Fresh Start
color 0A

echo ==========================================
echo      BETTEROYAL APP - FRESH BUILD
echo ==========================================

echo.
echo [1/5] Cleaning Android Project...
cd android
call gradlew clean
cd ..

echo.
echo [2/5] Removing node_modules (this may take a while)...
if exist node_modules (
    rmdir /s /q node_modules
)

echo.
echo [3/5] Installing Dependencies...
call npm install

echo.
echo [4/5] Resetting Metro Cache...
:: We pass the reset-cache flag to the run command if possible, 
:: or the user can run 'npm start -- --reset-cache' manually.
:: ensuring watchman is happy (optional but good)
if exist .watchmanconfig (
    watchman watch-del-all
)

echo.
echo [5/5] Launching App (Android) with Cache Reset...
echo Make sure your Emulator is OPEN or a Device is connected!
echo.
call npx react-native run-android --active-arch-only

echo.
echo ==========================================
echo             DONE!
echo ==========================================
pause
