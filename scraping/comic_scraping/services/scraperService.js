const WikipediaScraper = require('../scrapers/wikipediaScraper');
const ComicVineScraper = require('../scrapers/comicVineScraper');
const Database = require('../database');
const logger = require('../utils/logger');

class ScraperService {
    constructor() {
        this.db = new Database();
        this.scrapers = {
            wikipedia: new WikipediaScraper(),
            comicVine: new ComicVineScraper()
        };
    }

    async scrapeWikipedia() {
        try {
            console.log('Starting Wikipedia scraper...');
            const scraper = this.scrapers.wikipedia;
            const comics = await scraper.scrapeAll();
            
            if (comics && comics.length > 0) {
                await this.db.insertMany(comics);
                logger.info(`Inserted ${comics.length} comics from Wikipedia`);
                console.log(`✓ Inserted ${comics.length} comics from Wikipedia`);
            } else {
                console.log('No comics found from Wikipedia');
            }
            return comics || [];
        } catch (error) {
            logger.error('Error scraping Wikipedia:', error.message);
            console.error('Error:', error.message);
            return [];
        }
    }

    async scrapeAllSources() {
        const results = {
            wikipedia: [],
            comicVine: []
        };

        console.log('Scraping all sources...');
        
        results.wikipedia = await this.scrapeWikipedia();
        results.comicVine = await this.scrapeComicVine();

        const total = results.wikipedia.length + results.comicVine.length;
        console.log(`✓ Total comics scraped: ${total}`);
        
        return results;
    }

    async scrapeComicVine() {
        try {
            console.log('Starting ComicVine scraper...');
            const scraper = this.scrapers.comicVine;
            const comics = await scraper.scrapeAll();
            
            if (comics && comics.length > 0) {
                await this.db.insertMany(comics);
                logger.info(`Inserted ${comics.length} comics from ComicVine`);
                console.log(`✓ Inserted ${comics.length} comics from ComicVine`);
            }
            return comics || [];
        } catch (error) {
            logger.error('Error scraping ComicVine:', error.message);
            return [];
        }
    }

    async getStats() {
        return await this.db.getStats();
    }

    close() {
        this.db.close();
    }
}

module.exports = new ScraperService();