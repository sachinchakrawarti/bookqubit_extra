@echo off 
echo Running all middleware tests... 
call test-cors.bat 
call test-compression.bat 
call test-rate-limit.bat 
call test-request-logger.bat 
echo All middleware tests completed! 
pause 
