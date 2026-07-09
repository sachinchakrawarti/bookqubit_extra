@echo off
echo ========================================
echo  Building Tags Schema
echo ========================================
echo.

set DB_PATH=db\bookqubit_database.db
set SCHEMA_PATH=schema\03_feature\tags_schema\schema_order.sql

echo 📦 Building tags_schema...

REM Delete old database if exists (optional - comment out if you want to keep)
REM del %DB_PATH%

REM Run the schema
sqlite3 %DB_PATH% < %SCHEMA_PATH%

echo.
echo ✅ Tags Schema build complete!
echo.

echo 📊 Verification:
sqlite3 %DB_PATH% "SELECT COUNT(*) AS tags FROM tags;"
sqlite3 %DB_PATH% "SELECT COUNT(*) AS translations FROM tag_translations;"
sqlite3 %DB_PATH% "SELECT COUNT(*) AS book_tags FROM book_tags;"
sqlite3 %DB_PATH% "SELECT COUNT(*) AS hierarchy FROM tag_hierarchy;"

echo.
pause