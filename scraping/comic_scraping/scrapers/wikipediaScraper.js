const BaseScraper = require('./baseScraper');
const Comic = require('../models/Comic');
const logger = require('../utils/logger');
const axios = require('axios');
const cheerio = require('cheerio');

class WikipediaScraper extends BaseScraper {
    constructor() {
        super();
        this.baseUrl = 'https://en.wikipedia.org';
        this.apiUrl = 'https://en.wikipedia.org/w/api.php';
        this.timeout = 120000;
        
        // Expanded comic pages including Marvel and DC
        this.comicPages = [
            // Major Publishers
            'Marvel_Comics',
            'DC_Comics',
            'Image_Comics',
            'Dark_Horse_Comics',
            'IDW_Publishing',
            'Boom!_Studios',
            'Archie_Comics',
            'Valiant_Comics',
            'Dynamite_Entertainment',
            'Oni_Press',
            'Fantagraphics_Books',
            'Drawn_and_Quarterly',
            'Eclipse_Comics',
            'Top_Cow_Productions',
            'Avatar_Press',
            'AWA_Studios',
            // Comic Types
            'Alternative_comics',
            'Comic_book',
            'Graphic_novel',
            'Underground_comix',
            'Webcomic',
            'Manga',
            // Marvel Characters (for more details)
            'Spider-Man',
            'Iron_Man',
            'Captain_America',
            'Thor_(Marvel_Comics)',
            'Hulk',
            'Black_Panther_(character)',
            'Doctor_Strange',
            'Wolverine_(character)',
            'Deadpool',
            'Venom_(character)'
        ];
    }

    async scrapeList() {
        const startTime = Date.now();
        const comics = [];
        let totalPages = this.comicPages.length;
        let currentPage = 0;
        
        console.log(`\n📚 Starting Wikipedia scraping (${totalPages} pages)...`);
        console.log(`⏱ Timeout: ${this.timeout/1000} seconds\n`);
        
        try {
            for (const page of this.comicPages) {
                const elapsedTime = Date.now() - startTime;
                if (elapsedTime > this.timeout) {
                    console.log(`\n⏰ TIMEOUT: Scraping exceeded ${this.timeout/1000} seconds!`);
                    console.log(`📊 Scraped ${comics.length} comics so far`);
                    break;
                }
                
                currentPage++;
                console.log(`[${currentPage}/${totalPages}] Scraping Wikipedia page: ${page}`);
                
                try {
                    // Get page content with images
                    const url = `${this.apiUrl}?action=parse&page=${page}&format=json&prop=text|links|categories|images`;
                    
                    const response = await axios.get(url, {
                        headers: {
                            'User-Agent': 'ComicScraper/1.0 (https://example.com)'
                        },
                        timeout: 30000
                    });
                    
                    const data = response.data;
                    if (data.parse && data.parse.text) {
                        const html = data.parse.text['*'];
                        const $ = cheerio.load(html);
                        
                        const comicInfo = this.extractComicInfo($, page);
                        if (comicInfo && comicInfo.title) {
                            // Get additional details for Marvel/DC
                            if (page.includes('Marvel') || page.includes('DC')) {
                                const extraDetails = await this.getMarvelDCInfo(page);
                                if (extraDetails) {
                                    Object.assign(comicInfo, extraDetails);
                                }
                            }
                            comics.push(comicInfo);
                            console.log(`  ✅ Found: ${comicInfo.title} (${comicInfo.publisher || 'Unknown Publisher'})`);
                        } else {
                            console.log(`  ⚠️ No comic data extracted from ${page}`);
                        }
                    }
                } catch (error) {
                    console.log(`  ❌ Error scraping ${page}: ${error.message}`);
                    logger.error(`Error scraping Wikipedia page ${page}: ${error.message}`);
                }
                
                if (currentPage < totalPages) {
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    console.log(`  ⏳ Waiting 1.5s before next request...`);
                }
            }
            
            const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
            console.log(`\n✅ Wikipedia scraping complete!`);
            console.log(`📊 Total time: ${totalTime} seconds`);
            console.log(`📊 Found ${comics.length} comics`);
            
            if (comics.length === 0) {
                console.log(`\n⚠️ WARNING: No comics were scraped!`);
            }
            
            return comics;
        } catch (error) {
            const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
            console.log(`\n❌ Wikipedia scraping failed after ${totalTime} seconds!`);
            logger.error(`Wikipedia scrapeList error: ${error.message}`);
            return comics;
        }
    }

