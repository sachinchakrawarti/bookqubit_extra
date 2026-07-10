// scripts/tools/list-modules.js
#!/usr/bin/env node
/**
 * List all modules with details
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..', '..');

const modulesPath = path.join(rootDir, 'src', 'api', 'v1', 'modules');

console.log(chalk.blue.bold('\n📦 Module List\n'));

const modules = fs.readdirSync(modulesPath)
  .filter(f => fs.statSync(path.join(modulesPath, f)).isDirectory() && !f.startsWith('.'));

modules.forEach((module, index) => {
  const modulePath = path.join(modulesPath, module);
  const stats = fs.statSync(modulePath);
  
  // Count files
  const files = fs.readdirSync(modulePath);
  const fileCount = files.length;
  
  // Check for key files
  const hasController = fs.existsSync(path.join(modulePath, 'controllers', `${module}.controller.js`));
  const hasService = fs.existsSync(path.join(modulePath, 'services', `${module}.service.js`));
  const hasRepository = fs.existsSync(path.join(modulePath, 'repositories', `${module}.repository.js`));
  const hasRoutes = fs.existsSync(path.join(modulePath, 'routes', `${module}.routes.js`));
  const hasModel = fs.existsSync(path.join(modulePath, 'models', `${module}.model.js`));

  console.log(chalk.green(`\n${index + 1}. ${chalk.bold(module)}`));
  console.log(`   📁 Files: ${fileCount}`);
  console.log(`   📅 Modified: ${stats.mtime.toLocaleDateString()}`);
  console.log(`   ✅ Controller: ${hasController ? '✅' : '❌'}`);
  console.log(`   ✅ Service: ${hasService ? '✅' : '❌'}`);
  console.log(`   ✅ Repository: ${hasRepository ? '✅' : '❌'}`);
  console.log(`   ✅ Routes: ${hasRoutes ? '✅' : '❌'}`);
  console.log(`   ✅ Model: ${hasModel ? '✅' : '❌'}`);
});