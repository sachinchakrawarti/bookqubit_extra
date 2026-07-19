import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

import response, {
    HTTP_STATUS,
    MESSAGES,
} from "./shared/response/index.js";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
|--------------------------------------------------------------------------
| Home Page
|--------------------------------------------------------------------------
*/

router.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../storage/public/index.html")
    );
});

/*
|--------------------------------------------------------------------------
| Global Error Test
|--------------------------------------------------------------------------
*/

router.get("/error", (req, res) => {
    throw new Error("Testing Global Error Handler");
});

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

router.get("/health", (req, res) => {
    response.success(res, {
        message: "Server is running.",
        data: {
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
        },
    });
});

/*
|--------------------------------------------------------------------------
| Response System Tests
|--------------------------------------------------------------------------
*/

router.get("/response/success", (req, res) => {
    response.success(res, {
        message: MESSAGES.SUCCESS,
        data: {
            id: 1,
            name: "BookQubit",
        },
    });
});

router.get("/response/created", (req, res) => {
    response.success(res, {
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.CREATED,
        data: {
            id: 10,
            title: "Atomic Habits",
        },
    });
});

router.get("/response/pagination", (req, res) => {
    response.success(res, {
        message: MESSAGES.FETCHED,
        data: [
            { id: 1, title: "Book 1" },
            { id: 2, title: "Book 2" },
            { id: 3, title: "Book 3" },
        ],
        meta: response.pagination({
            page: 2,
            limit: 10,
            total: 95,
        }),
    });
});

router.get("/response/bad-request", (req, res) => {
    response.error(res, {
        status: HTTP_STATUS.BAD_REQUEST,
        message: MESSAGES.BAD_REQUEST,
    });
});

router.get("/response/unauthorized", (req, res) => {
    response.error(res, {
        status: HTTP_STATUS.UNAUTHORIZED,
        message: MESSAGES.UNAUTHORIZED,
    });
});

router.get("/response/forbidden", (req, res) => {
    response.error(res, {
        status: HTTP_STATUS.FORBIDDEN,
        message: MESSAGES.FORBIDDEN,
    });
});

router.get("/response/not-found", (req, res) => {
    response.error(res, {
        status: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.NOT_FOUND,
    });
});

router.get("/response/validation", (req, res) => {
    response.error(res, {
        status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
        message: MESSAGES.VALIDATION_FAILED,
        errors: {
            title: "Title is required.",
            author: "Author is required.",
        },
    });
});

router.get("/response/server-error", (req, res) => {
    response.error(res, {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: MESSAGES.INTERNAL_SERVER_ERROR,
    });
});

export default router;