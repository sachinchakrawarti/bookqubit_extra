// src/api/v1/modules/languages/controllers/languages.controller.js
import languagesService from '../services/languages.service.js';

class LanguagesController {
  async getAll(req, res) {
    try {
      const { limit = 50, offset = 0, direction } = req.query;
      const languages = await languagesService.list({ limit, offset, direction });
      res.json({
        success: true,
        data: languages,
        pagination: {
          limit: Number(limit),
          offset: Number(offset)
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getActive(req, res) {
    try {
      const { limit = 50, offset = 0 } = req.query;
      const languages = await languagesService.getActive({ limit, offset });
      res.json({
        success: true,
        data: languages
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const language = await languagesService.findById(id);
      if (!language) {
        return res.status(404).json({
          success: false,
          error: 'Language not found'
        });
      }
      res.json({
        success: true,
        data: language
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getByCode(req, res) {
    try {
      const { code } = req.params;
      const language = await languagesService.findByCode(code);
      if (!language) {
        return res.status(404).json({
          success: false,
          error: 'Language not found'
        });
      }
      res.json({
        success: true,
        data: language
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async search(req, res) {
    try {
      const { query } = req.params;
      const { limit = 20 } = req.query;
      const languages = await languagesService.search(query, { limit });
      res.json({
        success: true,
        data: languages,
        count: languages.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getRTL(req, res) {
    try {
      const languages = await languagesService.getRTL();
      res.json({
        success: true,
        data: languages
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getLTR(req, res) {
    try {
      const languages = await languagesService.getLTR();
      res.json({
        success: true,
        data: languages
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getDefault(req, res) {
    try {
      const language = await languagesService.getDefault();
      res.json({
        success: true,
        data: language
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getStatistics(req, res) {
    try {
      const stats = await languagesService.getStatistics();
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getDropdown(req, res) {
    try {
      const languages = await languagesService.getDropdown();
      res.json({
        success: true,
        data: languages
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getByISO(req, res) {
    try {
      const { iso } = req.params;
      const language = await languagesService.findByISO(iso);
      if (!language) {
        return res.status(404).json({
          success: false,
          error: 'Language not found'
        });
      }
      res.json({
        success: true,
        data: language
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

export default new LanguagesController();