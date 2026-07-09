-- =============================================
-- Table: academic_authors
-- Description: Academic author profiles
-- Dependencies: None
-- =============================================

CREATE TABLE IF NOT EXISTS academic_authors (
    -- Primary Key
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    
    -- Personal Information
    name VARCHAR(200) NOT NULL,
    name_native VARCHAR(200),
    
    -- Academic Identifiers
    orcid VARCHAR(19) UNIQUE,
    email VARCHAR(100),
    
    -- Institutional Information
    institution VARCHAR(255),
    department VARCHAR(200),
    position VARCHAR(100),
    
    -- Biography
    biography TEXT,
    research_interests TEXT,
    website VARCHAR(255),
    
    -- Status
    is_active BOOLEAN DEFAULT 1,
    sort_order INTEGER DEFAULT 0,
    
    -- Audit
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- Indexes for academic_authors
-- =============================================

CREATE INDEX IF NOT EXISTS idx_academic_authors_name ON academic_authors(name);
CREATE INDEX IF NOT EXISTS idx_academic_authors_orcid ON academic_authors(orcid);
CREATE INDEX IF NOT EXISTS idx_academic_authors_email ON academic_authors(email);
CREATE INDEX IF NOT EXISTS idx_academic_authors_institution ON academic_authors(institution);
CREATE INDEX IF NOT EXISTS idx_academic_authors_is_active ON academic_authors(is_active);