/**
 * ============================================================================
 * File        : validator.js
 * Module      : Import Helpers
 * Description : Common validation utilities.
 * ============================================================================
 */

class Validator {

    static isString(value) {
        return typeof value === "string";
    }

    static isNonEmptyString(value) {
        return (
            typeof value === "string" &&
            value.trim().length > 0
        );
    }

    static isArray(value) {
        return Array.isArray(value);
    }

    static isObject(value) {
        return (
            value !== null &&
            typeof value === "object" &&
            !Array.isArray(value)
        );
    }

    static isNull(value) {
        return value === null;
    }

    static isValidGender(gender) {

        const allowed = [
            "male",
            "female",
            "other",
            "unknown"
        ];

        return allowed.includes(gender);
    }

    static isValidDate(date) {

        if (date === null)
            return true;

        return /^\d{4}-\d{2}-\d{2}$/.test(date);
    }

    static isValidLanguageCode(code) {

        const allowed = [
            "en",
            "hi",
            "ur"
        ];

        return allowed.includes(code);
    }

    static isPositiveInteger(value) {
        return (
            Number.isInteger(value) &&
            value > 0
        );
    }

}

module.exports = Validator;