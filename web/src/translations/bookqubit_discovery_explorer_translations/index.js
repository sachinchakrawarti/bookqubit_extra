import discoveryEnglish from "./bookqubit_discovery_explorer_translations_english";
import discoveryHindi from "./bookqubit_discovery_explorer_translations_hindi";
import discoveryUrdu from "./bookqubit_discovery_explorer_translations_urdu";

// Export all translations (3 languages only)
export const discoveryTranslations = {
  en: discoveryEnglish,
  hi: discoveryHindi,
  ur: discoveryUrdu,
  // Add more languages here as needed
};

// Get discovery translation for a specific language
export const getDiscoveryTranslation = (lang) => {
  return discoveryTranslations[lang] || discoveryTranslations.en;
};

// Default export for convenience
export default discoveryTranslations;