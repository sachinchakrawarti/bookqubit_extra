-- =============================================
-- View: vw_tag_popularity
-- Description: Tag popularity metrics and analytics
-- Dependencies: tags, book_tags, books
-- =============================================

CREATE VIEW IF NOT EXISTS vw_tag_popularity AS
SELECT 
    t.id,
    t.name,
    t.slug,
    t.description,
    t.parent_id,
    t.is_active,
    -- Usage metrics
    t.usage_count,
    COUNT(DISTINCT bt.book_id) AS book_count,
    -- Engagement metrics
    COUNT(DISTINCT b.id) AS total_books,
    -- Trending score
    (
        CAST(COUNT(DISTINCT bt.book_id) AS FLOAT) / 
        NULLIF((SELECT COUNT(*) FROM books WHERE is_active = 1), 0)
    ) * 100 AS usage_percentage,
    -- Ranking
    RANK() OVER (ORDER BY COUNT(DISTINCT bt.book_id) DESC) AS popularity_rank,
    -- Category
    CASE 
        WHEN COUNT(DISTINCT bt.book_id) > 100 THEN 'High'
        WHEN COUNT(DISTINCT bt.book_id) > 50 THEN 'Medium'
        WHEN COUNT(DISTINCT bt.book_id) > 10 THEN 'Low'
        ELSE 'Rare'
    END AS popularity_level,
    -- Recent activity
    MAX(bt.created_at) AS last_used_at,
    -- Growth (tags added in last 30 days)
    SUM(CASE 
        WHEN bt.created_at >= date('now', '-30 days') THEN 1 
        ELSE 0 
    END) AS new_usage_30d,
    -- Monthly average
    ROUND(
        CAST(COUNT(DISTINCT bt.book_id) AS FLOAT) / 
        NULLIF(
            (julianday('now') - julianday(MIN(bt.created_at))) / 30.44, 
            0
        ), 
        2
    ) AS avg_monthly_usage,
    t.created_at AS tag_created_at
FROM tags t
LEFT JOIN book_tags bt ON t.id = bt.tag_id
LEFT JOIN books b ON bt.book_id = b.id AND b.is_active = 1
WHERE t.is_active = 1
GROUP BY t.id, t.name, t.slug, t.description, t.parent_id, t.is_active, t.usage_count, t.created_at
ORDER BY popularity_rank;