    async getMarvelDCInfo(page) {
        try {
            const url = `${this.apiUrl}?action=parse&page=${page}&format=json&prop=text`;
            const response = await axios.get(url, {
                headers: {
                    'User-Agent': 'ComicScraper/1.0 (https://example.com)'
                },
                timeout: 30000
            });
            
            const data = response.data;
            if (data.parse && data.parse.text) {
                const html = data.parse.text['*'];
                const $ = cheerio.load(html);
                
                const info = {
                    characters: [],
                    creators: [],
                    first_appearance: '',
                    publication_history: ''
                };
                
                // Extract character list
                $('ul li').each((i, el) => {
                    const text = $(el).text().trim();
                    if (text.includes('(') && text.includes(')')) {
                        info.characters.push(text);
                    }
                });
                
                // Extract creators
                $('p').each((i, el) => {
                    const text = $(el).text().trim();
                    if (text.includes('created by') || text.includes('created by')) {
                        info.creators.push(text);
                    }
                });
                
                return info;
            }
            return null;
        } catch (error) {
            logger.error(`Error getting Marvel/DC info for ${page}: ${error.message}`);
            return null;
        }
    }

    async scrapeDetails(url) {
        try {
            const title = url.split('/wiki/')[1];
            if (!title) return null;
            
            console.log(`  🔍 Getting details for: ${title}`);
            
            const url2 = `${this.apiUrl}?action=parse&page=${title}&format=json&prop=text|images`;
            const response = await axios.get(url2, {
                headers: {
                    'User-Agent': 'ComicScraper/1.0 (https://example.com)'
                },
                timeout: 30000
            });
            
            const data = response.data;
            if (data.parse && data.parse.text) {
                const html = data.parse.text['*'];
                const $ = cheerio.load(html);
                const comicInfo = this.extractComicInfo($, title);
                
                // Get more images
                if (data.parse.images) {
                    const imageUrls = data.parse.images.slice(0, 5);
                    comicInfo.additional_images = imageUrls;
                }
                
                return comicInfo;
            }
            return null;
        } catch (error) {
            logger.error(`Error scraping details from ${url}: ${error.message}`);
            return null;
        }
    }

    async scrapeAll() {
        try {
            console.log('Starting Wikipedia scrapeAll...');
            const comics = await this.scrapeList();
            console.log(`Completed scrapeAll with ${comics.length} comics`);
            return comics;
        } catch (error) {
            logger.error(`Error in Wikipedia scrapeAll: ${error.message}`);
            throw error;
        }
    }

    extractComicInfo($, pageTitle) {
        try {
            const infoBox = $('.infobox');
            let publisher = '';
            let founded = '';
            let status = '';
            let headquarters = '';
            let notableWorks = [];
            let creators = [];
            let characters = [];

            // Parse infobox rows
            infoBox.find('tr').each((index, row) => {
                const th = $(row).find('th');
                const td = $(row).find('td');
                
                if (th.length && td.length) {
                    const label = th.text().trim().toLowerCase();
                    const value = td.text().trim();
                    
                    if (label.includes('publisher') || label.includes('company')) {
                        publisher = value;
                    } else if (label.includes('founded') || label.includes('established')) {
                        founded = this.extractYear(value);
                    } else if (label.includes('status')) {
                        status = value;
                    } else if (label.includes('headquarters') || label.includes('location')) {
                        headquarters = value;
                    } else if (label.includes('publications') || label.includes('notable')) {
                        td.find('li').each((i, li) => {
                            const title = $(li).text().trim();
                            if (title && title.length > 3) {
                                notableWorks.push(title);
                            }
                        });
                    } else if (label.includes('creator') || label.includes('created by')) {
                        creators.push(value);
                    } else if (label.includes('character')) {
                        characters.push(value);
                    }
                }
            });

            // Get the main article text
            const mainText = $('.mw-parser-output p').first().text().trim();
            
            // Get description from multiple paragraphs
            let description = mainText;
            if (!description || description.length < 50) {
                const paragraphs = $('.mw-parser-output p');
                for (let i = 0; i < Math.min(3, paragraphs.length); i++) {
                    const p = $(paragraphs[i]).text().trim();
                    if (p.length > 50) {
                        description = p;
                        break;
                    }
                }
            }

            // Determine if this is a Marvel/DC character
            const isMarvel = pageTitle.includes('Marvel') || pageTitle.includes('Spider-Man') || 
                            pageTitle.includes('Iron_Man') || pageTitle.includes('Captain_America') ||
                            pageTitle.includes('Thor') || pageTitle.includes('Hulk') || 
                            pageTitle.includes('Black_Panther') || pageTitle.includes('Doctor_Strange') ||
                            pageTitle.includes('Wolverine') || pageTitle.includes('Deadpool') ||
                            pageTitle.includes('Venom');
            
            const isDC = pageTitle.includes('DC_Comics') || pageTitle.includes('Batman') || 
                        pageTitle.includes('Superman') || pageTitle.includes('Wonder_Woman') ||
                        pageTitle.includes('Flash') || pageTitle.includes('Green_Lantern');

            // Determine publisher
            let finalPublisher = publisher;
            if (isMarvel && !finalPublisher) {
                finalPublisher = 'Marvel Comics';
            } else if (isDC && !finalPublisher) {
                finalPublisher = 'DC Comics';
            }

            // Create comic object with enhanced data
            return {
                title: this.cleanTitle(pageTitle),
                publisher: finalPublisher || this.extractPublisherFromText(mainText),
                release_date: founded || this.extractYearFromText(mainText),
                description: description.substring(0, 500),
                series: pageTitle,
                url: `${this.baseUrl}/wiki/${pageTitle}`,
                format: this.detectFormat(pageTitle),
                issue_number: '1',
                writer: creators.join(', ') || '',
                artist: '',
                cover_url: this.extractCoverImage($),
                price: '',
                rating: '',
                pages: null,
                // Additional fields for Marvel/DC
                characters: characters.join(', ') || '',
                creators: creators.join(', ') || '',
                headquarters: headquarters || '',
                status: status || '',
                notable_works: notableWorks.join(', ') || '',
                is_marvel: isMarvel,
                is_dc: isDC
            };
        } catch (error) {
            logger.error(`Error extracting comic info from ${pageTitle}: ${error.message}`);
            return null;
        }
    }

