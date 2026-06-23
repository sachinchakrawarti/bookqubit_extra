import immerseEnglish from "./bookqubit_immerse_translations_english";
import immerseHindi from "./bookqubit_immerse_translations_hindi";
import immerseUrdu from "./bookqubit_immerse_translations_urdu";

// Export all translations
export const immerseTranslations = {
  en: immerseEnglish,
  hi: immerseHindi,
  ur: immerseUrdu,
};

// Get immerse translation for a specific language
export const getImmerseTranslation = (lang) => {
  return immerseTranslations[lang] || immerseTranslations.en;
};

// Default export for convenience
export default immerseTranslations;