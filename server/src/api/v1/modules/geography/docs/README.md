# Geography Module - README

## 📋 Table of Contents
- [Geography Module - README](#geography-module---readme)
  - [📋 Table of Contents](#-table-of-contents)
  - [📖 Overview](#-overview)
    - [Key Features](#key-features)
  - [🏗️ Module Structure](#️-module-structure)
  - [🔄 Architecture Flow](#-architecture-flow)
    - [Request Flow Diagram](#request-flow-diagram)
    - [Layer Separation Diagram](#layer-separation-diagram)
    - [Admin vs Public API Flow](#admin-vs-public-api-flow)
    - [Analytics Flow](#analytics-flow)
  - [📡 API Endpoints](#-api-endpoints)
    - [Public API (`/api/v1/geography`)](#public-api-apiv1geography)
    - [Admin API (`/api/v1/admin/geography`)](#admin-api-apiv1admingeography)
  - [💾 Data Flow](#-data-flow)
    - [Create Country Flow](#create-country-flow)
    - [Get Countries Flow](#get-countries-flow)
  - [🚀 Installation](#-installation)
- [Clone the repository](#clone-the-repository)
- [Navigate to server directory](#navigate-to-server-directory)
- [Install dependencies](#install-dependencies)
- [Set up environment variables](#set-up-environment-variables)
- [Run database migrations](#run-database-migrations)
- [Seed the database](#seed-the-database)
- [Start the server](#start-the-server)

---

## 📖 Overview

The Geography Module provides comprehensive management of geographical data including:
- 🌍 **Continents** - Global continent information
- 🏳️ **Countries** - Country details, codes, and metadata
- 🗺️ **States/Provinces** - Regional administrative divisions
- 🏙️ **Cities** - Urban centers with geographic coordinates

### Key Features
- ✅ Full CRUD operations for all entities
- 🔍 Advanced search and filtering
- 📊 Analytics and reporting
- 🗂️ Soft delete and restore functionality
- 🔄 Bulk operations
- 🎯 Real-time validation
- 🚀 High-performance caching ready

---

## 🏗️ Module Structure

geography/
├── config/ # Module configuration
│ └── geography.config.js
├── constants/ # Constants and enums
│ ├── admin.constants.js
│ └── geography.constants.js
├── controllers/ # Request handlers
│ ├── geography.admin.controller.js
│ ├── geography.analytics.controller.js
│ ├── geography.controller.js
│ └── response.js
├── db/ # Database connection
│ └── sequelize.js
├── dto/ # Data Transfer Objects
│ ├── create-geography.dto.js
│ ├── export-geography.dto.js
│ ├── filter-geography.dto.js
│ ├── index.js
│ └── update-geography.dto.js
├── entities/ # Domain entities
│ ├── city.entity.js
│ ├── country.entity.js
│ ├── index.js
│ └── state.entity.js
├── mappers/ # Data mapping layer
│ ├── base.mapper.js
│ ├── city.mapper.js
│ ├── country.mapper.js
│ ├── geography.mapper.js
│ ├── index.js
│ └── state.mapper.js
├── middleware/ # Express middleware
│ └── geography.middleware.js
├── models/ # Database models
│ ├── sequelize/
│ │ ├── city.model.js
│ │ ├── continent.model.js
│ │ ├── country.model.js
│ │ ├── index.js
│ │ └── state.model.js
│ └── geography.model.js
├── queries/ # SQL queries
│ ├── analytics.sql
│ ├── cities.sql
│ ├── city_details.sql
│ ├── continents.sql
│ ├── countries.sql
│ ├── country_details.sql
│ ├── currencies.sql
│ ├── index.js
│ ├── state_details.sql
│ ├── states.sql
│ └── timezones.sql
├── repositories/ # Data access layer
│ ├── geography.admin.repository.js
│ ├── geography.analytics.repository.js
│ └── geography.repository.js
├── routes/ # Route definitions
│ ├── geography.admin.routes.js
│ ├── geography.analytics.routes.js
│ └── geography.routes.js
├── services/ # Business logic
│ ├── geography.admin.service.js
│ ├── geography.analytics.service.js
│ ├── geography.service.js
│ └── logger.js
├── transformers/ # Data transformation
│ ├── geography.transformer.js
│ └── index.js
├── types/ # Type definitions
│ └── geography.types.js
├── validations/ # Validation schemas
│ ├── geography.admin.validation.js
│ ├── geography.analytics.validation.js
│ ├── geography.validation.js
│ └── index.js
└── index.js # Module entry point


---

## 🔄 Architecture Flow

### Request Flow Diagram


┌─────────────────────────────────────────────────────────────────────────┐
│ CLIENT REQUEST │
│ (GET /api/v1/geography/countries) │
└─────────────────────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────────────────┐
│ ROUTES │
│ geography.routes.js │
│ ┌─────────────────────┐ │
│ │ router.get('/countries', getAllCountries) │
│ └─────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────────────────┐
│ MIDDLEWARE │
│ geography.middleware.js │
│ ┌─────────────────────────────────┐ │
│ │ validatePagination │ │
│ │ validateFilters │ │
│ │ validateSearchQuery │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────────────────┐
│ CONTROLLER │
│ geography.controller.js │
│ ┌─────────────────────────────────────────────────┐ │
│ │ async getAllCountries(req, res) { │ │
│ │ const countries = await geographyService │ │
│ │ .getAllCountries(filters); │ │
│ │ return response.success(res, 200, countries);│ │
│ │ } │ │
│ └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────────────────┐
│ SERVICE │
│ geography.service.js │
│ ┌─────────────────────────────────────────────┐ │
│ │ class GeographyService { │ │
│ │ async getAllCountries(filters) { │ │
│ │ const data = await repository │ │
│ │ .getAllCountries(filters); │ │
│ │ return mapper.toResponses(data); │ │
│ │ } │ │
│ │ } │ │
│ └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
│
┌───────────────┴────────────────┐
▼ ▼
┌─────────────────────────────────┐ ┌─────────────────────────────────┐
│ REPOSITORY │ │ MAPPER │
│ geography.repository.js │ │ geography.mapper.js │
│ ┌───────────────────────────┐ │ │ ┌─────────────────────────────┐ │
│ │ async getAllCountries() { │ │ │ │ toResponse(entity) { │ │
│ │ return Country.findAll();│ │ │ │ return { │ │
│ │ } │ │ │ │ id, code, name, ... │ │
│ └───────────────────────────┘ │ │ │ } │ │
└─────────────────────────────────┘ │ └─────────────────────────────┘ │
└─────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────────────────┐
│ DATABASE │
│ SQLite/MySQL │
│ ┌─────────────────────┐ │
│ │ countries table │ │
│ │ states table │ │
│ │ cities table │ │
│ └─────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────────────────┐
│ RESPONSE │
│ { │
│ "success": true, │
│ "data": [...countries], │
│ "timestamp": "2026-07-12T...", │
│ "page": 1, │
│ "total": 100, │
│ "limit": 10 │
│ } │
└─────────────────────────────────────────────────────────────────────────┘

text

### Layer Separation Diagram
┌─────────────────────────────────────────────────────────────────────────┐
│ PRESENTATION LAYER │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
│ │ Routes │→│ Middleware │→│ Controllers │ │
│ └──────────────┘ └──────────────┘ └──────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────────────────┐
│ BUSINESS LAYER │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
│ │ Services │→│ Mappers │→│ DTO/Entities│ │
│ └──────────────┘ └──────────────┘ └──────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────────────────┐
│ DATA LAYER │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
│ │ Repositories │→│ Models │→│ Database │ │
│ └──────────────┘ └──────────────┘ └──────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘

text

### Admin vs Public API Flow
┌─────────────────────────────────────────────────────────────────────────┐
│ API GATEWAY │
│ /api/v1/geography │
└─────────────────────────────────────────────────────────────────────────┘
│
┌───────────────┴────────────────┐
▼ ▼
┌─────────────────────────────────┐ ┌─────────────────────────────────┐
│ PUBLIC API │ │ ADMIN API │
│ /api/v1/geography │ │ /api/v1/admin/geography │
│ │ │ │
│ ┌───────────────────────────┐ │ │ ┌───────────────────────────┐ │
│ │ GET /countries │ │ │ │ GET /countries │ │
│ │ GET /countries/:code │ │ │ │ POST /countries │ │
│ │ GET /states │ │ │ │ PUT /countries/:id │ │
│ │ GET /cities │ │ │ │ DELETE /countries/:id │ │
│ │ GET /continents │ │ │ │ POST /countries/bulk │ │
│ │ GET /search?q=... │ │ │ │ POST /countries/:id/restore│ │
│ └───────────────────────────┘ │ │ └───────────────────────────┘ │
│ │ │ │
│ Access: Public (No Auth) │ │ Access: Admin (Auth Required) │
└─────────────────────────────────┘ └─────────────────────────────────┘

text

### Analytics Flow
┌─────────────────────────────────────────────────────────────────────────┐
│ ANALYTICS REQUEST │
│ GET /api/v1/geography/analytics/dashboard │
└─────────────────────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────────────────┐
│ ANALYTICS ROUTES │
│ geography.analytics.routes.js │
│ router.get('/dashboard', analyticsController.getDashboard) │
└─────────────────────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────────────────┐
│ ANALYTICS CONTROLLER │
│ geography.analytics.controller.js │
│ async getDashboardStats(req, res) { │
│ const stats = await analyticsService.getDashboardStats(); │
│ return response.success(res, 200, stats); │
│ } │
└─────────────────────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────────────────┐
│ ANALYTICS SERVICE │
│ geography.analytics.service.js │
│ async getDashboardStats() { │
│ const countryStats = await analyticsRepo │
│ .getCountryStatistics(); │
│ const stateStats = await analyticsRepo │
│ .getStateStatistics(); │
│ const cityStats = await analyticsRepo │
│ .getCityStatistics(); │
│ return { countryStats, stateStats, cityStats }; │
│ } │
└─────────────────────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────────────────┐
│ ANALYTICS REPOSITORY │
│ geography.analytics.repository.js │
│ async getCountryStatistics() { │
│ const [total, active, inactive, byContinent] = await │
│ Promise.all([ │
│ Country.count(), │
│ Country.count({ where: { is_active: 1 } }), │
│ Country.count({ where: { is_active: 0 } }), │
│ Country.findAll({ attributes: [ │
│ [Sequelize.col('continent.name'), 'continent'], │
│ [Sequelize.fn('COUNT', '*'), 'count'] │
│ ], group: ['continent.id'] }) │
│ ]); │
│ return { total, active, inactive, byContinent }; │
│ } │
└─────────────────────────────────────────────────────────────────────────┘


---

## 📡 API Endpoints

### Public API (`/api/v1/geography`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/countries` | Get all countries |
| `GET` | `/countries/:code` | Get country by code |
| `GET` | `/countries/:code/states` | Get states by country |
| `GET` | `/states` | Get all states |
| `GET` | `/states/:id` | Get state by ID |
| `GET` | `/states/:id/cities` | Get cities by state |
| `GET` | `/cities` | Get all cities |
| `GET` | `/cities/:id` | Get city by ID |
| `GET` | `/continents` | Get all continents |
| `GET` | `/search` | Search across all entities |
| `GET` | `/analytics/dashboard` | Get dashboard analytics |

### Admin API (`/api/v1/admin/geography`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/countries` | Get all countries (admin) |
| `POST` | `/countries` | Create country |
| `PUT` | `/countries/:id` | Update country |
| `DELETE` | `/countries/:id` | Soft delete country |
| `DELETE` | `/countries/:id/hard` | Hard delete country |
| `POST` | `/countries/:id/restore` | Restore country |
| `POST` | `/countries/bulk` | Bulk create countries |
| `POST` | `/countries/bulk/delete` | Bulk delete countries |
| `GET` | `/countries/deleted` | Get deleted countries |
| `GET` | `/stats` | Get admin statistics |
| `GET` | `/dashboard` | Get admin dashboard |

---

## 💾 Data Flow

### Create Country Flow

Client sends POST request with country data
│
▼

Route validates (geography.admin.routes.js)
│
▼

Middleware validates request (geography.middleware.js)
│
▼

Controller receives request (geography.admin.controller.js)
│
▼

Service processes request (geography.admin.service.js)
├── Validate data
├── Check for duplicates
└── Create country
│
▼

Repository saves data (geography.admin.repository.js)
├── Map DTO to Model
└── Save to database
│
▼

Mapper transforms data (country.mapper.js)
├── Model → DTO
└── DTO → Response
│
▼

Response sent to client



### Get Countries Flow


Client sends GET request
│
▼

Route matches (geography.routes.js)
│
▼

Middleware validates (geography.middleware.js)
├── Pagination validation
├── Filter validation
└── Search validation
│
▼

Controller processes (geography.controller.js)
│
▼

Service executes (geography.service.js)
│
▼

Repository queries (geography.repository.js)
├── Apply filters
├── Apply pagination
├── Apply sorting
└── Query database
│
▼

Mapper transforms (country.mapper.js)
├── Model → DTO
└── DTO → Response
│
▼

Response sent to client


---

## 🚀 Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to server directory
cd server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run database migrations
npm run db:migrate

# Seed the database
npm run db:seed

# Start the server
npm run dev