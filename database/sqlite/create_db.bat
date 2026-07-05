@echo off
title BookQubit Database Creator
color 0A

echo ========================================
echo    BOOKQUBIT DATABASE CREATOR
echo ========================================
echo.

echo [1/5] Checking for sqlite3...
where sqlite3 >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] sqlite3 not found in PATH!
    echo.
    echo Please install sqlite3 from:
    echo https://www.sqlite.org/download.html
    echo.
    echo Or place sqlite3.exe in this folder.
    echo.
    pause
    exit /b 1
)
echo [OK] sqlite3 found!

echo.
echo [2/5] Checking for SQL file...
if not exist "create_database.sql" (
    echo [!] create_database.sql not found!
    echo.
    echo Please make sure create_database.sql exists in this folder.
    echo.
    pause
    exit /b 1
)
echo [OK] create_database.sql found!

echo.
echo [3/5] Dropping existing database if exists...
if exist "bookqubit_database.db" (
    echo [*] Deleting existing database...
    del /q bookqubit_database.db
    del /q bookqubit_database.db-shm 2>nul
    del /q bookqubit_database.db-wal 2>nul
)
echo [OK] Cleanup complete!

echo.
echo [4/5] Creating new database...
sqlite3 bookqubit_database.db < create_database.sql 2>&1

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Database creation failed!
    echo.
    echo Please check create_database.sql for errors.
    echo.
    pause
    exit /b 1
)
echo [OK] Database created successfully!

echo.
echo [5/5] Verifying database...
echo.

echo ========================================
echo    DATABASE STATISTICS
echo ========================================

for /f %%a in ('sqlite3 bookqubit_database.db "SELECT COUNT(*) FROM languages;"') do set LANG_COUNT=%%a
for /f %%a in ('sqlite3 bookqubit_database.db "SELECT COUNT(*) FROM authors;"') do set AUTHOR_COUNT=%%a
for /f %%a in ('sqlite3 bookqubit_database.db "SELECT COUNT(*) FROM author_translations;"') do set TRANS_COUNT=%%a
for /f %%a in ('sqlite3 bookqubit_database.db "SELECT COUNT(*) FROM author_aliases;"') do set ALIAS_COUNT=%%a
for /f %%a in ('sqlite3 bookqubit_database.db "SELECT COUNT(*) FROM author_languages;"') do set LANG_AUTHOR_COUNT=%%a

echo Languages: %LANG_COUNT%
echo Authors: %AUTHOR_COUNT%
echo Author Translations: %TRANS_COUNT%
echo Author Aliases: %ALIAS_COUNT%
echo Author Languages: %LANG_AUTHOR_COUNT%

echo.
echo ========================================
echo    AUTHOR LIST
echo ========================================
sqlite3 bookqubit_database.db "SELECT id, name, nationality, rating FROM authors;"

echo.
echo ========================================
echo    SAMPLE TRANSLATIONS (Hindi)
echo ========================================
sqlite3 bookqubit_database.db "SELECT a.name, at.name as hindi_name, at.nationality FROM authors a JOIN author_translations at ON a.id = at.author_id WHERE at.language_code = 'hindi' LIMIT 3;"

echo.
echo ========================================
echo    DATABASE CREATED SUCCESSFULLY!
echo ========================================
echo.
echo File: bookqubit_database.db
echo Location: %cd%
echo Size: 
dir bookqubit_database.db | find "bookqubit_database.db"
echo.
echo Press any key to view full database...
pause >nul

echo.
echo ========================================
echo    FULL DATABASE INFO
echo ========================================
echo.

echo -- TABLE LIST --
sqlite3 bookqubit_database.db ".tables"

echo.
echo -- SCHEMA --
sqlite3 bookqubit_database.db ".schema"

echo.
echo ========================================
echo    VERIFICATION COMPLETE
echo ========================================
echo.
echo Database is ready for use!
echo.
pause