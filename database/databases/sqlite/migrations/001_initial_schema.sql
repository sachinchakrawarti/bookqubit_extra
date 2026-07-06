-- ============================================
-- MIGRATION: 001_initial_schema
-- Description: Create initial database schema
-- Date: 2024-01-01
-- ============================================

-- Enable foreign keys
PRAGMA foreign_keys = ON;

-- ============================================
-- 1. LANGUAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS languages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    native_name TEXT,
    flag_emoji TEXT,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 2. AUTHORS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS authors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    bio TEXT,
    birth_date DATE,
    death_date DATE,
    nationality TEXT,
    language_code TEXT,
    image_url TEXT,
    website TEXT,
    wikipedia_url TEXT,
    social_links TEXT, -- JSON
    total_books INTEGER DEFAULT 0,
    total_sales INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.00,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (language_code) REFERENCES languages(code)
);

-- ============================================
-- 3. CATEGORIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    color TEXT,
    parent_id INTEGER,
    language_code TEXT,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id),
    FOREIGN KEY (language_code) REFERENCES languages(code)
);

-- ============================================
-- 4. PUBLICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS publications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    logo_url TEXT,
    website TEXT,
    founded_year INTEGER,
    country TEXT,
    language_code TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (language_code) REFERENCES languages(code)
);

-- ============================================
-- 5. BOOKS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    subtitle TEXT,
    author_id INTEGER,
    category_id INTEGER,
    language_code TEXT NOT NULL,
    publication_id INTEGER,
    description TEXT,
    summary TEXT,
    excerpt TEXT,
    price DECIMAL(10,2) DEFAULT 0.00,
    currency TEXT DEFAULT 'USD',
    image_url TEXT,
    cover_image TEXT,
    page_count INTEGER,
    isbn TEXT UNIQUE,
    isbn13 TEXT,
    oclc TEXT,
    lccn TEXT,
    publisher TEXT,
    published_date DATE,
    edition TEXT,
    format TEXT,
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_reviews INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    downloads INTEGER DEFAULT 0,
    favorites INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    status TEXT DEFAULT 'published',
    is_featured BOOLEAN DEFAULT 0,
    is_bestseller BOOLEAN DEFAULT 0,
    is_new_release BOOLEAN DEFAULT 0,
    table_of_contents TEXT, -- JSON
    tags TEXT, -- JSON
    genres TEXT, -- JSON
    subjects TEXT, -- JSON
    key_points TEXT, -- JSON
    geography TEXT, -- JSON
    buttons TEXT, -- JSON
    original_language_code TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME,
    FOREIGN KEY (author_id) REFERENCES authors(id),
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (language_code) REFERENCES languages(code),
    FOREIGN KEY (publication_id) REFERENCES publications(id)
);

-- ============================================
-- 6. REVIEWS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content_type TEXT NOT NULL, -- book, comic, author
    content_id INTEGER NOT NULL,
    user_id INTEGER,
    user_name TEXT,
    user_email TEXT,
    rating INTEGER CHECK(rating >= 1 AND rating <= 5),
    comment TEXT,
    title TEXT,
    is_verified BOOLEAN DEFAULT 0,
    is_approved BOOLEAN DEFAULT 0,
    helpful_count INTEGER DEFAULT 0,
    unhelpful_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 7. READING_LIST TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS reading_list (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    content_type TEXT NOT NULL, -- book, comic
    content_id INTEGER NOT NULL,
    status TEXT DEFAULT 'to-read',
    started_at DATETIME,
    completed_at DATETIME,
    progress INTEGER DEFAULT 0,
    rating INTEGER CHECK(rating >= 1 AND rating <= 5),
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, content_type, content_id)
);

-- ============================================
-- 8. BOOK_STATS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS book_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content_type TEXT NOT NULL, -- book, comic
    content_id INTEGER NOT NULL,
    daily_views INTEGER DEFAULT 0,
    weekly_views INTEGER DEFAULT 0,
    monthly_views INTEGER DEFAULT 0,
    daily_downloads INTEGER DEFAULT 0,
    weekly_downloads INTEGER DEFAULT 0,
    monthly_downloads INTEGER DEFAULT 0,
    daily_favorites INTEGER DEFAULT 0,
    weekly_favorites INTEGER DEFAULT 0,
    monthly_favorites INTEGER DEFAULT 0,
    daily_shares INTEGER DEFAULT 0,
    weekly_shares INTEGER DEFAULT 0,
    monthly_shares INTEGER DEFAULT 0,
    date DATE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(content_type, content_id, date)
);

-- ============================================
-- 9. BOOK_HISTORY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS book_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content_type TEXT NOT NULL, -- book, comic, author, category, publication
    content_id INTEGER NOT NULL,
    action TEXT NOT NULL,
    changes TEXT, -- JSON
    user_id INTEGER,
    user_name TEXT,
    ip_address TEXT,
    user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);