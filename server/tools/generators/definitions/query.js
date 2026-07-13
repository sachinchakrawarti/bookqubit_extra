// generators/definitions/query.js
export default {
  description: 'Create a new SQL query file',
  prompts: [
    {
      type: 'input',
      name: 'moduleName',
      message: 'Module name:',
      validate: (input) => !!input || 'Module name is required',
    },
    {
      type: 'list',
      name: 'queryType',
      message: 'Query type:',
      choices: ['create', 'read', 'update', 'delete', 'list', 'search', 'stats', 'custom'],
    },
    {
      type: 'input',
      name: 'queryName',
      message: 'Query name (for custom type):',
      when: (answers) => answers.queryType === 'custom',
    },
    {
      type: 'list',
      name: 'queryLocation',
      message: 'Query location:',
      choices: ['admin', 'analytics', 'shared', 'public'],
      default: 'admin',
    },
  ],
  actions: function (data) {
    const queryName = data.queryType === 'custom' ? data.queryName : data.queryType;
    
    const queryTemplates = {
      create: `-- Create a new {{moduleName}}\nINSERT INTO {{kebabCase moduleName}} (name, description, created_at, updated_at) \nVALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`,
      read: `-- Get a {{moduleName}} by ID\nSELECT * FROM {{kebabCase moduleName}} WHERE id = ? AND deleted_at IS NULL;`,
      update: `-- Update a {{moduleName}}\nUPDATE {{kebabCase moduleName}} SET name = ?, description = ?, updated_at = CURRENT_TIMESTAMP \nWHERE id = ? AND deleted_at IS NULL;`,
      delete: `-- Soft delete a {{moduleName}}\nUPDATE {{kebabCase moduleName}} SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?;`,
      list: `-- List all {{moduleName}}s with pagination\nSELECT * FROM {{kebabCase moduleName}} WHERE deleted_at IS NULL \nORDER BY created_at DESC LIMIT ? OFFSET ?;`,
      search: `-- Search {{moduleName}}s\nSELECT * FROM {{kebabCase moduleName}} WHERE deleted_at IS NULL \nAND (name LIKE ? OR description LIKE ?) ORDER BY created_at DESC;`,
      stats: `-- Stats for {{moduleName}}s\nSELECT COUNT(*) as total_count,\nCOUNT(CASE WHEN created_at >= DATE('now', '-30 days') THEN 1 END) as last_30_days,\nCOUNT(CASE WHEN created_at >= DATE('now', '-7 days') THEN 1 END) as last_7_days\nFROM {{kebabCase moduleName}} WHERE deleted_at IS NULL;`,
      custom: `-- Custom query for {{moduleName}}\n-- Description: {{queryName}}\nSELECT * FROM {{kebabCase moduleName}} WHERE deleted_at IS NULL;`
    };

    return [
      {
        type: 'add',
        path: `src/api/v1/modules/{{kebabCase moduleName}}/queries/${data.queryLocation}/{{kebabCase queryName}}.sql`,
        template: queryTemplates[data.queryType] || queryTemplates.custom,
      },
    ];
  },
};