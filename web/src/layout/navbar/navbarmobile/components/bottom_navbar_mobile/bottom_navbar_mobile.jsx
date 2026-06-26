// src/layout/navbar/navbarmobile/components/bottom_navbar_mobile/bottom_navbar_mobile.jsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaHome,
  FaCompass,
  FaBook,
  FaUser,
  FaSearch,
  FaPlus,
  FaFire,
  FaBell,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import "./bottom_navbar_mobile.css";

export default function BottomNavbarMobile() {
  const { theme, themeName } = useTheme();
  const { t, language, isRTL } = useLanguage();
  const { currentFont } = useFont();
  const pathname = usePathname();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Check if current theme is dark mode
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Get current language
  const getCurrentLanguage = () => {
    const segments = pathname?.split("/").filter(Boolean);
    const firstSegment = segments?.[0];
    const supportedLanguages = [
      "en",
      "es",
      "fr",
      "de",
      "ja",
      "zh",
      "hi",
      "ar",
      "ur",
      "bn",
      "pt",
      "ru",
      "it",
      "ko",
      "nl",
      "tr",
      "vi",
      "th",
      "pl",
      "sv",
      "ta",
      "te",
      "ml",
      "kn",
      "mr",
    ];
    if (firstSegment && supportedLanguages.includes(firstSegment)) {
      return firstSegment;
    }
    return language || "en";
  };

  const currentLang = getCurrentLanguage();

  // Navigation items
  const navItems = [
    {
      id: "home",
      label: t("nav.home") || "Home",
      icon: <FaHome />,
      path: `/${currentLang}/homepages`,
    },
    {
      id: "explore",
      label: t("nav.explore") || "Explore",
      icon: <FaCompass />,
      path: `/${currentLang}/explore`,
    },
    {
      id: "library",
      label: t("nav.library") || "Library",
      icon: <FaBook />,
      path: `/${currentLang}/library`,
    },
    {
      id: "profile",
      label: t("nav.profile") || "Profile",
      icon: <FaUser />,
      path: `/${currentLang}/profile`,
    },
  ];

  // Update active tab based on pathname
  useEffect(() => {
    const currentPath = pathname || "";
    const active = navItems.find((item) => currentPath.includes(item.path));
    if (active) {
      setActiveTab(active.id);
    }
  }, [pathname]);

  // Handle scroll to hide/show bottom navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if at bottom of page
      const atBottom = currentScrollY + windowHeight >= documentHeight - 100;
      setIsAtBottom(atBottom);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down - hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true);
      }

      // Always show at top of page
      if (currentScrollY < 10) {
        setIsVisible(true);
      }

      // Always show at bottom of page
      if (atBottom) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Handle navigation
  const handleNavigation = (item) => {
    setActiveTab(item.id);
    router.push(item.path);
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/${currentLang}/search?q=${encodeURIComponent(searchQuery)}`,
      );
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  // Font style
  const fontStyle = currentFont?.family
    ? {
        fontFamily: currentFont.family,
      }
    : {};

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav
        className={`
          bottom-navbar
          ${theme.background?.section || "bg-white dark:bg-gray-900"}
          ${theme.border?.default || "border-t border-gray-200 dark:border-gray-700"}
          ${theme.shadow?.container || "shadow-lg"}
          fixed bottom-0 left-0 right-0 z-50
          flex items-center justify-around
          px-2 py-1
          transition-all duration-300
          ${isVisible ? "translate-y-0" : "translate-y-full"}
          ${isAtBottom ? "opacity-100" : ""}
        `}
        style={fontStyle}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={`
                bottom-nav-item
                flex flex-col items-center justify-center
                relative py-1 px-3
                transition-all duration-200
                group
                ${isActive ? "active" : ""}
              `}
              aria-label={item.label}
            >
              {/* Icon Container */}
              <div
                className={`
                  relative flex items-center justify-center
                  transition-all duration-200
                  ${isActive ? "transform -translate-y-1" : ""}
                `}
              >
                {/* Icon Background */}
                {isActive && (
                  <div
                    className={`
                      absolute inset-0
                      ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"}
                      rounded-full
                      scale-150 opacity-10
                      transition-all duration-300
                    `}
                  />
                )}

                {/* Icon */}
                <span
                  className={`
                    text-xl transition-all duration-200
                    ${
                      isActive
                        ? theme.buttonColors?.primaryButton?.textColor ||
                          "text-sky-600 dark:text-sky-400"
                        : theme.iconColors?.secondary ||
                          "text-gray-500 dark:text-gray-400"
                    }
                    ${isActive ? "transform scale-110" : "group-hover:scale-105"}
                  `}
                >
                  {item.icon}
                </span>

                {/* Active Indicator Dot */}
                {isActive && (
                  <span
                    className={`
                      absolute -bottom-1 left-1/2 -translate-x-1/2
                      w-1 h-1 rounded-full
                      ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"}
                      animate-pulse
                    `}
                  />
                )}
              </div>

              {/* Label */}
              <span
                className={`
                  text-[10px] font-medium mt-0.5
                  transition-all duration-200
                  ${
                    isActive
                      ? theme.textColors?.primary ||
                        "text-gray-900 dark:text-white"
                      : theme.textColors?.secondary ||
                        "text-gray-500 dark:text-gray-400"
                  }
                  ${isActive ? "font-semibold" : "group-hover:text-gray-700 dark:group-hover:text-gray-300"}
                `}
              >
                {item.label}
              </span>

              {/* Active Bottom Bar */}
              {isActive && (
                <span
                  className={`
                    absolute -top-[1px] left-1/2 -translate-x-1/2
                    w-8 h-0.5
                    ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"}
                    rounded-full
                    transition-all duration-300
                  `}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Search Overlay */}
      {showSearch && (
        <div
          className={`
            fixed inset-0 z-50
            ${theme.background?.section || "bg-white dark:bg-gray-900"}
            transition-all duration-300
            animate-slideUp
          `}
        >
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => setShowSearch(false)}
                className={`
                  p-2 rounded-lg
                  ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
                  ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
                  transition-all duration-200 hover:scale-105
                `}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={
                      t("nav.search_books") || "Search books, authors..."
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`
                      w-full pl-10 pr-4 py-3 rounded-lg
                      ${theme.background?.input || "bg-gray-50 dark:bg-gray-800"}
                      ${theme.border?.default || "border border-gray-200 dark:border-gray-700"}
                      ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
                      focus:outline-none focus:ring-2 focus:ring-sky-500
                      transition-all duration-200
                    `}
                    autoFocus
                  />
                </div>
              </form>
            </div>

            {/* Quick Search Suggestions */}
            <div className="mt-6">
              <h4
                className={`
                text-sm font-medium mb-3
                ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
              `}
              >
                {t("nav.popular_searches") || "Popular Searches"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Fiction",
                  "Sci-Fi",
                  "Fantasy",
                  "Mystery",
                  "Romance",
                  "Biography",
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                      handleSearch(new Event("submit"));
                    }}
                    className={`
                      px-3 py-1.5 rounded-full text-sm
                      ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
                      ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
                      hover:${theme.background?.hover || "hover:bg-gray-200 dark:hover:bg-gray-700"}
                      transition-all duration-200
                    `}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx="true">{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        /* Hide/Show animation */
        .bottom-navbar {
          transition:
            transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Cyberpunk theme */
        .cyberpunk .bottom-nav-item.active .icon-container {
          animation: cyberpunkGlow 2s ease-in-out infinite alternate;
        }

        @keyframes cyberpunkGlow {
          from {
            text-shadow: 0 0 5px rgba(0, 255, 255, 0.3);
          }
          to {
            text-shadow: 0 0 15px rgba(255, 0, 255, 0.6);
          }
        }

        /* Midnight theme */
        .midnight .bottom-nav-item.active .icon-container {
          animation: midnightGlow 2s ease-in-out infinite alternate;
        }

        @keyframes midnightGlow {
          from {
            text-shadow: 0 0 5px rgba(99, 102, 241, 0.3);
          }
          to {
            text-shadow: 0 0 15px rgba(139, 92, 246, 0.6);
          }
        }

        /* Safeguard - always show at bottom of page */
        .bottom-navbar.always-visible {
          transform: translateY(0) !important;
          opacity: 1 !important;
        }
      `}</style>
    </>
  );
}
