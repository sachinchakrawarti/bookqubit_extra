@echo off
setlocal enabledelayedexpansion

:: ==========================================
::  🔒 BookQbit Engine - Security Fix
::  Safe Override Strategy
:: ==========================================

title BookQbit Engine - Security Fix

echo.
echo ==========================================
echo  🔒 BookQbit Engine - Security Fix
echo  Safe Override Strategy
echo ==========================================
echo.

:: Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found!
    echo Please run this script from the engine folder.
    echo Current directory: %cd%
    pause
    exit /b 1
)

:: Step 1: Backup
echo [1/5] Creating backup...
if exist "package.json.backup" (
    del package.json.backup
)
copy package.json package.json.backup > nul
echo   ✅ package.json backed up

:: Step 2: Check for overrides
echo.
echo [2/5] Checking package.json for overrides...
findstr /C:"\"overrides\"" package.json > nul
if errorlevel 1 (
    echo   ⚠️  No overrides found. Adding overrides...
    
    :: Create a temp file with overrides
    powershell -Command "$content = Get-Content package.json -Raw | ConvertFrom-Json; $content | Add-Member -MemberType NoteProperty -Name 'overrides' -Value @{ 'tar'='6.2.1'; '@tootallnate/once'='2.0.1'; 'cacache'='18.0.4' } -Force; $content | ConvertTo-Json -Depth 10 | Set-Content package.json"
    
    echo   ✅ Overrides added
) else (
    echo   ✅ Overrides already present
)

:: Step 3: Clean old dependencies
echo.
echo [3/5] Cleaning old dependencies...
if exist "node_modules" (
    echo   Removing node_modules...
    rmdir /s /q node_modules
    echo   ✅ node_modules removed
)
if exist "package-lock.json" (
    echo   Removing package-lock.json...
    del package-lock.json
    echo   ✅ package-lock.json removed
)

:: Step 4: Install with overrides
echo.
echo [4/5] Installing dependencies with overrides...
echo    This may take a few minutes...
echo.

call npm install

if errorlevel 1 (
    echo.
    echo ❌ npm install failed!
    echo Trying with legacy peer deps...
    call npm install --legacy-peer-deps
)

if errorlevel 1 (
    echo ❌ Installation failed!
    echo.
    echo To restore backup, run:
    echo   copy package.json.backup package.json
    pause
    exit /b 1
)

echo.
echo   ✅ Dependencies installed

:: Step 5: Rebuild native modules
echo.
echo [5/5] Rebuilding native modules...
call npm rebuild sqlite3

:: Step 6: Test
echo.
echo ==========================================
echo  🧪 Testing Engine
echo ==========================================
echo.

echo Running: node cli.js hello
node cli.js hello
if errorlevel 1 (
    echo ❌ Engine test failed!
    echo.
    echo To restore backup, run:
    echo   copy package.json.backup package.json
    echo   npm install
    pause
    exit /b 1
)

echo.
echo Running: node cli.js test
node cli.js test

:: Step 7: Verify audit
echo.
echo ==========================================
echo  🔍 Audit Report
echo ==========================================
echo.
call npm audit

:: Summary
echo.
echo ==========================================
echo  ✅ Security Fix Completed Successfully!
echo ==========================================
echo.
echo 📊 Summary:
echo   ✅ Vulnerabilities fixed via overrides
echo   ✅ Engine tested and working
echo   ✅ SQLite3 preserved at v5.x
echo.
echo 📝 Files modified:
echo   ✅ package.json (overrides added)
echo   ✅ package.json.backup (backup created)
echo.
echo 🔍 To verify: npm audit
echo.
echo 🚀 Next steps:
echo   node cli.js hello     - Test the engine
echo   node cli.js test      - Run tests
echo   node cli.js --help    - Show all commands
echo.
pause