// config/aliases.js
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

// Map aliases to actual paths
export const ALIASES = {
  '@config': path.join(ROOT, 'config'),
  '@database': path.join(ROOT, 'database'),
  '@api': path.join(ROOT, 'src/api/v1'),
  '@modules': path.join(ROOT, 'src/api/v1/modules'),
  '@utils': path.join(ROOT, 'src/utils'),
  '@root': ROOT,
  '@src': path.join(ROOT, 'src'),
};

// Resolve function
export function resolveAlias(importPath) {
  for (const [alias, aliasPath] of Object.entries(ALIASES)) {
    if (importPath.startsWith(alias)) {
      const relative = importPath.replace(alias, '');
      return path.join(aliasPath, relative).replace(/\\/g, '/');
    }
  }
  return importPath;
}

export default { ALIASES, resolveAlias };