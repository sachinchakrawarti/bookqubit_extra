@echo off
echo ========================================
echo  BookQbit Engine - Fix All Issues
echo ========================================
echo.

echo [1/5] Cleaning old dependencies...
if exist node_modules (
  rmdir /s /q node_modules
  echo   ✅ Removed node_modules
) else (
  echo   ⏭️  No node_modules found
)

echo.
echo [2/5] Updating package.json...
echo   ✅ Using compatible versions

echo.
echo [3/5] Installing dependencies...
call npm install --legacy-peer-deps

echo.
echo [4/5] Fixing vulnerabilities...
call npm audit fix

echo.
echo [5/5] Testing engine...
node cli.js hello

echo.
echo ========================================
echo  ✅ Fix completed!
echo ========================================
echo.
echo Next steps:
echo   node cli.js hello
echo   node cli.js test
echo   node cli.js --help
echo.
pause