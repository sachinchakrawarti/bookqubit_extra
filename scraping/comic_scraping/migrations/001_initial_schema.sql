-- Initial database schema for comics

CREATE TABLE IF NOT EXISTS comics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    issue_number TEXT,
    publisher TEXT,
    release_date TEXT,
    cover_url TEXT,
    description TEXT,
    writer TEXT,
    artist TEXT,
    series TEXT,
    url TEXT UNIQUE,
    price TEXT,
    rating TEXT,
    pages INTEGER,
    format TEXT,
    scraped_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- New fields for enhanced data
    characters TEXT,
    creators TEXT,
    headquarters TEXT,
    status TEXT,
    notable_works TEXT,
    is_marvel BOOLEAN DEFAULT 0,
    is_dc BOOLEAN DEFAULT 0,
    additional_images TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_comics_title ON comics(title);
CREATE INDEX IF NOT EXISTS idx_comics_publisher ON comics(publisher);
CREATE INDEX IF NOT EXISTS idx_comics_series ON comics(series);
CREATE INDEX IF NOT EXISTS idx_comics_release_date ON comics(release_date);
CREATE INDEX IF NOT EXISTS idx_comics_marvel ON comics(is_marvel);
CREATE INDEX IF NOT EXISTS idx_comics_dc ON comics(is_dc);