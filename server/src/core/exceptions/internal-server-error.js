import AppError from "./app-error.js";

export default class InternalServerError extends AppError {
    constructor(message = "Internal Server Error", details = null) {
        super(message, 500, "INTERNAL_SERVER_ERROR", details);
    }
}