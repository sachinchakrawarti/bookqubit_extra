const path = require("path");

const fsUtil = require("./utils/filesystem");
const template = require("./utils/template");
const generator = require("./utils/generator");
const logger = require("./utils/logger");

const args = process.argv.slice(2);

if (args.length < 2) {

    console.log(`
Usage

node create-schema.js <schema_name> <type> [--force] [--dry-run]

Examples

node create-schema.js users core
node create-schema.js books feature
node create-schema.js authors domain
`);

    process.exit(1);

}

const schemaName = args[0].toLowerCase();

const schemaType = args[1].toLowerCase();

const FORCE = args.includes("--force");

const DRY_RUN = args.includes("--dry-run");

const ROOT = path.join(__dirname, "..");

const TEMPLATE_MAP = {

    core: "schema_template",

    domain: "schema_template",

    feature: "schema_template",

    action: "schema_template",

    analytics: "schema_template",

    notification: "schema_template",

    shared: "schema_template"

};

const DESTINATION_MAP = {

    core: "schema/01_core",

    domain: "schema/02_domain",

    feature: "schema/03_feature",

    action: "schema/04_interaction",

    analytics: "schema/05_analytics",

    notification: "schema/06_notification",

    shared: "schema/07_shared"

};

if (!TEMPLATE_MAP[schemaType]) {

    logger.error("Unknown schema type.");

    process.exit(1);

}

const templateFolder = path.join(

    ROOT,

    "templates",

    TEMPLATE_MAP[schemaType]

);

const destination = path.join(

    ROOT,

    DESTINATION_MAP[schemaType],

    `${schemaName}_schema`

);

logger.title("CREATE SCHEMA");

logger.value("Schema", schemaName);

logger.value("Type", schemaType);

logger.value("Template", templateFolder);

logger.value("Destination", destination);

logger.line();

if (!fsUtil.exists(templateFolder)) {

    logger.error("Template folder not found.");

    process.exit(1);

}

if (fsUtil.exists(destination)) {

    if (!FORCE) {

        logger.error("Schema already exists.");

        logger.info("Use --force to recreate.");

        process.exit(1);

    }

    logger.warning("Removing existing schema...");

    fsUtil.deleteDirectory(destination);

}

if (DRY_RUN) {

    logger.warning("Dry Run Enabled");

    process.exit(0);

}

logger.info("Copying schema template...");

fsUtil.copyDirectory(

    templateFolder,

    destination

);

logger.success("Template copied.");