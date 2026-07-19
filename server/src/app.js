import express from "express";

import routes from "./routes.js";

import {
    requestLogger,
    corsMiddleware,
    compressionMiddleware,
    rateLimitMiddleware,
    errorHandler,
    notFoundMiddleware
} from "./middleware/index.js";

const app = express();

// Logging
app.use(requestLogger);

// Security & Performance
app.use(corsMiddleware);
app.use(compressionMiddleware);
app.use(rateLimitMiddleware);

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use(express.static("storage/public"));

// Routes
app.use("/", routes);

// 404
app.use(notFoundMiddleware);

// Global Error Handler
app.use(errorHandler);

export default app;