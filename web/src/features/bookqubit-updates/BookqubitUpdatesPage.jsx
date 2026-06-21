"use client";

import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRTL } from "@/contexts/RTLContext";
import { useFont } from "@/contexts/FontContext";
import BookqubitUpdates from "./components/BookqubitUpdates";
import "./bookqubitupdates.css";

export default function BookqubitUpdatesPage() {
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
      className={`bookqubit-updates-page ${isDarkMode ? "dark" : ""}`}
    >
      <BookqubitUpdates />
    </div>
  );
}
