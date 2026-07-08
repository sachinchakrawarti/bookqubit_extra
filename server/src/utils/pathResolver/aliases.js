import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '../../..');

// Define all aliases with their absolute paths
export const ALIASES = {
  '@database': path.join(PROJECT_ROOT, 'database'),
  '@config': path.join(PROJECT_ROOT, 'config'),
  '@utils': path.join(PROJECT_ROOT, 'src/utils'),
  '@api': path.join(PROJECT_ROOT, 'src/api'),
  '@modules': path.join(PROJECT_ROOT, 'src/api/v1/modules'),
  '@root': PROJECT_ROOT,
  '@src': path.join(PROJECT_ROOT, 'src'),
  '@logs': path.join(PROJECT_ROOT, 'logs'),
  '@public': path.join(PROJECT_ROOT, 'public'),
  '@models': path.join(PROJECT_ROOT, 'src/models'),
  '@controllers': path.join(PROJECT_ROOT, 'src/controllers'),
  '@services': path.join(PROJECT_ROOT, 'src/services'),
  '@repositories': path.join(PROJECT_ROOT, 'src/repositories'),
  '@routes': path.join(PROJECT_ROOT, 'src/routes'),
  '@middleware': path.join(PROJECT_ROOT, 'src/middleware'),
  '@validators': path.join(PROJECT_ROOT, 'src/validators'),
  '@dto': path.join(PROJECT_ROOT, 'src/dto'),
  '@enums': path.join(PROJECT_ROOT, 'src/enums'),
  '@constants': path.join(PROJECT_ROOT, 'src/constants'),
  '@exceptions': path.join(PROJECT_ROOT, 'src/exceptions'),
  '@transformers': path.join(PROJECT_ROOT, 'src/transformers'),
  '@types': path.join(PROJECT_ROOT, 'src/types')
};

// Get all alias names
export const getAliasNames = () => Object.keys(ALIASES);

// Check if path uses an alias
export const isAlias = (importPath) => {
  return Object.keys(ALIASES).some(alias => importPath.startsWith(alias));
};

// Get alias path
export const getAliasPath = (alias) => {
  return ALIASES[alias];
};

// Add custom alias at runtime
export const addAlias = (name, path) => {
  ALIASES[name] = path;
};

// Remove alias
export const removeAlias = (name) => {
  delete ALIASES[name];
};

// Export default
export default ALIASES;