"use client";

import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRTL } from "@/contexts/RTLContext";
import { useFont } from "@/contexts/FontContext";
import BookDNAAnalyzer from "./components/BookDNAAnalyzer";
import "./bookdnaanalyzer.css";

export default function BookDNAAnalyzerPage() {
  const { theme, themeName } = useTheme();
  const { td } = useLanguage();
  const { direction } = useRTL();
  const { currentFont } = useFont();

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  return (
    <div
      dir={direction}
      style={{ fontFamily: currentFont?.family }}
      className={`book-dna-page ${themeName} ${isDarkMode ? "dark" : ""}`}
    >
      <BookDNAAnalyzer />
    </div>
  );
}
