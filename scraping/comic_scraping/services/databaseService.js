const Database = require('../database');
const logger = require('../utils/logger');

class DatabaseService {
    constructor() {
        this.db = new Database();
    }

    async getAllComics() {
        try {
            return await this.db.getAllComics();
        } catch (error) {
            logger.error('Error getting all comics:', error.message);
            throw error;
        }
    }

    async searchComics(query) {
        try {
            return await this.db.getComicByTitle(query);
        } catch (error) {
            logger.error('Error searching comics:', error.message);
            throw error;
        }
    }

    async getComicsByPublisher(publisher) {
        try {
            return await this.db.getComicByPublisher(publisher);
        } catch (error) {
            logger.error('Error getting comics by publisher:', error.message);
            throw error;
        }
    }

    async getRecentComics(limit = 10) {
        try {
            return await this.db.getRecentComics(limit);
        } catch (error) {
            logger.error('Error getting recent comics:', error.message);
            throw error;
        }
    }

    async getStats() {
        try {
            return await this.db.getStats();
        } catch (error) {
            logger.error('Error getting stats:', error.message);
            throw error;
        }
    }

    close() {
        this.db.close();
    }
}

module.exports = new DatabaseService();