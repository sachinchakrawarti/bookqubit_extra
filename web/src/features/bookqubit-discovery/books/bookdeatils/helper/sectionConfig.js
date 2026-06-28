// src/features/bookqubit-discovery/books/bookdeatils/helpers/sectionConfig.js

/**
 * Section configuration for book details pages
 * Defines all available sections with their metadata
 */

export const SECTION_TYPES = {
  HIGHLIGHTS: 'highlights',
  SUBJECTS: 'subjects',
  PUBLICATION: 'publication',
  ABOUT: 'about',
  SUMMARY: 'summary',
  REVIEWS: 'reviews',
  NEWS: 'news',
  BLOG: 'blog',
  RELATED: 'related',
  ANALYTICS: 'analytics',
  TAGS: 'tags',
};

export const SECTION_CONFIG = [
  {
    id: SECTION_TYPES.HIGHLIGHTS,
    label: 'Highlights',
    icon: '⭐',
    iconComponent: 'FaStar',
    description: 'Key highlights of the book',
    color: 'amber',
    bgColor: 'bg-amber-50 dark:bg-amber-900/10',
    borderColor: 'border-amber-200 dark:border-amber-800',
    textColor: 'text-amber-600 dark:text-amber-400',
    priority: 1,
    showInNavigator: true,
    showInBottomSheet: true,
    showInMobileList: true,
    defaultExpanded: true,
    component: 'BookHighlights',
  },
  {
    id: SECTION_TYPES.SUBJECTS,
    label: 'Subjects',
    icon: '📚',
    iconComponent: 'FaBook',
    description: 'Subjects covered in the book',
    color: 'blue',
    bgColor: 'bg-blue-50 dark:bg-blue-900/10',
    borderColor: 'border-blue-200 dark:border-blue-800',
    textColor: 'text-blue-600 dark:text-blue-400',
    priority: 2,
    showInNavigator: true,
    showInBottomSheet: true,
    showInMobileList: true,
    defaultExpanded: false,
    component: 'BookSubjects',
  },
  {
    id: SECTION_TYPES.PUBLICATION,
    label: 'Publication',
    icon: 'ℹ️',
    iconComponent: 'FaInfoCircle',
    description: 'Publication details',
    color: 'purple',
    bgColor: 'bg-purple-50 dark:bg-purple-900/10',
    borderColor: 'border-purple-200 dark:border-purple-800',
    textColor: 'text-purple-600 dark:text-purple-400',
    priority: 3,
    showInNavigator: true,
    showInBottomSheet: true,
    showInMobileList: true,
    defaultExpanded: false,
    component: 'BookPublication',
  },
  {
    id: SECTION_TYPES.ABOUT,
    label: 'About',
    icon: '📖',
    iconComponent: 'FaFileAlt',
    description: 'About this book',
    color: 'emerald',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/10',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    priority: 4,
    showInNavigator: true,
    showInBottomSheet: true,
    showInMobileList: true,
    defaultExpanded: false,
    component: 'BookAbout',
  },
  {
    id: SECTION_TYPES.SUMMARY,
    label: 'Summary',
    icon: '📋',
    iconComponent: 'FaList',
    description: 'Book summary',
    color: 'indigo',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/10',
    borderColor: 'border-indigo-200 dark:border-indigo-800',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    priority: 5,
    showInNavigator: true,
    showInBottomSheet: true,
    showInMobileList: true,
    defaultExpanded: false,
    component: 'BookSummary',
  },
  {
    id: SECTION_TYPES.REVIEWS,
    label: 'Reviews',
    icon: '⭐',
    iconComponent: 'FaComment',
    description: 'User reviews and ratings',
    color: 'rose',
    bgColor: 'bg-rose-50 dark:bg-rose-900/10',
    borderColor: 'border-rose-200 dark:border-rose-800',
    textColor: 'text-rose-600 dark:text-rose-400',
    priority: 6,
    showInNavigator: true,
    showInBottomSheet: true,
    showInMobileList: true,
    defaultExpanded: false,
    component: 'BookReviews',
  },
  {
    id: SECTION_TYPES.NEWS,
    label: 'News',
    icon: '📰',
    iconComponent: 'FaNewspaper',
    description: 'Latest news about the book',
    color: 'sky',
    bgColor: 'bg-sky-50 dark:bg-sky-900/10',
    borderColor: 'border-sky-200 dark:border-sky-800',
    textColor: 'text-sky-600 dark:text-sky-400',
    priority: 7,
    showInNavigator: true,
    showInBottomSheet: true,
    showInMobileList: true,
    defaultExpanded: false,
    component: 'BookNews',
  },
  {
    id: SECTION_TYPES.BLOG,
    label: 'Blog',
    icon: '✍️',
    iconComponent: 'FaBlog',
    description: 'Blog posts related to the book',
    color: 'orange',
    bgColor: 'bg-orange-50 dark:bg-orange-900/10',
    borderColor: 'border-orange-200 dark:border-orange-800',
    textColor: 'text-orange-600 dark:text-orange-400',
    priority: 8,
    showInNavigator: true,
    showInBottomSheet: true,
    showInMobileList: true,
    defaultExpanded: false,
    component: 'BookBlog',
  },
  {
    id: SECTION_TYPES.RELATED,
    label: 'Related',
    icon: '🔗',
    iconComponent: 'FaBook',
    description: 'Related books you might enjoy',
    color: 'teal',
    bgColor: 'bg-teal-50 dark:bg-teal-900/10',
    borderColor: 'border-teal-200 dark:border-teal-800',
    textColor: 'text-teal-600 dark:text-teal-400',
    priority: 9,
    showInNavigator: true,
    showInBottomSheet: true,
    showInMobileList: true,
    defaultExpanded: false,
    component: 'BookRelated',
  },
  {
    id: SECTION_TYPES.ANALYTICS,
    label: 'Analytics',
    icon: '📊',
    iconComponent: 'FaChartBar',
    description: 'Reading analytics and stats',
    color: 'pink',
    bgColor: 'bg-pink-50 dark:bg-pink-900/10',
    borderColor: 'border-pink-200 dark:border-pink-800',
    textColor: 'text-pink-600 dark:text-pink-400',
    priority: 10,
    showInNavigator: true,
    showInBottomSheet: true,
    showInMobileList: true,
    defaultExpanded: false,
    component: 'BookAnalytics',
  },
  {
    id: SECTION_TYPES.TAGS,
    label: 'Tags',
    icon: '🏷️',
    iconComponent: 'FaTag',
    description: 'Tags and keywords',
    color: 'gray',
    bgColor: 'bg-gray-50 dark:bg-gray-800/50',
    borderColor: 'border-gray-200 dark:border-gray-700',
    textColor: 'text-gray-600 dark:text-gray-400',
    priority: 11,
    showInNavigator: true,
    showInBottomSheet: true,
    showInMobileList: true,
    defaultExpanded: false,
    component: 'BookTags',
  },
];

