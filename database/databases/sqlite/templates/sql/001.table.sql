-- =====================================================
-- BookQubit Database
-- Schema : {{SCHEMA_NAME}}
-- Table  : {{TABLE_NAME}}
-- Version: 1.0.0
-- =====================================================

CREATE TABLE IF NOT EXISTS {{TABLE_NAME}} (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP

);