// src/app/[lang]/(public)/homepages/page.jsx

"use client";

import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import BookQubitFlow from "@/features/bookqubit-flow/BookQubitFlow";

export default function HomePages() {
  const { theme, themeName } = useTheme();
  const { t, language } = useLanguage();
  const { currentFont } = useFont();

  // Font style
  const fontStyle = currentFont?.family
    ? {
        fontFamily: currentFont.family,
      }
    : {};

  return (
    <main
      className={`
        min-h-screen
        ${theme.background?.page || "bg-white dark:bg-gray-950"}
        transition-colors duration-300
      `}
      style={fontStyle}
    >
      <BookQubitFlow />
    </main>
  );
}
