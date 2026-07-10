// scripts/health-check.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🏥 Project Health Check\n');

// Check modules
const modulesPath = path.join(process.cwd(), 'src', 'api', 'v1', 'modules');
const modules = fs.readdirSync(modulesPath).filter(f => 
  fs.statSync(path.join(modulesPath, f)).isDirectory() && !f.startsWith('.')
);

console.log(`📦 Total Modules: ${modules.length}`);
modules.forEach(m => console.log(`  ✅ ${m}`));

// Check tests
const testsPath = path.join(process.cwd(), 'tests', 'unit');
const testModules = fs.readdirSync(testsPath).filter(f =>
  fs.statSync(path.join(testsPath, f)).isDirectory() && !f.startsWith('.')
);

console.log(`\n🧪 Test Coverage: ${testModules.length}/${modules.length} modules have tests`);

// Check for missing tests
const missingTests = modules.filter(m => !testModules.includes(m));
if (missingTests.length > 0) {
  console.log('\n⚠️  Modules without tests:');
  missingTests.forEach(m => console.log(`  ❌ ${m}`));
}