// src/api/v1/modules/tags/repositories/analytics.repository.js

import db from "../../../../../../config/database.js";
import queries from "../queries/index.js";

class AnalyticsRepository {

    popularTags() {
        return db.all(
            queries.analytics.popularTags
        );
    }

    tagUsage() {
        return db.all(
            queries.analytics.tagUsage
        );
    }

}

export default new AnalyticsRepository();