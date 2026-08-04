const axios = require('axios');
const cheerio = require('cheerio');
const logger = require('./utils/logger');
const config = require('./config/config');
const Helpers = require('./utils/helpers');

class ComicScraper {
    constructor() {
        // Use the main CBR URL
        this.baseUrl = 'https://www.cbr.com';
        this.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1'
        };
    }

    async scrapeComicList() {
        try {
            logger.info('Fetching comic list from CBR...');
            
            // Try different URLs
            const urls = [
                'https://www.cbr.com/comic-news/',
                'https://www.cbr.com/',
                'https://www.cbr.com/news/comics/'
            ];
            
            let response = null;
            let workingUrl = null;
            
            for (const url of urls) {
                try {
                    console.log(`Trying: ${url}`);
                    response = await axios.get(url, {
                        headers: this.headers,
                        timeout: config.scraping.timeout
                    });
                    if (response.status === 200) {
                        workingUrl = url;
                        console.log(`✓ Success with: ${url}`);
                        break;
                    }
                } catch (error) {
                    console.log(`✗ Failed: ${url}`);
                }
            }
            
            if (!response) {
                logger.error('All URLs failed');
                return [];
            }
            
            const $ = cheerio.load(response.data);
            const comics = [];

            // Find all article links
            $('article a, .post a, .content-item a, .loop-item a').each((index, element) => {
                const title = $(element).text().trim();
                const url = $(element).attr('href');
                
                // Filter out non-comic articles
                if (title && title.length > 10 && url && 
                    (url.includes('/comic-news/') || url.includes('/news/') || url.includes('/comics/'))) {
                    
                    const fullUrl = url.startsWith('http') ? url : `https://www.cbr.com${url}`;
                    comics.push({
                        title: title.substring(0, 100),
                        url: fullUrl
                    });
                }
            });

            // Remove duplicates
            const uniqueComics = Array.from(new Map(comics.map(c => [c.url, c])).values());
            
            logger.info(`Found ${uniqueComics.length} comics`);
            return uniqueComics.slice(0, 30);
        } catch (error) {
            logger.error('Error scraping comic list:', error.message);
            return [];
        }
    }

    async scrapeComicDetails(url) {
        try {
            logger.info(`Scraping details from: ${url}`);
            const response = await axios.get(url, {
                headers: this.headers,
                timeout: config.scraping.timeout
            });
            const $ = cheerio.load(response.data);

            const comic = {
                url: url,
                title: this.extractTitle($),
                issue_number: this.extractIssueNumber($),
                publisher: this.extractPublisher($),
                release_date: this.extractReleaseDate($),
                cover_url: this.extractCoverImage($),
                description: this.extractDescription($),
                writer: this.extractWriter($),
                artist: this.extractArtist($),
                series: this.extractSeries($),
                price: this.extractPrice($),
                rating: this.extractRating($),
                pages: this.extractPages($),
                format: this.extractFormat($)
            };

            return comic;
        } catch (error) {
            logger.error(`Error scraping ${url}:`, error.message);
            return null;
        }
    }

    // ... rest of the extraction methods remain the same ...
}

module.exports = ComicScraper;