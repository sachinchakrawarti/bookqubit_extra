import lensEnglish from "./bookqubit_lens_translations_english";
import lensHindi from "./bookqubit_lens_translations_hindi";
import lensUrdu from "./bookqubit_lens_translations_urdu";

// Export all translations
export const lensTranslations = {
  en: lensEnglish,
  hi: lensHindi,
  ur: lensUrdu,
};

// Get lens translation for a specific language
export const getLensTranslation = (lang) => {
  console.log(`📚 Getting lens translation for language: ${lang}`);
  const result = lensTranslations[lang] || lensTranslations.en;
  console.log(`📚 Lens translation result keys:`, Object.keys(result));
  return result;
};

// Default export for convenience
export default lensTranslations;