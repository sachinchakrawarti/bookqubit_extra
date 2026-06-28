// src/features/bookqubit-discovery/books/bookdeatils/helpers/responsive.js

/**
 * Responsive utilities for book details feature
 * Provides responsive design helpers and utilities
 */

import { BREAKPOINTS, BREAKPOINT_LABELS } from './constants';

// ============================================
// RESPONSIVE UTILITIES
// ============================================

/**
 * Check if current viewport matches a breakpoint
 * @param {number} breakpoint - Breakpoint value
 * @param {string} operator - Comparison operator ('min', 'max', 'min-max')
 * @param {number} maxBreakpoint - Maximum breakpoint for range
 * @returns {boolean} True if matches
 */
export const matchesBreakpoint = (breakpoint, operator = 'min', maxBreakpoint = null) => {
  if (typeof window === 'undefined') return false;
  
  const width = window.innerWidth;
  
  switch (operator) {
    case 'min':
      return width >= breakpoint;
    case 'max':
      return width <= breakpoint;
    case 'min-max':
      return width >= breakpoint && width <= (maxBreakpoint || Infinity);
    default:
      return false;
  }
};

/**
 * Get current breakpoint label
 * @returns {string} Breakpoint label
 */
export const getCurrentBreakpoint = () => {
  if (typeof window === 'undefined') return 'unknown';
  
  const width = window.innerWidth;
  
  if (width < BREAKPOINTS.MOBILE) return 'mobile';
  if (width < BREAKPOINTS.TABLET) return 'tablet';
  if (width < BREAKPOINTS.DESKTOP) return 'desktop';
  return 'large_desktop';
};

/**
 * Check if current device is mobile
 * @returns {boolean} True if mobile
 */
export const isMobile = () => {
  return matchesBreakpoint(BREAKPOINTS.MOBILE, 'max');
};

/**
 * Check if current device is tablet
 * @returns {boolean} True if tablet
 */
export const isTablet = () => {
  return matchesBreakpoint(BREAKPOINTS.MOBILE, 'min', BREAKPOINTS.TABLET - 1);
};

/**
 * Check if current device is desktop
 * @returns {boolean} True if desktop
 */
export const isDesktop = () => {
  return matchesBreakpoint(BREAKPOINTS.TABLET, 'min');
};

/**
 * Check if current device is large desktop
 * @returns {boolean} True if large desktop
 */
export const isLargeDesktop = () => {
  return matchesBreakpoint(BREAKPOINTS.DESKTOP, 'min');
};

/**
 * Check if device is touch-enabled
 * @returns {boolean} True if touch-enabled
 */
export const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

/**
 * Check if device is in portrait orientation
 * @returns {boolean} True if portrait
 */
export const isPortrait = () => {
  if (typeof window === 'undefined') return true;
  return window.innerHeight > window.innerWidth;
};

/**
 * Check if device is in landscape orientation
 * @returns {boolean} True if landscape
 */
export const isLandscape = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth > window.innerHeight;
};

/**
 * Get responsive value based on breakpoint
 * @param {Object} values - Values for different breakpoints
 * @param {*} values.mobile - Mobile value
 * @param {*} values.tablet - Tablet value
 * @param {*} values.desktop - Desktop value
 * @param {*} values.largeDesktop - Large desktop value
 * @param {*} values.default - Default value (fallback)
 * @returns {*} Appropriate value for current breakpoint
 */
export const getResponsiveValue = (values) => {
  if (isMobile() && values.mobile !== undefined) return values.mobile;
  if (isTablet() && values.tablet !== undefined) return values.tablet;
  if (isLargeDesktop() && values.largeDesktop !== undefined) return values.largeDesktop;
  if (isDesktop() && values.desktop !== undefined) return values.desktop;
  return values.default || values.desktop || values.tablet || values.mobile || null;
};

/**
 * Get responsive class name
 * @param {Object} classes - Class names for different breakpoints
 * @param {string} classes.mobile - Mobile class
 * @param {string} classes.tablet - Tablet class
 * @param {string} classes.desktop - Desktop class
 * @param {string} classes.largeDesktop - Large desktop class
 * @param {string} classes.default - Default class
 * @returns {string} Appropriate class name
 */
