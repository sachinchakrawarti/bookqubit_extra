// src/api/v1/modules/languages/controllers/languages.controller.js

import LanguagesService from '../services/languages.service.js';

class LanguagesController {
  async list(req, res, next) {
    try {
      const languages = await LanguagesService.list(req.query);
      res.status(200).json({
        success: true,
        data: languages,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const language = await LanguagesService.getById(req.params.id);

      if (!language) {
        return res.status(404).json({
          success: false,
          message: 'Language not found.',
        });
      }

      res.status(200).json({
        success: true,
        data: language,
      });
    } catch (error) {
      next(error);
    }
  }

  async getByCode(req, res, next) {
    try {
      const language = await LanguagesService.getByCode(req.params.code);

      if (!language) {
        return res.status(404).json({
          success: false,
          message: 'Language not found.',
        });
      }

      res.status(200).json({
        success: true,
        data: language,
      });
    } catch (error) {
      next(error);
    }
  }

  async search(req, res, next) {
    try {
      const results = await LanguagesService.search(req.query.q || '');
      res.status(200).json({
        success: true,
        data: results,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new LanguagesController();