// src/contexts/all_ethos_translations.js

// Import Ethos left slidebar translations
import ethosLeftSlidebarTranslations from "@/translations_ethos/ethos_left_slidebar_translations";

// Import other Ethos translations as they are created
// import ethosHeaderTranslations from "@/translations_ethos/ethos_header_translations";
// import ethosFooterTranslations from "@/translations_ethos/ethos_footer_translations";
// import ethosDashboardTranslations from "@/translations_ethos/ethos_dashboard_translations";

// Merge all Ethos translations for all languages
export const allEthosTranslations = {
  en: {
    ...ethosLeftSlidebarTranslations.en,
    // ...ethosHeaderTranslations.en,
    // ...ethosFooterTranslations.en,
    // ...ethosDashboardTranslations.en,
  },
  hi: {
    ...ethosLeftSlidebarTranslations.hi,
    // ...ethosHeaderTranslations.hi,
    // ...ethosFooterTranslations.hi,
    // ...ethosDashboardTranslations.hi,
  },
  ur: {
    ...ethosLeftSlidebarTranslations.ur,
    // ...ethosHeaderTranslations.ur,
    // ...ethosFooterTranslations.ur,
    // ...ethosDashboardTranslations.ur,
  },
  ar: {
    ...ethosLeftSlidebarTranslations.ar,
    // ...ethosHeaderTranslations.ar,
    // ...ethosFooterTranslations.ar,
    // ...ethosDashboardTranslations.ar,
  },
  bn: {
    ...ethosLeftSlidebarTranslations.bn,
    // ...ethosHeaderTranslations.bn,
    // ...ethosFooterTranslations.bn,
    // ...ethosDashboardTranslations.bn,
  },
  mr: {
    ...ethosLeftSlidebarTranslations.mr,
    // ...ethosHeaderTranslations.mr,
    // ...ethosFooterTranslations.mr,
    // ...ethosDashboardTranslations.mr,
  },
  ta: {
    ...ethosLeftSlidebarTranslations.ta,
    // ...ethosHeaderTranslations.ta,
    // ...ethosFooterTranslations.ta,
    // ...ethosDashboardTranslations.ta,
  },
  kn: {
    ...ethosLeftSlidebarTranslations.kn,
    // ...ethosHeaderTranslations.kn,
    // ...ethosFooterTranslations.kn,
    // ...ethosDashboardTranslations.kn,
  },
  te: {
    ...ethosLeftSlidebarTranslations.te,
    // ...ethosHeaderTranslations.te,
    // ...ethosFooterTranslations.te,
    // ...ethosDashboardTranslations.te,
  },
  ml: {
    ...ethosLeftSlidebarTranslations.ml,
    // ...ethosHeaderTranslations.ml,
    // ...ethosFooterTranslations.ml,
    // ...ethosDashboardTranslations.ml,
  },
  ps: {
    ...ethosLeftSlidebarTranslations.ps,
    // ...ethosHeaderTranslations.ps,
    // ...ethosFooterTranslations.ps,
    // ...ethosDashboardTranslations.ps,
  },
  es: {
    ...ethosLeftSlidebarTranslations.es,
    // ...ethosHeaderTranslations.es,
    // ...ethosFooterTranslations.es,
    // ...ethosDashboardTranslations.es,
  },
  zh: {
    ...ethosLeftSlidebarTranslations.zh,
    // ...ethosHeaderTranslations.zh,
    // ...ethosFooterTranslations.zh,
    // ...ethosDashboardTranslations.zh,
  },
  fr: {
    ...ethosLeftSlidebarTranslations.fr,
    // ...ethosHeaderTranslations.fr,
    // ...ethosFooterTranslations.fr,
    // ...ethosDashboardTranslations.fr,
  },
  de: {
    ...ethosLeftSlidebarTranslations.de,
    // ...ethosHeaderTranslations.de,
    // ...ethosFooterTranslations.de,
    // ...ethosDashboardTranslations.de,
  },
  it: {
    ...ethosLeftSlidebarTranslations.it,
    // ...ethosHeaderTranslations.it,
    // ...ethosFooterTranslations.it,
    // ...ethosDashboardTranslations.it,
  },
  ja: {
    ...ethosLeftSlidebarTranslations.ja,
    // ...ethosHeaderTranslations.ja,
    // ...ethosFooterTranslations.ja,
    // ...ethosDashboardTranslations.ja,
  },
  ko: {
    ...ethosLeftSlidebarTranslations.ko,
    // ...ethosHeaderTranslations.ko,
    // ...ethosFooterTranslations.ko,
    // ...ethosDashboardTranslations.ko,
  },
  fa: {
    ...ethosLeftSlidebarTranslations.fa,
    // ...ethosHeaderTranslations.fa,
    // ...ethosFooterTranslations.fa,
    // ...ethosDashboardTranslations.fa,
  },
  ru: {
    ...ethosLeftSlidebarTranslations.ru,
    // ...ethosHeaderTranslations.ru,
    // ...ethosFooterTranslations.ru,
    // ...ethosDashboardTranslations.ru,
  },
};

