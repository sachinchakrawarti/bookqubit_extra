# ⚙️ BookQbit Database Engine

<div align="center">
  <p><strong>Version 1.0.0</strong> | A powerful, modular SQLite database engine for BookQbit applications.</p>
  <p>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-20.x-green.svg" alt="Node.js"></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License"></a>
    <a href="https://sqlite.org/"><img src="https://img.shields.io/badge/SQLite-3.x-blue.svg" alt="SQLite"></a>
  </p>
</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [CLI Commands](#cli-commands)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Development](#development)
- [Testing](#testing)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

---

## 📚 Overview

The **BookQbit Database Engine** is a robust, CLI-based database management system built for SQLite. It provides a comprehensive set of tools for schema management, data seeding, backup/restore operations, and database maintenance.

### Key Principles

<div style="padding: 15px; background: rgba(52, 152, 219, 0.1); border-left: 5px solid #3498db; border-radius: 4px; margin: 15px 0;">
  <ul>
    <li>🔒 <strong>Secure</strong> - All dependencies are vetted and secured</li>
    <li>🚀 <strong>Fast</strong> - Optimized for performance</li>
    <li>🧩 <strong>Modular</strong> - Clean separation of concerns</li>
    <li>🎯 <strong>Developer-Friendly</strong> - Intuitive CLI commands</li>
    <li>📦 <strong>Production-Ready</strong> - Battle-tested for deployment</li>
  </ul>
</div>

---

## ✨ Features

### Core Features
* **Schema Management** - Create, validate, and manage database schemas
* **Database Operations** - Build, seed, and maintain databases
* **Backup & Restore** - Full backup and restore capabilities
* **Query Execution** - Execute SQL queries with results
* **Health Monitoring** - Built-in health checks
* **Logging** - Comprehensive logging with Winston
* **Error Handling** - Custom error classes for better debugging

### CLI Commands
* 📊 `build` - Build the database
* 📁 `generate` - Generate schemas
* 🌱 `seed` - Seed database with data
* 💾 `backup` - Backup the database
* ♻️ `restore` - Restore from backup
* ✅ `validate` - Validate schemas
* 🏥 `doctor` - Health check
* 📋 `list` - List all schemas
* 🧹 `clean` - Clean project
* 📊 `info` - Engine information
* 🧪 `test` - Run tests
* 👋 `hello` - Test connection

---

## 🚀 Installation

### Prerequisites

* **Node.js** >= 20.0.0
* **npm** >= 9.0.0
* **SQLite3** (bundled with the engine)

### Step 1: Clone or Download

```bash
git clone [https://github.com/bookqubit/database-engine.git](https://github.com/bookqubit/database-engine.git)
cd database-engine/engine