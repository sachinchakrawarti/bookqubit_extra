// src/api/v1/modules/languages/repositories/languages.repository.js
import connection from '../../../../database/connection.js';

class LanguagesRepository {
  async list({ limit = 50, offset = 0 } = {}) {
    return db.all(
      `SELECT *
         FROM vw_active_languages
         ORDER BY sort_order, english_name
         LIMIT ? OFFSET ?`,
      [Number(limit), Number(offset)]
    );
  }

  async findById(id) {
    return db.get(
      `SELECT *
         FROM vw_language_lookup
         WHERE language_id = ?`,
      [id]
    );
  }

  async findByCode(code) {
    return db.get(
      `SELECT *
         FROM vw_language_lookup
         WHERE language_code = ?`,
      [code]
    );
  }

  async search(query) {
    const term = `%${query}%`;

    return db.all(
      `SELECT *
         FROM vw_language_search
         WHERE english_name LIKE ?
            OR native_name LIKE ?
            OR display_name LIKE ?
         ORDER BY display_name
         LIMIT 20`,
      [term, term, term]
    );
  }
}

export default new LanguagesRepository();