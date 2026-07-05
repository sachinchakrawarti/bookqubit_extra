# Database Scripts

## Overview
This directory contains all database management scripts for the BookQubit platform. These scripts handle schema creation, data seeding, migrations, backups, and database maintenance.

## Scripts Structure


---

## 🚀 **Quick Start**

### 1. Initialize Database
```bash
# Full initialization (create schema + tables + indexes + views + triggers + seed)
npm run db:init

# Or run scripts sequentially
sqlite3 ../bookqubit_database.db < 01_create_schema.sql
sqlite3 ../bookqubit_database.db < 02_create_tables.sql
sqlite3 ../bookqubit_database.db < 03_create_indexes.sql
sqlite3 ../bookqubit_database.db < 04_create_views.sql
sqlite3 ../bookqubit_database.db < 05_create_triggers.sql
sqlite3 ../bookqubit_database.db < 06_seed_data.sql
sqlite3 ../bookqubit_database.db < 07_verify_database.sql