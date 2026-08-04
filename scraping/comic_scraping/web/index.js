// Simple Comic Viewer
console.log('🚀 Comic Viewer starting...');

let allComics = [];

// Load comics when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 Page loaded, fetching comics...');
    loadComics();
});

async function loadComics() {
    try {
        const content = document.getElementById('content');
        content.innerHTML = '<div class="loading">⏳ Loading comics...</div>';
        
        console.log('📡 Fetching from /api/comics...');
        const response = await fetch('/api/comics');
        console.log('📡 Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        allComics = await response.json();
        console.log(`✅ Loaded ${allComics.length} comics`);
        
        if (allComics.length === 0) {
            content.innerHTML = '<div class="loading">📭 No comics found. Run: npm run scrape:wiki</div>';
            return;
        }
        
        renderComics(allComics);
        updateStats(allComics);
        
    } catch (error) {
        console.error('❌ Error:', error);
        document.getElementById('content').innerHTML = `
            <div class="loading" style="color:#e74c3c;padding:40px;">
                <h2>❌ Failed to load comics</h2>
                <p>Error: ${error.message}</p>
                <br>
                <p><strong>Please check:</strong></p>
                <ul style="text-align:left;display:inline-block;">
                    <li>Server is running: <code>node server.js</code></li>
                    <li>Access via: <code>http://localhost:3000</code></li>
                    <li>Not: <code>file:///...</code></li>
                </ul>
                <br><br>
                <button onclick="loadComics()" style="padding:10px 30px;background:#667eea;color:white;border:none;border-radius:5px;cursor:pointer;">
                    🔄 Retry
                </button>
            </div>
        `;
    }
}

function renderComics(comics) {
    const content = document.getElementById('content');
    
    let html = `<h2 style="margin-bottom:20px;">📋 All Comics (${comics.length})</h2>`;
    html += '<div class="comic-grid">';
    
    comics.forEach(comic => {
        html += createCard(comic);
    });
    
    html += '</div>';
    content.innerHTML = html;
}

function createCard(comic) {
    const title = comic.title || 'Unknown';
    const publisher = comic.publisher || 'Unknown Publisher';
    const date = comic.release_date || 'N/A';
    const format = comic.format || 'Comic';
    const url = comic.url || '#';
    const description = comic.description || '';
    
    // Clean publisher
    let cleanPublisher = publisher;
    if (publisher.includes('.mw-parser-output')) {
        const matches = publisher.match(/(Fantagraphics|Drawn & Quarterly|Alternative Comics|Last Gasp|Top Shelf|Dark Horse|Image|Eclipse|Marvel|DC|Apex|Kitchen Sink|Print Mint|Rip Off)/g);
        cleanPublisher = matches ? matches.join(', ') : 'Various';
    }
    
    return `
        <div class="comic-card">
            <div class="comic-card-header">
                <h3>${escapeHtml(title)}</h3>
                <span class="issue">#${escapeHtml(comic.issue_number || '1')}</span>
            </div>
            <div class="comic-card-body">
                <div class="publisher">🏢 ${escapeHtml(cleanPublisher)}</div>
                <div class="date">📅 ${escapeHtml(date)}</div>
                ${description ? `<div class="description">${escapeHtml(description.substring(0, 150))}${description.length > 150 ? '...' : ''}</div>` : ''}
            </div>
            <div class="comic-card-footer">
                <span class="format">📖 ${escapeHtml(format)}</span>
                ${url !== '#' ? `<a href="${escapeHtml(url)}" target="_blank" class="link">🔗 Wikipedia</a>` : ''}
            </div>
        </div>
    `;
}

function updateStats(comics) {
    const headerStats = document.getElementById('headerStats');
    const publishers = new Set(comics.map(c => c.publisher).filter(p => p && p !== '' && !p.includes('.mw-parser-output')));
    
    headerStats.innerHTML = `
        <span>📚 <span class="stat-number">${comics.length}</span> Comics</span>
        <span>🏢 <span class="stat-number">${publishers.size}</span> Publishers</span>
    `;
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Search function
function performSearch() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!query) {
        renderComics(allComics);
        return;
    }
    
    const results = allComics.filter(comic => 
        (comic.title && comic.title.toLowerCase().includes(query)) ||
        (comic.publisher && comic.publisher.toLowerCase().includes(query)) ||
        (comic.series && comic.series.toLowerCase().includes(query))
    );
    
    if (results.length === 0) {
        document.getElementById('content').innerHTML = `<div class="loading">🔍 No results for "${escapeHtml(query)}"</div>`;
    } else {
        renderComics(results);
    }
}

// Make functions globally accessible
window.performSearch = performSearch;
window.loadComics = loadComics;