-- =============================================
-- Seed Data: tags table
-- Purpose: Insert initial tag data
-- =============================================

-- Insert tags
INSERT OR IGNORE INTO tags (
    id, name, slug, description, parent_id, 
    language_id, usage_count, is_active, sort_order,
    created_at, updated_at
) VALUES
    (1, 'Fiction', 'fiction', 'Imaginative narrative literature including novels, short stories, and novellas', NULL, 1, 0, 1, 1, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
    (2, 'Non-Fiction', 'non-fiction', 'Factual and informative content based on real events and information', NULL, 1, 0, 1, 2, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
    (3, 'Science Fiction', 'science-fiction', 'Futuristic and scientific themes exploring technology, space, and alternate realities', 1, 1, 0, 1, 1, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
    (4, 'Fantasy', 'fantasy', 'Magical and supernatural themes with imaginary worlds and creatures', 1, 1, 0, 1, 2, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
    (5, 'Mystery', 'mystery', 'Suspenseful stories involving crime, investigation, and solving puzzles', 1, 1, 0, 1, 3, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
    (6, 'Thriller', 'thriller', 'Exciting and suspenseful plots with high stakes and tension', 1, 1, 0, 1, 4, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
    (7, 'Romance', 'romance', 'Love and relationship stories focusing on emotional connections', 1, 1, 0, 1, 5, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
    (8, 'Historical', 'historical', 'Stories set in historical periods with authentic settings and events', 1, 1, 0, 1, 6, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
    (9, 'Biography', 'biography', 'Life stories of real people and their achievements', 2, 1, 0, 1, 1, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
    (10, 'Self-Help', 'self-help', 'Personal development and improvement guides for better living', 2, 1, 0, 1, 2, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
    (11, 'Technology', 'technology', 'Technical and digital topics covering computers, AI, and innovation', 2, 1, 0, 1, 3, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
    (12, 'Science', 'science', 'Scientific concepts, discoveries, and research across various fields', 2, 1, 0, 1, 4, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
    (13, 'Philosophy', 'philosophy', 'Philosophical ideas, thinkers, and questions about existence', 2, 1, 0, 1, 5, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
    (14, 'Psychology', 'psychology', 'Human mind, behavior, and mental processes studies', 2, 1, 0, 1, 6, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
    (15, 'Art', 'art', 'Visual and performing arts including painting, sculpture, and music', 2, 1, 0, 1, 7, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
    (16, 'History', 'history', 'Historical events, periods, and their significance', 2, 1, 0, 1, 8, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
    (17, 'Politics', 'politics', 'Political systems, ideologies, and governance', 2, 1, 0, 1, 9, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
    (18, 'Economics', 'economics', 'Economic theories, systems, and financial principles', 2, 1, 0, 1, 10, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
    (19, 'Children', 'children', 'Books specifically written for children and young readers', NULL, 1, 0, 1, 3, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
    (20, 'Young Adult', 'young-adult', 'Books written for young adult readers aged 12-18', NULL, 1, 0, 1, 4, '2024-01-01 00:00:00', '2024-01-01 00:00:00');

-- Update sequence
SELECT setval('tags_id_seq', (SELECT MAX(id) FROM tags));

-- Verify seed
SELECT COUNT(*) AS tags_seeded FROM tags;