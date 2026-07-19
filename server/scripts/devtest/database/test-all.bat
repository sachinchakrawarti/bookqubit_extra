@echo off 
echo Running all database tests... 
call test-connect.bat 
call test-seed.bat 
echo All database tests completed! 
pause 
