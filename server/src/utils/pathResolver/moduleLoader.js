import fs from 'fs';
import path from 'path';
import { resolveAlias } from './resolver.js';
import { fileExists, readFile, readJSON, readSQL, listFiles } from './fileUtils.js';

/**
 * Dynamic import with alias support
 * @param {string} importPath - Path with alias
 * @returns {Promise<any>}
 */
export const importModule = async (importPath) => {
  const resolved = resolveAlias(importPath);
  
  // Check if file exists
  if (!fs.existsSync(resolved)) {
    // Try with .js extension
    const withExt = resolved.endsWith('.js') ? resolved : `${resolved}.js`;
    if (fs.existsSync(withExt)) {
      return import(withExt);
    }
    // Try with .mjs extension
    const withMjs = resolved.endsWith('.mjs') ? resolved : `${resolved}.mjs`;
    if (fs.existsSync(withMjs)) {
      return import(withMjs);
    }
    // Try with .cjs extension
    const withCjs = resolved.endsWith('.cjs') ? resolved : `${resolved}.cjs`;
    if (fs.existsSync(withCjs)) {
      return import(withCjs);
    }
    // Try with index.js
    const indexJs = path.join(resolved, 'index.js');
    if (fs.existsSync(indexJs)) {
      return import(indexJs);
    }
    throw new Error(`Module not found: ${importPath} -> ${resolved}`);
  }
  
  return import(resolved);
};

/**
 * Require with alias support (CommonJS)
 * @param {string} importPath - Path with alias
 * @returns {any}
 */
export const requireModule = (importPath) => {
  const resolved = resolveAlias(importPath);
  try {
    return require(resolved);
  } catch (error) {
    // Try with .js extension
    try {
      const withExt = resolved.endsWith('.js') ? resolved : `${resolved}.js`;
      return require(withExt);
    } catch {
      throw new Error(`Module not found: ${importPath} -> ${resolved}`);
    }
  }
};

/**
 * Create a module loader for a specific module
 * @param {string} moduleName - Module name (e.g., 'languages')
 * @returns {Object}
 */
export const createModuleLoader = (moduleName) => {
  const basePath = `@modules/${moduleName}`;
  
  return {
    // Import from module
    import: (filePath) => importModule(`${basePath}/${filePath}`),
    
    // Require from module
    require: (filePath) => requireModule(`${basePath}/${filePath}`),
    
    // Get path
    path: (...segments) => resolveAlias(`${basePath}/${segments.join('/')}`),
    
    // Check if file exists
    exists: (filePath) => fileExists(`${basePath}/${filePath}`),
    
    // Read file
    readFile: (filePath) => readFile(`${basePath}/${filePath}`),
    
    // Read JSON
    readJSON: (filePath) => readJSON(`${basePath}/${filePath}`),
    
    // Read SQL
    readSQL: (filePath) => readSQL(`${basePath}/${filePath}`),
    
    // List files
    listFiles: (subDir = '') => listFiles(`${basePath}/${subDir}`)
  };
};

/**
 * Load all modules from a directory
 * @param {string} importPath - Path with alias
 * @returns {Promise<Object>} Object with all modules
 */
export const loadModules = async (importPath) => {
  const files = listFiles(importPath);
  const modules = {};
  
  for (const file of files) {
    if (file.endsWith('.js') || file.endsWith('.mjs') || file.endsWith('.cjs')) {
      const name = path.basename(file, path.extname(file));
      try {
        modules[name] = await importModule(`${importPath}/${file}`);
      } catch (error) {
        console.error(`Failed to load module ${file}:`, error);
      }
    }
  }
  
  return modules;
};

// Export default
export default {
  importModule,
  requireModule,
  createModuleLoader,
  loadModules
};