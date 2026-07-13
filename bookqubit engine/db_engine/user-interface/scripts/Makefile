# ==========================================
#  BookQbit Database Engine - Makefile
#  Version: 1.0.0
# ==========================================

# Colors for output
GREEN  := \033[0;32m
YELLOW := \033[0;33m
CYAN   := \033[0;36m
RED    := \033[0;31m
NC     := \033[0m # No Color

# Default target
.PHONY: help
help:
	@echo ""
	@echo "$(CYAN)==========================================$(NC)"
	@echo "$(CYAN) BookQbit Database Engine - Commands$(NC)"
	@echo "$(CYAN)==========================================$(NC)"
	@echo ""
	@echo "$(YELLOW)Setup & Installation:$(NC)"
	@echo "  $(GREEN)make setup$(NC)           - Full setup (install deps + setup)"
	@echo "  $(GREEN)make install$(NC)         - Install dependencies"
	@echo "  $(GREEN)make setup-only$(NC)      - Run setup script only"
	@echo ""
	@echo "$(YELLOW)Database Operations:$(NC)"
	@echo "  $(GREEN)make build$(NC)           - Build database (all schemas)"
	@echo "  $(GREEN)make build-dev$(NC)       - Build development database"
	@echo "  $(GREEN)make build-prod$(NC)      - Build production database"
	@echo "  $(GREEN)make generate$(NC)        - Generate all schemas"
	@echo "  $(GREEN)make seed$(NC)            - Seed database (all schemas)"
	@echo "  $(GREEN)make seed-dev$(NC)        - Seed development data"
	@echo ""
	@echo "$(YELLOW)Backup & Restore:$(NC)"
	@echo "  $(GREEN)make backup$(NC)          - Create database backup"
	@echo "  $(GREEN)make backup-auto$(NC)     - Create auto-named backup"
	@echo "  $(GREEN)make restore$(NC)         - Restore latest backup"
	@echo ""
	@echo "$(YELLOW)Validation & Health:$(NC)"
	@echo "  $(GREEN)make validate$(NC)        - Validate all schemas"
	@echo "  $(GREEN)make doctor$(NC)          - Run health check"
	@echo "  $(GREEN)make doctor-fix$(NC)      - Health check and fix"
	@echo ""
	@echo "$(YELLOW)Development:$(NC)"
	@echo "  $(GREEN)make test$(NC)            - Run all tests"
	@echo "  $(GREEN)make test-unit$(NC)       - Run unit tests"
	@echo "  $(GREEN)make test-integration$(NC)- Run integration tests"
	@echo "  $(GREEN)make test-coverage$(NC)   - Run tests with coverage"
	@echo "  $(GREEN)make lint$(NC)            - Lint code"
	@echo "  $(GREEN)make lint-fix$(NC)        - Lint and fix"
	@echo "  $(GREEN)make format$(NC)          - Format code"
	@echo ""
	@echo "$(YELLOW)Maintenance:$(NC)"
	@echo "  $(GREEN)make clean$(NC)           - Clean project"
	@echo "  $(GREEN)make clean-all$(NC)       - Clean everything"
	@echo "  $(GREEN)make reset$(NC)           - Reset project"
	@echo "  $(GREEN)make audit$(NC)           - Check vulnerabilities"
	@echo "  $(GREEN)make audit-fix$(NC)       - Fix vulnerabilities"
	@echo "  $(GREEN)make outdated$(NC)        - Check outdated packages"
	@echo ""
	@echo "$(YELLOW)Quick Commands:$(NC)"
	@echo "  $(GREEN)make all$(NC)             - Full setup + build + seed"
	@echo "  $(GREEN)make quick$(NC)           - Quick build and seed"
	@echo "  $(GREEN)make info$(NC)            - Show engine info"
	@echo "  $(GREEN)make list$(NC)            - List all schemas"
	@echo ""

# ==========================================
#  Setup & Installation
# ==========================================

.PHONY: setup
setup: install setup-only
	@echo "$(GREEN)✅ Setup completed!$(NC)"

.PHONY: install
install:
	@echo "$(CYAN)📦 Installing dependencies...$(NC)"
	npm install
	@echo "$(GREEN)✅ Dependencies installed$(NC)"

.PHONY: setup-only
setup-only:
	@echo "$(CYAN)⚙️  Running setup script...$(NC)"
	node setup.js
	@echo "$(GREEN)✅ Setup script completed$(NC)"

# ==========================================
#  Database Operations
# ==========================================

.PHONY: build
build:
	@echo "$(CYAN)🔨 Building database (all schemas)...$(NC)"
	node cli.js build --all
	@echo "$(GREEN)✅ Database built$(NC)"

.PHONY: build-dev
build-dev:
	@echo "$(CYAN)🔨 Building development database...$(NC)"
	node cli.js build --env development
	@echo "$(GREEN)✅ Development database built$(NC)"

.PHONY: build-prod
build-prod:
	@echo "$(CYAN)🔨 Building production database...$(NC)"
	node cli.js build --env production
	@echo "$(GREEN)✅ Production database built$(NC)"

.PHONY: generate
generate:
	@echo "$(CYAN)📁 Generating all schemas...$(NC)"
	node cli.js generate --all
	@echo "$(GREEN)✅ Schemas generated$(NC)"

.PHONY: seed
seed:
	@echo "$(CYAN)🌱 Seeding database (all schemas)...$(NC)"
	node cli.js seed --all
	@echo "$(GREEN)✅ Database seeded$(NC)"

.PHONY: seed-dev
seed-dev:
	@echo "$(CYAN)🌱 Seeding development data...$(NC)"
	node cli.js seed --all --env dev
	@echo "$(GREEN)✅ Development data seeded$(NC)"

# ==========================================
#  Backup & Restore
# ==========================================

.PHONY: backup
backup:
	@echo "$(CYAN)💾 Creating backup...$(NC)"
	node cli.js backup
	@echo "$(GREEN)✅ Backup created$(NC)"

.PHONY: backup-auto
backup-auto:
	@echo "$(CYAN)💾 Creating auto-named backup...$(NC)"
	node cli.js backup --name "auto-backup-$$(date +%Y%m%d-%H%M%S)"
	@echo "$(GREEN)✅ Auto-backup created$(NC)"

.PHONY: restore
restore:
	@echo "$(CYAN)♻️  Restoring latest backup...$(NC)"
	node cli.js restore --latest
	@echo "$(GREEN)✅ Database restored$(NC)"

# ==========================================
#  Validation & Health
# ==========================================

.PHONY: validate
validate:
	@echo "$(CYAN)✅ Validating all schemas...$(NC)"
	node cli.js validate --all
	@echo "$(GREEN)✅ Validation complete$(NC)"

.PHONY: doctor
doctor:
	@echo "$(CYAN)🏥 Running health check...$(NC)"
	node cli.js doctor
	@echo "$(GREEN)✅ Health check complete$(NC)"

.PHONY: doctor-fix
doctor-fix:
	@echo "$(CYAN)🏥 Running health check with fixes...$(NC)"
	node cli.js doctor --fix
	@echo "$(GREEN)✅ Health check and fixes complete$(NC)"

# ==========================================
#  Development
# ==========================================

.PHONY: test
test:
	@echo "$(CYAN)🧪 Running all tests...$(NC)"
	npm test
	@echo "$(GREEN)✅ Tests complete$(NC)"

.PHONY: test-unit
test-unit:
	@echo "$(CYAN)🧪 Running unit tests...$(NC)"
	npm test -- tests/unit
	@echo "$(GREEN)✅ Unit tests complete$(NC)"

.PHONY: test-integration
test-integration:
	@echo "$(CYAN)🧪 Running integration tests...$(NC)"
	npm test -- tests/integration
	@echo "$(GREEN)✅ Integration tests complete$(NC)"

.PHONY: test-coverage
test-coverage:
	@echo "$(CYAN)📊 Running tests with coverage...$(NC)"
	npm test -- --coverage
	@echo "$(GREEN)✅ Coverage report generated$(NC)"

.PHONY: lint
lint:
	@echo "$(CYAN)🔍 Linting code...$(NC)"
	npm run lint
	@echo "$(GREEN)✅ Linting complete$(NC)"

.PHONY: lint-fix
lint-fix:
	@echo "$(CYAN)🔍 Linting and fixing code...$(NC)"
	npm run lint:fix
	@echo "$(GREEN)✅ Linting and fixes complete$(NC)"

.PHONY: format
format:
	@echo "$(CYAN)🎨 Formatting code...$(NC)"
	npm run format
	@echo "$(GREEN)✅ Code formatted$(NC)"

# ==========================================
#  Maintenance
# ==========================================

.PHONY: clean
clean:
	@echo "$(CYAN)🧹 Cleaning project...$(NC)"
	node cli.js clean
	@echo "$(GREEN)✅ Project cleaned$(NC)"

.PHONY: clean-all
clean-all:
	@echo "$(CYAN)🧹 Cleaning everything...$(NC)"
	node cli.js clean --all
	rm -rf node_modules
	rm -f package-lock.json
	rm -rf logs/*.log
	rm -rf coverage
	rm -rf .nyc_output
	@echo "$(GREEN)✅ Everything cleaned$(NC)"

.PHONY: reset
reset: clean-all setup
	@echo "$(GREEN)✅ Project reset complete$(NC)"

.PHONY: audit
audit:
	@echo "$(CYAN)🔒 Checking vulnerabilities...$(NC)"
	npm audit
	@echo "$(GREEN)✅ Audit complete$(NC)"

.PHONY: audit-fix
audit-fix:
	@echo "$(CYAN)🔒 Fixing vulnerabilities...$(NC)"
	npm audit fix
	@echo "$(GREEN)✅ Vulnerabilities fixed$(NC)"

.PHONY: outdated
outdated:
	@echo "$(CYAN)📦 Checking outdated packages...$(NC)"
	npm outdated
	@echo "$(GREEN)✅ Check complete$(NC)"

# ==========================================
#  Quick Commands
# ==========================================

.PHONY: all
all: setup build generate seed
	@echo "$(GREEN)🎉 Full setup complete!$(NC)"
	@echo "$(CYAN)📊 Engine is ready to use$(NC)"

.PHONY: quick
quick: build seed
	@echo "$(GREEN)✅ Quick build and seed complete!$(NC)"

.PHONY: info
info:
	@echo "$(CYAN)📊 Engine Information:$(NC)"
	node cli.js info

.PHONY: list
list:
	@echo "$(CYAN)📋 Listing all schemas:$(NC)"
	node cli.js list --details

# ==========================================
#  Development Server
# ==========================================

.PHONY: dev
dev:
	@echo "$(CYAN)🚀 Starting development mode...$(NC)"
	@echo "$(YELLOW)Press Ctrl+C to stop$(NC)"
	nodemon --watch . --ext js,json --exec "node cli.js build --env dev"

.PHONY: watch
watch:
	@echo "$(CYAN)👀 Watching for changes...$(NC)"
	@echo "$(YELLOW)Press Ctrl+C to stop$(NC)"
	nodemon --watch adapters --watch commands --watch core --watch utils --ext js --exec "node cli.js test"

# ==========================================
#  Docker Commands (Optional)
# ==========================================

.PHONY: docker-build
docker-build:
	@echo "$(CYAN)🐳 Building Docker image...$(NC)"
	docker build -t bookqubit-engine .

.PHONY: docker-run
docker-run:
	@echo "$(CYAN)🐳 Running Docker container...$(NC)"
	docker run -it --rm -p 3000:3000 bookqubit-engine

# ==========================================
#  Help
# ==========================================

.PHONY: help-all
help-all: help
	@echo "$(YELLOW)Advanced Commands:$(NC)"
	@echo "  $(GREEN)make dev$(NC)              - Start development mode"
	@echo "  $(GREEN)make watch$(NC)            - Watch for changes"
	@echo "  $(GREEN)make docker-build$(NC)     - Build Docker image"
	@echo "  $(GREEN)make docker-run$(NC)       - Run Docker container"
	@echo ""