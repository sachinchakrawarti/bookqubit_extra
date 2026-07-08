import path from 'path';
import { fileURLToPath } from 'url';
import { ALIASES, isAlias } from './aliases.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '../../..');

// Cache for resolved paths
const pathCache = new Map();

/**
 * Resolve an alias to actual file system path
 * @param {string} importPath - Path with alias (e.g., '@database/connection.js')
 * @returns {string} Resolved absolute path
 */
export const resolveAlias = (importPath) => {
  // Check cache first
  if (pathCache.has(importPath)) {
    return pathCache.get(importPath);
  }

  let resolvedPath = importPath;
  
  // Find and replace alias
  for (const [alias, aliasPath] of Object.entries(ALIASES)) {
    if (importPath.startsWith(alias)) {
      const relative = importPath.replace(alias, '');
      resolvedPath = path.join(aliasPath, relative);
      break;
    }
  }
  
  // Normalize path separators for Windows compatibility
  resolvedPath = resolvedPath.replace(/\\/g, '/');
  
  // Cache the result
  pathCache.set(importPath, resolvedPath);
  
  return resolvedPath;
};

/**
 * Get absolute path from root
 * @param {...string} segments - Path segments
 * @returns {string} Absolute path
 */
export const absPath = (...segments) => {
  return path.join(PROJECT_ROOT, ...segments);
};

/**
 * Get relative path from current file to target
 * @param {string} currentFileUrl - import.meta.url of current file
 * @param {string} targetPath - Target path with alias or relative
 * @returns {string} Relative path
 */
export const getRelativePath = (currentFileUrl, targetPath) => {
  const currentFilePath = fileURLToPath(currentFileUrl);
  const currentDir = path.dirname(currentFilePath);
  
  let target = targetPath;
  if (isAlias(targetPath)) {
    target = resolveAlias(targetPath);
  } else {
    target = path.join(PROJECT_ROOT, targetPath);
  }
  
  return path.relative(currentDir, target);
};

/**
 * Get absolute path with alias resolution
 * @param {string} importPath - Path with alias
 * @returns {string} Absolute path
 */
export const getAbsolutePath = (importPath) => {
  if (isAlias(importPath)) {
    return resolveAlias(importPath);
  }
  return path.join(PROJECT_ROOT, importPath);
};

/**
 * Clear path cache
 */
export const clearCache = () => {
  pathCache.clear();
};

/**
 * Get project root
 */
export const getRoot = () => PROJECT_ROOT;

/**
 * Get all aliases with their resolved paths
 */
export const getResolvedAliases = () => {
  const resolved = {};
  for (const [alias, aliasPath] of Object.entries(ALIASES)) {
    resolved[alias] = aliasPath;
  }
  return resolved;
};

// Export default
export default {
  resolveAlias,
  absPath,
  getRelativePath,
  getAbsolutePath,
  clearCache,
  getRoot,
  getResolvedAliases
};