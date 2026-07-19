import dotenv from "dotenv";
import path from "path";

const NODE_ENV = process.env.NODE_ENV || "development";

const envFile = path.resolve(
    process.cwd(),
    "config",
    "env",
    `${NODE_ENV}.env`
);

dotenv.config({ path: envFile });

export default process.env;