// src/api/v1/modules/tags/queries/index.js

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadSQL(relativePath) {
    return fs.readFileSync(
        path.join(__dirname, relativePath),
        "utf8"
    );
}

const queries = {
    admin: {
        createTag: loadSQL("./admin/create-tag.sql"),
        updateTag: loadSQL("./admin/update-tag.sql"),
        deleteTag: loadSQL("./admin/delete-tag.sql"),
        getTag: loadSQL("./admin/get-tag.sql"),
        listTags: loadSQL("./admin/list-tags.sql"),
    },

    public: {
        getTag: loadSQL("./public/get-tag.sql"),
        listTags: loadSQL("./public/list-tags.sql"),
        searchTags: loadSQL("./public/search-tags.sql"),
    },

    translations: {
        createTranslation: loadSQL("./translations/create-translation.sql"),
        updateTranslation: loadSQL("./translations/update-translation.sql"),
        deleteTranslation: loadSQL("./translations/delete-translation.sql"),
        getTranslation: loadSQL("./translations/get-translation.sql"),
        getTranslationByLanguage: loadSQL("./translations/get-translation-by-language.sql"),
        listTranslations: loadSQL("./translations/list-translations.sql"),
        listLanguages: loadSQL("./translations/list-languages.sql"),
        existsTranslation: loadSQL("./translations/exists-translation.sql"),
        searchTranslations: loadSQL("./translations/search-translations.sql"),
    },

    analytics: {
        tagUsage: loadSQL("./analytics/tag-usage.sql"),
        popularTags: loadSQL("./analytics/popular-tags.sql"),
    },

    shared: {
        commonCTE: loadSQL("./shared/common-cte.sql"),
        selectColumns: loadSQL("./shared/select-columns.sql"),
        joins: loadSQL("./shared/joins.sql"),
        filters: loadSQL("./shared/filters.sql"),
        search: loadSQL("./shared/search.sql"),
        sorting: loadSQL("./shared/sorting.sql"),
        pagination: loadSQL("./shared/pagination.sql"),
        whereActive: loadSQL("./shared/where-active.sql"),
        whereFeatured: loadSQL("./shared/where-featured.sql"),
        whereSystem: loadSQL("./shared/where-system.sql"),
        whereLanguage: loadSQL("./shared/where-language.sql"),
        count: loadSQL("./shared/count.sql"),
        exists: loadSQL("./shared/exists.sql"),
    },
};

export default queries;