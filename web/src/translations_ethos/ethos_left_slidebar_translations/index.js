// src/translations_ethos/ethos_left_slidebar_translations/index.js

import english from "./ethos_left_slidebar_translations_english";
import hindi from "./ethos_left_slidebar_translations_hindi";
import urdu from "./ethos_left_slidebar_translations_urdu";

const translations = {
  en: english,
  hi: hindi,
  ur: urdu,
};

export const getEthosLeftSlidebarTranslations = (lang = "en") => {
  return translations[lang] || translations.en;
};

export default translations;