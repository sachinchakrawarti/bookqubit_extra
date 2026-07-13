# ==========================================
#  BookQbit Database Engine - PowerShell Build Script
#  Version: 1.0.0
#  Location: engine/powershell/make.ps1
# ==========================================

param(
    [string]$Command = "help"
)

# Colors
$Green = "Green"
$Yellow = "Yellow"
$Cyan = "Cyan"
$Red = "Red"
$Magenta = "Magenta"

function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

function Show-Header {
    Clear-Host
    Write-ColorOutput "" $Cyan
    Write-ColorOutput "╔══════════════════════════════════════════════════════════╗" $Cyan
    Write-ColorOutput "║     📚 BookQbit Database Engine - Build System           ║" $Cyan
    Write-ColorOutput "║     Version: 1.0.0                                      ║" $Cyan
    Write-ColorOutput "╚══════════════════════════════════════════════════════════╝" $Cyan
    Write-ColorOutput "" $Cyan
}

function Show-Help {
    Show-Header
    
    Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
    Write-ColorOutput "  📋 AVAILABLE COMMANDS" $Magenta
    Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
    Write-ColorOutput "" $Cyan
    
    Write-ColorOutput "  ════════════════════════════════════════════════════════" $Yellow
    Write-ColorOutput "  🔧 SETUP & INSTALLATION" $Yellow
    Write-ColorOutput "  ════════════════════════════════════════════════════════" $Yellow
    Write-ColorOutput "    .\make.ps1 setup           - Full setup (install + config)" $Green
    Write-ColorOutput "    .\make.ps1 install         - Install dependencies only" $Green
    Write-ColorOutput "    .\make.ps1 setup-only      - Run setup script only" $Green
    Write-ColorOutput "    .\make.ps1 update          - Update dependencies" $Green
    Write-ColorOutput ""
    
    Write-ColorOutput "  ════════════════════════════════════════════════════════" $Yellow
    Write-ColorOutput "  🗄️  DATABASE OPERATIONS" $Yellow
    Write-ColorOutput "  ════════════════════════════════════════════════════════" $Yellow
    Write-ColorOutput "    .\make.ps1 build           - Build database (all schemas)" $Green
    Write-ColorOutput "    .\make.ps1 build-dev       - Build development database" $Green
    Write-ColorOutput "    .\make.ps1 build-prod      - Build production database" $Green
    Write-ColorOutput "    .\make.ps1 generate        - Generate all schemas" $Green
    Write-ColorOutput "    .\make.ps1 generate-schema - Generate specific schema" $Green
    Write-ColorOutput "    .\make.ps1 seed            - Seed database (all schemas)" $Green
    Write-ColorOutput "    .\make.ps1 seed-dev        - Seed development data" $Green
    Write-ColorOutput ""
    
    Write-ColorOutput "  ════════════════════════════════════════════════════════" $Yellow
    Write-ColorOutput "  💾 BACKUP & RESTORE" $Yellow
    Write-ColorOutput "  ════════════════════════════════════════════════════════" $Yellow
    Write-ColorOutput "    .\make.ps1 backup          - Create database backup" $Green
    Write-ColorOutput "    .\make.ps1 backup-auto     - Create auto-named backup" $Green
    Write-ColorOutput "    .\make.ps1 restore         - Restore latest backup" $Green
    Write-ColorOutput "    .\make.ps1 restore-file    - Restore specific backup file" $Green
    Write-ColorOutput ""
    
    Write-ColorOutput "  ════════════════════════════════════════════════════════" $Yellow
    Write-ColorOutput "  ✅ VALIDATION & HEALTH" $Yellow
    Write-ColorOutput "  ════════════════════════════════════════════════════════" $Yellow
    Write-ColorOutput "    .\make.ps1 validate        - Validate all schemas" $Green
    Write-ColorOutput "    .\make.ps1 validate-schema - Validate specific schema" $Green
    Write-ColorOutput "    .\make.ps1 doctor          - Run health check" $Green
    Write-ColorOutput "    .\make.ps1 doctor-fix      - Health check and fix issues" $Green
    Write-ColorOutput ""
    
    Write-ColorOutput "  ════════════════════════════════════════════════════════" $Yellow
    Write-ColorOutput "  💻 DEVELOPMENT" $Yellow
    Write-ColorOutput "  ════════════════════════════════════════════════════════" $Yellow
    Write-ColorOutput "    .\make.ps1 test            - Run all tests" $Green
    Write-ColorOutput "    .\make.ps1 test-unit       - Run unit tests" $Green
    Write-ColorOutput "    .\make.ps1 test-integration- Run integration tests" $Green
    Write-ColorOutput "    .\make.ps1 test-coverage   - Run tests with coverage" $Green
    Write-ColorOutput "    .\make.ps1 lint            - Lint code" $Green
    Write-ColorOutput "    .\make.ps1 lint-fix        - Lint and fix issues" $Green
    Write-ColorOutput "    .\make.ps1 format          - Format code" $Green
    Write-ColorOutput "    .\make.ps1 watch           - Watch for changes" $Green
    Write-ColorOutput ""
    
    Write-ColorOutput "  ════════════════════════════════════════════════════════" $Yellow
    Write-ColorOutput "  🧹 MAINTENANCE" $Yellow
    Write-ColorOutput "  ════════════════════════════════════════════════════════" $Yellow
    Write-ColorOutput "    .\make.ps1 clean           - Clean project" $Green
    Write-ColorOutput "    .\make.ps1 clean-all       - Clean everything" $Green
    Write-ColorOutput "    .\make.ps1 reset           - Reset project" $Green
    Write-ColorOutput "    .\make.ps1 audit           - Check vulnerabilities" $Green
    Write-ColorOutput "    .\make.ps1 audit-fix       - Fix vulnerabilities" $Green
    Write-ColorOutput "    .\make.ps1 outdated        - Check outdated packages" $Green
    Write-ColorOutput ""
    
    Write-ColorOutput "  ════════════════════════════════════════════════════════" $Yellow
    Write-ColorOutput "  ⚡ QUICK COMMANDS" $Yellow
    Write-ColorOutput "  ════════════════════════════════════════════════════════" $Yellow
    Write-ColorOutput "    .\make.ps1 all             - Full setup + build + seed" $Green
    Write-ColorOutput "    .\make.ps1 quick           - Quick build and seed" $Green
    Write-ColorOutput "    .\make.ps1 info            - Show engine info" $Green
    Write-ColorOutput "    .\make.ps1 list            - List all schemas" $Green
    Write-ColorOutput "    .\make.ps1 status          - Show engine status" $Green
    Write-ColorOutput "    .\make.ps1 version         - Show version" $Green
    Write-ColorOutput ""
    
    Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
    Write-ColorOutput "  💡 Example: .\make.ps1 setup" $Magenta
    Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
    Write-ColorOutput "" $Cyan
}

