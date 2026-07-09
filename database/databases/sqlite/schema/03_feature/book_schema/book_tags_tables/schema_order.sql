-- ==========================================================
-- BookQubit Database
-- Schema Order
-- Module : Book Tags
-- Version : 1.0.0
-- ==========================================================
--
-- Execute files in the following order.
--
-- ==========================================================

-- 01. Main Table
.read book_tags.sql

-- 02. Translation Table
.read book_tags_translations.sql

-- 03. Indexes
.read book_tags.index.sql
.read book_tags_translations.index.sql

-- 04. Views
.read book_tags.view.sql

-- 05. Triggers
.read book_tags.trigger.sql

-- 06. Seed Data
.read book_tags.seed.sql
.read book_tags_translations.seed.sql

-- 07. Sample Data (Optional)
.read book_tags.sample_data.sql

-- ==========================================================
-- Rollback (Execute Manually When Required)
-- ==========================================================
--
-- .read book_tags.rollback.sql
--
-- ==========================================================
-- Execution Complete
-- ==========================================================