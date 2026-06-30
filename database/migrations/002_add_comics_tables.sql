-- ============================================
-- MIGRATION: 002_add_comics_tables
-- Description: Add comics and related tables
-- Date: 2024-01-02
-- ============================================

-- ============================================
-- 1. COMICS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS comics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    subtitle TEXT,
    author_id INTEGER,
    illustrator_id INTEGER,
    category_id INTEGER,
    language_code TEXT NOT NULL,
    publication_id INTEGER,
    description TEXT,
    summary TEXT,
    price DECIMAL(10,2) DEFAULT 0.00,
    currency TEXT DEFAULT 'USD',
    cover_image TEXT,
    page_count INTEGER,
    isbn TEXT UNIQUE,
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
    series TEXT,
    issue_number INTEGER,
    volume INTEGER,
    characters TEXT, -- JSON
    story_arc TEXT,
    art_style TEXT,
    genres TEXT, -- JSON
    tags TEXT, -- JSON
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME,
    FOREIGN KEY (author_id) REFERENCES authors(id),
    FOREIGN KEY (illustrator_id) REFERENCES authors(id),
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (language_code) REFERENCES languages(code),
    FOREIGN KEY (publication_id) REFERENCES publications(id)
);

-- ============================================
-- 2. COMIC_PANELS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS comic_panels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    comic_id INTEGER NOT NULL,
    page_number INTEGER,
    panel_number INTEGER,
    image_url TEXT,
    dialog TEXT,
    narrator TEXT,
    sound_effects TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (comic_id) REFERENCES comics(id) ON DELETE CASCADE
);

-- ============================================
-- 3. COMIC_CHARACTERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS comic_characters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    comic_id INTEGER NOT NULL,
    character_name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (comic_id) REFERENCES comics(id) ON DELETE CASCADE,
    UNIQUE(comic_id, character_name)
);

-- ============================================
-- 4. PUBLICATION_BOOKS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS publication_books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    publication_id INTEGER NOT NULL,
    book_id INTEGER NOT NULL,
    published_date DATE,
    edition TEXT,
    isbn TEXT,
    format TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (publication_id) REFERENCES publications(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    UNIQUE(publication_id, book_id)
);

-- ============================================
-- 5. BOOK_CONTRIBUTORS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS book_contributors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER NOT NULL,
    author_id INTEGER NOT NULL,
    role TEXT, -- author, co-author, editor, illustrator, translator, narrator
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
);