import connection from '@database/connection.js';
import logger from '@utils/logger.js';

class LanguagesRepository {
  async list({ limit = 50, offset = 0 } = {}) {
    try {
      return await connection.all(
        `SELECT *
           FROM vw_active_languages
           ORDER BY sort_order, english_name
           LIMIT ? OFFSET ?`,
        [Number(limit), Number(offset)]
      );
    } catch (error) {
      logger.error('Error in LanguagesRepository.list:', error);
      throw error;
    }
  }

  async findById(id) {
    try {
      return await connection.get(
        `SELECT *
           FROM vw_language_lookup
           WHERE language_id = ?`,
        [id]
      );
    } catch (error) {
      logger.error(`Error in LanguagesRepository.findById for ID ${id}:`, error);
      throw error;
    }
  }

  async findByCode(code) {
    try {
      return await connection.get(
        `SELECT *
           FROM vw_language_lookup
           WHERE language_code = ?`,
        [code]
      );
    } catch (error) {
      logger.error(`Error in LanguagesRepository.findByCode for code ${code}:`, error);
      throw error;
    }
  }

  async search(query) {
    try {
      const term = `%${query}%`;
      return await connection.all(
        `SELECT *
           FROM vw_language_search
           WHERE english_name LIKE ?
              OR native_name LIKE ?
              OR display_name LIKE ?
           ORDER BY display_name
           LIMIT 20`,
        [term, term, term]
      );
    } catch (error) {
      logger.error(`Error in LanguagesRepository.search for query "${query}":`, error);
      throw error;
    }
  }
}

export default new LanguagesRepository();