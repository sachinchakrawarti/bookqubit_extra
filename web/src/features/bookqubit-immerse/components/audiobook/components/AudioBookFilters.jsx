// src/features/bookqubit-immerse/components/audiobook/components/AudioBookFilters.jsx
"use client";

import React, { useState } from "react";
import "./AudioBookFilters.css";

const AudioBookFilters = ({ 
  categories = [], 
  activeCategory = "All", 
  setActiveCategory,
  onClearFilters,
  showCounts = true,
  variant = "default", // 'default', 'compact', 'pills'
}) => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  // Get category count
  const getCategoryCount = (category) => {
    if (!showCounts) return null;
    // This should be passed from parent or computed
    return null;
  };

  // Filter categories based on search
  const filteredCategories = categories.filter(cat => 
    cat.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // Visible categories (limit to 8 initially if not showing all)
  const visibleCategories = showAllCategories 
    ? filteredCategories 
    : filteredCategories.slice(0, 8);

  const hasMoreCategories = filteredCategories.length > 8;

  // Check if any category is active
  const hasActiveFilter = activeCategory !== "All";

  // Handle category selection
  const handleCategoryClick = (category) => {
    if (category === activeCategory) {
      // If clicking the same category, reset to "All"
      setActiveCategory("All");
    } else {
      setActiveCategory(category);
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setActiveCategory("All");
    setSearchFilter("");
    if (onClearFilters) onClearFilters();
  };

  // Get icon for category
  const getCategoryIcon = (category) => {
    const icons = {
      "All": (
        <svg className="category-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      "Classic": (
        <svg className="category-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      "Dystopian": (
        <svg className="category-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      "Non-fiction": (
        <svg className="category-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      "Fiction": (
        <svg className="category-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      "Science Fiction": (
        <svg className="category-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      "Fantasy": (
        <svg className="category-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      "Mystery": (
        <svg className="category-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      "Romance": (
        <svg className="category-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      "Thriller": (
        <svg className="category-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    };
    return icons[category] || (
      <svg className="category-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    );
  };

  // Get variant-specific classes
  const getVariantClasses = () => {
    switch (variant) {
      case "compact":
        return "filters-compact";
      case "pills":
        return "filters-pills";
      default:
        return "filters-default";
    }
  };

  return (
    <div className={`audiobook-filters ${getVariantClasses()}`}>
      <div className="filters-header">
        <div className="filters-title-wrapper">
          <h3 className="filters-title">Categories</h3>
          {hasActiveFilter && (
            <span className="active-filter-indicator">
              {activeCategory}
            </span>
          )}
        </div>
        <div className="filters-actions">
          {hasActiveFilter && (
            <button 
              className="clear-filters-btn"
              onClick={handleClearFilters}
              title="Clear all filters"
            >
              <svg className="clear-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Search within filters */}
      {categories.length > 10 && (
        <div className="filter-search">
          <svg className="filter-search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Filter categories..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="filter-search-input"
          />
          {searchFilter && (
            <button 
              className="filter-search-clear"
              onClick={() => setSearchFilter("")}
            >
              <svg className="clear-icon-small" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Category Buttons */}
      <div className="filters-list">
        {visibleCategories.length > 0 ? (
          visibleCategories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? "active" : ""}`}
              onClick={() => handleCategoryClick(category)}
              aria-pressed={activeCategory === category}
            >
              <span className="filter-btn-content">
                {getCategoryIcon(category)}
                <span className="filter-label">{category}</span>
              </span>
              {showCounts && (
                <span className="filter-count">
                  {/* Count would come from props */}
                </span>
              )}
              {activeCategory === category && (
                <svg className="filter-check" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))
        ) : (
          <div className="no-filter-results">
            <p>No categories found</p>
          </div>
        )}
      </div>

      {/* Show More / Show Less */}
      {hasMoreCategories && (
        <button
          className="show-more-btn"
          onClick={() => setShowAllCategories(!showAllCategories)}
        >
          {showAllCategories ? (
            <>
              <svg className="show-more-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              Show Less
            </>
          ) : (
            <>
              <svg className="show-more-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              Show More ({filteredCategories.length - 8} more)
            </>
          )}
        </button>
      )}

      {/* Active Filters Summary */}
      {hasActiveFilter && (
        <div className="active-filters-summary">
          <span className="active-filters-label">Active filter:</span>
          <span className="active-filters-value">{activeCategory}</span>
          <button 
            className="remove-filter-btn"
            onClick={handleClearFilters}
            aria-label="Remove filter"
          >
            <svg className="remove-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default AudioBookFilters;