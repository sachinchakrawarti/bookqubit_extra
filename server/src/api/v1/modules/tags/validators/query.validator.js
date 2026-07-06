// ======================================================
// Query Validator
// ======================================================

export const validatePagination = (page = 1, limit = 20) => {

    page = Number(page);
    limit = Number(limit);

    if (!Number.isInteger(page) || page < 1) {
        page = 1;
    }

    if (!Number.isInteger(limit) || limit < 1) {
        limit = 20;
    }

    if (limit > 100) {
        limit = 100;
    }

    return {
        page,
        limit,
        offset: (page - 1) * limit,
    };
};

export const validateSort = (
    sortBy = "sort_order",
    order = "ASC"
) => {

    const allowedFields = [
        "tag_id",
        "tag_code",
        "slug",
        "sort_order",
        "created_at",
        "updated_at",
    ];

    if (!allowedFields.includes(sortBy)) {
        sortBy = "sort_order";
    }

    order = order.toUpperCase();

    if (!["ASC", "DESC"].includes(order)) {
        order = "ASC";
    }

    return {
        sortBy,
        order,
    };
};

export const validateSearch = (keyword = "") => {

    return keyword.trim().substring(0, 100);
};