import logger from "../../shared/logger/index.js";

export default function requestLogger(req, res, next) {

    const start = Date.now();

    res.on("finish", () => {

        logger.info({
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            responseTime: `${Date.now() - start}ms`,
            ip: req.ip
        }, "HTTP Request");

    });

    next();

}