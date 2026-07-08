// src/api/v1/modules/languages/services/languages.service.js

import LanguagesRepository from '../repositories/languages.repository.js';

class LanguagesService {
  async list(options = {}) {
    return LanguagesRepository.list(options);
  }

  async getById(id) {
    return LanguagesRepository.findById(Number(id));
  }

  async getByCode(code) {
    return LanguagesRepository.findByCode(code.toLowerCase());
  }

  async search(query) {
    const q = (query || '').trim();

    if (!q) {
      return [];
    }

    return LanguagesRepository.search(q);
  }
}

export default new LanguagesService();