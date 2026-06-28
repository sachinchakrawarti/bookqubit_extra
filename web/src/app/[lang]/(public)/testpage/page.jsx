// src/app/[lang]/(public)/testpage/page.jsx

"use client";

import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import BookDetails from "@/features/bookqubit-discovery/books/bookdeatils/bookdeatils";

// Mock book data
const mockBook = {
  id: 1,
  title: "The Midnight Library",
  author: "Matt Haig",
  category: "Fiction",
  rating: 4.7,
  reviewCount: 1243,
  pageCount: 304,
  language: "English",
  publishedDate: "2020-08-13",
  published: 2020,
  description: "Between life and death there is a library...",
  imageUrl: "https://covers.openlibrary.org/b/id/8231859-L.jpg",
  slug: "the-midnight-library",
  keyPoints: [
    "Explores infinite possibilities",
    "Deals with regret and self-discovery",
    "Philosophical yet accessible",
  ],
  subjects: ["Self-Discovery", "Mental Health", "Philosophy"],
  publisher: "Canongate Books",
  isbn: "9781786892737",
};

export default function TestPage() {
  const { theme, themeName } = useTheme();
  const { language } = useLanguage();
  const { currentFont } = useFont();

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";
  const fontStyle = currentFont?.family
    ? { fontFamily: currentFont.family }
    : {};

  return (
    <div
      className={`
        min-h-screen p-4 sm:p-6
        ${theme.background?.page || (isDarkMode ? "bg-gray-950" : "bg-gray-50")}
      `}
      style={fontStyle}
    >
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-4 flex items-center justify-between">
          <h1
            className={`
            text-lg sm:text-xl font-bold
            ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
          `}
          >
            📖 Book Details
          </h1>
          <span
            className={`
            text-xs px-2 py-1 rounded-full
            ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
            ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
          `}
          >
            {language.toUpperCase()}
          </span>
        </div>

        {/* Book Details */}
        <BookDetails book={mockBook} language={language} />
      </div>
    </div>
  );
}