function Run-Command {
    param(
        [string]$Cmd,
        [string]$Description = ""
    )
    
    if ($Description) {
        Write-ColorOutput "  ⏳ $Description..." $Yellow
    }
    
    Write-ColorOutput "  ▶ $Cmd" $Cyan
    Invoke-Expression $Cmd
    
    if ($LASTEXITCODE -ne 0) {
        Write-ColorOutput "  ❌ Command failed with exit code: $LASTEXITCODE" $Red
        exit 1
    }
    
    Write-ColorOutput "  ✅ Done" $Green
    Write-ColorOutput "" $Cyan
}

function Check-Node {
    try {
        $nodeVersion = node --version 2>$null
        if (-not $nodeVersion) {
            Write-ColorOutput "❌ Node.js is not installed!" $Red
            Write-ColorOutput "Please install Node.js from https://nodejs.org/" $Yellow
            exit 1
        }
        Write-ColorOutput "✅ Node.js version: $nodeVersion" $Green
        return $true
    } catch {
        Write-ColorOutput "❌ Node.js is not installed!" $Red
        Write-ColorOutput "Please install Node.js from https://nodejs.org/" $Yellow
        exit 1
    }
}

function Check-Engine {
    if (-not (Test-Path "package.json")) {
        Write-ColorOutput "❌ package.json not found!" $Red
        Write-ColorOutput "Please run this script from the engine directory." $Yellow
        exit 1
    }
}

