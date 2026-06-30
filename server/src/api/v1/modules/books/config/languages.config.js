// src/api/v1/modules/books/config/languages.config.js

/**
 * Language Configuration
 * All supported languages for books
 */

// ============================================
// SUPPORTED LANGUAGES
// ============================================
export const LANGUAGES = {
    ARABIC: {
        code: 'arabic',
        name: 'Arabic',
        native_name: 'العربية',
        flag: '🇸🇦',
        direction: 'rtl',
        is_active: true,
        region: 'Middle East',
        script: 'Arabic'
    },
    BANGLA: {
        code: 'bangla',
        name: 'Bangla',
        native_name: 'বাংলা',
        flag: '🇧🇩',
        direction: 'ltr',
        is_active: true,
        region: 'South Asia',
        script: 'Bengali'
    },
    BENGALI: {
        code: 'bengali',
        name: 'Bengali',
        native_name: 'বাংলা',
        flag: '🇧🇩',
        direction: 'ltr',
        is_active: true,
        region: 'South Asia',
        script: 'Bengali'
    },
    CHINESE: {
        code: 'chinese',
        name: 'Chinese',
        native_name: '中文',
        flag: '🇨🇳',
        direction: 'ltr',
        is_active: true,
        region: 'East Asia',
        script: 'Han'
    },
    ENGLISH: {
        code: 'english',
        name: 'English',
        native_name: 'English',
        flag: '🇬🇧',
        direction: 'ltr',
        is_active: true,
        region: 'Global',
        script: 'Latin'
    },
    FRENCH: {
        code: 'french',
        name: 'French',
        native_name: 'Français',
        flag: '🇫🇷',
        direction: 'ltr',
        is_active: true,
        region: 'Europe',
        script: 'Latin'
    },
    GERMAN: {
        code: 'german',
        name: 'German',
        native_name: 'Deutsch',
        flag: '🇩🇪',
        direction: 'ltr',
        is_active: true,
        region: 'Europe',
        script: 'Latin'
    },
    HINDI: {
        code: 'hindi',
        name: 'Hindi',
        native_name: 'हिन्दी',
        flag: '🇮🇳',
        direction: 'ltr',
        is_active: true,
        region: 'South Asia',
        script: 'Devanagari'
    },
    ITALIAN: {
        code: 'italian',
        name: 'Italian',
        native_name: 'Italiano',
        flag: '🇮🇹',
        direction: 'ltr',
        is_active: true,
        region: 'Europe',
        script: 'Latin'
    },
    JAPANESE: {
        code: 'japanese',
        name: 'Japanese',
        native_name: '日本語',
        flag: '🇯🇵',
        direction: 'ltr',
        is_active: true,
        region: 'East Asia',
        script: 'Japanese'
    },
    KANNADA: {
        code: 'kannada',
        name: 'Kannada',
        native_name: 'ಕನ್ನಡ',
        flag: '🇮🇳',
        direction: 'ltr',
        is_active: true,
        region: 'South Asia',
        script: 'Kannada'
    },
    KOREAN: {
        code: 'korean',
        name: 'Korean',
        native_name: '한국어',
        flag: '🇰🇷',
        direction: 'ltr',
        is_active: true,
        region: 'East Asia',
        script: 'Hangul'
    },
    MALAYALAM: {
        code: 'malayalam',
        name: 'Malayalam',
        native_name: 'മലയാളം',
        flag: '🇮🇳',
        direction: 'ltr',
        is_active: true,
        region: 'South Asia',
        script: 'Malayalam'
    },
    MARATHI: {
        code: 'marathi',
        name: 'Marathi',
        native_name: 'मराठी',
        flag: '🇮🇳',
        direction: 'ltr',
        is_active: true,
        region: 'South Asia',
        script: 'Devanagari'
    },
    PASHTO: {
        code: 'pashto',
        name: 'Pashto',
        native_name: 'پښتو',
        flag: '🇦🇫',
        direction: 'rtl',
        is_active: true,
        region: 'South Asia',
        script: 'Pashto'
    },
    PERSIAN: {
        code: 'persian',
        name: 'Persian',
        native_name: 'فارسی',
        flag: '🇮🇷',
        direction: 'rtl',
        is_active: true,
        region: 'Middle East',
        script: 'Persian'
    },
    RUSSIAN: {
        code: 'russian',
        name: 'Russian',
        native_name: 'Русский',
        flag: '🇷🇺',
        direction: 'ltr',
        is_active: true,
        region: 'Europe',
        script: 'Cyrillic'
    },
    SPANISH: {
        code: 'spanish',
        name: 'Spanish',
        native_name: 'Español',
        flag: '🇪🇸',
        direction: 'ltr',
        is_active: true,
        region: 'Europe',
        script: 'Latin'
    },
    TAMIL: {
        code: 'tamil',
        name: 'Tamil',
        native_name: 'தமிழ்',
        flag: '🇮🇳',
        direction: 'ltr',
        is_active: true,
        region: 'South Asia',
        script: 'Tamil'
    },
    TELUGU: {
        code: 'telugu',
        name: 'Telugu',
        native_name: 'తెలుగు',
        flag: '🇮🇳',
        direction: 'ltr',
        is_active: true,
        region: 'South Asia',
        script: 'Telugu'
    },
    URDU: {
        code: 'urdu',
        name: 'Urdu',
        native_name: 'اردو',
        flag: '🇵🇰',
        direction: 'rtl',
        is_active: true,
        region: 'South Asia',
        script: 'Urdu'
    }
};

