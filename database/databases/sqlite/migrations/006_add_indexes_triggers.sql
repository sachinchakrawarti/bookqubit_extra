-- ============================================
-- MIGRATION: 006_add_indexes_triggers
-- Description: Add performance indexes and triggers
-- Date: 2024-01-06
-- ============================================

-- ============================================
-- INDEXES FOR BOOKS
-- ============================================
CREATE INDEX IF NOT EXISTS idx_books_slug ON books(slug);
CREATE INDEX IF NOT EXISTS idx_books_author_id ON books(author_id);
CREATE INDEX IF NOT EXISTS idx_books_category_id ON books(category_id);
CREATE INDEX IF NOT EXISTS idx_books_language_code ON books(language_code);
CREATE INDEX IF NOT EXISTS idx_books_status ON books(status);
CREATE INDEX IF NOT EXISTS idx_books_rating ON books(rating);
CREATE INDEX IF NOT EXISTS idx_books_created_at ON books(created_at);
CREATE INDEX IF NOT EXISTS idx_books_published_date ON books(published_date);
CREATE INDEX IF NOT EXISTS idx_books_is_featured ON books(is_featured);
CREATE INDEX IF NOT EXISTS idx_books_is_bestseller ON books(is_bestseller);
CREATE INDEX IF NOT EXISTS idx_books_deleted_at ON books(deleted_at);

-- ============================================
-- INDEXES FOR COMICS
-- ============================================
CREATE INDEX IF NOT EXISTS idx_comics_slug ON comics(slug);
CREATE INDEX IF NOT EXISTS idx_comics_author_id ON comics(author_id);
CREATE INDEX IF NOT EXISTS idx_comics_category_id ON comics(category_id);
CREATE INDEX IF NOT EXISTS idx_comics_language_code ON comics(language_code);
CREATE INDEX IF NOT EXISTS idx_comics_status ON comics(status);
CREATE INDEX IF NOT EXISTS idx_comics_series ON comics(series);
CREATE INDEX IF NOT EXISTS idx_comics_issue_number ON comics(issue_number);

-- ============================================
-- INDEXES FOR AUTHORS
-- ============================================
CREATE INDEX IF NOT EXISTS idx_authors_name ON authors(name);
CREATE INDEX IF NOT EXISTS idx_authors_language_code ON authors(language_code);
CREATE INDEX IF NOT EXISTS idx_authors_is_active ON authors(is_active);

-- ============================================
-- INDEXES FOR CATEGORIES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_language_code ON categories(language_code);

-- ============================================
-- INDEXES FOR REVIEWS
-- ============================================
CREATE INDEX IF NOT EXISTS idx_reviews_content ON reviews(content_type, content_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at);

-- ============================================
-- INDEXES FOR READING_LIST
-- ============================================
CREATE INDEX IF NOT EXISTS idx_reading_list_user ON reading_list(user_id);
CREATE INDEX IF NOT EXISTS idx_reading_list_content ON reading_list(content_type, content_id);
CREATE INDEX IF NOT EXISTS idx_reading_list_status ON reading_list(status);

-- ============================================
-- INDEXES FOR STATS
-- ============================================
CREATE INDEX IF NOT EXISTS idx_book_stats_content ON book_stats(content_type, content_id);
CREATE INDEX IF NOT EXISTS idx_book_stats_date ON book_stats(date);

-- ============================================
-- INDEXES FOR TRENDS
-- ============================================
CREATE INDEX IF NOT EXISTS idx_trends_content ON trends(content_type, content_id);
CREATE INDEX IF NOT EXISTS idx_trends_period ON trends(period, start_date, end_date);

-- ============================================
-- INDEXES FOR USER_ACTIVITIES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_user_activities_user ON user_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activities_content ON user_activities(content_type, content_id);
CREATE INDEX IF NOT EXISTS idx_user_activities_created ON user_activities(created_at);

-- ============================================
-- TRIGGERS
-- ============================================

-- Update timestamps
CREATE TRIGGER update_books_timestamp 
AFTER UPDATE ON books
BEGIN
    UPDATE books SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_comics_timestamp 
AFTER UPDATE ON comics
BEGIN
    UPDATE comics SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_authors_timestamp 
