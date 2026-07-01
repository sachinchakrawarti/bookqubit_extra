// src/features/bookqubit-immerse/components/audiobook/components/AudioBookSearch.jsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import "./AudioBookSearch.css";

const AudioBookSearch = ({ 
  searchTerm = "", 
  setSearchTerm, 
  resultCount = 0,
  placeholder = "Search audiobooks by title, author, or narrator...",
  onSearch,
  onClear,
  className = "",
  variant = "default", // 'default', 'minimal', 'expanded'
  autoFocus = false,
  showSuggestions = false,
  suggestions = [],
  onSuggestionClick,
  debounceDelay = 300,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showClear, setShowClear] = useState(false);
  const [showSuggestionsDropdown, setShowSuggestionsDropdown] = useState(false);
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const debounceTimerRef = useRef(null);

  // Handle debounced search
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (onSearch && debouncedTerm !== searchTerm) {
        onSearch(debouncedTerm);
      }
    }, debounceDelay);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [debouncedTerm, searchTerm, onSearch, debounceDelay]);

  // Update debounced term when search term changes externally
  useEffect(() => {
    setDebouncedTerm(searchTerm);
  }, [searchTerm]);

  // Handle click outside suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestionsDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setDebouncedTerm(value);
    setShowClear(value.length > 0);
    
    if (showSuggestions && value.length > 1) {
      setShowSuggestionsDropdown(true);
    } else {
      setShowSuggestionsDropdown(false);
    }
  };

  // Handle clear search
  const handleClear = () => {
    setSearchTerm("");
    setDebouncedTerm("");
    setShowClear(false);
    setShowSuggestionsDropdown(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (onClear) onClear();
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setDebouncedTerm(suggestion);
    setShowSuggestionsDropdown(false);
    setShowClear(true);
    if (onSuggestionClick) onSuggestionClick(suggestion);
    if (onSearch) onSearch(suggestion);
  };

  // Handle keydown
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowSuggestionsDropdown(false);
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
    if (e.key === "Enter" && onSearch) {
      onSearch(searchTerm);
      setShowSuggestionsDropdown(false);
    }
  };

  // Handle focus
  const handleFocus = () => {
    setIsFocused(true);
    if (showSuggestions && searchTerm.length > 1) {
      setShowSuggestionsDropdown(true);
    }
  };

  // Handle blur
  const handleBlur = () => {
    setIsFocused(false);
    // Delay hiding suggestions to allow click events
    setTimeout(() => {
      setShowSuggestionsDropdown(false);
    }, 200);
  };

  // Get variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case "minimal":
        return "search-minimal";
      case "expanded":
        return "search-expanded";
      default:
        return "search-default";
    }
  };

  // Get placeholder text
  const getPlaceholder = () => {
    if (isFocused) {
      return placeholder;
    }
    return placeholder;
  };

  return (
    <div className={`audiobook-search-wrapper ${className}`}>
      <div className={`audiobook-search ${getVariantClasses()} ${isFocused ? "focused" : ""}`}>
        {/* Search Icon */}
        <div className="search-icon-wrapper">
          <svg className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          placeholder={getPlaceholder()}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="search-input"
          autoFocus={autoFocus}
          aria-label="Search audiobooks"
          aria-autocomplete="list"
          aria-expanded={showSuggestionsDropdown}
          role="combobox"
        />

        {/* Loading indicator (optional) */}
        {false && (
          <div className="search-loading">
            <div className="loading-spinner"></div>
          </div>
        )}

        {/* Clear Button */}
        {showClear && (
          <button
            className="search-clear-btn"
            onClick={handleClear}
            aria-label="Clear search"
            title="Clear search"
          >
            <svg className="clear-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        )}

        {/* Search Button (optional) */}
        <button 
          className="search-submit-btn"
          onClick={() => onSearch && onSearch(searchTerm)}
          aria-label="Submit search"
          title="Search"
        >
          <svg className="submit-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      {/* Results Count */}
      {resultCount > 0 && (
        <div className="search-results-count">
          <span className="results-number">{resultCount}</span>
          <span className="results-label">
            {resultCount === 1 ? "book found" : "books found"}
          </span>
        </div>
      )}

      {/* Search Stats */}
      {searchTerm && resultCount === 0 && (
        <div className="search-no-results">
          <span>No results found for "</span>
          <span className="search-query">{searchTerm}</span>
          <span>"</span>
        </div>
      )}

      {/* Suggestions Dropdown */}
      {showSuggestions && showSuggestionsDropdown && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="search-suggestions"
          role="listbox"
        >
          <div className="suggestions-header">
            <span className="suggestions-title">Suggestions</span>
          </div>
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
                role="option"
                aria-selected={false}
              >
                <svg className="suggestion-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="suggestion-text">{suggestion}</span>
              </li>
            ))}
          </ul>
          {suggestions.length > 5 && (
            <div className="suggestions-footer">
              <button className="suggestions-more-btn">
                View all suggestions
              </button>
            </div>
          )}
        </div>
      )}

      {/* Keyboard Shortcut Hint */}
      {isFocused && !searchTerm && (
        <div className="search-hint">
          <span className="hint-key">⌘K</span>
          <span className="hint-text">to search</span>
        </div>
      )}
    </div>
  );
};

export default AudioBookSearch;