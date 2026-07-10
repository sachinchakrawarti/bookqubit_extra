// generators/definitions/api.js
export default {
  description: 'Add a new API endpoint to an existing module',
  prompts: [
    {
      type: 'input',
      name: 'moduleName',
      message: 'Module name:',
      validate: (input) => !!input || 'Module name is required',
    },
    {
      type: 'input',
      name: 'endpointName',
      message: 'Endpoint name (e.g., get-by-category):',
      validate: (input) => !!input || 'Endpoint name is required',
    },
    {
      type: 'list',
      name: 'method',
      message: 'HTTP method:',
      choices: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    },
    {
      type: 'input',
      name: 'path',
      message: 'URL path (e.g., /category/:categoryId):',
      default: '/:id',
    },
  ],
  actions: function (data) {
    const endpointTemplate = `
  /**
   * {{pascalCase endpointName}}
   * {{method}} {{path}}
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async {{camelCase endpointName}}(req, res, next) {
    try {
      // TODO: Implement {{camelCase endpointName}} logic
      res.json({
        success: true,
        message: '{{pascalCase endpointName}} executed successfully',
        data: req.params,
      });
    } catch (error) {
      next(error);
    }
  }

  // Add new endpoints above this line`;

    const routeTemplate = `
// {{pascalCase endpointName}} route
router.{{lowerCase method}}('{{path}}', controller.{{camelCase endpointName}}.bind(controller));

// Add new routes above this line`;

    return [
      {
        type: 'modify',
        path: `src/api/v1/modules/{{kebabCase moduleName}}/controllers/{{kebabCase moduleName}}.controller.js`,
        pattern: /(\/\/ Add new endpoints above this line)/g,
        template: endpointTemplate,
      },
      {
        type: 'modify',
        path: `src/api/v1/modules/{{kebabCase moduleName}}/routes/{{kebabCase moduleName}}.routes.js`,
        pattern: /(\/\/ Add new routes above this line)/g,
        template: routeTemplate,
      },
    ];
  },
};