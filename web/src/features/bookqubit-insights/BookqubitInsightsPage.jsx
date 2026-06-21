"use client";

import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRTL } from "@/contexts/RTLContext";
import { useFont } from "@/contexts/FontContext";
import BookqubitInsights from "./components/BookqubitInsights";
import "./bookqubitinsights.css";

export default function BookqubitInsightsPage() {
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
      className={`bookqubit-insights-page ${isDarkMode ? "dark" : ""}`}
    >
      <BookqubitInsights />
    </div>
  );
}
