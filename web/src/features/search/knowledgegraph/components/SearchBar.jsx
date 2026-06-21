"use client";

import { useState, useEffect, useRef } from "react";
import { FiSearch, FiX, FiTrendingUp, FiClock } from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SearchBar({
  query,
  onSearch,
  onClear,
  suggestions,
  recentSearches,
  loading,
}) {
  const { td } = useLanguage();
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown when query is cleared
  useEffect(() => {
    if (!query) {
      setShowDropdown(false);
    }
  }, [query]);

  const handleFocus = () => {
    setIsFocused(true);
    if (query && query.trim().length > 0) {
      setShowDropdown(true);
    } else if (recentSearches.length > 0) {
      setShowDropdown(true);
    }
  };

  const handleSearchClick = (value) => {
    onSearch(value);
    setShowDropdown(false);
    setIsFocused(false);
  };

  const handleClear = () => {
    onClear();
    setShowDropdown(false);
  };

  return (
    <div className="kg-search-container" ref={containerRef}>
      <div className={`kg-search-main ${isFocused ? "focused" : ""}`}>
        <FiSearch className="kg-search-main-icon" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            onSearch(e.target.value);
            if (e.target.value.trim().length > 0) {
              setShowDropdown(true);
            }
          }}
          onFocus={handleFocus}
          onBlur={() => {
            // Delay to allow click events on dropdown items
            setTimeout(() => {
              if (!containerRef.current?.contains(document.activeElement)) {
                setIsFocused(false);
              }
            }, 150);
          }}
          placeholder={
            td("searchKnowledge") || "Search books, authors, topics..."
          }
          className="kg-search-main-input"
        />
        {loading && <div className="kg-search-loader"></div>}
        {query && (
          <button className="kg-search-clear-btn" onClick={handleClear}>
            <FiX />
          </button>
        )}
      </div>

      {showDropdown &&
        (suggestions.length > 0 || recentSearches.length > 0) && (
          <div className="kg-search-dropdown">
            {suggestions.length > 0 && (
              <div className="kg-suggestions">
                <div className="kg-suggestions-header">
                  <FiTrendingUp /> {td("suggestions") || "Suggestions"}
                </div>
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    className="kg-suggestion-item"
                    onMouseDown={(e) => {
                      e.preventDefault(); // Prevent input blur
                      handleSearchClick(suggestion.label);
                    }}
                  >
                    <span className="kg-suggestion-type">
                      {suggestion.type}
                    </span>
                    <span className="kg-suggestion-label">
                      {suggestion.label}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {recentSearches.length > 0 && (
              <div className="kg-recent-searches">
                <div className="kg-recent-header">
                  <FiClock /> {td("recent") || "Recent Searches"}
                </div>
                {recentSearches.slice(0, 5).map((search, idx) => (
                  <button
                    key={idx}
                    className="kg-recent-item"
                    onMouseDown={(e) => {
                      e.preventDefault(); // Prevent input blur
                      handleSearchClick(search);
                    }}
                  >
                    {search}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
    </div>
  );
}
