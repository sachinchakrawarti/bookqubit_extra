export const validateTagCode = (value) => {

    if (!value) {
        return "Tag code is required.";
    }

    if (value.length > 50) {
        return "Tag code is too long.";
    }

    return null;
};

export const validateSlug = (slug) => {

    const regex = /^[a-z0-9-]+$/;

    if (!regex.test(slug)) {
        return "Invalid slug.";
    }

    return null;
};

export const validateColor = (color) => {

    if (!color) return null;

    const regex = /^#([A-Fa-f0-9]{6})$/;

    if (!regex.test(color)) {
        return "Invalid color.";
    }

    return null;
};