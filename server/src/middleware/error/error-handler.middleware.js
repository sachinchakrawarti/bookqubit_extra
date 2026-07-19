import logger from "../../shared/logger/index.js";

export default function errorHandler(err, req, res, next) {

    logger.error(err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });

}