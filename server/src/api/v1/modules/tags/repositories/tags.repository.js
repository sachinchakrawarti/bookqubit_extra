// src/api/v1/modules/tags/repositories/tags.repository.js

import db from "../../../../../../config/database.js";
import queries from "../queries/index.js";

class TagsRepository {

    listTags(params = {}) {
        return db.all(queries.public.listTags, params);
    }

    getTag(id, languageId) {
        return db.get(
            queries.public.getTag,
            {
                id,
                languageId
            }
        );
    }

    searchTags(keyword) {
        return db.all(
            queries.public.searchTags,
            {
                keyword: `%${keyword}%`
            }
        );
    }

}

export default new TagsRepository();