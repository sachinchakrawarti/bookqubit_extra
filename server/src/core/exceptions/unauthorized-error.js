import AppError from "./app-error.js";

export default class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized", details = null) {
        super(message, 401, "UNAUTHORIZED", details);
    }
}