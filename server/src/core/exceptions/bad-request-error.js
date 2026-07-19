import AppError from "./app-error.js";

export default class BadRequestError extends AppError {
    constructor(message = "Bad Request", details = null) {
        super(message, 400, "BAD_REQUEST", details);
    }
}