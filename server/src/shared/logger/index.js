import pino from "pino";

import config from "./config.js";
import transport from "./transport.js";

const logger = pino(config, transport);

export default logger;