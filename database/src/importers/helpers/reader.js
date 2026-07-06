/**
 * ============================================================================
 * File        : reader.js
 * Module      : Import Helpers
 * Description : Reads and parses JSON import files.
 * ============================================================================
 */

const fs = require("fs");
const path = require("path");

class Reader {

    /**
     * Read a JSON file.
     * @param {string} filePath
     * @returns {Object|Array}
     */
    static readJson(filePath) {

        const absolutePath = path.resolve(filePath);

        if (!fs.existsSync(absolutePath)) {
            throw new Error(`File not found: ${absolutePath}`);
        }

        const content = fs.readFileSync(
            absolutePath,
            "utf8"
        );

        return JSON.parse(content);
    }

    /**
     * Read a text file.
     * @param {string} filePath
     * @returns {string}
     */
    static readText(filePath) {

        const absolutePath = path.resolve(filePath);

        if (!fs.existsSync(absolutePath)) {
            throw new Error(`File not found: ${absolutePath}`);
        }

        return fs.readFileSync(
            absolutePath,
            "utf8"
        );
    }

    /**
     * Check whether a file exists.
     * @param {string} filePath
     * @returns {boolean}
     */
    static exists(filePath) {

        return fs.existsSync(
            path.resolve(filePath)
        );
    }

}

module.exports = Reader;