    extractYear(text) {
        const match = text.match(/\b(19|20)\d{2}\b/);
        return match ? match[0] : '';
    }

    extractYearFromText(text) {
        const match = text.match(/\b(19|20)\d{2}\b/);
        return match ? match[0] : null;
    }

    extractPublisherFromText(text) {
        const publishers = [
            'Marvel Comics', 'DC Comics', 'Image Comics', 'Dark Horse',
            'Fantagraphics', 'Drawn and Quarterly', 'Eclipse Comics',
            'IDW Publishing', 'Archie Comics', 'Boom! Studios',
            'Valiant Comics', 'Dynamite Entertainment', 'Oni Press',
            'Top Cow Productions', 'Avatar Press', 'AWA Studios'
        ];
        
        for (const pub of publishers) {
            if (text.includes(pub)) {
                return pub;
            }
        }
        return '';
    }

    cleanTitle(title) {
        return title
            .replace(/_/g, ' ')
            .replace(/\(.*?\)/g, '')
            .trim();
    }

    detectFormat(title) {
        const titleLower = title.toLowerCase();
        if (titleLower.includes('comic book') || titleLower.includes('comic')) return 'Comic Book';
        if (titleLower.includes('graphic novel')) return 'Graphic Novel';
        if (titleLower.includes('webcomic')) return 'Webcomic';
        if (titleLower.includes('manga')) return 'Manga';
        if (titleLower.includes('spider-man') || titleLower.includes('iron man') || 
            titleLower.includes('captain america') || titleLower.includes('thor') ||
            titleLower.includes('hulk') || titleLower.includes('wolverine') ||
            titleLower.includes('deadpool') || titleLower.includes('venom') ||
            titleLower.includes('batman') || titleLower.includes('superman') ||
            titleLower.includes('wonder woman')) return 'Comic Character';
        return 'Comic';
    }

    extractCoverImage($) {
        // Try to get image from infobox
        const infoboxImage = $('.infobox img').first();
        if (infoboxImage.length) {
            let src = infoboxImage.attr('src');
            if (src && !src.startsWith('http')) {
                src = `https:${src}`;
            }
            if (src && !src.includes('svg') && !src.includes('logo')) {
                return src;
            }
        }
        
        // Try other images in the article
        const images = $('.mw-parser-output img');
        for (let i = 0; i < Math.min(5, images.length); i++) {
            const img = $(images[i]);
            let src = img.attr('src');
            if (src && !src.startsWith('http')) {
                src = `https:${src}`;
            }
            // Skip logos and small images
            if (src && !src.includes('svg') && !src.includes('logo') && !src.includes('icon')) {
                // Try to get larger version
                src = src.replace(/\/\d+px-/, '/400px-');
                return src;
            }
        }
        return '';
    }

    isComicRelated(title) {
        if (!title) return false;
        const titleLower = title.toLowerCase();
        const comicKeywords = [
            'comic', 'graphic novel', 'webcomic', 'manga',
            'publisher', 'animator', 'cartoonist', 'marvel',
            'dc comics', 'spider-man', 'batman', 'superman'
        ];
        return comicKeywords.some(keyword => titleLower.includes(keyword));
    }
}

module.exports = WikipediaScraper;