export const getResponsiveClass = (classes) => {
  const value = getResponsiveValue({
    mobile: classes.mobile,
    tablet: classes.tablet,
    desktop: classes.desktop,
    largeDesktop: classes.largeDesktop,
    default: classes.default,
  });
  return value || '';
};

/**
 * Get grid columns based on breakpoint
 * @param {Object} options - Grid options
 * @param {number} options.mobile - Mobile columns
 * @param {number} options.tablet - Tablet columns
 * @param {number} options.desktop - Desktop columns
 * @param {number} options.largeDesktop - Large desktop columns
 * @param {number} options.default - Default columns
 * @returns {number} Number of columns
 */
export const getGridColumns = (options = {}) => {
  return getResponsiveValue({
    mobile: options.mobile || 1,
    tablet: options.tablet || 2,
    desktop: options.desktop || 3,
    largeDesktop: options.largeDesktop || 4,
    default: options.default || 3,
  });
};

/**
 * Get grid gap based on breakpoint
 * @param {Object} options - Gap options
 * @param {string|number} options.mobile - Mobile gap
 * @param {string|number} options.tablet - Tablet gap
 * @param {string|number} options.desktop - Desktop gap
 * @param {string|number} options.largeDesktop - Large desktop gap
 * @param {string|number} options.default - Default gap
 * @returns {string|number} Gap value
 */
export const getGridGap = (options = {}) => {
  return getResponsiveValue({
    mobile: options.mobile || '0.5rem',
    tablet: options.tablet || '0.75rem',
    desktop: options.desktop || '1rem',
    largeDesktop: options.largeDesktop || '1.25rem',
    default: options.default || '1rem',
  });
};

/**
 * Get font size based on breakpoint
 * @param {Object} options - Font size options
 * @param {string|number} options.mobile - Mobile font size
 * @param {string|number} options.tablet - Tablet font size
 * @param {string|number} options.desktop - Desktop font size
 * @param {string|number} options.largeDesktop - Large desktop font size
 * @param {string|number} options.default - Default font size
 * @returns {string|number} Font size
 */
export const getResponsiveFontSize = (options = {}) => {
  return getResponsiveValue({
    mobile: options.mobile || '0.875rem',
    tablet: options.tablet || '1rem',
    desktop: options.desktop || '1.125rem',
    largeDesktop: options.largeDesktop || '1.25rem',
    default: options.default || '1rem',
  });
};

/**
 * Get padding based on breakpoint
 * @param {Object} options - Padding options
 * @param {string|number} options.mobile - Mobile padding
 * @param {string|number} options.tablet - Tablet padding
 * @param {string|number} options.desktop - Desktop padding
 * @param {string|number} options.largeDesktop - Large desktop padding
 * @param {string|number} options.default - Default padding
 * @returns {string|number} Padding value
 */
export const getResponsivePadding = (options = {}) => {
  return getResponsiveValue({
    mobile: options.mobile || '0.75rem',
    tablet: options.tablet || '1rem',
    desktop: options.desktop || '1.5rem',
    largeDesktop: options.largeDesktop || '2rem',
    default: options.default || '1rem',
  });
};

/**
 * Get responsive image size
 * @param {Object} options - Image size options
 * @param {string|number} options.mobile - Mobile size
 * @param {string|number} options.tablet - Tablet size
 * @param {string|number} options.desktop - Desktop size
 * @param {string|number} options.largeDesktop - Large desktop size
 * @param {string|number} options.default - Default size
 * @returns {string|number} Image size
 */
export const getResponsiveImageSize = (options = {}) => {
  return getResponsiveValue({
    mobile: options.mobile || '100px',
    tablet: options.tablet || '150px',
    desktop: options.desktop || '200px',
    largeDesktop: options.largeDesktop || '250px',
    default: options.default || '200px',
  });
};

// ============================================
// CSS MEDIA QUERY HELPERS
// ============================================

/**
 * Generate CSS media query string
 * @param {string} type - Query type ('min', 'max', 'min-max')
 * @param {number} breakpoint - Breakpoint value
 * @param {number} maxBreakpoint - Maximum breakpoint for range
 * @returns {string} Media query string
 */
