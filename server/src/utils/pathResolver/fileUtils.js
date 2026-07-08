import fs from 'fs';
import path from 'path';
import { resolveAlias, getAbsolutePath } from './resolver.js';

/**
 * Check if file exists
 * @param {string} importPath - Path with alias
 * @returns {boolean}
 */
export const fileExists = (importPath) => {
  const resolved = resolveAlias(importPath);
  return fs.existsSync(resolved);
};

/**
 * Check if path exists and is a file
 * @param {string} importPath - Path with alias
 * @returns {boolean}
 */
export const isFile = (importPath) => {
  const resolved = resolveAlias(importPath);
  return fs.existsSync(resolved) && fs.statSync(resolved).isFile();
};

/**
 * Check if path exists and is a directory
 * @param {string} importPath - Path with alias
 * @returns {boolean}
 */
export const isDirectory = (importPath) => {
  const resolved = resolveAlias(importPath);
  return fs.existsSync(resolved) && fs.statSync(resolved).isDirectory();
};

/**
 * Read file content
 * @param {string} importPath - Path with alias
 * @param {string} encoding - File encoding (default: 'utf8')
 * @returns {string|Buffer}
 */
export const readFile = (importPath, encoding = 'utf8') => {
  const resolved = resolveAlias(importPath);
  try {
    return fs.readFileSync(resolved, encoding);
  } catch (error) {
    throw new Error(`Failed to read file: ${resolved}\n${error.message}`);
  }
};

/**
 * Read and parse JSON file
 * @param {string} importPath - Path with alias
 * @returns {Object}
 */
export const readJSON = (importPath) => {
  const content = readFile(importPath);
  try {
    return JSON.parse(content);
  } catch (error) {
    throw new Error(`Failed to parse JSON: ${importPath}\n${error.message}`);
  }
};

/**
 * Read SQL file
 * @param {string} importPath - Path with alias
 * @returns {string}
 */
export const readSQL = (importPath) => {
  return readFile(importPath);
};

/**
 * Get list of files in directory
 * @param {string} importPath - Path with alias
 * @returns {string[]}
 */
export const listFiles = (importPath) => {
  const resolved = resolveAlias(importPath);
  if (!fs.existsSync(resolved)) {
    return [];
  }
  return fs.readdirSync(resolved);
};

/**
 * Get list of files with specific extension
 * @param {string} importPath - Path with alias
 * @param {string} extension - File extension (e.g., '.js')
 * @returns {string[]}
 */
export const listFilesByExtension = (importPath, extension) => {
  const files = listFiles(importPath);
  return files.filter(file => file.endsWith(extension));
};

/**
 * Get all SQL files in directory with their content
 * @param {string} importPath - Path with alias
 * @returns {Object} Object with SQL file contents
 */
export const loadSQLFiles = (importPath) => {
  const sqlFiles = {};
  const resolved = resolveAlias(importPath);
  
  if (!fs.existsSync(resolved)) {
    return sqlFiles;
  }
  
  const files = fs.readdirSync(resolved);
  
  for (const file of files) {
    if (file.endsWith('.sql')) {
      const name = path.basename(file, '.sql');
      const filePath = path.join(importPath, file);
      sqlFiles[name] = readSQL(filePath);
    }
  }
  
  return sqlFiles;
};

/**
 * Get all JavaScript files in directory recursively
 * @param {string} importPath - Path with alias
 * @param {string} extension - File extension (default: '.js')
 * @returns {string[]}
 */
export const getAllFiles = (importPath, extension = '.js') => {
  const resolved = resolveAlias(importPath);
  const files = [];
  
  if (!fs.existsSync(resolved)) {
    return files;
  }
  
  const entries = fs.readdirSync(resolved, { withFileTypes: true });
  
  for (const entry of entries) {
    const entryPath = path.join(importPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllFiles(entryPath, extension));
    } else if (entry.name.endsWith(extension)) {
      files.push(entryPath);
    }
  }
  
  return files;
};

/**
 * Write file content
 * @param {string} importPath - Path with alias
 * @param {string|Buffer} content - Content to write
 * @param {string} encoding - File encoding (default: 'utf8')
 */
export const writeFile = (importPath, content, encoding = 'utf8') => {
  const resolved = resolveAlias(importPath);
  try {
    // Ensure directory exists
    const dir = path.dirname(resolved);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(resolved, content, encoding);
  } catch (error) {
    throw new Error(`Failed to write file: ${resolved}\n${error.message}`);
  }
};

// Export default
export default {
  fileExists,
  isFile,
  isDirectory,
  readFile,
  readJSON,
  readSQL,
  listFiles,
  listFilesByExtension,
  loadSQLFiles,
  getAllFiles,
  writeFile
};