const axios = require('axios');
const logger = require('../utils/logger');
const config = require('../config/config');
const Helpers = require('../utils/helpers');

class BaseScraper {
    constructor() {
        this.axiosInstance = axios.create({
            timeout: config.scraping.timeout || 10000,
            headers: { 
                'User-Agent': config.scraping.userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5'
            }
        });
        this.maxRetries = config.scraping.maxRetries || 3;
    }

    async fetch(url, retries = 0) {
        try {
            logger.info(`Fetching: ${url}`);
            const response = await this.axiosInstance.get(url);
            return response.data;
        } catch (error) {
            if (retries < this.maxRetries) {
                logger.warn(`Retry ${retries + 1}/${this.maxRetries} for ${url}`);
                await Helpers.sleep(1000 * (retries + 1));
                return this.fetch(url, retries + 1);
            }
            logger.error(`Failed to fetch ${url}: ${error.message}`);
            throw error;
        }
    }

    async scrapeList() {
        throw new Error('scrapeList() must be implemented by subclass');
    }

    async scrapeDetails(url) {
        throw new Error('scrapeDetails() must be implemented by subclass');
    }

    async scrapeAll() {
        try {
            const list = await this.scrapeList();
            const details = [];
            for (const item of list) {
                const detail = await this.scrapeDetails(item.url);
                if (detail) {
                    details.push(detail);
                }
                await Helpers.sleep(1000);
            }
            return details;
        } catch (error) {
            logger.error(`Error in scrapeAll: ${error.message}`);
            throw error;
        }
    }
}

module.exports = BaseScraper;