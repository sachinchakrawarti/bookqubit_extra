import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  '@config': path.resolve(__dirname),
  '@database': path.resolve(__dirname, '../database'),
  '@api': path.resolve(__dirname, '../src/api/v1'),
  '@modules': path.resolve(__dirname, '../src/api/v1/modules'),
  '@utils': path.resolve(__dirname, '../src/utils'),
  '@root': path.resolve(__dirname, '..'),
  '@src': path.resolve(__dirname, '../src'),
  '@logs': path.resolve(__dirname, '../logs'),
  '@public': path.resolve(__dirname, '../public'),
};