// src/layout/navbar/navbardesktop/navbar_desktop_second_row/Navbar_Desktop_Second_Row_Slider.jsx

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaBook,
  FaBoxes,
  FaUser,
  FaInfoCircle,
  FaGraduationCap,
  FaTimes,
  FaChevronRight,
  FaFire,
  FaStar,
  FaRocket,
  FaCrown,
  FaGem,
  FaAward,
  FaTrophy,
  FaMagic,
  FaCompass,
  FaFeatherAlt,
  FaTheaterMasks,
  FaHistory,
  FaLeaf,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import "./Navbar_Desktop_Second_Row_Slider.css";

// Navigation Configuration with 6 new items (total 22 items)
const getNavigationConfig = (t, currentLang) => ({
  items: [
    // Original items (1-9)
    {
      name: t("nav.home"),
      icon: <FaHome />,
      path: `/${currentLang}/homepages`,
      translationKey: "nav.home",
    },
    {
      name: t("nav.books"),
      icon: <FaBook />,
      path: `/${currentLang}/books`,
      translationKey: "nav.books",
    },
    {
      name: t("nav.academic_books"),
      icon: <FaGraduationCap />,
      path: `/${currentLang}/academicbooks`,
      translationKey: "nav.academic_books",
    },
    {
      name: t("nav.comics"),
      icon: <FaBook />,
      path: `/${currentLang}/comics`,
      translationKey: "nav.comics",
    },
    {
      name: t("nav.genre_category"),
      icon: <FaBoxes />,
      path: `/${currentLang}/category`,
      translationKey: "nav.genre_category",
    },
    {
      name: t("nav.collections"),
      icon: <FaBoxes />,
      path: `/${currentLang}/collections`,
      translationKey: "nav.collections",
    },
    {
      name: t("nav.authors"),
      icon: <FaUser />,
      path: `/${currentLang}/authors`,
      translationKey: "nav.authors",
    },
    {
      name: t("nav.publications"),
      icon: <FaBook />,
      path: `/${currentLang}/publications`,
      translationKey: "nav.publications",
    },
    {
      name: t("nav.about"),
      icon: <FaInfoCircle />,
      path: `/${currentLang}/about`,
      translationKey: "nav.about",
    },
    // 7 New items (10-16)
    {
      name: t("nav.bestsellers") || "Bestsellers",
      icon: <FaFire />,
      path: `/${currentLang}/bestsellers`,
      translationKey: "nav.bestsellers",
    },
    {
      name: t("nav.new_releases") || "New Releases",
      icon: <FaStar />,
      path: `/${currentLang}/new-releases`,
      translationKey: "nav.new_releases",
    },
    {
      name: t("nav.trending") || "Trending Now",
      icon: <FaRocket />,
      path: `/${currentLang}/trending`,
      translationKey: "nav.trending",
    },
    {
      name: t("nav.award_winning") || "Award Winning",
      icon: <FaAward />,
      path: `/${currentLang}/award-winning`,
      translationKey: "nav.award_winning",
    },
    {
      name: t("nav.classics") || "Classics",
      icon: <FaCrown />,
      path: `/${currentLang}/classics`,
      translationKey: "nav.classics",
    },
    {
      name: t("nav.rare_books") || "Rare Books",
      icon: <FaGem />,
      path: `/${currentLang}/rare-books`,
      translationKey: "nav.rare_books",
    },
    {
      name: t("nav.top_rated") || "Top Rated",
      icon: <FaTrophy />,
      path: `/${currentLang}/top-rated`,
      translationKey: "nav.top_rated",
    },
    // 6 NEW ADDITIONAL ITEMS (17-22)
    {
      name: t("nav.fiction") || "Fiction",
      icon: <FaMagic />,
      path: `/${currentLang}/fiction`,
      translationKey: "nav.fiction",
    },
    {
      name: t("nav.non_fiction") || "Non-Fiction",
      icon: <FaCompass />,
      path: `/${currentLang}/non-fiction`,
      translationKey: "nav.non_fiction",
    },
    {
      name: t("nav.poetry") || "Poetry",
      icon: <FaFeatherAlt />,
      path: `/${currentLang}/poetry`,
      translationKey: "nav.poetry",
    },
    {
      name: t("nav.drama") || "Drama",
      icon: <FaTheaterMasks />,
      path: `/${currentLang}/drama`,
      translationKey: "nav.drama",
    },
    {
      name: t("nav.history") || "History",
      icon: <FaHistory />,
      path: `/${currentLang}/history`,
      translationKey: "nav.history",
    },
    {
      name: t("nav.nature") || "Nature",
      icon: <FaLeaf />,
      path: `/${currentLang}/nature`,
      translationKey: "nav.nature",
    },
  ],
});

