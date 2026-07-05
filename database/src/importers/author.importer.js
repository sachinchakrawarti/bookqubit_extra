/**
 * ============================================================================
 * File        : author.importer.js
 * Module      : Author Importer
 * Description : Imports authors from JSON into SQLite.
 * ============================================================================
 */

const path = require("path");

const db = require("./db");

const Reader = require("./helpers/reader");
const Validator = require("./helpers/validator");
const Logger = require("./helpers/logger");

const jsonFile = path.join(
    __dirname,
    "../imports/authors/authors_0001.json"
);

try {

    Logger.title("Author Import");

    // Read JSON
    const authors = Reader.readJson(jsonFile);

    Logger.info(`Found ${authors.length} author(s).`);

    // TODO:
    // Begin Transaction

    for (const author of authors) {

        if (!Validator.isValidGender(author.gender)) {

            Logger.warning(
                `Skipping author because of invalid gender.`
            );

            continue;
        }

        Logger.info(
            `Importing: ${author.translations[0].name}`
        );

        // TODO:
        // Insert into author

        // TODO:
        // Insert into author_translation

        // TODO:
        // Insert into author_alias

        // TODO:
        // Insert into author_language

    }

    // TODO:
    // Commit Transaction

    Logger.success("Author import completed.");

}
catch (error) {

    Logger.error(error.message);

}