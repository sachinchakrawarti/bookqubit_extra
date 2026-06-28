// src/features/bookqubit-discovery/books/bookdeatils/components/mobile/MobileBottomSheet.jsx

"use client";

import { useState, useEffect } from "react";
import {
  FaStar,
  FaBook,
  FaInfoCircle,
  FaList,
  FaComment,
  FaTimes,
  FaChevronUp,
  FaTag,
  FaFileAlt,
  FaRobot,
  FaFlag,
  FaShare,
  FaBookmark,
  FaHeart,
  FaDownload,
  FaPrint,
  FaFont,
  FaLanguage,
  FaClipboardList,
  FaLightbulb,
  FaQuestionCircle,
  FaNewspaper,
  FaBlog,
  FaChartBar,
  FaFire,
  FaUsers,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";

const MobileBottomSheet = ({
  isOpen,
  onClose,
  sections,
  activeSection,
  onSectionClick,
  onAskAI,
  onReport,
  onShare,
  onSave,
  onDownload,
  onPrint,
  onFontSize,
  onTranslate,
  onQuiz,
  onHighlight,
  title = "Jump to Section",
}) => {
  const { theme, themeName } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("sections"); // 'sections' | 'actions'

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Handle animation
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Get icon for section
  const getSectionIcon = (id) => {
    switch (id) {
      case "highlights":
        return <FaStar className="w-5 h-5" />;
      case "subjects":
        return <FaBook className="w-5 h-5" />;
      case "publication":
        return <FaInfoCircle className="w-5 h-5" />;
      case "about":
        return <FaFileAlt className="w-5 h-5" />;
      case "summary":
        return <FaList className="w-5 h-5" />;
      case "reviews":
        return <FaComment className="w-5 h-5" />;
      case "news":
        return <FaNewspaper className="w-5 h-5" />;
      case "blog":
        return <FaBlog className="w-5 h-5" />;
      case "related":
        return <FaBook className="w-5 h-5" />;
      case "analytics":
        return <FaChartBar className="w-5 h-5" />;
      case "tags":
        return <FaTag className="w-5 h-5" />;
      default:
        return <FaTag className="w-5 h-5" />;
    }
  };

  // Get display name for section
  const getSectionDisplayName = (id) => {
    const names = {
      highlights: "Highlights",
      subjects: "Subjects",
      publication: "Publication",
      about: "About",
      summary: "Summary",
      reviews: "Reviews",
      news: "News",
      blog: "Blog",
      related: "Related",
      analytics: "Analytics",
      tags: "Tags",
    };
    return names[id] || id;
  };

  // Get description for section
  const getSectionDescription = (id) => {
    const descriptions = {
      highlights: "Key highlights of the book",
      subjects: "Subjects covered in the book",
      publication: "Publication details",
      about: "About this book",
      summary: "Book summary",
      reviews: "User reviews and ratings",
      news: "Latest news about the book",
      blog: "Blog posts related to the book",
      related: "Related books you might enjoy",
      analytics: "Reading analytics and stats",
      tags: "Tags and keywords",
    };
    return descriptions[id] || "";
  };

  // Action items
  const actionItems = [
    {
      id: "ask_ai",
      label: "Ask AI",
      icon: <FaRobot className="w-5 h-5" />,
      description: "Get AI insights about this book",
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      onClick: onAskAI,
    },
    {
      id: "report",
      label: "Report",
      icon: <FaFlag className="w-5 h-5" />,
      description: "Report inappropriate content",
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      onClick: onReport,
    },
    {
      id: "share",
      label: "Share",
      icon: <FaShare className="w-5 h-5" />,
      description: "Share with friends",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      onClick: onShare,
    },
    {
      id: "save",
      label: "Save",
      icon: <FaBookmark className="w-5 h-5" />,
      description: "Save to your library",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      onClick: onSave,
    },
    {
      id: "favorite",
      label: "Favorite",
      icon: <FaHeart className="w-5 h-5" />,
      description: "Add to favorites",
      color: "text-rose-500",
      bgColor: "bg-rose-50 dark:bg-rose-900/20",
      onClick: () => {},
    },
    {
      id: "download",
      label: "Download",
      icon: <FaDownload className="w-5 h-5" />,
      description: "Download for offline reading",
      color: "text-indigo-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      onClick: onDownload,
    },
    {
      id: "print",
      label: "Print",
      icon: <FaPrint className="w-5 h-5" />,
      description: "Print this book",
      color: "text-gray-500",
      bgColor: "bg-gray-50 dark:bg-gray-800",
      onClick: onPrint,
    },
    {
      id: "font_size",
      label: "Font Size",
      icon: <FaFont className="w-5 h-5" />,
      description: "Adjust reading font size",
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      onClick: onFontSize,
    },
    {
      id: "translate",
      label: "Translate",
      icon: <FaLanguage className="w-5 h-5" />,
      description: "Translate to other languages",
      color: "text-teal-500",
      bgColor: "bg-teal-50 dark:bg-teal-900/20",
      onClick: onTranslate,
    },
    {
      id: "quiz",
      label: "Quiz",
      icon: <FaClipboardList className="w-5 h-5" />,
      description: "Test your knowledge",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      onClick: onQuiz,
    },
    {
      id: "highlight",
      label: "Highlight",
      icon: <FaLightbulb className="w-5 h-5" />,
      description: "Highlight important parts",
      color: "text-amber-500",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      onClick: onHighlight,
    },
    {
      id: "help",
      label: "Help",
      icon: <FaQuestionCircle className="w-5 h-5" />,
      description: "Get help with this book",
      color: "text-sky-500",
      bgColor: "bg-sky-50 dark:bg-sky-900/20",
      onClick: () => {},
    },
  ];

  const handleSectionClick = (sectionId) => {
    onSectionClick(sectionId);
    onClose();
  };

  const handleActionClick = (action) => {
    if (action.onClick) {
      action.onClick();
    }
    onClose();
  };

  if (!isVisible && !isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          style={{
            animation: "fadeIn 0.3s ease-out",
          }}
        />
      )}

      {/* Bottom Sheet */}
      <div
        className={`
          fixed bottom-0 left-0 right-0 z-50
          ${theme.background?.section || "bg-white dark:bg-gray-900"}
          ${theme.border?.default || "border-t border-gray-200 dark:border-gray-700"}
          rounded-t-2xl
          shadow-2xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-y-0" : "translate-y-full"}
        `}
        style={{
          maxHeight: "70vh",
          animation: isOpen ? "slideUp 0.3s ease-out" : "none",
        }}
      >
        {/* Handle Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
          </div>
          <button
            onClick={onClose}
            className={`
              p-2 rounded-full
              ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
              ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
              hover:${theme.background?.hover || "hover:bg-gray-200 dark:hover:bg-gray-700"}
              transition-all duration-200 hover:scale-110
            `}
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-100 dark:border-gray-800">
          <button
            onClick={() => setActiveTab("sections")}
            className={`
              flex-1 py-3 text-sm font-medium transition-all duration-200
              ${
                activeTab === "sections"
                  ? `
                  ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
                  border-b-2 border-sky-500
                `
                  : `
                  ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                  hover:${theme.textColors?.primary || "hover:text-gray-700 dark:hover:text-gray-300"}
                `
              }
            `}
          >
            📚 Sections
          </button>
          <button
            onClick={() => setActiveTab("actions")}
            className={`
              flex-1 py-3 text-sm font-medium transition-all duration-200
              ${
                activeTab === "actions"
                  ? `
                  ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
                  border-b-2 border-sky-500
                `
                  : `
                  ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
                  hover:${theme.textColors?.primary || "hover:text-gray-700 dark:hover:text-gray-300"}
                `
              }
            `}
          >
            ⚡ Actions
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(70vh-120px)]">
          {/* Sections Tab */}
          {activeTab === "sections" && (
            <div className="px-4 py-4">
              <div className="grid grid-cols-2 gap-3">
                {sections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleSectionClick(section.id)}
                      className={`
                        flex flex-col items-start gap-1.5 p-3 rounded-xl
                        transition-all duration-200
                        ${
                          isActive
                            ? `
                            ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"}
                            ${theme.buttonColors?.primaryButton?.textColor || "text-white"}
                            shadow-md scale-105
                          `
                            : `
                            ${theme.background?.navigationDots || "bg-gray-50 dark:bg-gray-800"}
                            ${theme.textColors?.primary || "text-gray-700 dark:text-gray-300"}
                            hover:${theme.background?.hover || "hover:bg-gray-100 dark:hover:bg-gray-700"}
                          `
                        }
                      `}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <span
                          className={
                            isActive
                              ? "text-white"
                              : "text-gray-500 dark:text-gray-400"
                          }
                        >
                          {getSectionIcon(section.id)}
                        </span>
                        <span className="text-sm font-medium">
                          {getSectionDisplayName(section.id)}
                        </span>
                        {isActive && (
                          <span className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse" />
                        )}
                      </div>
                      <span
                        className={`
                        text-xs text-left
                        ${isActive ? "text-white/80" : "text-gray-400 dark:text-gray-500"}
                      `}
                      >
                        {getSectionDescription(section.id)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Actions Tab */}
          {activeTab === "actions" && (
            <div className="px-4 py-4">
              <div className="grid grid-cols-2 gap-3">
                {actionItems.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleActionClick(action)}
                    className={`
                      flex flex-col items-start gap-1.5 p-3 rounded-xl
                      transition-all duration-200
                      ${action.bgColor}
                      hover:scale-105
                      ${theme.border?.default || "border border-gray-100 dark:border-gray-700"}
                    `}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <span className={action.color}>{action.icon}</span>
                      <span
                        className={`
                        text-sm font-medium
                        ${theme.textColors?.primary || "text-gray-700 dark:text-gray-300"}
                      `}
                      >
                        {action.label}
                      </span>
                    </div>
                    <span
                      className={`
                      text-xs text-left
                      ${theme.textColors?.secondary || "text-gray-400 dark:text-gray-500"}
                    `}
                    >
                      {action.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(100%);
            opacity: 0;
          }
        }

        /* Cyberpunk theme */
        .cyberpunk .bottom-sheet-content {
          border-color: #ff00ff !important;
          box-shadow: 0 0 30px rgba(255, 0, 255, 0.2) !important;
        }

        /* Midnight theme */
        .midnight .bottom-sheet-content {
          border-color: #6366f1 !important;
          box-shadow: 0 0 30px rgba(99, 102, 241, 0.2) !important;
        }

        /* Dark mode scrollbar */
        .dark .bottom-sheet-content::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
        }

        .cyberpunk .bottom-sheet-content::-webkit-scrollbar-thumb {
          background: #ff00ff;
        }
      `}</style>
    </>
  );
};

export default MobileBottomSheet;
