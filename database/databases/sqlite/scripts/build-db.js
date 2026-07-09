const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const ROOT = path.join(__dirname, "..");

const config = require(path.join(ROOT, "config", "database.json"));

const db = new sqlite3.Database(config.database);

const SCHEMA_ROOT = path.join(ROOT, "schema");

const BUILD_ORDER = [
    "tables",
    "constraints",
    "foreign_keys",
    "indexes",
    "views",
    "triggers",
    "seed"
];

const SKIP_FOLDERS = new Set([
    "docs",
    "tests",
    "rollback",
    "queries",
    "samples",
    "validation",
    "functions",
    "procedures",
    "migrations"
]);

function getSchemaFolders(dir) {

    if (!fs.existsSync(dir))
        return [];

    return fs.readdirSync(dir)
        .map(name => path.join(dir, name))
        .filter(p => fs.statSync(p).isDirectory());

}

function getSqlFiles(folder) {

    if (!fs.existsSync(folder))
        return [];

    return fs.readdirSync(folder)
        .filter(file => file.endsWith(".sql"))
        .sort()
        .map(file => path.join(folder, file));

}

console.log("");
console.log("======================================");
console.log(" BookQubit SQLite Builder");
console.log("======================================");

db.serialize(() => {

    const schemaTypes = getSchemaFolders(SCHEMA_ROOT);

    for (const schemaType of schemaTypes) {

        const schemas = getSchemaFolders(schemaType);

        for (const schema of schemas) {

            console.log("");
            console.log("Schema:", path.basename(schema));

            for (const folder of BUILD_ORDER) {

                const currentFolder = path.join(schema, folder);

                const sqlFiles = getSqlFiles(currentFolder);

                for (const file of sqlFiles) {

                    console.log("   >", folder, path.basename(file));

                    const sql = fs.readFileSync(file, "utf8");

                    db.exec(sql, err => {

                        if (err) {

                            console.log("");
                            console.log("ERROR");
                            console.log(file);
                            console.log(err.message);

                        }

                    });

                }

            }

        }

    }

});

db.close(() => {

    console.log("");
    console.log("======================================");
    console.log("Database Build Completed");
    console.log("======================================");

});