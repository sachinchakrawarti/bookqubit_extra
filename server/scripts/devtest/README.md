# DevTest Directory 
 
This directory contains test scripts for various components of the application. 
 
## Directory Structure 
 
- **middleware/** - Tests for middleware components (CORS, compression, rate limiting, request logger) 
- **response/** - Tests for response handlers (success, error, pagination) 
- **database/** - Tests for database operations (connection, seeding) 
- **api/** - Tests for API endpoints (health check) 
- **logger/** - Tests for logging functionality 
 
## Usage 
 
Run individual test files or use `all.bat` to run all tests. 
 
## Test Files 
 
Each directory contains: 
- Individual test scripts for specific functionality 
- `test-all.bat` to run all tests in that category 
- The root `all.bat` runs all tests across all categories 
