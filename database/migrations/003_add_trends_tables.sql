-- ============================================
-- MIGRATION: 003_add_trends_tables
-- Description: Add trends and analytics tables
-- Date: 2024-01-03
-- ============================================

-- ============================================
-- 1. TRENDS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS trends (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content_type TEXT NOT NULL, -- book, comic, author, category, publication
    content_id INTEGER NOT NULL,
    trend_type TEXT NOT NULL, -- popular, trending, rising, declining
    score DECIMAL(10,2) DEFAULT 0.00,
    rank INTEGER DEFAULT 0,
    period TEXT NOT NULL, -- daily, weekly, monthly, yearly
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    data TEXT, -- JSON
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(content_type, content_id, trend_type, period, start_date, end_date)
);

-- ============================================
-- 2. TRENDING_TOPICS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS trending_topics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    topic_name TEXT NOT NULL,
    category TEXT,
    score DECIMAL(10,2) DEFAULT 0.00,
    rank INTEGER DEFAULT 0,
    period TEXT NOT NULL, -- daily, weekly, monthly
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(topic_name, period, start_date, end_date)
);

-- ============================================
-- 3. REVIEW_REPLIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS review_replies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    review_id INTEGER NOT NULL,
    user_id INTEGER,
    user_name TEXT,
    comment TEXT,
    is_approved BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE
);