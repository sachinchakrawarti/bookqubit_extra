import geographyModule from './src/api/v1/modules/geography/index.js';

console.log('=== Geography Module Debug ===');
console.log('Type:', typeof geographyModule);
console.log('Keys:', Object.keys(geographyModule));
console.log('routes:', geographyModule.routes);
console.log('default routes:', geographyModule.default?.routes);
console.log('geographyRoutes:', geographyModule.geographyRoutes);
console.log('adminRoutes:', geographyModule.adminRoutes);
console.log('publicRoutes:', geographyModule.publicRoutes);
console.log('analyticsRoutes:', geographyModule.analyticsRoutes);
console.log('initModule:', geographyModule.initModule);

// Check if routes is a function or object
if (geographyModule.routes) {
  console.log('routes type:', typeof geographyModule.routes);
  console.log('routes constructor:', geographyModule.routes.constructor.name);
}