// ============================================
// LANGUAGE ALIASES
// ============================================
export const LANGUAGE_ALIASES = {
    'bengali': 'bangla',
    'mandarin': 'chinese',
    'castilian': 'spanish',
    'portuguese': 'portuguese',
    'dutch': 'dutch',
    'swedish': 'swedish',
    'norwegian': 'norwegian',
    'danish': 'danish',
    'finnish': 'finnish',
    'polish': 'polish',
    'turkish': 'turkish',
    'vietnamese': 'vietnamese',
    'thai': 'thai',
    'indonesian': 'indonesian',
    'malay': 'malay'
};

// ============================================
// LANGUAGE MAP (For quick lookup)
// ============================================
export const LANGUAGE_MAP = Object.keys(LANGUAGES).reduce((acc, key) => {
    const lang = LANGUAGES[key];
    acc[lang.code] = lang;
    return acc;
}, {});

// ============================================
// LANGUAGE CODES LIST
// ============================================
export const LANGUAGE_CODES = Object.keys(LANGUAGE_MAP);

// ============================================
// ACTIVE LANGUAGE CODES
// ============================================
export const ACTIVE_LANGUAGE_CODES = Object.values(LANGUAGES)
    .filter(lang => lang.is_active)
    .map(lang => lang.code);

// ============================================
// LANGUAGE NAMES
// ============================================
export const LANGUAGE_NAMES = Object.values(LANGUAGES).reduce((acc, lang) => {
    acc[lang.code] = lang.name;
    return acc;
}, {});

// ============================================
// LANGUAGE NATIVE NAMES
// ============================================
export const LANGUAGE_NATIVE_NAMES = Object.values(LANGUAGES).reduce((acc, lang) => {
    acc[lang.code] = lang.native_name;
    return acc;
}, {});

// ============================================
// LANGUAGE FLAGS
// ============================================
export const LANGUAGE_FLAGS = Object.values(LANGUAGES).reduce((acc, lang) => {
    acc[lang.code] = lang.flag;
    return acc;
}, {});

// ============================================
// LANGUAGE SCRIPTS
// ============================================
export const LANGUAGE_SCRIPTS = Object.values(LANGUAGES).reduce((acc, lang) => {
    acc[lang.code] = lang.script;
    return acc;
}, {});

// ============================================
// LANGUAGE DIRECTIONS
// ============================================
export const LANGUAGE_DIRECTIONS = Object.values(LANGUAGES).reduce((acc, lang) => {
    acc[lang.code] = lang.direction;
    return acc;
}, {});

// ============================================
// LANGUAGE REGIONS
// ============================================
export const LANGUAGE_REGIONS = Object.values(LANGUAGES).reduce((acc, lang) => {
    acc[lang.code] = lang.region;
    return acc;
}, {});

// ============================================
// DEFAULT LANGUAGE
// ============================================
export const DEFAULT_LANGUAGE = 'english';

// ============================================
// LANGUAGE HELPERS
// ============================================

// Get language by code
export const getLanguage = (code) => {
    const langKey = code.toLowerCase();
    return LANGUAGE_MAP[langKey] || LANGUAGE_MAP[DEFAULT_LANGUAGE];
};

// Check if language is supported
export const isLanguageSupported = (code) => {
    return !!LANGUAGE_MAP[code.toLowerCase()];
};

// Get language name by code
export const getLanguageName = (code) => {
    const lang = getLanguage(code);
    return lang ? lang.name : null;
};

// Get language native name by code
export const getLanguageNativeName = (code) => {
    const lang = getLanguage(code);
    return lang ? lang.native_name : null;
};

