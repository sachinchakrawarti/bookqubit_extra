const BaseScraper = require('./baseScraper');
const Comic = require('../models/Comic');
const logger = require('../utils/logger');
const cheerio = require('cheerio');

class ComicBookResourcesScraper extends BaseScraper {
    constructor() {
        super();
        this.baseUrl = 'https://www.cbr.com';
        // Try these URLs in order
        this.urlsToTry = [
            'https://www.cbr.com/comic-news/',
            'https://www.cbr.com/news/comics/',
            'https://www.cbr.com/tag/comic-news/',
            'https://www.cbr.com/'
        ];
    }

    async scrapeList() {
        try {
            let html = null;
            let workingUrl = null;

            for (const url of this.urlsToTry) {
                try {
                    console.log(`Trying: ${url}`);
                    html = await this.fetch(url);
                    if (html) {
                        workingUrl = url;
                        console.log(`✓ Success with: ${url}`);
                        break;
                    }
                } catch (error) {
                    console.log(`✗ Failed: ${url}`);
                }
            }

            if (!html) {
                logger.error('All URLs failed');
                return [];
            }

            const $ = cheerio.load(html);
            const comics = [];
            const seenUrls = new Set();

            // Try different selectors
            const selectors = [
                'article',
                '.post',
                '.content-item',
                '.article-item',
                '.loop-item',
                '.news-item',
                '.comic-item'
            ];

            for (const selector of selectors) {
                $(selector).each((index, element) => {
                    const title = $(element).find('h2, h3, .entry-title, .post-title, .title')
                        .first().text().trim();
                    
                    const url = $(element).find('a').first().attr('href');
                    
                    if (title && title.length > 0 && url && !seenUrls.has(url)) {
                        const fullUrl = url.startsWith('http') ? url : `https://www.cbr.com${url}`;
                        seenUrls.add(url);
                        
                        comics.push({
                            title: title.substring(0, 100),
                            url: fullUrl,
                            image: $(element).find('img').first().attr('src') || null
                        });
                    }
                });
            }

            // If no comics found, try a more generic approach
            if (comics.length === 0) {
                console.log('Trying fallback extraction...');
                $('a[href*="/comic-news/"], a[href*="/news/"]').each((index, element) => {
                    const title = $(element).text().trim();
                    const url = $(element).attr('href');
                    
                    if (title && title.length > 20 && url && !seenUrls.has(url)) {
                        const fullUrl = url.startsWith('http') ? url : `https://www.cbr.com${url}`;
                        seenUrls.add(url);
                        comics.push({
                            title: title.substring(0, 100),
                            url: fullUrl
                        });
                    }
                });
            }

            logger.info(`Found ${comics.length} comics`);
            return comics.slice(0, 30);
        } catch (error) {
            logger.error(`ComicBookResources scrapeList error: ${error.message}`);
            return [];
        }
    }

    async scrapeDetails(url) {
        try {
            const html = await this.fetch(url);
            const $ = cheerio.load(html);

            const comic = {
                title: this.extractTitle($),
                issue_number: this.extractIssueNumber($),
                publisher: this.extractPublisher($),
                release_date: this.extractReleaseDate($),
                cover_url: this.extractCoverImage($),
                description: this.extractDescription($),
                writer: this.extractWriter($),
                artist: this.extractArtist($),
                series: this.extractSeries($),
                url: url,
                price: this.extractPrice($),
                rating: this.extractRating($),
                pages: this.extractPages($),
                format: this.extractFormat($)
            };

            return comic;
        } catch (error) {
            logger.error(`Scrape details error for ${url}: ${error.message}`);
            return null;
        }
    }

    extractTitle($) {
        return $('h1.entry-title, h1.post-title, h1.article-title, h1.title')
            .first().text().trim() || 
            $('meta[property="og:title"]').attr('content') || 
            'Unknown Title';
    }

    extractIssueNumber($) {
        const text = $('.issue-number, .issue, .comic-issue').text() || 
                     $('.comic-details .issue').text();
        const match = text.match(/\d+/);
        return match ? match[0] : '';
    }

    extractPublisher($) {
        return $('.publisher, .comic-publisher, .author').first().text().trim() || '';
    }

    extractReleaseDate($) {
        const dateText = $('.release-date, .comic-date, .date, .post-date').text() ||
                         $('time').attr('datetime') ||
                         $('meta[property="article:published_time"]').attr('content');
        return dateText ? new Date(dateText).toISOString().split('T')[0] : null;
    }

    extractCoverImage($) {
        return $('meta[property="og:image"]').attr('content') ||
               $('.cover-image img, .featured-image img, .comic-cover img').attr('src') || '';
    }

    extractDescription($) {
        return $('meta[name="description"]').attr('content') ||
               $('.article-content p, .post-content p, .entry-content p').first().text().trim() || '';
    }

    extractWriter($) {
        return $('.writer, .comic-writer, .author-writer').first().text().trim() || '';
    }

    extractArtist($) {
        return $('.artist, .comic-artist, .author-artist').first().text().trim() || '';
    }

    extractSeries($) {
        return $('.series, .comic-series, .volume').first().text().trim() || '';
    }

    extractPrice($) {
        const price = $('.price, .comic-price').text();
        const match = price.match(/[\d.]+/);
        return match ? match[0] : '';
    }

    extractRating($) {
        return $('.rating, .comic-rating').text().trim();
    }

    extractPages($) {
        const pages = $('.pages, .comic-pages').text();
        const match = pages.match(/\d+/);
        return match ? parseInt(match[0]) : null;
    }

    extractFormat($) {
        return $('.format, .comic-format').text().trim();
    }
}

module.exports = ComicBookResourcesScraper;