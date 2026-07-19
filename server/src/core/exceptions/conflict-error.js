import AppError from "./app-error.js";

export default class ConflictError extends AppError {
    constructor(message = "Conflict", details = null) {
        super(message, 409, "CONFLICT", details);
    }
}