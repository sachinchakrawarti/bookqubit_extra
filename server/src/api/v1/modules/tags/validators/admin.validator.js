// ======================================================
// Admin Validator
// ======================================================

export const validateBulkDelete = (ids = []) => {

    if (!Array.isArray(ids) || ids.length === 0) {
        return {
            valid: false,
            message: "Tag IDs are required.",
        };
    }

    return {
        valid: true,
    };
};

export const validateImport = (rows = []) => {

    if (!Array.isArray(rows)) {
        return {
            valid: false,
            message: "Invalid import file.",
        };
    }

    return {
        valid: true,
    };
};