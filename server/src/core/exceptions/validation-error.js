import AppError from "./app-error.js";

export default class ValidationError extends AppError {
    constructor(message = "Validation Failed", details = null) {
        super(message, 422, "VALIDATION_ERROR", details);
    }
}