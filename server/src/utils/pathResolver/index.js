// Export all from each module
export * from './aliases.js';
export * from './resolver.js';
export * from './fileUtils.js';
export * from './moduleLoader.js';

// Import all for default export
import aliases from './aliases.js';
import resolver from './resolver.js';
import fileUtils from './fileUtils.js';
import moduleLoader from './moduleLoader.js';

// Create unified path resolver object
const pathResolver = {
  // From aliases
  ...aliases,
  getAliasNames: aliases.getAliasNames,
  isAlias: aliases.isAlias,
  getAliasPath: aliases.getAliasPath,
  addAlias: aliases.addAlias,
  removeAlias: aliases.removeAlias,
  
  // From resolver
  resolveAlias: resolver.resolveAlias,
  absPath: resolver.absPath,
  getRelativePath: resolver.getRelativePath,
  getAbsolutePath: resolver.getAbsolutePath,
  clearCache: resolver.clearCache,
  getRoot: resolver.getRoot,
  getResolvedAliases: resolver.getResolvedAliases,
  
  // From fileUtils
  fileExists: fileUtils.fileExists,
  isFile: fileUtils.isFile,
  isDirectory: fileUtils.isDirectory,
  readFile: fileUtils.readFile,
  readJSON: fileUtils.readJSON,
  readSQL: fileUtils.readSQL,
  listFiles: fileUtils.listFiles,
  listFilesByExtension: fileUtils.listFilesByExtension,
  loadSQLFiles: fileUtils.loadSQLFiles,
  getAllFiles: fileUtils.getAllFiles,
  writeFile: fileUtils.writeFile,
  
  // From moduleLoader
  importModule: moduleLoader.importModule,
  requireModule: moduleLoader.requireModule,
  createModuleLoader: moduleLoader.createModuleLoader,
  loadModules: moduleLoader.loadModules,
  
  // Convenience aliases
  resolve: resolver.resolveAlias,
  import: moduleLoader.importModule,
  require: moduleLoader.requireModule,
  exists: fileUtils.fileExists,
  read: fileUtils.readFile,
  readJson: fileUtils.readJSON,
  readSql: fileUtils.readSQL,
  list: fileUtils.listFiles,
  write: fileUtils.writeFile
};

// Export default
export default pathResolver;