# ==========================================
#  MAIN COMMAND HANDLER
# ==========================================

# Check if we're in the right directory
Check-Engine

# Main command switch
switch ($Command) {
    "help" { Show-Help }
    
    # ==========================================
    #  Setup & Installation
    # ==========================================
    
    "setup" {
        Show-Header
        Write-ColorOutput "🚀 Running full setup..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "npm install" "Installing dependencies"
        Run-Command "node setup.js" "Running setup script"
        
        Write-ColorOutput "🎉 Setup completed successfully!" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "install" {
        Show-Header
        Write-ColorOutput "📦 Installing dependencies..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "npm install" "Installing dependencies"
        
        Write-ColorOutput "✅ Dependencies installed" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "update" {
        Show-Header
        Write-ColorOutput "🔄 Updating dependencies..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "npm update" "Updating dependencies"
        
        Write-ColorOutput "✅ Dependencies updated" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "setup-only" {
        Show-Header
        Write-ColorOutput "⚙️  Running setup script..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "node setup.js" "Running setup"
        
        Write-ColorOutput "✅ Setup completed" $Green
        Write-ColorOutput "" $Cyan
    }
    
    # ==========================================
    #  Database Operations
    # ==========================================
    
    "build" {
        Show-Header
        Write-ColorOutput "🔨 Building database..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "node cli.js build --all" "Building database"
        
        Write-ColorOutput "✅ Database built" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "build-dev" {
        Show-Header
        Write-ColorOutput "🔨 Building development database..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "node cli.js build --env development" "Building development database"
        
        Write-ColorOutput "✅ Development database built" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "build-prod" {
        Show-Header
        Write-ColorOutput "🔨 Building production database..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "node cli.js build --env production" "Building production database"
        
        Write-ColorOutput "✅ Production database built" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "generate" {
        Show-Header
        Write-ColorOutput "📁 Generating schemas..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "node cli.js generate --all" "Generating schemas"
        
        Write-ColorOutput "✅ Schemas generated" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "generate-schema" {
        param($SchemaName)
        
        Show-Header
        Write-ColorOutput "📁 Generating schema: $SchemaName" $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "node cli.js generate --schema $SchemaName" "Generating schema"
        
        Write-ColorOutput "✅ Schema generated" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "seed" {
        Show-Header
        Write-ColorOutput "🌱 Seeding database..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "node cli.js seed --all" "Seeding database"
        
        Write-ColorOutput "✅ Database seeded" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "seed-dev" {
        Show-Header
        Write-ColorOutput "🌱 Seeding development database..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "node cli.js seed --all --env dev" "Seeding development data"
        
        Write-ColorOutput "✅ Development data seeded" $Green
        Write-ColorOutput "" $Cyan
    }
    
    # ==========================================
    #  Backup & Restore
    # ==========================================
    
    "backup" {
        Show-Header
        Write-ColorOutput "💾 Creating backup..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "node cli.js backup" "Creating backup"
        
        Write-ColorOutput "✅ Backup created" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "backup-auto" {
        Show-Header
        Write-ColorOutput "💾 Creating auto-named backup..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
        Check-Node
        Run-Command "node cli.js backup --name auto-backup-$timestamp" "Creating backup"
        
        Write-ColorOutput "✅ Auto-backup created" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "restore" {
        Show-Header
        Write-ColorOutput "♻️  Restoring latest backup..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "node cli.js restore --latest" "Restoring database"
        
        Write-ColorOutput "✅ Database restored" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "restore-file" {
        param($FileName)
        
        Show-Header
        Write-ColorOutput "♻️  Restoring backup: $FileName" $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "node cli.js restore --file $FileName" "Restoring database"
        
        Write-ColorOutput "✅ Database restored" $Green
        Write-ColorOutput "" $Cyan
    }
    
    # ==========================================
    #  Validation & Health
    # ==========================================
    
    "validate" {
        Show-Header
        Write-ColorOutput "✅ Validating schemas..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "node cli.js validate --all" "Validating schemas"
        
        Write-ColorOutput "✅ Validation complete" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "validate-schema" {
        param($SchemaName)
        
        Show-Header
        Write-ColorOutput "✅ Validating schema: $SchemaName" $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "node cli.js validate --schema $SchemaName" "Validating schema"
        
        Write-ColorOutput "✅ Validation complete" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "doctor" {
        Show-Header
        Write-ColorOutput "🏥 Running health check..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "node cli.js doctor" "Health check"
        
        Write-ColorOutput "✅ Health check complete" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "doctor-fix" {
        Show-Header
        Write-ColorOutput "🏥 Running health check with fixes..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "node cli.js doctor --fix" "Health check and fixes"
        
        Write-ColorOutput "✅ Health check complete" $Green
        Write-ColorOutput "" $Cyan
    }
    
    # ==========================================
    #  Development
    # ==========================================
    
    "test" {
        Show-Header
        Write-ColorOutput "🧪 Running tests..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "npm test" "Running tests"
        
        Write-ColorOutput "✅ Tests complete" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "test-unit" {
        Show-Header
        Write-ColorOutput "🧪 Running unit tests..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "npm test -- tests/unit" "Running unit tests"
        
        Write-ColorOutput "✅ Unit tests complete" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "test-integration" {
        Show-Header
        Write-ColorOutput "🧪 Running integration tests..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "npm test -- tests/integration" "Running integration tests"
        
        Write-ColorOutput "✅ Integration tests complete" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "test-coverage" {
        Show-Header
        Write-ColorOutput "📊 Running tests with coverage..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "npm test -- --coverage" "Running coverage tests"
        
        Write-ColorOutput "✅ Coverage tests complete" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "lint" {
        Show-Header
        Write-ColorOutput "🔍 Linting code..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "npm run lint" "Linting code"
        
        Write-ColorOutput "✅ Linting complete" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "lint-fix" {
        Show-Header
        Write-ColorOutput "🔍 Linting and fixing code..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "npm run lint:fix" "Linting and fixing"
        
        Write-ColorOutput "✅ Linting and fixes complete" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "format" {
        Show-Header
        Write-ColorOutput "🎨 Formatting code..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "npm run format" "Formatting code"
        
        Write-ColorOutput "✅ Code formatted" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "watch" {
        Show-Header
        Write-ColorOutput "👀 Watching for changes..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        Write-ColorOutput "  Press Ctrl+C to stop" $Yellow
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "nodemon --watch . --ext js,json --exec 'node cli.js test'" "Watching for changes"
    }
    
    # ==========================================
    #  Maintenance
    # ==========================================
    
    "clean" {
        Show-Header
        Write-ColorOutput "🧹 Cleaning project..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "node cli.js clean" "Cleaning project"
        
        Write-ColorOutput "✅ Project cleaned" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "clean-all" {
        Show-Header
        Write-ColorOutput "🧹 Cleaning everything..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "node cli.js clean --all" "Cleaning everything"
        
        if (Test-Path "node_modules") {
            Write-ColorOutput "  Removing node_modules..." $Yellow
            Remove-Item -Recurse -Force "node_modules" -ErrorAction SilentlyContinue
        }
        
        if (Test-Path "package-lock.json") {
            Write-ColorOutput "  Removing package-lock.json..." $Yellow
            Remove-Item "package-lock.json" -ErrorAction SilentlyContinue
        }
        
        if (Test-Path "logs") {
            Write-ColorOutput "  Cleaning logs..." $Yellow
            Remove-Item -Recurse -Force "logs\*.log" -ErrorAction SilentlyContinue
        }
        
        Write-ColorOutput "✅ Everything cleaned" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "reset" {
        Show-Header
        Write-ColorOutput "🔄 Resetting project..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        .\make.ps1 clean-all
        .\make.ps1 setup
        
        Write-ColorOutput "✅ Project reset complete" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "audit" {
        Show-Header
        Write-ColorOutput "🔒 Checking vulnerabilities..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "npm audit" "Auditing dependencies"
        
        Write-ColorOutput "✅ Audit complete" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "audit-fix" {
        Show-Header
        Write-ColorOutput "🔒 Fixing vulnerabilities..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "npm audit fix" "Fixing vulnerabilities"
        
        Write-ColorOutput "✅ Vulnerabilities fixed" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "outdated" {
        Show-Header
        Write-ColorOutput "📦 Checking outdated packages..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "npm outdated" "Checking outdated packages"
        
        Write-ColorOutput "✅ Check complete" $Green
        Write-ColorOutput "" $Cyan
    }
    
    # ==========================================
    #  Quick Commands
    # ==========================================
    
    "all" {
        Show-Header
        Write-ColorOutput "🚀 Full setup..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        .\make.ps1 setup
        .\make.ps1 build
        .\make.ps1 generate
        .\make.ps1 seed
        
        Write-ColorOutput "🎉 Full setup complete!" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "quick" {
        Show-Header
        Write-ColorOutput "⚡ Quick build and seed..." $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        .\make.ps1 build
        .\make.ps1 seed
        
        Write-ColorOutput "✅ Quick build and seed complete!" $Green
        Write-ColorOutput "" $Cyan
    }
    
    "info" {
        Show-Header
        Write-ColorOutput "📊 Engine Information:" $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "node cli.js info"
        
        Write-ColorOutput "" $Cyan
    }
    
    "list" {
        Show-Header
        Write-ColorOutput "📋 Listing schemas:" $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        Run-Command "node cli.js list --details"
        
        Write-ColorOutput "" $Cyan
    }
    
    "status" {
        Show-Header
        Write-ColorOutput "📊 Engine Status:" $Magenta
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $Magenta
        Write-ColorOutput "" $Cyan
        
        Check-Node
        
        # Check if node_modules exists
        if (Test-Path "node_modules") {
            Write-ColorOutput "  ✅ Dependencies: Installed" $Green
        } else {
            Write-ColorOutput "  ❌ Dependencies: Not installed" $Red
        }
        
        # Check if package.json exists
        if (Test-Path "package.json") {
            Write-ColorOutput "  ✅ Package.json: Found" $Green
        } else {
            Write-ColorOutput "  ❌ Package.json: Missing" $Red
        }
        
        # Check if logs directory exists
        if (Test-Path "logs") {
            Write-ColorOutput "  ✅ Logs directory: Found" $Green
        } else {
            Write-ColorOutput "  ⚠️  Logs directory: Missing" $Yellow
        }
        
        # Check if database exists
        $dbPath = "..\database\bookqubit.db"
        if (Test-Path $dbPath) {
            $size = (Get-Item $dbPath).Length
            $sizeMB = [math]::Round($size / 1MB, 2)
            Write-ColorOutput "  ✅ Database: Found ($sizeMB MB)" $Green
        } else {
            Write-ColorOutput "  ⚠️  Database: Not found" $Yellow
        }
        
        Write-ColorOutput "" $Cyan
        
        # Show version
        Write-ColorOutput "  Version: 1.0.0" $Cyan
        Write-ColorOutput "  Node: $(node --version)" $Cyan
        Write-ColorOutput "  Platform: $env:OS" $Cyan
        
        Write-ColorOutput "" $Cyan
    }
    
    "version" {
        Write-ColorOutput "BookQbit Database Engine v1.0.0" $Green
        Write-ColorOutput "Node.js: $(node --version)" $Cyan
    }
    
    default {
        Show-Header
        Write-ColorOutput "❌ Unknown command: $Command" $Red
        Write-ColorOutput "" $Cyan
        Write-ColorOutput "Run '.\make.ps1 help' for available commands" $Yellow
        Write-ColorOutput "" $Cyan
        exit 1
    }
}