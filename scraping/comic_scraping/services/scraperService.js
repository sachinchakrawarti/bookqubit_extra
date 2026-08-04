const ComicScraper = require('../scraper');
const ComicVineScraper = require('../scrapers/comicVineScraper');
const ComicBookResourcesScraper = require('../scrapers/comicBookResourcesScraper');
const Database = require('../database');
const logger = require('../utils/logger');

class ScraperService {
    constructor() {
        this.db = new Database();
        this.scrapers = {
            comicVine: new ComicVineScraper(),
            comicBookResources: new ComicBookResourcesScraper()
        };
    }

    async scrapeComicBookResources() {
        try {
            console.log('Starting ComicBookResources scraper...');
            const scraper = this.scrapers.comicBookResources;
            const comics = await scraper.scrapeAll();
            
            if (comics && comics.length > 0) {
                await this.db.insertMany(comics);
                logger.info(`Inserted ${comics.length} comics from ComicBookResources`);
                console.log(`✓ Inserted ${comics.length} comics`);
            } else {
                console.log('No comics found from ComicBookResources');
            }
            return comics || [];
        } catch (error) {
            logger.error('Error scraping ComicBookResources:', error.message);
            console.error('Error:', error.message);
            return [];
        }
    }

    async scrapeComicVine() {
        try {
            console.log('Starting ComicVine scraper...');
            const scraper = this.scrapers.comicVine;
            const comics = await scraper.scrapeAll();
            
            if (comics && comics.length > 0) {
                await this.db.insertMany(comics);
                logger.info(`Inserted ${comics.length} comics from ComicVine`);
                console.log(`✓ Inserted ${comics.length} comics`);
            }
            return comics || [];
        } catch (error) {
            logger.error('Error scraping ComicVine:', error.message);
            return [];
        }
    }

    async scrapeAllSources() {
        const results = {
            comicVine: [],
            comicBookResources: []
        };

        console.log('Scraping all sources...');
        
        results.comicBookResources = await this.scrapeComicBookResources();
        results.comicVine = await this.scrapeComicVine();

        const total = results.comicBookResources.length + results.comicVine.length;
        console.log(`✓ Total comics scraped: ${total}`);
        
        return results;
    }

    async getStats() {
        return await this.db.getStats();
    }

    close() {
        this.db.close();
    }
}

module.exports = new ScraperService();