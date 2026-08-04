class Comic {
    constructor(data = {}) {
        this.id = data.id || null;
        this.title = data.title || '';
        this.issueNumber = data.issueNumber || data.issue_number || '';
        this.publisher = data.publisher || '';
        this.releaseDate = data.releaseDate || data.release_date || '';
        this.coverUrl = data.coverUrl || data.cover_url || '';
        this.description = data.description || '';
        this.writer = data.writer || '';
        this.artist = data.artist || '';
        this.series = data.series || '';
        this.url = data.url || '';
        this.scrapedAt = data.scrapedAt || data.scraped_at || new Date().toISOString();
        this.price = data.price || null;
        this.rating = data.rating || null;
        this.pages = data.pages || null;
        this.format = data.format || null;
    }

    toDatabase() {
        return {
            title: this.title,
            issue_number: this.issueNumber,
            publisher: this.publisher,
            release_date: this.releaseDate,
            cover_url: this.coverUrl,
            description: this.description,
            writer: this.writer,
            artist: this.artist,
            series: this.series,
            url: this.url,
            price: this.price,
            rating: this.rating,
            pages: this.pages,
            format: this.format
        };
    }

    static fromDatabase(row) {
        return new Comic({
            id: row.id,
            title: row.title,
            issueNumber: row.issue_number,
            publisher: row.publisher,
            releaseDate: row.release_date,
            coverUrl: row.cover_url,
            description: row.description,
            writer: row.writer,
            artist: row.artist,
            series: row.series,
            url: row.url,
            scrapedAt: row.scraped_at,
            price: row.price,
            rating: row.rating,
            pages: row.pages,
            format: row.format
        });
    }

    isValid() {
        return this.title && this.title.trim().length > 0;
    }

    toString() {
        return `${this.title} #${this.issueNumber} (${this.publisher})`;
    }
}

module.exports = Comic;