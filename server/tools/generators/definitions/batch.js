// generators/definitions/batch.js
export default {
  description: 'Create multiple modules at once',
  prompts: [
    {
      type: 'input',
      name: 'moduleList',
      message: 'Enter module names separated by commas:',
      filter: (input) => input.split(',').map(s => s.trim()),
      validate: (input) => input.length > 0 || 'At least one module name is required',
    },
    {
      type: 'list',
      name: 'moduleType',
      message: 'Module type for all:',
      choices: ['simple', 'full-crud', 'admin', 'analytics'],
      default: 'full-crud',
    },
  ],
  actions: function (data) {
    const actions = [];
    const modules = data.moduleList;
    
    modules.forEach(moduleName => {
      const modulePath = `src/api/v1/modules/${moduleName}`;
      const folders = [
        'config', 'constants', 'controllers', 'dto', 'models',
        'queries', 'queries/admin', 'queries/shared',
        'repositories', 'routes', 'services',
        'transformers', 'types', 'utils', 'validations',
      ];

      if (data.moduleType === 'full-crud' || data.moduleType === 'admin') {
        folders.push('middleware');
      }

      folders.forEach((folder) => {
        actions.push({
          type: 'add',
          path: `${modulePath}/${folder}/.gitkeep`,
          template: '',
          skipIfExists: true,
          data: { moduleName },
        });
      });

      const files = [
        { path: 'index.js', template: 'module/index.js.hbs' },
        { path: `controllers/${moduleName}.controller.js`, template: 'module/controller.js.hbs' },
        { path: `services/${moduleName}.service.js`, template: 'module/service.js.hbs' },
        { path: `repositories/${moduleName}.repository.js`, template: 'module/repository.js.hbs' },
        { path: `models/${moduleName}.model.js`, template: 'module/model.js.hbs' },
        { path: `routes/${moduleName}.routes.js`, template: 'module/routes.js.hbs' },
        { path: `validations/${moduleName}.validation.js`, template: 'module/validation.js.hbs' },
        { path: `constants/${moduleName}.constants.js`, template: 'module/constants.js.hbs' },
        { path: `config/${moduleName}.config.js`, template: 'module/config.js.hbs' },
      ];

      files.forEach((file) => {
        actions.push({
          type: 'add',
          path: `${modulePath}/${file.path}`,
          templateFile: `generators/templates/${file.template}`,
          data: { moduleName },
        });
      });
    });

    return actions;
  },
};