import dotenv from "dotenv";

dotenv.config();

export default {
    sqlite: {
        filename: process.env.DATABASE_PATH,
    },
};