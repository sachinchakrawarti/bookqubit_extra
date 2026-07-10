// generators/definitions/module.js
export default {
  description: 'Create a new module with full CRUD structure',
  prompts: [
    {
      type: 'input',
      name: 'moduleName',
      message: 'Module name (e.g., author, books, tags):',
      validate: (input) => !!input || 'Module name is required',
    },
    {
      type: 'list',
      name: 'moduleType',
      message: 'Module type:',
      choices: ['simple', 'full-crud', 'admin', 'analytics'],
      default: 'full-crud',
    },
    {
      type: 'confirm',
      name: 'generateTests',
      message: 'Generate test files?',
      default: true,
    },
  ],
  actions: function (data) {
    const actions = [];
    const modulePath = `src/api/v1/modules/{{kebabCase moduleName}}`;
    const testPath = `tests/unit/{{kebabCase moduleName}}`;

    // Create main folders
    const folders = [
      'config', 'constants', 'controllers', 'dto', 'models',
      'queries', 'queries/admin', 'queries/shared',
      'repositories', 'routes', 'services',
      'transformers', 'types', 'utils', 'validations',
    ];

    if (data.moduleType === 'full-crud' || data.moduleType === 'admin') {
      folders.push('middleware');
    }

    // Add folder actions
    folders.forEach((folder) => {
      actions.push({
        type: 'add',
        path: `${modulePath}/${folder}/.gitkeep`,
        template: '',
        skipIfExists: true,
      });
    });

    // Create test folders if generateTests is true
    if (data.generateTests) {
      const testFolders = ['controllers', 'services', 'repositories'];
      testFolders.forEach((folder) => {
        actions.push({
          type: 'add',
          path: `${testPath}/${folder}/.gitkeep`,
          template: '',
          skipIfExists: true,
        });
      });
    }

    // Add main files
    const files = [
      { path: 'index.js', template: 'module/index.js.hbs' },
      { path: `controllers/{{kebabCase moduleName}}.controller.js`, template: 'module/controller.js.hbs' },
      { path: `services/{{kebabCase moduleName}}.service.js`, template: 'module/service.js.hbs' },
      { path: `repositories/{{kebabCase moduleName}}.repository.js`, template: 'module/repository.js.hbs' },
      { path: `models/{{kebabCase moduleName}}.model.js`, template: 'module/model.js.hbs' },
      { path: `dto/create-{{kebabCase moduleName}}.dto.js`, template: 'module/create.dto.js.hbs' },
      { path: `dto/update-{{kebabCase moduleName}}.dto.js`, template: 'module/update.dto.js.hbs' },
      { path: `routes/{{kebabCase moduleName}}.routes.js`, template: 'module/routes.js.hbs' },
      { path: `validations/{{kebabCase moduleName}}.validation.js`, template: 'module/validation.js.hbs' },
      { path: `constants/{{kebabCase moduleName}}.constants.js`, template: 'module/constants.js.hbs' },
      { path: `config/{{kebabCase moduleName}}.config.js`, template: 'module/config.js.hbs' },
    ];

    if (data.moduleType === 'full-crud' || data.moduleType === 'admin') {
      files.push({
        path: `middleware/{{kebabCase moduleName}}.middleware.js`,
        template: 'module/middleware.js.hbs'
      });
    }

    files.forEach((file) => {
      actions.push({
        type: 'add',
        path: `${modulePath}/${file.path}`,
        templateFile: `generators/templates/${file.template}`,
        skipIfExists: true,
      });
    });

    // Add test files if generateTests is true
    if (data.generateTests) {
      const testFiles = [
        { path: 'controllers/{{kebabCase moduleName}}.controller.test.js', template: 'test/unit.controller.hbs' },
        { path: 'services/{{kebabCase moduleName}}.service.test.js', template: 'test/unit.service.hbs' },
        { path: 'repositories/{{kebabCase moduleName}}.repository.test.js', template: 'test/unit.repository.hbs' },
        { path: '{{kebabCase moduleName}}.api.test.js', template: 'test/integration.api.hbs' },
      ];

      testFiles.forEach((file) => {
        actions.push({
          type: 'add',
          path: `${testPath}/${file.path}`,
          templateFile: `generators/templates/${file.template}`,
          skipIfExists: true,
        });
      });
    }

    // SQL Queries
    const sqlQueries = {
      create: `-- Create a new {{moduleName}}\nINSERT INTO {{kebabCase moduleName}} (name, description, created_at, updated_at) \nVALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`,
      read: `-- Get a {{moduleName}} by ID\nSELECT * FROM {{kebabCase moduleName}} WHERE id = ? AND deleted_at IS NULL;`,
      update: `-- Update a {{moduleName}}\nUPDATE {{kebabCase moduleName}} SET name = ?, description = ?, updated_at = CURRENT_TIMESTAMP \nWHERE id = ? AND deleted_at IS NULL;`,
      delete: `-- Soft delete a {{moduleName}}\nUPDATE {{kebabCase moduleName}} SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?;`,
      list: `-- List all {{moduleName}}s with pagination\nSELECT * FROM {{kebabCase moduleName}} WHERE deleted_at IS NULL \nORDER BY created_at DESC LIMIT ? OFFSET ?;`,
      search: `-- Search {{moduleName}}s\nSELECT * FROM {{kebabCase moduleName}} WHERE deleted_at IS NULL \nAND (name LIKE ? OR description LIKE ?) ORDER BY created_at DESC;`,
      stats: `-- Stats for {{moduleName}}s\nSELECT COUNT(*) as total_count, \nCOUNT(CASE WHEN created_at >= DATE('now', '-30 days') THEN 1 END) as last_30_days,\nCOUNT(CASE WHEN created_at >= DATE('now', '-7 days') THEN 1 END) as last_7_days\nFROM {{kebabCase moduleName}} WHERE deleted_at IS NULL;`
    };

    const queryTypes = data.moduleType === 'simple' ? ['create', 'read', 'update', 'delete'] :
                      data.moduleType === 'admin' ? ['create', 'read', 'update', 'delete', 'list', 'search', 'stats'] :
                      ['create', 'read', 'update', 'delete', 'list', 'search'];

    queryTypes.forEach((queryType) => {
      actions.push({
        type: 'add',
        path: `${modulePath}/queries/admin/${queryType}.sql`,
        template: sqlQueries[queryType] || `-- ${queryType} query for {{moduleName}}`,
        skipIfExists: true,
      });
    });

    return actions;
  },
};