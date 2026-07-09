const path = require("path");

/**
 * Default placeholder values
 */
function getDefaultVariables(schemaName, category) {

    const now = new Date();

    return {

        SCHEMA_NAME: `${schemaName}_schema`,

        TABLE_NAME: schemaName,

        CATEGORY: category,

        DATE: now.toISOString().split("T")[0],

        YEAR: now.getFullYear(),

        VERSION: "1.0.0",

        AUTHOR: "BookQubit",

        DATABASE: "SQLite",

        PROJECT: "BookQubit",

        CREATED_AT: now.toISOString(),

        UPDATED_AT: now.toISOString()

    };

}

/**
 * Replace {{PLACEHOLDER}}
 */
function replacePlaceholders(content, variables = {}) {

    return content.replace(/\{\{(.*?)\}\}/g, (match, key) => {

        key = key.trim();

        return variables[key] ?? match;

    });

}

/**
 * Replace placeholders in filename
 *
 * Example:
 * 001.{{TABLE_NAME}}.sql
 */
function replaceFileName(fileName, variables = {}) {

    return replacePlaceholders(fileName, variables);

}

/**
 * Build variables object
 */
function buildVariables(schemaName, category, custom = {}) {

    return {

        ...getDefaultVariables(schemaName, category),

        ...custom

    };

}

/**
 * Process template file content
 */
function processTemplate(content, schemaName, category, custom = {}) {

    const vars = buildVariables(
        schemaName,
        category,
        custom
    );

    return replacePlaceholders(content, vars);

}

/**
 * Process filename
 */
function processFileName(fileName, schemaName, category, custom = {}) {

    const vars = buildVariables(
        schemaName,
        category,
        custom
    );

    return replaceFileName(fileName, vars);

}

/**
 * Rename every placeholder inside a path
 */
function processPath(targetPath, schemaName, category, custom = {}) {

    const vars = buildVariables(
        schemaName,
        category,
        custom
    );

    const parts = targetPath.split(path.sep);

    return parts
        .map(part => replaceFileName(part, vars))
        .join(path.sep);

}

/**
 * Return variable map
 */
function variables(schemaName, category, custom = {}) {

    return buildVariables(
        schemaName,
        category,
        custom
    );

}

module.exports = {

    getDefaultVariables,

    buildVariables,

    variables,

    replacePlaceholders,

    replaceFileName,

    processTemplate,

    processFileName,

    processPath

};