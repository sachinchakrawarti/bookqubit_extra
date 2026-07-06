export const validateLanguage = (language) => {

    if (!language) {
        return "Language code is required.";
    }

    if (language.length !== 2) {
        return "Invalid language code.";
    }

    return null;
};

export const validateTagName = (name) => {

    if (!name) {
        return "Tag name is required.";
    }

    if (name.length > 255) {
        return "Tag name is too long.";
    }

    return null;
};

export const validateDescription = (description) => {

    if (!description) {
        return null;
    }

    if (description.length > 2000) {
        return "Description is too long.";
    }

    return null;
};