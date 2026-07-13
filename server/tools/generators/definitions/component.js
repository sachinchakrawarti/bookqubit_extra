// generators/definitions/component.js
export default {
  description: 'Create a new component (controller, service, model, etc.)',
  prompts: [
    {
      type: 'input',
      name: 'moduleName',
      message: 'Module name:',
      validate: (input) => !!input || 'Module name is required',
    },
    {
      type: 'list',
      name: 'componentType',
      message: 'Component type:',
      choices: ['controller', 'service', 'repository', 'model', 'dto', 'validator', 'route', 'middleware'],
    },
  ],
  actions: function (data) {
    const componentPath = data.componentType === 'dto' ? 'dto' :
                         data.componentType === 'validator' ? 'validations' :
                         data.componentType === 'route' ? 'routes' :
                         data.componentType === 'middleware' ? 'middleware' :
                         `${data.componentType}s`;

    const fileName = data.componentType === 'dto' ? 
      `create-{{kebabCase moduleName}}.dto.js` :
      data.componentType === 'validator' ?
      `{{kebabCase moduleName}}.validation.js` :
      data.componentType === 'route' ?
      `{{kebabCase moduleName}}.routes.js` :
      data.componentType === 'middleware' ?
      `{{kebabCase moduleName}}.middleware.js` :
      `{{kebabCase moduleName}}.${data.componentType}.js`;

    const templateMap = {
      controller: 'generators/templates/component/controller.hbs',
      service: 'generators/templates/component/service.hbs',
      repository: 'generators/templates/component/repository.hbs',
      model: 'generators/templates/component/model.hbs',
      dto: 'generators/templates/component/dto.hbs',
      validator: 'generators/templates/component/validator.hbs',
      route: 'generators/templates/component/route.hbs',
      middleware: 'generators/templates/component/middleware.hbs',
    };

    return [
      {
        type: 'add',
        path: `src/api/v1/modules/{{kebabCase moduleName}}/${componentPath}/${fileName}`,
        templateFile: templateMap[data.componentType] || 'generators/templates/component/default.hbs',
      },
    ];
  },
};