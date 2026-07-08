// src/utils/pathResolver.js
import { resolveAlias } from '../../config/aliases.js';
import { fileURLToPath } from 'url';

// Helper to import with aliases
export async function importWithAlias(importPath) {
  const resolved = resolveAlias(importPath);
  const fileUrl = new URL(`file:///${resolved}`);
  return import(fileUrl.href);
}

// Helper to require with aliases (if needed)
export function requireWithAlias(importPath) {
  const resolved = resolveAlias(importPath);
  return require(resolved);
}

// Helper to get file URL
export function getFileUrl(importPath) {
  const resolved = resolveAlias(importPath);
  return new URL(`file:///${resolved}`);
}

export default {
  importWithAlias,
  requireWithAlias,
  getFileUrl,
  resolveAlias
};