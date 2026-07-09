const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);

if (args.length < 2) {
    console.log(`
Usage:

node create-schema.js <schema_name> <type>

Types:

core
domain
feature
action
analytics
notification
tranding
shared

Examples:

node create-schema.js users core
node create-schema.js authors domain
node create-schema.js books feature
node create-schema.js ratings action
node create-schema.js analytics analytics
`);
    process.exit(1);
}

const schemaName = args[0];
const schemaType = args[1].toLowerCase();

const ROOT = path.join(__dirname, "..");

const TEMPLATE_MAP = {
    core: "core_schema_template",
    domain: "domain_schema_template",
    feature: "feature_schema_template",
    action: "action_schema_template",
    analytics: "analytics_schema_template",
    notification: "notification_schema_template",
    tranding: "tranding_schema_template",
    shared: "shared_schema_template"
};

const DESTINATION_MAP = {
    core: "schema/01_core",
    domain: "schema/02_domain",
    feature: "schema/03_feature",
    action: "schema/04_actions",
    analytics: "schema/analyticschema",
    notification: "schema/notificationschema",
    tranding: "schema/trandingschema",
    shared: "schema/shared"
};

if (!TEMPLATE_MAP[schemaType]) {
    console.log("Unknown schema type.");
    process.exit(1);
}

const source = path.join(
    ROOT,
    "templates",
    TEMPLATE_MAP[schemaType]
);

const destination = path.join(
    ROOT,
    DESTINATION_MAP[schemaType],
    `${schemaName}_schema`
);

if (!fs.existsSync(source)) {
    console.log("Template not found:");
    console.log(source);
    process.exit(1);
}

if (fs.existsSync(destination)) {
    console.log("Schema already exists.");
    process.exit(1);
}

fs.cpSync(source, destination, {
    recursive: true
});

console.log("");
console.log("=======================================");
console.log("Schema Created Successfully");
console.log("=======================================");
console.log("Name :", schemaName);
console.log("Type :", schemaType);
console.log("Path :", destination);
console.log("=======================================");