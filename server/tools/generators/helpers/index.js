// generators/helpers/index.js
export default {
  upperCase: (text) => text.toUpperCase(),
  lowerCase: (text) => text.toLowerCase(),
  kebabCase: (text) => text.replace(/\s+/g, '-').toLowerCase(),
  pascalCase: (text) => {
    return text
      .replace(/(\w)(\w*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase())
      .replace(/\s+/g, '');
  },
  camelCase: (text) => {
    return text
      .replace(/(\w)(\w*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase())
      .replace(/\s+/g, '')
      .replace(/^./, (str) => str.toLowerCase());
  },
  pluralize: (text) => {
    if (text.endsWith('y')) return text.slice(0, -1) + 'ies';
    if (text.endsWith('s')) return text + 'es';
    return text + 's';
  },
  currentDate: () => new Date().toISOString().split('T')[0],
  currentYear: () => new Date().getFullYear(),
};