AFTER UPDATE ON authors
BEGIN
    UPDATE authors SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_categories_timestamp 
AFTER UPDATE ON categories
BEGIN
    UPDATE categories SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_publications_timestamp 
AFTER UPDATE ON publications
BEGIN
    UPDATE publications SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_reviews_timestamp 
AFTER UPDATE ON reviews
BEGIN
    UPDATE reviews SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Update author total books count
CREATE TRIGGER update_author_book_count_insert 
AFTER INSERT ON books
BEGIN
    UPDATE authors 
    SET total_books = (SELECT COUNT(*) FROM books WHERE author_id = NEW.author_id AND status = 'published')
    WHERE id = NEW.author_id;
END;

CREATE TRIGGER update_author_book_count_delete 
AFTER DELETE ON books
BEGIN
    UPDATE authors 
    SET total_books = (SELECT COUNT(*) FROM books WHERE author_id = OLD.author_id AND status = 'published')
    WHERE id = OLD.author_id;
END;

-- Update book rating when review is added
CREATE TRIGGER update_book_rating_insert 
AFTER INSERT ON reviews
WHEN NEW.is_approved = 1
BEGIN
    UPDATE books 
    SET 
        rating = (SELECT ROUND(AVG(rating), 2) FROM reviews WHERE content_id = NEW.content_id AND content_type = 'book' AND is_approved = 1),
        total_reviews = (SELECT COUNT(*) FROM reviews WHERE content_id = NEW.content_id AND content_type = 'book' AND is_approved = 1)
    WHERE id = NEW.content_id;
END;

-- Auto-generate slug for books if not provided
CREATE TRIGGER generate_book_slug 
BEFORE INSERT ON books
WHEN NEW.slug IS NULL OR NEW.slug = ''
BEGIN
    UPDATE books 
    SET slug = LOWER(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(NEW.title, ' ', '-'), '&', ''), '(', ''), ')', ''), ',', ''), '.', ''))
    WHERE id = NEW.id;
END;

-- Auto-generate slug for comics if not provided
CREATE TRIGGER generate_comic_slug 
BEFORE INSERT ON comics
WHEN NEW.slug IS NULL OR NEW.slug = ''
BEGIN
    UPDATE comics 
    SET slug = LOWER(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(NEW.title, ' ', '-'), '&', ''), '(', ''), ')', ''), ',', ''), '.', ''))
    WHERE id = NEW.id;
END;

-- Update user stats when activity is added
CREATE TRIGGER update_user_stats_activity 
AFTER INSERT ON user_activities
BEGIN
    INSERT OR IGNORE INTO user_stats (user_id) VALUES (NEW.user_id);
    
    UPDATE user_stats 
    SET 
        total_books_read = total_books_read + 
            CASE WHEN NEW.activity_type = 'read' AND NEW.content_type = 'book' THEN 1 ELSE 0 END,
        total_comics_read = total_comics_read + 
            CASE WHEN NEW.activity_type = 'read' AND NEW.content_type = 'comic' THEN 1 ELSE 0 END,
        total_reviews_written = total_reviews_written + 
            CASE WHEN NEW.activity_type = 'review' THEN 1 ELSE 0 END,
        total_favorites = total_favorites + 
            CASE WHEN NEW.activity_type = 'favorite' THEN 1 ELSE 0 END,
        total_downloads = total_downloads + 
            CASE WHEN NEW.activity_type = 'download' THEN 1 ELSE 0 END,
        last_activity_date = DATE('now'),
        updated_at = CURRENT_TIMESTAMP
    WHERE user_id = NEW.user_id;
END;

-- Prevent duplicate favorites
CREATE TRIGGER prevent_duplicate_favorite 
BEFORE INSERT ON user_activities
WHEN NEW.activity_type = 'favorite'
BEGIN
    SELECT CASE 
        WHEN EXISTS (
            SELECT 1 FROM user_activities 
            WHERE user_id = NEW.user_id 
              AND content_type = NEW.content_type 
              AND content_id = NEW.content_id 
              AND activity_type = 'favorite'
        ) THEN RAISE(ABORT, 'Already favorited')
    END;
END;