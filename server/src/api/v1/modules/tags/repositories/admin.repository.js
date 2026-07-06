// src/api/v1/modules/tags/repositories/admin.repository.js

import db from "../../../../../../config/database.js";
import queries from "../queries/index.js";

class AdminRepository {

    createTag(data) {
        return db.run(queries.admin.createTag, data);
    }

    updateTag(id, data) {
        return db.run(queries.admin.updateTag, {
            id,
            ...data
        });
    }

    deleteTag(id) {
        return db.run(queries.admin.deleteTag, { id });
    }

    getTag(id) {
        return db.get(queries.admin.getTag, { id });
    }

    listTags(params = {}) {
        return db.all(queries.admin.listTags, params);
    }

}

export default new AdminRepository();