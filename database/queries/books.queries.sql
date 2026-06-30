-- ============================================
-- BOOKS QUERIES
-- All book-related database operations
-- ============================================

-- ============================================
-- CREATE OPERATIONS
-- ============================================

-- Insert new book
-- @param title, slug, author_id, language_code, description, price, etc.
INSERT INTO books (
    title, slug, subtitle, author_id, category_id, language_code,
    publication_id, description, summary, excerpt, price, currency,
    image_url, cover_image, page_count, isbn, isbn13, publisher,
    published_date, edition, format, tags, genres, subjects,
    key_points, geography, buttons, status
) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
);

-- Insert multiple books (bulk)
INSERT INTO books (
    title, slug, author_id, language_code, description, price, 
    image_url, rating, published_date, tags, genres, status
) VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?),
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

-- ============================================
-- READ OPERATIONS
-- ============================================

-- Get all books with pagination
SELECT b.*, a.name as author_name, c.name as category_name, l.name as language_name
FROM books b
LEFT JOIN authors a ON b.author_id = a.id
LEFT JOIN categories c ON b.category_id = c.id
LEFT JOIN languages l ON b.language_code = l.code
WHERE b.status = 'published'
ORDER BY b.created_at DESC
LIMIT ? OFFSET ?;

-- Get book by ID
SELECT b.*, a.name as author_name, a.bio as author_bio, 
       c.name as category_name, l.name as language_name,
       p.name as publication_name
FROM books b
LEFT JOIN authors a ON b.author_id = a.id
LEFT JOIN categories c ON b.category_id = c.id
LEFT JOIN languages l ON b.language_code = l.code
LEFT JOIN publications p ON b.publication_id = p.id
WHERE b.id = ?;

-- Get book by slug
SELECT b.*, a.name as author_name
FROM books b
LEFT JOIN authors a ON b.author_id = a.id
WHERE b.slug = ? AND b.status = 'published';

-- Get books by author
SELECT b.*, a.name as author_name
FROM books b
JOIN authors a ON b.author_id = a.id
WHERE a.name LIKE ? OR a.id = ?
  AND b.status = 'published'
ORDER BY b.rating DESC;

-- Get books by language
SELECT b.*, a.name as author_name
FROM books b
LEFT JOIN authors a ON b.author_id = a.id
WHERE b.language_code = ?
  AND b.status = 'published'
ORDER BY b.rating DESC;

-- Get books by category
SELECT b.*, a.name as author_name, c.name as category_name
FROM books b
LEFT JOIN authors a ON b.author_id = a.id
JOIN categories c ON b.category_id = c.id
WHERE c.slug = ? OR c.name LIKE ?
  AND b.status = 'published'
ORDER BY b.rating DESC;

-- Get books by genre
SELECT b.*, a.name as author_name
FROM books b
LEFT JOIN authors a ON b.author_id = a.id
WHERE b.genres LIKE ? 
  AND b.status = 'published'
ORDER BY b.rating DESC;

-- Get books by tag
SELECT b.*, a.name as author_name
FROM books b
LEFT JOIN authors a ON b.author_id = a.id
WHERE b.tags LIKE ? 
  AND b.status = 'published'
ORDER BY b.rating DESC;

-- Get featured books
SELECT b.*, a.name as author_name
FROM books b
LEFT JOIN authors a ON b.author_id = a.id
WHERE b.is_featured = 1 
  AND b.status = 'published'
ORDER BY b.rating DESC
LIMIT ?;

-- Get bestseller books
SELECT b.*, a.name as author_name
FROM books b
LEFT JOIN authors a ON b.author_id = a.id
WHERE b.is_bestseller = 1 
  AND b.status = 'published'
ORDER BY b.rating DESC
LIMIT ?;

-- Get new releases
SELECT b.*, a.name as author_name
FROM books b
LEFT JOIN authors a ON b.author_id = a.id
WHERE b.is_new_release = 1 
  AND b.status = 'published'
ORDER BY b.published_date DESC
LIMIT ?;

-- Get books by price range
SELECT b.*, a.name as author_name
FROM books b
LEFT JOIN authors a ON b.author_id = a.id
WHERE b.price BETWEEN ? AND ?
  AND b.status = 'published'
ORDER BY b.price ASC;

-- Get books by rating range
SELECT b.*, a.name as author_name
FROM books b
LEFT JOIN authors a ON b.author_id = a.id
WHERE b.rating BETWEEN ? AND ?
  AND b.status = 'published'
ORDER BY b.rating DESC;

-- Get books by date range
SELECT b.*, a.name as author_name
FROM books b
LEFT JOIN authors a ON b.author_id = a.id
WHERE b.published_date BETWEEN ? AND ?
  AND b.status = 'published'
ORDER BY b.published_date DESC;

-- Search books (full text)
SELECT b.*, a.name as author_name
FROM books b
LEFT JOIN authors a ON b.author_id = a.id
WHERE (b.title LIKE ? OR b.description LIKE ? OR b.summary LIKE ? OR a.name LIKE ?)
  AND b.status = 'published'
