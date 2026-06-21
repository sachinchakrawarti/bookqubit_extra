"use client";

import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRTL } from "@/contexts/RTLContext";
import { useFont } from "@/contexts/FontContext";
import KnowledgeGraph from "./components/KnowledgeGraph";
import "./knowledgegraph.css";

export default function KnowledgeGraphPage() {
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
      className={`knowledge-graph-page ${themeName} ${isDarkMode ? "dark" : ""}`}
    >
      <KnowledgeGraph />
    </div>
  );
}
