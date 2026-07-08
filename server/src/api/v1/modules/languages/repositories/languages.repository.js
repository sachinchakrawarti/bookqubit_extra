// src/api/v1/modules/languages/repositories/languages.repository.js
import connection from '../../../../../../database/connection.js';
import logger from '../../../../../../src/utils/logger.js';

class LanguagesRepository {
  /**
   * Get all languages with pagination
   * Uses vw_ltr_languages view which has all the rich data
   */
  async list({ limit = 50, offset = 0, direction = null } = {}) {
    try {
      let sql = `
        SELECT 
          language_id as id,
          language_code as code,
          language_name as name,
          english_name,
          native_name,
          iso_639_1,
          iso_639_2,
          iso_639_3,
          locale_code,
          direction,
          script_id,
          script_code,
          iso15924_code,
          script_name,
          script_native_name,
          sort_order,
          is_default,
          is_active,
          created_at,
          updated_at
        FROM vw_ltr_languages
      `;
      
      const params = [];
      
      // Filter by direction if specified
      if (direction) {
        sql += ` WHERE direction = ?`;
        params.push(direction.toUpperCase());
      }
      
      // Order by sort_order or name
      sql += ` ORDER BY sort_order, english_name LIMIT ? OFFSET ?`;
      params.push(Number(limit), Number(offset));
      
      return await connection.all(sql, params);
    } catch (error) {
      logger.error('Error in LanguagesRepository.list:', error);
      throw error;
    }
  }

  /**
   * Get active languages only
   */
  async getActive({ limit = 50, offset = 0 } = {}) {
    try {
      return await connection.all(
        `SELECT 
          language_id as id,
          language_code as code,
          language_name as name,
          english_name,
          native_name,
          iso_639_1,
          iso_639_2,
          iso_639_3,
          locale_code,
          direction,
          script_name,
          is_default,
          sort_order
        FROM vw_active_languages
        ORDER BY sort_order, english_name
        LIMIT ? OFFSET ?`,
        [Number(limit), Number(offset)]
      );
    } catch (error) {
      logger.error('Error in LanguagesRepository.getActive:', error);
      throw error;
    }
  }