// Get language flag by code
export const getLanguageFlag = (code) => {
    const lang = getLanguage(code);
    return lang ? lang.flag : null;
};

// Get language direction by code
export const getLanguageDirection = (code) => {
    const lang = getLanguage(code);
    return lang ? lang.direction : 'ltr';
};

// Get language script by code
export const getLanguageScript = (code) => {
    const lang = getLanguage(code);
    return lang ? lang.script : null;
};

// Get language region by code
export const getLanguageRegion = (code) => {
    const lang = getLanguage(code);
    return lang ? lang.region : null;
};

// Get all language codes
export const getAllLanguageCodes = () => {
    return LANGUAGE_CODES;
};

// Get all active language codes
export const getActiveLanguageCodes = () => {
    return ACTIVE_LANGUAGE_CODES;
};

// Get all language objects
export const getAllLanguages = () => {
    return Object.values(LANGUAGES);
};

// Get all active languages
export const getActiveLanguages = () => {
    return Object.values(LANGUAGES).filter(lang => lang.is_active);
};

// Get languages by region
export const getLanguagesByRegion = (region) => {
    return Object.values(LANGUAGES).filter(lang => lang.region === region);
};

// Get languages by script
export const getLanguagesByScript = (script) => {
    return Object.values(LANGUAGES).filter(lang => lang.script === script);
};

// Get RTL languages
export const getRtlLanguages = () => {
    return Object.values(LANGUAGES).filter(lang => lang.direction === 'rtl');
};

// Get LTR languages
export const getLtrLanguages = () => {
    return Object.values(LANGUAGES).filter(lang => lang.direction === 'ltr');
};

// Validate language code
export const validateLanguageCode = (code) => {
    if (!code) return false;
    const langKey = code.toLowerCase();
    return !!LANGUAGE_MAP[langKey] && LANGUAGE_MAP[langKey].is_active;
};

// Get language code from alias
export const getLanguageFromAlias = (alias) => {
    const aliasKey = alias.toLowerCase();
    return LANGUAGE_ALIASES[aliasKey] || aliasKey;
};

// Normalize language code
export const normalizeLanguageCode = (code) => {
    if (!code) return DEFAULT_LANGUAGE;
    const langKey = code.toLowerCase();
    const mapped = getLanguageFromAlias(langKey);
    return isLanguageSupported(mapped) ? mapped : DEFAULT_LANGUAGE;
};

// ============================================
// LANGUAGE GROUPINGS
// ============================================
export const LANGUAGE_GROUPS = {
    SOUTH_ASIAN: ['hindi', 'urdu', 'bangla', 'bengali', 'tamil', 'telugu', 'kannada', 'malayalam', 'marathi', 'pashto', 'persian'],
    EAST_ASIAN: ['chinese', 'japanese', 'korean'],
    EUROPEAN: ['english', 'french', 'german', 'italian', 'spanish', 'russian'],
    MIDDLE_EAST: ['arabic', 'persian', 'urdu'],
    GLOBAL: ['english', 'spanish', 'french', 'arabic', 'chinese', 'russian']
};

// Get languages by group
export const getLanguagesByGroup = (group) => {
    const groupKey = group.toUpperCase();
    const codes = LANGUAGE_GROUPS[groupKey] || [];
    return codes.map(code => getLanguage(code)).filter(Boolean);
};

// ============================================
// EXPORT CONFIG
// ============================================
export default {
    LANGUAGES,
    LANGUAGE_ALIASES,
    LANGUAGE_MAP,
    LANGUAGE_CODES,
    ACTIVE_LANGUAGE_CODES,
    LANGUAGE_NAMES,
    LANGUAGE_NATIVE_NAMES,
    LANGUAGE_FLAGS,
    LANGUAGE_SCRIPTS,
    LANGUAGE_DIRECTIONS,
    LANGUAGE_REGIONS,
    DEFAULT_LANGUAGE,
    LANGUAGE_GROUPS,
    getLanguage,
    isLanguageSupported,
    getLanguageName,
    getLanguageNativeName,
    getLanguageFlag,
    getLanguageDirection,
    getLanguageScript,
    getLanguageRegion,
    getAllLanguageCodes,
    getActiveLanguageCodes,
    getAllLanguages,
    getActiveLanguages,
    getLanguagesByRegion,
    getLanguagesByScript,
    getRtlLanguages,
    getLtrLanguages,
    validateLanguageCode,
    getLanguageFromAlias,
    normalizeLanguageCode,
    getLanguagesByGroup
};