const BaseScraper = require('./baseScraper');
const Comic = require('../models/Comic');
const logger = require('../utils/logger');
const config = require('../config/config');

class ComicVineScraper extends BaseScraper {
    constructor() {
        super();
        this.apiKey = config.apis.comicVine.key || '';
        this.baseUrl = config.apis.comicVine.url || 'https://comicvine.gamespot.com/api';
        this.limit = 100;
    }

    async scrapeList(params = {}) {
        try {
            if (!this.apiKey) {
                logger.warn('ComicVine API key not configured. Skipping...');
                return [];
            }

            const url = `${this.baseUrl}/issues/?api_key=${this.apiKey}&format=json&limit=${this.limit}`;
            const data = await this.fetch(url);
            
            if (data && data.results) {
                return data.results.map(issue => ({
                    title: issue.name || issue.volume?.name || 'Unknown',
                    url: issue.site_detail_url,
                    issueNumber: issue.issue_number,
                    publisher: issue.publisher?.name,
                    releaseDate: issue.cover_date,
                    coverUrl: issue.image?.super_url
                }));
            }
            return [];
        } catch (error) {
            logger.error(`ComicVine scrapeList error: ${error.message}`);
            return [];
        }
    }

    async scrapeDetails(url) {
        try {
            if (!this.apiKey) return null;

            const data = await this.fetch(url);
            if (!data || !data.results) return null;

            const issue = data.results;
            return {
                title: issue.name || issue.volume?.name || 'Unknown',
                issue_number: issue.issue_number,
                publisher: issue.publisher?.name,
                release_date: issue.cover_date,
                cover_url: issue.image?.super_url,
                description: issue.description,
                writer: this.extractCreators(issue, 'Writer'),
                artist: this.extractCreators(issue, 'Artist'),
                series: issue.volume?.name,
                url: url,
                price: issue.price,
                pages: issue.issue_number ? parseInt(issue.issue_number) : null,
                format: issue.format
            };
        } catch (error) {
            logger.error(`ComicVine scrapeDetails error: ${error.message}`);
            return null;
        }
    }

    extractCreators(issue, role) {
        if (!issue.character_credits) return '';
        const creators = issue.character_credits
            .filter(credit => credit.role === role)
            .map(credit => credit.name)
            .join(', ');
        return creators;
    }
}

module.exports = ComicVineScraper;