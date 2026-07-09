#!/usr/bin/env node

/**
 * ---------------------------------------------------------
 * BookQubit SQLite
 * Apply Schema Template
 * ---------------------------------------------------------
 *
 * Copies missing folders/files from:
 *      templates/schema_template/
 *
 * into every *_schema folder under:
 *      schema/
 *
 * Existing files are NEVER overwritten
 * unless --force is passed.
 *
 * Usage:
 *      node scripts/apply-template.js
 *
 *      node scripts/apply-template.js --force
 *
 *      node scripts/apply-template.js --dry-run
 *
 * ---------------------------------------------------------
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const TEMPLATE_DIR = path.join(
    ROOT,
    "templates",
    "schema_template"
);

const SCHEMA_DIR = path.join(
    ROOT,
    "schema"
);

const FORCE = process.argv.includes("--force");
const DRY_RUN = process.argv.includes("--dry-run");

let schemasProcessed = 0;
let foldersCreated = 0;
let filesCreated = 0;
let skipped = 0;

function ensureDir(dir) {

    if (DRY_RUN)
        return;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        foldersCreated++;
    }

}

function copyRecursive(src, dest) {

    if (!fs.existsSync(src))
        return;

    const stat = fs.statSync(src);

    if (stat.isDirectory()) {

        ensureDir(dest);

        const items = fs.readdirSync(src);

        for (const item of items) {

            copyRecursive(
                path.join(src, item),
                path.join(dest, item)
            );

        }

        return;

    }

    if (fs.existsSync(dest) && !FORCE) {

        skipped++;
        return;

    }

    if (!DRY_RUN) {

        fs.copyFileSync(src, dest);

    }

    filesCreated++;

}

function findSchemas(dir) {

    const results = [];

    const items = fs.readdirSync(dir);

    for (const item of items) {

        const full = path.join(dir, item);

        if (!fs.statSync(full).isDirectory())
            continue;

        if (item.endsWith("_schema")) {

            results.push(full);

        } else {

            results.push(...findSchemas(full));

        }

    }

    return results;

}

console.log("");
console.log("======================================");
console.log(" BookQubit Template Generator");
console.log("======================================");
console.log("");

if (!fs.existsSync(TEMPLATE_DIR)) {

    console.log("Template folder not found:");
    console.log(TEMPLATE_DIR);
    process.exit(1);

}

const schemas = findSchemas(SCHEMA_DIR);

if (schemas.length === 0) {

    console.log("No schemas found.");
    process.exit(0);

}

for (const schema of schemas) {

    schemasProcessed++;

    const name = path.basename(schema);

    console.log("Processing:", name);

    copyRecursive(TEMPLATE_DIR, schema);

}

console.log("");
console.log("======================================");
console.log(" Summary");
console.log("======================================");
console.log("");

console.log("Schemas Processed :", schemasProcessed);
console.log("Folders Created   :", foldersCreated);
console.log("Files Created     :", filesCreated);
console.log("Skipped Existing  :", skipped);

if (DRY_RUN) {

    console.log("");
    console.log("Dry Run Complete.");

} else {

    console.log("");
    console.log("Template Applied Successfully.");

}

console.log("");