const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const db = new Database("./bookqubit_database.db");

const SCHEMA_DIR = path.join(__dirname, "schema");

function getAllSeedFiles(dir) {
    let files = [];

    for (const item of fs.readdirSync(dir)) {
        const fullPath = path.join(dir, item);

        if (fs.statSync(fullPath).isDirectory()) {
            files = files.concat(getAllSeedFiles(fullPath));
        } else if (
            item.endsWith(".seed.json")
        ) {
            files.push(fullPath);
        }
    }

    return files;
}

function importSeed(filePath) {

    const tableName = path
        .basename(filePath)
        .replace(".seed.json", "");

    console.log(`Importing ${tableName}...`);

    const data = JSON.parse(
        fs.readFileSync(filePath, "utf8")
    );

    if (!Array.isArray(data) || data.length === 0) {
        console.log("Skipped (empty)");
        return;
    }

    const columns = Object.keys(data[0]);

    const placeholders = columns
        .map(() => "?")
        .join(",");

    const sql = `
        INSERT OR IGNORE INTO ${tableName}
        (${columns.join(",")})
        VALUES (${placeholders})
    `;

    const stmt = db.prepare(sql);

    const insertMany = db.transaction(rows => {
        for (const row of rows) {
            stmt.run(columns.map(c => row[c]));
        }
    });

    insertMany(data);

    console.log(`✔ ${data.length} rows imported`);
}

const seedFiles = getAllSeedFiles(SCHEMA_DIR);

for (const file of seedFiles) {
    importSeed(file);
}

console.log("\nAll seed files imported successfully.");

db.close();