export const getMediaQuery = (type = 'min', breakpoint, maxBreakpoint = null) => {
  switch (type) {
    case 'min':
      return `(min-width: ${breakpoint}px)`;
    case 'max':
      return `(max-width: ${breakpoint}px)`;
    case 'min-max':
      return `(min-width: ${breakpoint}px) and (max-width: ${maxBreakpoint}px)`;
    default:
      return '';
  }
};

/**
 * Get CSS media query for mobile
 * @returns {string} Mobile media query
 */
export const getMobileMediaQuery = () => {
  return getMediaQuery('max', BREAKPOINTS.MOBILE - 1);
};

/**
 * Get CSS media query for tablet
 * @returns {string} Tablet media query
 */
export const getTabletMediaQuery = () => {
  return getMediaQuery('min-max', BREAKPOINTS.MOBILE, BREAKPOINTS.TABLET - 1);
};

/**
 * Get CSS media query for desktop
 * @returns {string} Desktop media query
 */
export const getDesktopMediaQuery = () => {
  return getMediaQuery('min', BREAKPOINTS.TABLET);
};

/**
 * Get CSS media query for large desktop
 * @returns {string} Large desktop media query
 */
export const getLargeDesktopMediaQuery = () => {
  return getMediaQuery('min', BREAKPOINTS.DESKTOP);
};

// ============================================
// REACT COMPONENT HELPERS
// ============================================

/**
 * Get responsive Tailwind classes
 * @param {Object} classes - Tailwind classes for different breakpoints
 * @param {string} classes.mobile - Mobile classes
 * @param {string} classes.tablet - Tablet classes
 * @param {string} classes.desktop - Desktop classes
 * @param {string} classes.largeDesktop - Large desktop classes
 * @param {string} classes.default - Default classes
 * @returns {string} Combined Tailwind classes
 */
export const getResponsiveTailwind = (classes) => {
  const parts = [];
  
  if (classes.mobile) parts.push(classes.mobile);
  if (classes.tablet) parts.push(`md:${classes.tablet}`);
  if (classes.desktop) parts.push(`lg:${classes.desktop}`);
  if (classes.largeDesktop) parts.push(`xl:${classes.largeDesktop}`);
  if (classes.default) parts.push(classes.default);
  
  return parts.join(' ');
};

/**
 * Get responsive grid columns as Tailwind classes
 * @param {Object} options - Grid options
 * @param {number} options.mobile - Mobile columns
 * @param {number} options.tablet - Tablet columns
 * @param {number} options.desktop - Desktop columns
 * @param {number} options.largeDesktop - Large desktop columns
 * @param {number} options.default - Default columns
 * @returns {string} Tailwind grid classes
 */
export const getResponsiveGridTailwind = (options = {}) => {
  const mobile = options.mobile || 1;
  const tablet = options.tablet || 2;
  const desktop = options.desktop || 3;
  const largeDesktop = options.largeDesktop || 4;
  
  let classes = `grid-cols-${mobile}`;
  if (tablet !== mobile) classes += ` md:grid-cols-${tablet}`;
  if (desktop !== tablet) classes += ` lg:grid-cols-${desktop}`;
  if (largeDesktop !== desktop) classes += ` xl:grid-cols-${largeDesktop}`;
  
  return classes;
};

// ============================================
// EXPORT ALL
// ============================================

const responsive = {
  matchesBreakpoint,
  getCurrentBreakpoint,
  isMobile,
  isTablet,
  isDesktop,
  isLargeDesktop,
  isTouchDevice,
  isPortrait,
  isLandscape,
  getResponsiveValue,
  getResponsiveClass,
  getGridColumns,
  getGridGap,
  getResponsiveFontSize,
  getResponsivePadding,
  getResponsiveImageSize,
  getMediaQuery,
  getMobileMediaQuery,
  getTabletMediaQuery,
  getDesktopMediaQuery,
  getLargeDesktopMediaQuery,
  getResponsiveTailwind,
  getResponsiveGridTailwind,
};

export default responsive;