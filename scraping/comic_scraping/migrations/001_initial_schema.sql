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
    scraped_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_comics_title ON comics(title);
CREATE INDEX IF NOT EXISTS idx_comics_publisher ON comics(publisher);
CREATE INDEX IF NOT EXISTS idx_comics_series ON comics(series);
CREATE INDEX IF NOT EXISTS idx_comics_release_date ON comics(release_date);

-- Insert sample data for testing
INSERT OR IGNORE INTO comics (title, issue_number, publisher, release_date, series, url) 
VALUES 
    ('Sample Comic 1', '1', 'DC Comics', '2024-01-01', 'Sample Series', 'https://example.com/comic1'),
    ('Sample Comic 2', '2', 'Marvel Comics', '2024-01-15', 'Sample Series', 'https://example.com/comic2');