// Helper function to get Ethos translations by language code
export const getEthosTranslationsByLanguage = (languageCode = 'en') => {
  return allEthosTranslations[languageCode] || allEthosTranslations.en;
};

// List of available languages for Ethos
export const ethosAvailableLanguages = Object.keys(allEthosTranslations);

// RTL languages list (Right-to-Left scripts)
export const ethosRtlLanguages = ["ur", "ar", "fa", "ps"];

// Language display names
export const ethosLanguageNames = {
  en: "English",
  hi: "Hindi (हिन्दी)",
  ur: "Urdu (اردو)",
  ar: "Arabic (العربية)",
  bn: "Bengali (বাংলা)",
  mr: "Marathi (मराठी)",
  ta: "Tamil (தமிழ்)",
  kn: "Kannada (ಕನ್ನಡ)",
  te: "Telugu (తెలుగు)",
  ml: "Malayalam (മലയാളം)",
  ps: "Pashto (پښتو)",
  es: "Spanish (Español)",
  zh: "Chinese (中文)",
  fr: "French (Français)",
  de: "German (Deutsch)",
  it: "Italian (Italiano)",
  ja: "Japanese (日本語)",
  ko: "Korean (한국어)",
  fa: "Persian (فارسی)",
  ru: "Russian (Русский)",
};

// Helper function to get language name
export const getEthosLanguageName = (languageCode = 'en') => {
  return ethosLanguageNames[languageCode] || languageCode;
};

// Helper function to check if language is RTL
export const isEthosRtlLanguage = (languageCode = 'en') => {
  return ethosRtlLanguages.includes(languageCode);
};

// Helper function to get translation with fallback
export const getEthosTranslation = (key, languageCode = 'en', fallbackKey = null) => {
  const translations = getEthosTranslationsByLanguage(languageCode);
  const value = translations[key];
  
  if (value !== undefined) {
    return value;
  }
  
  // Try fallback key if provided
  if (fallbackKey) {
    const fallbackTranslations = getEthosTranslationsByLanguage('en');
    return fallbackTranslations[fallbackKey] || fallbackKey;
  }
  
  // Return the key itself as fallback
  return key;
};

// Helper function to get nested translation (e.g., "wallet.balance")
export const getEthosNestedTranslation = (keyPath, languageCode = 'en', separator = '.') => {
  const keys = keyPath.split(separator);
  let current = getEthosTranslationsByLanguage(languageCode);
  
  for (const key of keys) {
    if (current && typeof current === 'object' && current[key] !== undefined) {
      current = current[key];
    } else {
      // Fallback to English
      let fallback = getEthosTranslationsByLanguage('en');
      for (const fallbackKey of keys) {
        if (fallback && typeof fallback === 'object' && fallback[fallbackKey] !== undefined) {
          fallback = fallback[fallbackKey];
        } else {
          return keyPath; // Return the key path if not found
        }
      }
      return fallback;
    }
  }
  
  return current;
};

// React hook for Ethos translations
export const useEthosTranslation = (languageCode = 'en') => {
  const getTranslation = (key, fallbackKey = null) => {
    return getEthosTranslation(key, languageCode, fallbackKey);
  };
  
  const getNestedTranslation = (keyPath, separator = '.') => {
    return getEthosNestedTranslation(keyPath, languageCode, separator);
  };
  
  const isRTL = isEthosRtlLanguage(languageCode);
  const languageName = getEthosLanguageName(languageCode);
  
  return {
    t: getTranslation,
    tn: getNestedTranslation,
    isRTL,
    languageName,
    languageCode,
    availableLanguages: ethosAvailableLanguages,
    getLanguageName: (code) => getEthosLanguageName(code),
    isRtlLanguage: (code) => isEthosRtlLanguage(code),
  };
};

// Default export
export default allEthosTranslations;