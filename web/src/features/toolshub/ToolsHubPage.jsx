"use client";

import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRTL } from "@/contexts/RTLContext";
import { useFont } from "@/contexts/FontContext";
import ToolsHub from "./components/ToolsHub";
import "./toolshub.css";

export default function ToolsHubPage() {
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
      className={`tools-hub-page ${themeName} ${isDarkMode ? "dark" : ""}`}
    >
      <ToolsHub />
    </div>
  );
}