  /**
   * Get language by ID
   */
  async findById(id) {
    try {
      return await connection.get(
        `SELECT 
          language_id as id,
          language_code as code,
          language_name as name,
          english_name,
          native_name,
          iso_639_1,
          iso_639_2,
          iso_639_3,
          locale_code,
          direction,
          script_id,
          script_code,
          iso15924_code,
          script_name,
          script_native_name,
          sort_order,
          is_default,
          is_active,
          created_at,
          updated_at
        FROM vw_language_lookup
        WHERE language_id = ?`,
        [id]
      );
    } catch (error) {
      logger.error(`Error in LanguagesRepository.findById for ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get language by code
   */
  async findByCode(code) {
    try {
      return await connection.get(
        `SELECT 
          language_id as id,
          language_code as code,
          language_name as name,
          english_name,
          native_name,
          iso_639_1,
          iso_639_2,
          iso_639_3,
          locale_code,
          direction,
          script_name,
          sort_order,
          is_default,
          is_active
        FROM vw_language_lookup
        WHERE language_code = ?`,
        [code]
      );
    } catch (error) {
      logger.error(`Error in LanguagesRepository.findByCode for code ${code}:`, error);
      throw error;
    }
  }

  /**
   * Search languages by name
   */
  async search(query, { limit = 20 } = {}) {
    try {
      const term = `%${query}%`;
      return await connection.all(
        `SELECT 
          language_id as id,
          language_code as code,
          language_name as name,
          english_name,
          native_name,
          iso_639_1,
          iso_639_2,
          iso_639_3,
          locale_code,
          direction,
          script_name,
          sort_order,
          is_default,
          is_active
        FROM vw_language_search
        WHERE english_name LIKE ?
           OR native_name LIKE ?
           OR language_name LIKE ?
        ORDER BY sort_order, english_name
        LIMIT ?`,
        [term, term, term, Number(limit)]
      );
    } catch (error) {
      logger.error(`Error in LanguagesRepository.search for query "${query}":`, error);
      throw error;
    }
  }

  /**
   * Get languages by direction (LTR or RTL)
   */
  async findByDirection(direction) {
    try {
      return await connection.all(
        `SELECT 
          language_id as id,
          language_code as code,
          language_name as name,
          english_name,
          native_name,
          direction,
          script_name,
          sort_order
        FROM vw_ltr_languages
        WHERE direction = ?
        ORDER BY sort_order, english_name`,
        [direction.toUpperCase()]
      );
    } catch (error) {
      logger.error(`Error in LanguagesRepository.findByDirection for ${direction}:`, error);
      throw error;
    }
  }

  /**
   * Get RTL languages
   */
  async getRTL() {
    try {
      return await connection.all(
        `SELECT 
          language_id as id,
          language_code as code,
          language_name as name,
          english_name,
          native_name,
          direction,
          script_name,
          sort_order
        FROM vw_rtl_languages
        ORDER BY sort_order, english_name`
      );
    } catch (error) {
      logger.error('Error in LanguagesRepository.getRTL:', error);
      throw error;
    }
  }

  /**
   * Get LTR languages
   */
  async getLTR() {
    try {
      return await connection.all(
        `SELECT 
          language_id as id,
          language_code as code,
          language_name as name,
          english_name,
          native_name,
          direction,
          script_name,
          sort_order
        FROM vw_ltr_languages
        ORDER BY sort_order, english_name`
      );
    } catch (error) {
      logger.error('Error in LanguagesRepository.getLTR:', error);
      throw error;
    }
  }

  /**
   * Get default language
   */
  async getDefault() {
    try {
      return await connection.get(
        `SELECT 
          language_id as id,
          language_code as code,
          language_name as name,
          english_name,
          native_name,
          iso_639_1,
          iso_639_2,
          iso_639_3,
          locale_code,
          direction,
          script_name,
          sort_order
        FROM vw_default_language
        WHERE is_default = 1`
      );
    } catch (error) {
      logger.error('Error in LanguagesRepository.getDefault:', error);
      throw error;
    }
  }

  /**
   * Get language statistics
   */
  async getStatistics() {
    try {
      return await connection.get(
        `SELECT 
          total_languages,
          active_languages,
          ltr_count,
          rtl_count,
          default_language
        FROM vw_language_statistics`
      );
    } catch (error) {
      logger.error('Error in LanguagesRepository.getStatistics:', error);
      throw error;
    }
  }

  /**
   * Get languages for dropdown
   */
  async getDropdown() {
    try {
      return await connection.all(
        `SELECT 
          language_id as id,
          language_code as code,
          language_name as name,
          native_name
        FROM vw_language_dropdown
        ORDER BY sort_order, english_name`
      );
    } catch (error) {
      logger.error('Error in LanguagesRepository.getDropdown:', error);
      throw error;
    }
  }

  /**
   * Get languages with their scripts
   */
  async getLanguagesWithScripts() {
    try {
      return await connection.all(
        `SELECT 
          language_id as id,
          language_code as code,
          language_name as name,
          native_name,
          script_name,
          script_native_name,
          iso15924_code
        FROM vw_language_scripts
        ORDER BY sort_order, english_name`
      );
    } catch (error) {
      logger.error('Error in LanguagesRepository.getLanguagesWithScripts:', error);
      throw error;
    }
  }

  /**
   * Get language by ISO code (639-1, 639-2, or 639-3)
   */
  async findByISO(isoCode) {
    try {
      return await connection.get(
        `SELECT 
          language_id as id,
          language_code as code,
          language_name as name,
          english_name,
          native_name,
          iso_639_1,
          iso_639_2,
          iso_639_3,
          locale_code,
          direction,
          script_name,
          sort_order,
          is_default,
          is_active
        FROM vw_language_codes
        WHERE iso_639_1 = ? OR iso_639_2 = ? OR iso_639_3 = ?`,
        [isoCode, isoCode, isoCode]
      );
    } catch (error) {
      logger.error(`Error in LanguagesRepository.findByISO for ${isoCode}:`, error);
      throw error;
    }
  }
}

export default new LanguagesRepository();