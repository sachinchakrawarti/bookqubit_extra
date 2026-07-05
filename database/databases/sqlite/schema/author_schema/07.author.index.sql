-- ============================================================================
-- File       : 07.author.index.sql
-- Module     : Author Schema
-- Database   : SQLite
-- Description: Indexes for Author Module
-- ============================================================================

------------------------------------------------------------
-- author
------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_author_gender
ON author(gender);

CREATE INDEX IF NOT EXISTS idx_author_birth_date
ON author(birth_date);

CREATE INDEX IF NOT EXISTS idx_author_death_date
ON author(death_date);

------------------------------------------------------------
-- author_translation
------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_author_translation_author_id
ON author_translation(author_id);

CREATE INDEX IF NOT EXISTS idx_author_translation_language
ON author_translation(language_code);

CREATE INDEX IF NOT EXISTS idx_author_translation_name
ON author_translation(name);

CREATE INDEX IF NOT EXISTS idx_author_translation_nationality
ON author_translation(nationality);

CREATE INDEX IF NOT EXISTS idx_author_translation_birth_place
ON author_translation(birth_place);

------------------------------------------------------------
-- author_language
------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_author_language_author_id
ON author_language(author_id);

CREATE INDEX IF NOT EXISTS idx_author_language_language_code
ON author_language(language_code);

------------------------------------------------------------
-- author_alias
------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_author_alias_author_id
ON author_alias(author_id);

CREATE INDEX IF NOT EXISTS idx_author_alias_name
ON author_alias(alias_name);