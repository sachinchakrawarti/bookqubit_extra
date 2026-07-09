const path = require("path");

const fs = require("./filesystem");
const template = require("./template");

/**
 * Generate one file from template
 */
function generateFile({

    templateFile,

    outputFile,

    schemaName,

    category,

    variables = {}

}) {

    if (!fs.exists(templateFile)) {
        return;
    }

    const content = fs.readFile(templateFile);

    const result = template.processTemplate(
        content,
        schemaName,
        category,
        variables
    );

    fs.writeFile(outputFile, result);

}

/**
 * Generate multiple files
 */
function generateFiles(files, schemaName, category, variables = {}) {

    files.forEach(file => {

        generateFile({

            templateFile: file.template,

            outputFile: file.output,

            schemaName,

            category,

            variables

        });

    });

}

/**
 * Generate default schema files
 */
function generateDefaultFiles(root, schemaName, category) {

    const templateRoot = path.join(
        root,
        "templates",
        "file_templates"
    );

    const schemaRoot = path.join(
        root,
        "schema"
    );

    const folders = [

        {
            folder: "tables",
            template: "table.sql",
            output: `001.${schemaName}.sql`
        },

        {
            folder: "indexes",
            template: "index.sql",
            output: `001.${schemaName}.index.sql`
        },

        {
            folder: "constraints",
            template: "constraint.sql",
            output: `001.${schemaName}.constraint.sql`
        },

        {
            folder: "foreign_keys",
            template: "foreign_key.sql",
            output: `001.${schemaName}.foreign_key.sql`
        },

        {
            folder: "views",
            template: "view.sql",
            output: `001.${schemaName}.view.sql`
        },

        {
            folder: "functions",
            template: "function.sql",
            output: `001.${schemaName}.function.sql`
        },

        {
            folder: "procedures",
            template: "procedure.sql",
            output: `001.${schemaName}.procedure.sql`
        },

        {
            folder: "triggers",
            template: "trigger.sql",
            output: `001.${schemaName}.trigger.sql`
        },

        {
            folder: "seed",
            template: "seed.sql",
            output: `001.${schemaName}.seed.sql`
        },

        {
            folder: "validation",
            template: "validation.sql",
            output: `001.${schemaName}.validation.sql`
        },

        {
            folder: "rollback",
            template: "rollback.sql",
            output: `001.rollback.sql`
        },

        {
            folder: "migrations",
            template: "migration.sql",
            output: `001.initial.sql`
        }

    ];

    folders.forEach(item => {

        const templateFile = path.join(
            templateRoot,
            item.template
        );

        const outputFile = path.join(
            schemaRoot,
            item.folder,
            item.output
        );

        generateFile({

            templateFile,

            outputFile,

            schemaName,

            category

        });

    });

}

/**
 * Generate documentation
 */
function generateDocumentation(root, schemaName, category) {

    const docs = [

        "README.md",
        "CHANGELOG.md",
        "DATA_TYPES.md",
        "TABLES.md",
        "RELATIONSHIPS.md",
        "QUERY_EXAMPLES.md",
        "INDEX_GUIDE.md",
        "MIGRATION_GUIDE.md",
        "PERFORMANCE_GUIDE.md",
        "SECURITY_GUIDE.md",
        "API_GUIDE.md",
        "SEED_GUIDE.md",
        "VALIDATION_GUIDE.md",
        "VIEW_GUIDE.md",
        "TRIGGER_GUIDE.md",
        "FAQ.md",
        "ROADMAP.md",
        "GLOSSARY.md",
        "DATA_FIELDS.md"

    ];

    docs.forEach(doc => {

        generateFile({

            templateFile: path.join(
                root,
                "templates",
                "file_templates",
                doc
            ),

            outputFile: path.join(
                root,
                "schema",
                "docs",
                doc
            ),

            schemaName,

            category

        });

    });

}

/**
 * Generate manifest
 */
function generateManifest(root, schemaName, category) {

    generateFile({

        templateFile: path.join(
            root,
            "templates",
            "file_templates",
            "manifest.json"
        ),

        outputFile: path.join(
            root,
            "schema",
            "manifest.json"
        ),

        schemaName,

        category

    });

}

/**
 * Generate schema order
 */
function generateSchemaOrder(root, schemaName, category) {

    generateFile({

        templateFile: path.join(
            root,
            "templates",
            "file_templates",
            "schema_order.sql"
        ),

        outputFile: path.join(
            root,
            "schema",
            "schema_order.sql"
        ),

        schemaName,

        category

    });

}

module.exports = {

    generateFile,

    generateFiles,

    generateDefaultFiles,

    generateDocumentation,

    generateManifest,

    generateSchemaOrder

};