PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    uuid TEXT NOT NULL UNIQUE,

    -- Basic Information
    isbn_10 TEXT UNIQUE,
    isbn_13 TEXT UNIQUE,

    -- Relationships
    author_id INTEGER,
    publisher_id INTEGER,
    category_id INTEGER,
    series_id INTEGER,
    geography_id INTEGER,

    -- Book Information
    page_count INTEGER,
    edition TEXT,
    format TEXT,
    content_type TEXT NOT NULL DEFAULT 'BOOK',

    -- Publishing
    published_date DATE,
    original_published_date DATE,

    -- Pricing
    price REAL DEFAULT 0,
    currency TEXT DEFAULT 'USD',
    is_free INTEGER DEFAULT 1,

    -- Statistics
    rating REAL DEFAULT 0,
    rating_count INTEGER DEFAULT 0,

    views INTEGER DEFAULT 0,
    downloads INTEGER DEFAULT 0,
    favorites INTEGER DEFAULT 0,

    -- Status
    status TEXT DEFAULT 'PUBLISHED',

    is_featured INTEGER DEFAULT 0,

    is_verified INTEGER DEFAULT 0,

    is_active INTEGER DEFAULT 1,

    -- SEO
    canonical_url TEXT,

    -- Dates
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(author_id)
        REFERENCES authors(id),

    FOREIGN KEY(publisher_id)
        REFERENCES publishers(id),

    FOREIGN KEY(category_id)
        REFERENCES categories(id),

    FOREIGN KEY(series_id)
        REFERENCES series(id),

    FOREIGN KEY(geography_id)
        REFERENCES geography(id)
);