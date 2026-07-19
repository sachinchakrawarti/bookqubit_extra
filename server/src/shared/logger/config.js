import pino from "pino";

const config = {
    level: process.env.LOG_LEVEL || "info",

    timestamp: pino.stdTimeFunctions.isoTime,

    redact: {
        paths: [
            "req.headers.authorization",
            "password",
            "token",
            "refreshToken"
        ],
        censor: "[REDACTED]"
    }
};

export default config;