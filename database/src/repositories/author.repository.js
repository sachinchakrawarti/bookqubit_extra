/**
 * ============================================================================
 * File        : author.repository.js
 * Module      : Author Repository
 * Description : Database operations for Author.
 * ============================================================================
 */

const db = require("../importers/db");

class AuthorRepository {

    /**
     * Insert into author table.
     */
    static insertAuthor(author) {

        const stmt = db.prepare(`
            INSERT INTO author (
                gender,
                birth_date,
                death_date
            )
            VALUES (?, ?, ?)
        `);

        const result = stmt.run(
            author.gender,
            author.birth_date,
            author.death_date
        );

        return result.lastInsertRowid;
    }

    /**
     * Insert author translations.
     */
    static insertTranslations(authorId, translations) {

        const stmt = db.prepare(`
            INSERT INTO author_translation (
                author_id,
                language_code,
                name,
                biography,
                nationality,
                birth_place
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `);

        for (const t of translations) {

            stmt.run(
                authorId,
                t.language_code,
                t.name,
                t.biography,
                t.nationality,
                t.birth_place
            );

        }

    }

    /**
     * Insert author aliases.
     */
    static insertAliases(authorId, aliases) {

        const stmt = db.prepare(`
            INSERT INTO author_alias (
                author_id,
                alias_name,
                alias_type
            )
            VALUES (?, ?, ?)
        `);

        for (const alias of aliases) {

            stmt.run(
                authorId,
                alias.alias_name,
                alias.alias_type
            );

        }

    }

    /**
     * Insert author languages.
     */
    static insertLanguages(authorId, languages) {

        const stmt = db.prepare(`
            INSERT INTO author_language (
                author_id,
                language_code,
                language_type,
                proficiency
            )
            VALUES (?, ?, ?, ?)
        `);

        for (const language of languages) {

            stmt.run(
                authorId,
                language.language_code,
                language.language_type,
                language.proficiency
            );

        }

    }

}

module.exports = AuthorRepository;