@echo off
cls

echo ============================================
echo        BOOKQUBIT RESPONSE TEST SUITE
echo ============================================
echo.

echo [1/3] Testing Success Response...
call "%~dp0test-success.bat"

echo.
echo [2/3] Testing Error Response...
call "%~dp0test-error.bat"

echo.
echo [3/3] Testing Pagination Response...
call "%~dp0test-pagination.bat"

echo.
echo ============================================
echo All Response Tests Completed
echo ============================================

pause