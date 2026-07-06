import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    sqlite: {
        filename: path.resolve(
            __dirname,
            "../../database/databases/sqlite/db/bookqubit_database.db"
        ),
    },
};