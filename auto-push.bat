@echo off
title Auto-Push Watcher
color 0A

echo ========================================
echo  📦 AUTO-PUSH WATCHER
echo ========================================
echo.
echo 📁 Directory: %CD%
echo 📅 Started: %date% %time%
echo.

REM Check if node_modules exists, if not install dependencies
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
    echo.
)

echo 🚀 Starting watcher...
echo Press Ctrl+C to stop
echo ========================================
echo.

node auto-push.js

echo.
echo ⚠️  Watcher stopped
pause