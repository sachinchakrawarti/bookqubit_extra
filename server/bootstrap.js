// bootstrap.js
import { resolveUrl } from './config/paths.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 BookQubit Server Starting...\n');

// Store original import
const originalImport = globalThis.import;

// Override import BEFORE loading server.js
globalThis.import = async (specifier) => {
  if (typeof specifier === 'string' && specifier.startsWith('@')) {
    const url = resolveUrl(specifier);
    console.log(`🔄 Resolving: ${specifier} → ${url.pathname}`);
    return originalImport(url.href);
  }
  return originalImport(specifier);
};

console.log('✅ Path resolver ready\n');

// Now import and run server
try {
  const server = await import('./server.js');
  console.log('✅ Server loaded successfully');
} catch (error) {
  console.error('❌ Failed to start server:', error.message);
  console.error(error.stack);
  process.exit(1);
}