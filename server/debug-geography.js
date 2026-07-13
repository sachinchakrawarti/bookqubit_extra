import geographyModule from './src/api/v1/modules/geography/index.js';

console.log('=== Geography Module Debug ===');
console.log('Type:', typeof geographyModule);
console.log('Keys:', Object.keys(geographyModule));
console.log('');

console.log('Checking exports:');
console.log('- routes:', geographyModule.routes ? '✅ Exists' : '❌ Missing');
console.log('- geographyRoutes:', geographyModule.geographyRoutes ? '✅ Exists' : '❌ Missing');
console.log('- adminRoutes:', geographyModule.adminRoutes ? '✅ Exists' : '❌ Missing');
console.log('- publicRoutes:', geographyModule.publicRoutes ? '✅ Exists' : '❌ Missing');
console.log('- analyticsRoutes:', geographyModule.analyticsRoutes ? '✅ Exists' : '❌ Missing');
console.log('- initModule:', geographyModule.initModule ? '✅ Exists' : '❌ Missing');
console.log('- default:', geographyModule.default ? '✅ Exists' : '❌ Missing');
console.log('');

if (geographyModule.default) {
  console.log('Default export keys:', Object.keys(geographyModule.default));
}

console.log('');

// Try to get the router
const router = geographyModule.routes || 
              geographyModule.geographyRoutes || 
              geographyModule.default?.routes || 
              geographyModule.default?.geographyRoutes ||
              geographyModule;

console.log('Final router check:');
console.log('- router:', router ? '✅ Found' : '❌ Not Found');
if (router) {
  console.log('- router type:', typeof router);
  console.log('- router constructor:', router.constructor?.name);
  console.log('- router methods:', router.stack ? 'Has stack' : 'No stack');
  console.log('- router is function:', typeof router === 'function');
  console.log('- router is object:', typeof router === 'object');
}