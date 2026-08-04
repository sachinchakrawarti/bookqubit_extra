require('dotenv').config();
const Database = require('./database');
const scraperService = require('./services/scraperService');
const databaseService = require('./services/databaseService');
const logger = require('./utils/logger');
const chalk = require('chalk');
const Table = require('cli-table3');

async function main() {
    const args = process.argv.slice(2);
    const command = args[0] || 'help';

    try {
        switch(command) {
            case '--scrape':
                await scrapeComics();
                break;
            case '--scrape-wiki':
                await scrapeWikipedia();
                break;
            case '--scrape-all':
                await scrapeAllSources();
                break;
            case '--view':
                await viewComics();
                break;
            case '--search':
                await searchComics(args[1]);
                break;
            case '--init-db':
                await initDatabase();
                break;
            case '--stats':
                await showStats();
                break;
            default:
                showHelp();
        }
    } catch (error) {
        logger.error('Error:', error.message);
        console.error(chalk.red('Error:'), error.message);
    }
}

async function scrapeComics() {
    console.log(chalk.blue('Starting comic scraping...'));
    const comics = await scraperService.scrapeComicBookResources();
    console.log(chalk.green(`✓ Scraped ${comics.length} comics`));
}

async function scrapeWikipedia() {
    console.log(chalk.blue('Starting Wikipedia scraping...'));
    const comics = await scraperService.scrapeWikipedia();
    console.log(chalk.green(`✓ Scraped ${comics.length} comics from Wikipedia`));
}

async function scrapeAllSources() {
    console.log(chalk.blue('Scraping all sources...'));
    const results = await scraperService.scrapeAllSources();
    console.log(chalk.green('✓ Scraping complete!'));
}

async function viewComics() {
    const comics = await databaseService.getAllComics();
    if (comics.length === 0) {
        console.log(chalk.yellow('No comics found in database.'));
        return;
    }

    const table = new Table({
        head: ['ID', 'Title', 'Issue', 'Publisher', 'Date'],
        colWidths: [5, 30, 10, 20, 15]
    });

    comics.forEach(comic => {
        table.push([
            comic.id,
            comic.title.substring(0, 28),
            comic.issue_number || 'N/A',
            comic.publisher || 'N/A',
            comic.release_date || 'N/A'
        ]);
    });

    console.log(table.toString());
    console.log(chalk.gray(`\nTotal: ${comics.length} comics`));
}

async function searchComics(query) {
    if (!query) {
        console.log(chalk.yellow('Please provide a search query.'));
        console.log('Example: npm run search -- "batman"');
        return;
    }
    const comics = await databaseService.searchComics(query);
    if (comics.length === 0) {
        console.log(chalk.yellow(`No comics found for: "${query}"`));
        return;
    }
    console.log(chalk.blue(`Found ${comics.length} comics for "${query}":`));
    comics.forEach((c, i) => {
        console.log(`${i + 1}. ${c.title} #${c.issue_number || 'N/A'} (${c.publisher || 'Unknown'})`);
    });
}

async function initDatabase() {
    const db = new Database();
    console.log(chalk.green('✓ Database initialized successfully!'));
    db.close();
}

async function showStats() {
    const stats = await databaseService.getStats();
    console.log(chalk.blue('Database Statistics:'));
    console.log(`  Total Comics: ${chalk.green(stats.total)}`);
    console.log(`  Publishers: ${chalk.green(stats.publishers)}`);
    console.log(`  Series: ${chalk.green(stats.series)}`);
    console.log(`  Last Scrape: ${chalk.green(stats.last_scrape || 'Never')}`);
}

function showHelp() {
    console.log(chalk.yellow('Comic Scraper Commands:'));
    console.log('  --scrape       Scrape comics from ComicBookResources');
    console.log('  --scrape-wiki  Scrape comics from Wikipedia');
    console.log('  --scrape-all   Scrape from all sources');
    console.log('  --view         View all comics in database');
    console.log('  --search       Search comics by title');
    console.log('  --init-db      Initialize database');
    console.log('  --stats        Show database statistics');
    console.log('\nExamples:');
    console.log('  npm run scrape');
    console.log('  npm run search -- "marvel"');
    console.log('  npm run view');
}

if (require.main === module) {
    main();
}

module.exports = { main };