/**
 * Get section by ID
 * @param {string} id - Section ID
 * @returns {Object|null} Section configuration
 */
export const getSectionById = (id) => {
  return SECTION_CONFIG.find((section) => section.id === id) || null;
};

/**
 * Get sections by IDs
 * @param {Array} ids - Array of section IDs
 * @returns {Array} Section configurations
 */
export const getSectionsByIds = (ids) => {
  if (!ids || !Array.isArray(ids)) return [];
  return ids
    .map((id) => getSectionById(id))
    .filter((section) => section !== null);
};

/**
 * Get sections for navigator
 * @param {Array} ids - Optional array of section IDs
 * @returns {Array} Section configurations for navigator
 */
export const getNavigatorSections = (ids = null) => {
  const sections = ids ? getSectionsByIds(ids) : SECTION_CONFIG;
  return sections
    .filter((section) => section.showInNavigator)
    .sort((a, b) => a.priority - b.priority);
};

/**
 * Get sections for bottom sheet
 * @param {Array} ids - Optional array of section IDs
 * @returns {Array} Section configurations for bottom sheet
 */
export const getBottomSheetSections = (ids = null) => {
  const sections = ids ? getSectionsByIds(ids) : SECTION_CONFIG;
  return sections
    .filter((section) => section.showInBottomSheet)
    .sort((a, b) => a.priority - b.priority);
};

/**
 * Get sections for mobile list
 * @param {Array} ids - Optional array of section IDs
 * @returns {Array} Section configurations for mobile list
 */
export const getMobileListSections = (ids = null) => {
  const sections = ids ? getSectionsByIds(ids) : SECTION_CONFIG;
  return sections
    .filter((section) => section.showInMobileList)
    .sort((a, b) => a.priority - b.priority);
};

/**
 * Get section component name
 * @param {string} id - Section ID
 * @returns {string} Component name
 */
export const getSectionComponent = (id) => {
  const section = getSectionById(id);
  return section ? section.component : null;
};

/**
 * Get section icon
 * @param {string} id - Section ID
 * @returns {string} Icon emoji or component name
 */
export const getSectionIcon = (id) => {
  const section = getSectionById(id);
  return section ? section.icon : null;
};

/**
 * Get section color
 * @param {string} id - Section ID
 * @returns {string} Color name
 */
export const getSectionColor = (id) => {
  const section = getSectionById(id);
  return section ? section.color : 'gray';
};

/**
 * Get default expanded sections
 * @param {Array} ids - Optional array of section IDs
 * @returns {Array} Section IDs that are expanded by default
 */
export const getDefaultExpandedSections = (ids = null) => {
  const sections = ids ? getSectionsByIds(ids) : SECTION_CONFIG;
  return sections
    .filter((section) => section.defaultExpanded)
    .map((section) => section.id);
};

/**
 * Get section priority
 * @param {string} id - Section ID
 * @returns {number} Priority number
 */
export const getSectionPriority = (id) => {
  const section = getSectionById(id);
  return section ? section.priority : 999;
};

/**
 * Get section label
 * @param {string} id - Section ID
 * @returns {string} Section label
 */
export const getSectionLabel = (id) => {
  const section = getSectionById(id);
  return section ? section.label : id;
};

/**
 * Get section description
 * @param {string} id - Section ID
 * @returns {string} Section description
 */
export const getSectionDescription = (id) => {
  const section = getSectionById(id);
  return section ? section.description : '';
};

/**
 * Get section color classes
 * @param {string} id - Section ID
 * @returns {Object} Color classes
 */
export const getSectionColorClasses = (id) => {
  const section = getSectionById(id);
  if (!section) {
    return {
      bg: 'bg-gray-50 dark:bg-gray-800/50',
      border: 'border-gray-200 dark:border-gray-700',
      text: 'text-gray-600 dark:text-gray-400',
    };
  }
  return {
    bg: section.bgColor,
    border: section.borderColor,
    text: section.textColor,
  };
};

// Export default object
const sectionConfig = {
  SECTION_TYPES,
  SECTION_CONFIG,
  getSectionById,
  getSectionsByIds,
  getNavigatorSections,
  getBottomSheetSections,
  getMobileListSections,
  getSectionComponent,
  getSectionIcon,
  getSectionColor,
  getDefaultExpandedSections,
  getSectionPriority,
  getSectionLabel,
  getSectionDescription,
  getSectionColorClasses,
};

export default sectionConfig;