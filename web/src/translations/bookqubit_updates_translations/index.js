import updatesEnglish from "./bookqubit_updates_translations_english";
import updatesHindi from "./bookqubit_updates_translations_hindi";
import updatesUrdu from "./bookqubit_updates_translations_urdu";

export const updatesTranslations = {
  en: updatesEnglish,
  hi: updatesHindi,
  ur: updatesUrdu,
};

export const getUpdatesTranslation = (lang) => {
  console.log(`📚 Getting updates translation for: ${lang}`); // Debug log
  const result = updatesTranslations[lang] || updatesTranslations.en;
  console.log(`📚 Translation result:`, result); // Debug log
  return result;
};

export default updatesTranslations;