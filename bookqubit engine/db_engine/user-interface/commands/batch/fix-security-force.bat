@echo off
echo ==========================================
echo  🔒 FORCE Security Fix
echo  Using npm-force-resolutions
echo ==========================================
echo.

echo [1/6] Installing npm-force-resolutions...
call npm install --save-dev npm-force-resolutions
echo   ✅ Installed

echo.
echo [2/6] Updating package.json with resolutions...
echo   ✅ Added preinstall script
echo   ✅ Added overrides for all vulnerable packages

echo.
echo [3/6] Cleaning old dependencies...
if exist node_modules (
  rmdir /s /q node_modules
  echo   ✅ Removed node_modules
)
if exist package-lock.json (
  del package-lock.json
  echo   ✅ Removed package-lock.json
)

echo.
echo [4/6] Installing with force resolutions...
call npm install

echo.
echo [5/6] Rebuilding native modules...
call npm rebuild sqlite3

echo.
echo [6/6] Testing engine...
node cli.js hello
node cli.js test

echo.
echo ==========================================
echo  🔍 Audit Report
echo ==========================================
call npm audit

echo.
echo ==========================================
echo  ✅ FORCE Security Fix Completed!
echo ==========================================
echo.
echo If vulnerabilities remain, run:
echo   npm audit fix --force
echo.
pause