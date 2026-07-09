-- =============================================
-- Indexes for: academic_publishers table
-- Description: Performance optimization for academic publisher queries
-- =============================================

-- =============================================
-- 1. PRIMARY KEY & UNIQUE INDEXES
-- =============================================

-- Primary key is automatically indexed
-- PRIMARY KEY (id)

-- Unique index on abbreviation (common lookup)
CREATE UNIQUE INDEX IF NOT EXISTS idx_academic_publishers_abbreviation ON academic_publishers(abbreviation);

-- =============================================
-- 2. BASIC SEARCH INDEXES
-- =============================================

-- Publisher name search (most common query)
CREATE INDEX IF NOT EXISTS idx_academic_publishers_name ON academic_publishers(name);

-- Native name search
CREATE INDEX IF NOT EXISTS idx_academic_publishers_name_native ON academic_publishers(name_native);

-- =============================================
-- 3. FOREIGN KEY INDEXES
-- =============================================

-- Country lookups
CREATE INDEX IF NOT EXISTS idx_academic_publishers_country_id ON academic_publishers(country_id);

-- =============================================
-- 4. CONTACT & LOCATION INDEXES
-- =============================================

-- Website lookups
CREATE INDEX IF NOT EXISTS idx_academic_publishers_website ON academic_publishers(website);

-- Email lookups
CREATE INDEX IF NOT EXISTS idx_academic_publishers_email ON academic_publishers(email);

-- =============================================
-- 5. STATUS & FILTER INDEXES
-- =============================================

-- Active status filtering
CREATE INDEX IF NOT EXISTS idx_academic_publishers_is_active ON academic_publishers(is_active);

-- Sort order for listing
CREATE INDEX IF NOT EXISTS idx_academic_publishers_sort_order ON academic_publishers(sort_order);

-- =============================================
-- 6. COMPOSITE INDEXES
-- =============================================

-- Combined active + name for listing
CREATE INDEX IF NOT EXISTS idx_academic_publishers_active_name ON academic_publishers(is_active, name);

-- Combined country + active for geographic filtering
CREATE INDEX IF NOT EXISTS idx_academic_publishers_country_active ON academic_publishers(country_id, is_active);