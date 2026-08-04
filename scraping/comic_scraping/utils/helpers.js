const validator = require('validator');

class Helpers {
    static sanitizeUrl(url) {
        if (!url) return null;
        url = url.trim();
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        return validator.isURL(url) ? url : null;
    }

    static sanitizeText(text) {
        if (!text) return '';
        return text.trim()
            .replace(/\s+/g, ' ')
            .replace(/[^\w\s\-.,!?'"()]/g, '');
    }

    static extractYearFromDate(dateString) {
        if (!dateString) return null;
        const match = dateString.match(/\b(19|20)\d{2}\b/);
        return match ? parseInt(match[0]) : null;
    }

    static formatDateForStorage(dateString) {
        if (!dateString) return null;
        try {
            const date = new Date(dateString);
            return date.toISOString().split('T')[0];
        } catch {
            return null;
        }
    }

    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static chunkArray(array, size) {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    }
}

module.exports = Helpers;