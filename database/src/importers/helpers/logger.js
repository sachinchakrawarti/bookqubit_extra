/**
 * ============================================================================
 * File        : logger.js
 * Module      : Import Helpers
 * Description : Console logger for import operations.
 * ============================================================================
 */

class Logger {

    static info(message) {
        console.log(`[INFO] ${message}`);
    }

    static success(message) {
        console.log(`[SUCCESS] ${message}`);
    }

    static warning(message) {
        console.warn(`[WARNING] ${message}`);
    }

    static error(message) {
        console.error(`[ERROR] ${message}`);
    }

    static divider() {
        console.log("------------------------------------------------------------");
    }

    static title(title) {
        console.log("");
        console.log("============================================================");
        console.log(title);
        console.log("============================================================");
    }

}

module.exports = Logger;