export default function NavbarDesktopSecondRowSlider({ isOpen, onClose }) {
  const { theme, themeName } = useTheme();
  const { t, isRTL, language } = useLanguage();
  const { currentFont } = useFont();
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navRef = useRef(null);

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
  const navigationConfig = getNavigationConfig(t, currentLang);

  // Check if a path is active
  const isActivePath = (path) => {
    if (!path) return false;
    const pathWithoutLang = path.replace(/^\/[a-z]{2}\//, "/");
    const currentPathWithoutLang = pathname.replace(/^\/[a-z]{2}\//, "/");
    return (
      currentPathWithoutLang === pathWithoutLang ||
      currentPathWithoutLang.startsWith(pathWithoutLang + "/")
    );
  };

  // Font style
  const fontStyle = currentFont?.family
    ? {
        fontFamily: currentFont.family,
      }
    : {};

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle navigation click
  const handleNavClick = (path) => {
    setActiveItem(path);
    onClose();
  };

  // Handle scroll to top
  const scrollToTop = () => {
    if (navRef.current) {
      navRef.current.scrollTop = 0;
    }
  };

  // Handle scroll event to show/hide scroll to top button
  const handleScroll = () => {
    if (navRef.current) {
      setShowScrollTop(navRef.current.scrollTop > 200);
    }
  };

  // Group items
  const items = navigationConfig.items.filter(
    (item) => item.name && item.name.trim() !== "",
  );
  const originalItems = items.slice(0, 9);
  const newItems = items.slice(9, 16);
  const extraItems = items.slice(16);

  return (
    <>
      {/* Overlay - NO RADIUS */}
      {isOpen && (
        <div
          className="navbar-slider-overlay"
          onClick={onClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 999,
            animation: "fadeIn 0.3s ease-in-out",
          }}
        />
      )}

      {/* Sidebar - SCROLLABLE WITH NO RADIUS ONLY INSIDE */}
      <aside
        className={`
          navbar-slider-sidebar
          fixed top-0 ${isRTL ? "right-0" : "left-0"} 
          w-80 h-full z-[1000]
          ${theme.background?.section || "bg-white dark:bg-gray-900"}
          ${theme.border?.default || "border-r border-gray-200 dark:border-gray-700"}
          ${theme.shadow?.container || "shadow-2xl"}
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : isRTL ? "translate-x-full" : "-translate-x-full"}
          flex flex-col
        `}
        style={{
          ...fontStyle,
        }}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Premium Header - Fixed */}
        <div
          className={`
          flex-shrink-0
          relative overflow-hidden
          p-6 border-b
          ${theme.border?.default || "border-gray-200 dark:border-gray-700"}
          ${theme.background?.bookCoverSide || "bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900"}
          slider-no-radius
        `}
        >
          <div
            className={`
            absolute inset-0 opacity-5
            bg-[url('https://www.transparenttextures.com/patterns/soft-circle-scales.png')]
          `}
          />

          <div className="relative flex items-center justify-between">
            <div>
              <span
                className={`
                inline-block
                ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
                ${theme.textColors?.badge || "text-sky-800 dark:text-sky-400"}
                px-3 py-1 text-xs font-medium mb-2
                ${theme.shadow?.button || ""}
                slider-no-radius
              `}
              >
                {t("nav.menu") || "Menu"}
              </span>
              <h2
                className={`
                text-2xl font-bold
                ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
              `}
              >
                BookQubit
              </h2>
              <p
                className={`
                text-sm
                ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
              `}
              >
                {t("nav.explore_books") || "Explore thousands of books"}
              </p>
            </div>
            <button
              onClick={onClose}
              className={`
                p-2
                ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
                ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
                hover:${theme.background?.hover || "hover:bg-gray-200 dark:hover:bg-gray-700"}
                transition-all duration-200 hover:scale-105
                ${theme.shadow?.button || "shadow-md"}
                slider-no-radius
              `}
              aria-label="Close menu"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Items - SCROLLABLE */}
        <nav
          ref={navRef}
          onScroll={handleScroll}
          className={`
            flex-1 overflow-y-auto p-4
            scrollable-nav
          `}
          style={{
            scrollBehavior: "smooth",
          }}
        >
          {/* Original Items Section */}
          <div className="mb-6">
            <div
              className={`
              px-4 py-2 text-xs font-semibold uppercase tracking-wider
              ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
            `}
            >
              {t("nav.main_menu") || "Main Menu"}
            </div>
            <div className="space-y-1">
              {originalItems.map((item) => {
                const isActive = isActivePath(item.path);
                return (
                  <Link
                    key={item.translationKey}
                    href={item.path || "#"}
                    className={`
                      group flex items-center gap-3 px-4 py-3
                      transition-all duration-200 hover:scale-105
                      ${
                        isActive
                          ? `
                          ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"}
                          ${theme.buttonColors?.primaryButton?.textColor || "text-white"}
                          ${theme.shadow?.button || "shadow-md"}
                        `
                          : `
                          ${theme.textColors?.primary || "text-gray-700 dark:text-gray-300"}
                          hover:${theme.background?.hover || "hover:bg-gray-100 dark:hover:bg-gray-800"}
                        `
                      }
                      cursor-pointer
                      slider-no-radius
                    `}
                    style={{
                      flexDirection: isRTL ? "row-reverse" : "row",
                      textDecoration: "none",
                    }}
                    onClick={() => handleNavClick(item.path)}
                  >
                    <span
                      className={`
                      text-xl
                      ${isActive ? "text-white" : theme.iconColors?.secondary || "text-gray-500 dark:text-gray-400"}
                    `}
                    >
                      {item.icon}
                    </span>
                    <span
                      className={`
                      flex-1 text-sm font-medium
                      ${isActive ? "text-white" : ""}
                    `}
                    >
                      {item.name}
                    </span>
                    {isActive && (
                      <span
                        className={`
                        w-2 h-2
                        ${theme.border?.activeIndicator || "bg-white"}
                      `}
                      />
                    )}
                    {!isActive && (
                      <FaChevronRight
                        className={`
                        w-4 h-4
                        ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-600"}
                        transition-transform duration-200
                        group-hover:translate-x-1
                        ${isRTL ? "rotate-180 group-hover:-translate-x-1" : ""}
                      `}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* New Items Section - 7 items */}
          {newItems.length > 0 && (
            <div className="mb-6">
              <div
                className={`
                px-4 py-2 text-xs font-semibold uppercase tracking-wider
                ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                border-t pt-4
                ${theme.border?.default || "border-gray-200 dark:border-gray-700"}
              `}
              >
                {t("nav.discover") || "Discover More"}
              </div>
              <div className="space-y-1 mt-2">
                {newItems.map((item) => {
                  const isActive = isActivePath(item.path);
                  return (
                    <Link
                      key={item.translationKey}
                      href={item.path || "#"}
                      className={`
                        group flex items-center gap-3 px-4 py-3
                        transition-all duration-200 hover:scale-105
                        ${
                          isActive
                            ? `
                            ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"}
                            ${theme.buttonColors?.primaryButton?.textColor || "text-white"}
                            ${theme.shadow?.button || "shadow-md"}
                          `
                            : `
                            ${theme.textColors?.primary || "text-gray-700 dark:text-gray-300"}
                            hover:${theme.background?.hover || "hover:bg-gray-100 dark:hover:bg-gray-800"}
                          `
                        }
                        cursor-pointer
                        slider-no-radius
                      `}
                      style={{
                        flexDirection: isRTL ? "row-reverse" : "row",
                        textDecoration: "none",
                      }}
                      onClick={() => handleNavClick(item.path)}
                    >
                      <span
                        className={`
                        text-xl
                        ${isActive ? "text-white" : theme.iconColors?.secondary || "text-gray-500 dark:text-gray-400"}
                      `}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`
                        flex-1 text-sm font-medium
                        ${isActive ? "text-white" : ""}
                      `}
                      >
                        {item.name}
                      </span>
                      {isActive && (
                        <span
                          className={`
                          w-2 h-2
                          ${theme.border?.activeIndicator || "bg-white"}
                        `}
                        />
                      )}
                      {!isActive && (
                        <FaChevronRight
                          className={`
                          w-4 h-4
                          ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-600"}
                          transition-transform duration-200
                          group-hover:translate-x-1
                          ${isRTL ? "rotate-180 group-hover:-translate-x-1" : ""}
                        `}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Extra Items Section - 6 NEW ITEMS */}
          {extraItems.length > 0 && (
            <div>
              <div
                className={`
                px-4 py-2 text-xs font-semibold uppercase tracking-wider
                ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                border-t pt-4
                ${theme.border?.default || "border-gray-200 dark:border-gray-700"}
              `}
              >
                {t("nav.explore") || "Explore"}
              </div>
              <div className="space-y-1 mt-2">
                {extraItems.map((item) => {
                  const isActive = isActivePath(item.path);
                  return (
                    <Link
                      key={item.translationKey}
                      href={item.path || "#"}
                      className={`
                        group flex items-center gap-3 px-4 py-3
                        transition-all duration-200 hover:scale-105
                        ${
                          isActive
                            ? `
                            ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"}
                            ${theme.buttonColors?.primaryButton?.textColor || "text-white"}
                            ${theme.shadow?.button || "shadow-md"}
                          `
                            : `
                            ${theme.textColors?.primary || "text-gray-700 dark:text-gray-300"}
                            hover:${theme.background?.hover || "hover:bg-gray-100 dark:hover:bg-gray-800"}
                          `
                        }
                        cursor-pointer
                        slider-no-radius
                      `}
                      style={{
                        flexDirection: isRTL ? "row-reverse" : "row",
                        textDecoration: "none",
                      }}
                      onClick={() => handleNavClick(item.path)}
                    >
                      <span
                        className={`
                        text-xl
                        ${isActive ? "text-white" : theme.iconColors?.secondary || "text-gray-500 dark:text-gray-400"}
                      `}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`
                        flex-1 text-sm font-medium
                        ${isActive ? "text-white" : ""}
                      `}
                      >
                        {item.name}
                      </span>
                      {isActive && (
                        <span
                          className={`
                          w-2 h-2
                          ${theme.border?.activeIndicator || "bg-white"}
                        `}
                        />
                      )}
                      {!isActive && (
                        <FaChevronRight
                          className={`
                          w-4 h-4
                          ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-600"}
                          transition-transform duration-200
                          group-hover:translate-x-1
                          ${isRTL ? "rotate-180 group-hover:-translate-x-1" : ""}
                        `}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Scroll to top indicator */}
          {showScrollTop && (
            <div className="flex justify-center mt-4">
              <button
                onClick={scrollToTop}
                className={`
                  px-4 py-2 text-xs font-medium
                  ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"}
                  ${theme.buttonColors?.primaryButton?.textColor || "text-white"}
                  ${theme.shadow?.button || "shadow-md"}
                  transition-all duration-200 hover:scale-105
                  flex items-center gap-2
                  slider-no-radius
                `}
              >
                <FaChevronRight className="rotate-270" />
                {t("nav.scroll_to_top") || "Scroll to Top"}
              </button>
            </div>
          )}
        </nav>

        {/* Footer - Fixed */}
        <div
          className={`
          flex-shrink-0
          p-4 border-t
          ${theme.border?.default || "border-gray-200 dark:border-gray-700"}
          ${theme.background?.footer || ""}
          slider-no-radius
        `}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className={`
                text-xs
                ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
              `}
              >
                © 2024 BookQubit
              </span>
              <span
                className={`
                w-1 h-1
                ${theme.textColors?.secondary || "bg-gray-400 dark:bg-gray-600"}
              `}
              />
              <span
                className={`
                text-xs
                ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
              `}
              >
                v2.0
              </span>
            </div>
            <button
              className={`
              px-3 py-1 text-xs font-medium
              ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"}
              ${theme.buttonColors?.primaryButton?.textColor || "text-white"}
              ${theme.shadow?.button || "shadow-md"}
              transition-all duration-200 hover:scale-105
              slider-no-radius
            `}
            >
              {t("nav.get_started") || "Get Started"}
            </button>
          </div>
        </div>
      </aside>

      {/* Styles - ONLY AFFECTS SLIDER */}
      <style jsx="true">{`
        /* Only target elements inside the slider */
        .navbar-slider-sidebar,
        .navbar-slider-sidebar * {
          border-radius: 0 !important;
        }

        /* Override for any child elements */
        .slider-no-radius {
          border-radius: 0 !important;
        }

        /* Scrollable navigation */
        .scrollable-nav {
          scroll-behavior: smooth;
        }

        .scrollable-nav::-webkit-scrollbar {
          width: 4px;
        }

        .scrollable-nav::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollable-nav::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 0 !important;
        }

        .dark .scrollable-nav::-webkit-scrollbar-thumb,
        .midnight .scrollable-nav::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 0 !important;
        }

        .cyberpunk .scrollable-nav::-webkit-scrollbar-thumb {
          background: #ff00ff;
          border-radius: 0 !important;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            transform: ${isRTL ? "translateX(100%)" : "translateX(-100%)"};
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0);
          }
          to {
            transform: ${isRTL ? "translateX(100%)" : "translateX(-100%)"};
          }
        }

        .navbar-slider-sidebar {
          animation: slideIn 0.3s ease-in-out;
        }

        .navbar-slider-sidebar.closing {
          animation: slideOut 0.3s ease-in-out forwards;
        }

        /* Cyberpunk theme - only for slider */
        .cyberpunk .navbar-slider-sidebar .active {
          animation: cyberpunkGlow 2s ease-in-out infinite alternate;
        }

        @keyframes cyberpunkGlow {
          from {
            box-shadow: 0 0 5px rgba(0, 255, 255, 0.3);
          }
          to {
            box-shadow: 0 0 15px rgba(0, 255, 255, 0.6);
          }
        }

        /* Rotate chevron for scroll to top */
        .rotate-270 {
          transform: rotate(270deg);
        }
      `}</style>
    </>
  );
}
