import AppError from "./app-error.js";

export default class DatabaseError extends AppError {
    constructor(message = "Database Error", details = null) {
        super(message, 500, "DATABASE_ERROR", details);
    }
}