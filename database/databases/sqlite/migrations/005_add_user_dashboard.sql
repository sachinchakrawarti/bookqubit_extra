-- ============================================
-- MIGRATION: 005_add_user_dashboard
-- Description: Add user dashboard and activity tables
-- Date: 2024-01-05
-- ============================================

-- ============================================
-- 1. USER_ACTIVITIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    activity_type TEXT NOT NULL, -- view, download, favorite, share, review, read, add_to_list, purchase
    content_type TEXT NOT NULL, -- book, comic, author, category
    content_id INTEGER NOT NULL,
    metadata TEXT, -- JSON
    ip_address TEXT,
    user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 2. USER_STATS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    total_books_read INTEGER DEFAULT 0,
    total_comics_read INTEGER DEFAULT 0,
    total_reviews_written INTEGER DEFAULT 0,
    total_favorites INTEGER DEFAULT 0,
    total_downloads INTEGER DEFAULT 0,
    reading_streak INTEGER DEFAULT 0,
    last_activity_date DATE,
    total_reading_time INTEGER DEFAULT 0, -- in minutes
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- ============================================
-- 3. USER_BOOKMARKS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_bookmarks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    content_type TEXT NOT NULL, -- book, comic
    content_id INTEGER NOT NULL,
    page_number INTEGER,
    note TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, content_type, content_id)
);

-- ============================================
-- 4. USER_HIGHLIGHTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_highlights (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    content_type TEXT NOT NULL, -- book, comic
    content_id INTEGER NOT NULL,
    start_position INTEGER,
    end_position INTEGER,
    highlighted_text TEXT,
    note TEXT,
    color TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 5. USER_PREFERENCES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_preferences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    preference_key TEXT NOT NULL,
    preference_value TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, preference_key)
);