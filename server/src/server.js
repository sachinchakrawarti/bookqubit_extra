import http from "http";

import app from "./app.js";
import logger from "./shared/logger/index.js";

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

const server = http.createServer(app);

/* ----------------------------------------
 * Start Server
 * -------------------------------------- */
server.listen(PORT, () => {
    logger.info({
        environment: process.env.NODE_ENV,
        host: HOST,
        port: PORT,
        url: `http://${HOST}:${PORT}`
    }, "BookQubit Server Started");
});

/* ----------------------------------------
 * Server Errors
 * -------------------------------------- */
server.on("error", (error) => {
    switch (error.code) {
        case "EADDRINUSE":
            logger.fatal(
                { port: PORT },
                `Port ${PORT} is already in use.`
            );
            break;

        case "EACCES":
            logger.fatal(
                { port: PORT },
                `Permission denied for port ${PORT}.`
            );
            break;

        default:
            logger.fatal(error, "Server Error");
    }

    process.exit(1);
});

/* ----------------------------------------
 * Uncaught Exceptions
 * -------------------------------------- */
process.on("uncaughtException", (error) => {
    logger.fatal(error, "Uncaught Exception");
    process.exit(1);
});

/* ----------------------------------------
 * Unhandled Promise Rejections
 * -------------------------------------- */
process.on("unhandledRejection", (reason) => {
    logger.fatal(reason, "Unhandled Promise Rejection");
    process.exit(1);
});

/* ----------------------------------------
 * Graceful Shutdown
 * -------------------------------------- */
process.on("SIGINT", () => {
    logger.info("Stopping BookQubit Server...");

    server.close(() => {
        logger.info("BookQubit Server Stopped");
        process.exit(0);
    });
});

process.on("SIGTERM", () => {
    logger.info("Stopping BookQubit Server...");

    server.close(() => {
        logger.info("BookQubit Server Stopped");
        process.exit(0);
    });
});

export default server;