const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const ROOT = path.join(__dirname, "..");

const config = require(path.join(ROOT, "config", "database.json"));

const db = new sqlite3.Database(config.database);

const SCHEMA_ROOT = path.join(ROOT, "schema");

function getDirectories(dir) {
    if (!fs.existsSync(dir)) return [];

    return fs.readdirSync(dir)
        .map(name => path.join(dir, name))
        .filter(item => fs.statSync(item).isDirectory());
}

function getSeedFiles(seedFolder) {

    if (!fs.existsSync(seedFolder))
        return [];

    return fs.readdirSync(seedFolder)
        .filter(file =>
            file.endsWith(".seed.sql") ||
            file === "seed.sql"
        )
        .sort()
        .map(file => path.join(seedFolder, file));
}

console.log("");
console.log("======================================");
console.log("BookQubit SQLite Seeder");
console.log("======================================");

db.serialize(() => {

    const schemaTypes = getDirectories(SCHEMA_ROOT);

    for (const schemaType of schemaTypes) {

        const schemas = getDirectories(schemaType);

        for (const schema of schemas) {

            const seedFolder = path.join(schema, "seed");

            const seedFiles = getSeedFiles(seedFolder);

            if (seedFiles.length === 0)
                continue;

            console.log("");
            console.log("Schema:", path.basename(schema));

            for (const file of seedFiles) {

                console.log("   >", path.basename(file));

                const sql = fs.readFileSync(file, "utf8");

                db.exec(sql, err => {

                    if (err) {

                        console.error("");
                        console.error("ERROR");
                        console.error(file);
                        console.error(err.message);

                    }

                });

            }

        }

    }

});

db.close(() => {

    console.log("");
    console.log("======================================");
    console.log("Seed Completed");
    console.log("======================================");

});