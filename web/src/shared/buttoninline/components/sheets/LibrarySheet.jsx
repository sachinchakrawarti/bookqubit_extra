"use client";

import React, { useState, useCallback } from "react";
import {
  FaTimes,
  FaBookOpen,
  FaCheck,
  FaClock,
  FaStar,
  FaPlus,
  FaHeart,
  FaList,
  FaChevronRight,
  FaBook,
  FaFire,
  FaGift,
  FaSearch,
  FaArrowLeft,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import "./LibrarySheet.css";

const LibrarySheet = ({
  isOpen,
  onClose,
  bookName = "The Great Gatsby",
  authorName = "F. Scott Fitzgerald",
  bookCover = null,
  onAddToLibrary,
  isMobile = false,
  className = "",
}) => {
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();
  const [selectedShelf, setSelectedShelf] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentlyAdded, setRecentlyAdded] = useState(false);

  if (!theme) return null;

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  const shelves = [
    {
      id: "currently-reading",
      icon: <FaBookOpen />,
      label: "Currently Reading",
      description: "Books you're reading right now",
      color: "#3B82F6",
      count: 3,
      popular: true,
    },
    {
      id: "want-to-read",
      icon: <FaStar />,
      label: "Want to Read",
      description: "Books you want to read next",
      color: "#F59E0B",
      count: 12,
      popular: true,
    },
    {
      id: "read",
      icon: <FaCheck />,
      label: "Read",
      description: "Books you've finished",
      color: "#10B981",
      count: 45,
      popular: true,
    },
    {
      id: "reading-again",
      icon: <FaClock />,
      label: "Reading Again",
      description: "Books worth re-reading",
      color: "#8B5CF6",
      count: 5,
      popular: false,
    },
    {
      id: "favorites",
      icon: <FaHeart />,
      label: "Favorites",
      description: "Your all-time favorite books",
      color: "#EF4444",
      count: 8,
      popular: false,
    },
    {
      id: "to-finish",
      icon: <FaFire />,
      label: "To Finish",
      description: "Books you've started but not finished",
      color: "#F97316",
      count: 2,
      popular: false,
    },
  ];

  const filteredShelves = shelves.filter(
    (shelf) =>
      shelf.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shelf.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAddToLibrary = () => {
    if (selectedShelf) {
      onAddToLibrary?.(selectedShelf);
      setRecentlyAdded(true);
      setTimeout(() => {
        setRecentlyAdded(false);
        onClose();
      }, 1500);
    }
  };

  const getBgColor = () =>
    theme.background?.card || (isDarkMode ? "#1F2937" : "#FFFFFF");
  const getBorderColor = () =>
    theme.border?.default || (isDarkMode ? "#374151" : "#E5E7EB");
  const getTextColor = () =>
    theme.textColors?.primary || (isDarkMode ? "#F9FAFB" : "#111827");
  const getSectionBg = () =>
    theme.background?.section || (isDarkMode ? "#111827" : "#F9FAFB");

  const animationProps = isMobile
    ? {
        initial: { y: "100%" },
        animate: { y: 0 },
        exit: { y: "100%" },
        transition: { type: "spring", damping: 35, stiffness: 300 },
      }
    : {
        initial: { x: "100%" },
        animate: { x: 0 },
        exit: { x: "100%" },
        transition: { type: "spring", damping: 30, stiffness: 280 },
      };

  const renderContent = () => (
    <>
      <AnimatePresence>
        {recentlyAdded && (
          <motion.div
            className={`success-toast ${isDarkMode ? "dark" : ""}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <FaCheck className="success-icon" />
            <span>
              Added to "{shelves.find((s) => s.id === selectedShelf)?.label}"
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="library-sheet-header">
        <div className="header-top">
          {isMobile ? (
            <button
              className={`header-close-btn ${isDarkMode ? "dark" : ""}`}
              onClick={onClose}
            >
              <FaTimes />
            </button>
          ) : (
            <>
              <button
                className={`header-back-btn ${isDarkMode ? "dark" : ""}`}
                onClick={onClose}
              >
                <FaArrowLeft />
              </button>
              <button
                className={`header-close-btn ${isDarkMode ? "dark" : ""}`}
                onClick={onClose}
              >
                <FaTimes />
              </button>
            </>
          )}
        </div>
        <div className="header-content">
          <h2 className={`header-title ${isDarkMode ? "dark" : ""}`}>
            <FaBook className="header-icon" /> My Library
          </h2>
          <p className={`header-subtitle ${isDarkMode ? "dark" : ""}`}>
            Add this book to your collection
          </p>
        </div>
      </div>

      <div className={`book-preview ${isDarkMode ? "dark" : ""}`}>
        <div className="book-preview-cover">
          {bookCover ? (
            <img src={bookCover} alt={bookName} className="book-cover-image" />
          ) : (
            <div className="book-preview-icon">
              <FaBookOpen />
            </div>
          )}
        </div>
        <div className="book-preview-info">
          <h3 className={`book-preview-title ${isDarkMode ? "dark" : ""}`}>
            {bookName}
          </h3>
          <p className={`book-preview-author ${isDarkMode ? "dark" : ""}`}>
            by {authorName}
          </p>
          <span className={`book-preview-status ${isDarkMode ? "dark" : ""}`}>
            <FaGift className="status-icon" /> Add to shelf
          </span>
        </div>
      </div>

      <div className="library-sheet-search">
        <div className="search-wrapper">
          <FaSearch className={`search-icon ${isDarkMode ? "dark" : ""}`} />
          <input
            type="text"
            className={`search-input ${isDarkMode ? "dark" : ""}`}
            placeholder="Search shelves..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: getSectionBg(),
              color: getTextColor(),
              borderColor: getBorderColor(),
            }}
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => setSearchQuery("")}>
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      <div className="library-sheet-shelves">
        <div className="shelves-header">
          <span className={`shelves-label ${isDarkMode ? "dark" : ""}`}>
            Your Shelves
          </span>
          <span className={`shelves-count ${isDarkMode ? "dark" : ""}`}>
            {filteredShelves.length} shelves
          </span>
        </div>
        <div className="shelves-list">
          {filteredShelves.map((shelf) => {
            const isSelected = selectedShelf === shelf.id;
            return (
              <motion.button
                key={shelf.id}
                className={`shelf-item ${isDarkMode ? "dark" : ""} ${isSelected ? "selected" : ""}`}
                onClick={() => setSelectedShelf(shelf.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  borderColor: isSelected ? shelf.color : getBorderColor(),
                  background: isSelected ? `${shelf.color}15` : "transparent",
                }}
              >
                <div className="shelf-item-left">
                  <div
                    className="shelf-icon-wrapper"
                    style={{
                      background: `${shelf.color}20`,
                      color: shelf.color,
                    }}
                  >
                    {shelf.icon}
                  </div>
                  <div className="shelf-info">
                    <span
                      className={`shelf-label ${isDarkMode ? "dark" : ""}`}
                      style={isSelected ? { color: shelf.color } : {}}
                    >
                      {shelf.label}
                    </span>
                    <span
                      className={`shelf-description ${isDarkMode ? "dark" : ""}`}
                    >
                      {shelf.description}
                    </span>
                  </div>
                </div>
                <div className="shelf-item-right">
                  {shelf.popular && (
                    <span
                      className={`shelf-badge ${isDarkMode ? "dark" : ""}`}
                      style={{
                        background: `${shelf.color}20`,
                        color: shelf.color,
                      }}
                    >
                      Popular
                    </span>
                  )}
                  <span
                    className={`shelf-count ${isDarkMode ? "dark" : ""}`}
                    style={isSelected ? { color: shelf.color } : {}}
                  >
                    {shelf.count}
                  </span>
                  {isSelected ? (
                    <FaCheck
                      className="shelf-selected-icon"
                      style={{ color: shelf.color }}
                    />
                  ) : (
                    <FaChevronRight
                      className={`shelf-arrow ${isDarkMode ? "dark" : ""}`}
                    />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="library-sheet-quick-actions">
        <button
          className={`quick-action ${isDarkMode ? "dark" : ""}`}
          onClick={() => {}}
        >
          <FaPlus className="quick-action-icon" /> New Shelf
        </button>
        <button
          className={`quick-action ${isDarkMode ? "dark" : ""}`}
          onClick={() => {}}
        >
          <FaList className="quick-action-icon" /> View All
        </button>
      </div>

      <div className={`library-sheet-footer ${isDarkMode ? "dark" : ""}`}>
        <button
          className={`footer-btn cancel-btn ${isDarkMode ? "dark" : ""}`}
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className={`footer-btn add-btn ${!selectedShelf ? "disabled" : ""}`}
          style={{
            background: selectedShelf
              ? `linear-gradient(135deg, ${theme.colors?.primary || "#6366F1"}, ${theme.colors?.secondary || "#8B5CF6"})`
              : isDarkMode
                ? "#374151"
                : "#E5E7EB",
            color: selectedShelf ? "white" : isDarkMode ? "#6B7280" : "#9CA3AF",
            cursor: selectedShelf ? "pointer" : "not-allowed",
          }}
          onClick={handleAddToLibrary}
          disabled={!selectedShelf}
        >
          {selectedShelf ? "Add to Shelf" : "Select a Shelf"}
        </button>
      </div>
    </>
  );

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            className={`library-sheet-backdrop ${isDarkMode ? "dark" : ""}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {isMobile ? (
            <motion.div
              className={`library-bottomsheet ${isDarkMode ? "dark" : ""} ${className}`}
              style={{
                background: getBgColor(),
                borderColor: getBorderColor(),
              }}
              {...animationProps}
            >
              <div className="library-bottomsheet-handle">
                <div className="handle-bar" />
              </div>
              {renderContent()}
            </motion.div>
          ) : (
            <motion.div
              className={`library-sidesheet ${isDarkMode ? "dark" : ""} ${className}`}
              style={{
                background: getBgColor(),
                borderColor: getBorderColor(),
                boxShadow: isDarkMode
                  ? "-10px 0 40px rgba(0,0,0,0.5)"
                  : "-10px 0 40px rgba(0,0,0,0.15)",
              }}
              {...animationProps}
            >
              {renderContent()}
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default LibrarySheet;
