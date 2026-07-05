/**
 * ============================================================================
 * File        : import.manager.js
 * Module      : Import Manager
 * Description : Runs all database importers.
 * ============================================================================
 */

const Logger = require("./helpers/logger");

const AuthorImporter = require("./author.importer");
// const BookImporter = require("./book.importer");
// const PublisherImporter = require("./publisher.importer");

async function runImports() {

    Logger.title("BookQubit Database Import");

    try {

        Logger.info("Starting import process...");

        // Import Authors
        await AuthorImporter.import();

        // Import Books
        // await BookImporter.import();

        // Import Publishers
        // await PublisherImporter.import();

        Logger.success("All imports completed successfully.");

    }
    catch (error) {

        Logger.error(error.message);

        process.exit(1);

    }

}

runImports();