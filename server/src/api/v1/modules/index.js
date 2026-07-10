// src/api/v1/modules/index.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Auto-register all modules
const modules = {};
const moduleFolders = fs.readdirSync(__dirname).filter(f => {
  return fs.statSync(path.join(__dirname, f)).isDirectory() && !f.startsWith('.');
});

moduleFolders.forEach(async (folder) => {
  try {
    const module = await import(`./${folder}/index.js`);
    modules[folder] = module.default || module;
  } catch (error) {
    console.log(`⚠️  Could not load module: ${folder}`);
  }
});

export default modules;