ORDER BY 
    CASE 
        WHEN b.title LIKE ? THEN 1
        WHEN b.author LIKE ? THEN 2
        ELSE 3
    END;

-- Get related books
SELECT b.*, a.name as author_name,
    CASE 
        WHEN b.author_id = ? THEN 3
        WHEN b.category_id = ? THEN 2
        ELSE 1
    END as relevance_score
FROM books b
LEFT JOIN authors a ON b.author_id = a.id
WHERE b.id != ?
  AND b.status = 'published'
  AND (b.author_id = ? OR b.category_id = ? OR b.tags LIKE ?)
ORDER BY relevance_score DESC
LIMIT ?;

-- Get random books
SELECT b.*, a.name as author_name
FROM books b
LEFT JOIN authors a ON b.author_id = a.id
WHERE b.status = 'published'
ORDER BY RANDOM()
LIMIT ?;

-- ============================================
-- UPDATE OPERATIONS
-- ============================================

-- Update book
UPDATE books 
SET title = ?, subtitle = ?, description = ?, summary = ?, 
    price = ?, currency = ?, image_url = ?, cover_image = ?,
    page_count = ?, isbn = ?, isbn13 = ?, publisher = ?,
    published_date = ?, edition = ?, format = ?, tags = ?,
    genres = ?, subjects = ?, key_points = ?, geography = ?,
    buttons = ?, status = ?, updated_at = CURRENT_TIMESTAMP
WHERE id = ?;

-- Update book rating
UPDATE books 
SET rating = ?, total_reviews = ?
WHERE id = ?;

-- Update book views
UPDATE books 
SET views = views + 1
WHERE id = ?;

-- Update book downloads
UPDATE books 
SET downloads = downloads + 1
WHERE id = ?;

-- Update book favorites
UPDATE books 
SET favorites = favorites + 1
WHERE id = ?;

-- Update book shares
UPDATE books 
SET shares = shares + 1
WHERE id = ?;

-- Mark book as featured
UPDATE books 
SET is_featured = ?, updated_at = CURRENT_TIMESTAMP
WHERE id = ?;

-- Mark book as bestseller
UPDATE books 
SET is_bestseller = ?, updated_at = CURRENT_TIMESTAMP
WHERE id = ?;

-- Mark book as new release
UPDATE books 
SET is_new_release = ?, updated_at = CURRENT_TIMESTAMP
WHERE id = ?;

-- Soft delete book
UPDATE books 
SET status = 'deleted', deleted_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
WHERE id = ?;

-- Restore book
UPDATE books 
SET status = 'published', deleted_at = NULL, updated_at = CURRENT_TIMESTAMP
WHERE id = ?;

-- ============================================
-- DELETE OPERATIONS
-- ============================================

-- Permanently delete book
DELETE FROM books WHERE id = ? AND status = 'deleted';

-- Bulk delete books
DELETE FROM books WHERE id IN (?) AND status = 'deleted';

-- ============================================
-- AGGREGATE QUERIES
-- ============================================

-- Get book count
SELECT COUNT(*) as total_books FROM books WHERE status = 'published';

-- Get book count by language
SELECT l.name, COUNT(b.id) as book_count
FROM languages l
LEFT JOIN books b ON l.code = b.language_code AND b.status = 'published'
GROUP BY l.id
ORDER BY book_count DESC;

-- Get book count by category
SELECT c.name, COUNT(b.id) as book_count
FROM categories c
LEFT JOIN books b ON c.id = b.category_id AND b.status = 'published'
GROUP BY c.id
ORDER BY book_count DESC;

-- Get average rating by language
SELECT l.name, ROUND(AVG(b.rating), 2) as avg_rating
FROM languages l
LEFT JOIN books b ON l.code = b.language_code AND b.status = 'published'
GROUP BY l.id
ORDER BY avg_rating DESC;

-- Get top rated books
SELECT b.title, a.name as author_name, b.rating, b.total_reviews
FROM books b
LEFT JOIN authors a ON b.author_id = a.id
WHERE b.status = 'published' AND b.rating > 0
ORDER BY b.rating DESC
LIMIT ?;

-- Get most viewed books
SELECT b.title, a.name as author_name, b.views
FROM books b
LEFT JOIN authors a ON b.author_id = a.id
WHERE b.status = 'published'
ORDER BY b.views DESC
LIMIT ?;

-- Get most downloaded books
SELECT b.title, a.name as author_name, b.downloads
FROM books b
LEFT JOIN authors a ON b.author_id = a.id
WHERE b.status = 'published'
ORDER BY b.downloads DESC
LIMIT ?;

-- Get book with highest engagement (views + downloads + favorites)
SELECT b.title, a.name as author_name, 
       (b.views + b.downloads + b.favorites) as engagement_score
FROM books b
LEFT JOIN authors a ON b.author_id = a.id
WHERE b.status = 'published'
ORDER BY engagement_score DESC
LIMIT ?;