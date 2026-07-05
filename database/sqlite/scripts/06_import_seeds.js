// =============================================================================
// BookQubit Database
// File: scripts/06_import_json.js
// Description: Import all *.seed.json files into SQLite
// =============================================================================

const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

const DATABASE = path.join(__dirname, "../bookqubit_database.db");
const SCHEMA_DIR = path.join(__dirname, "../schema");

// -----------------------------------------------------------------------------
// Open Database
// -----------------------------------------------------------------------------

const db = new sqlite3.Database(DATABASE, (err) => {
    if (err) {
        console.error("❌ Database Error:", err.message);
        process.exit(1);
    }

    console.log("✅ Connected to BookQubit Database");
});

// -----------------------------------------------------------------------------
// Find all JSON Seed Files
// -----------------------------------------------------------------------------

function findSeedFiles(dir) {

    let files = [];

    const items = fs.readdirSync(dir);

    for (const item of items) {

        const fullPath = path.join(dir, item);

        if (fs.statSync(fullPath).isDirectory()) {

            files.push(...findSeedFiles(fullPath));

        } else if (item.endsWith(".seed.json")) {

            files.push(fullPath);

        }

    }

    return files;
}

// -----------------------------------------------------------------------------
// Import JSON File
// -----------------------------------------------------------------------------

function importSeed(file) {

    const fileName = path.basename(file);

    const tableName = fileName.replace(".seed.json", "");

    console.log("\n-------------------------------------");
    console.log("Table :", tableName);
    console.log("File  :", file);

    const rows = JSON.parse(fs.readFileSync(file, "utf8"));

    if (!Array.isArray(rows)) {

        console.log("⚠ Invalid JSON");

        return;
    }

    console.log(`Found ${rows.length} rows`);

    rows.forEach((row) => {

        const columns = Object.keys(row);

        const placeholders = columns.map(() => "?").join(",");

        const sql = `
            INSERT OR IGNORE INTO ${tableName}
            (${columns.join(",")})
            VALUES (${placeholders})
        `;

        const values = columns.map(col => row[col]);

        db.run(sql, values, (err) => {

            if (err) {

                console.log("❌", err.message);

            }

        });

    });

    console.log(`✅ Imported ${rows.length} rows`);

}

// -----------------------------------------------------------------------------
// Start Import
// -----------------------------------------------------------------------------

console.log("\n======================================");
console.log(" BookQubit JSON Importer");
console.log("======================================");

const seedFiles = findSeedFiles(SCHEMA_DIR);

console.log(`Found ${seedFiles.length} seed file(s)\n`);

seedFiles.forEach(importSeed);

// -----------------------------------------------------------------------------
// Close Database
// -----------------------------------------------------------------------------

db.close(() => {

    console.log("\n======================================");
    console.log(" Import Completed");
    console.log("======================================");

});