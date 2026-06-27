// src/layout/navbar/navbardesktop/components/control/WidgetControls.jsx
"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useTheme } from "@/themes/useTheme";
import { 
  FaCog, 
  FaChevronDown, 
  FaChevronUp,
  FaBolt,
  FaArrowUp,
  FaTimes,
  FaSearch,
  FaRedo,
  FaCheck
} from "react-icons/fa";
import useWidgetStore from "@/store/widgetStore";
import "./WidgetControls.css";

const WidgetControls = ({ isInline = false, onWidgetChange }) => {
  const { themeName, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Widget store
  const widgets = useWidgetStore((state) => state.widgets);
  const toggleWidget = useWidgetStore((state) => state.toggleWidget);
  const resetWidgets = useWidgetStore((state) => state.resetWidgets);

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  // Widget configuration
  const widgetsList = useMemo(() => [
    { 
      key: "quickAction", 
      icon: <FaBolt className="text-lg" />, 
      name: "Quick Actions",
      description: "Floating action buttons for quick access",
      category: "Floating"
    },
    { 
      key: "scrollToTop", 
      icon: <FaArrowUp className="text-lg" />, 
      name: "Scroll to Top",
      description: "Button to smoothly scroll back to top",
      category: "Navigation"
    },
  ], []);

  // Filter widgets based on search
  const filteredWidgets = useMemo(() => {
    if (!searchTerm.trim()) return widgetsList;
    
    const searchLower = searchTerm.toLowerCase();
    return widgetsList.filter(widget =>
      widget.name.toLowerCase().includes(searchLower) ||
      widget.description.toLowerCase().includes(searchLower) ||
      widget.category.toLowerCase().includes(searchLower)
    );
  }, [widgetsList, searchTerm]);

  // Count active widgets
  const activeCount = useMemo(() => {
    return Object.values(widgets).filter(v => v).length;
  }, [widgets]);

  const totalCount = useMemo(() => {
    return Object.values(widgets).length;
  }, [widgets]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Keyboard shortcut: Ctrl+Shift+W to toggle
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "W") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      // Escape to close
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleToggleWidget = useCallback((widgetKey) => {
    toggleWidget(widgetKey);
    onWidgetChange?.();
  }, [toggleWidget, onWidgetChange]);

  const handleResetWidgets = useCallback(() => {
    resetWidgets();
    onWidgetChange?.();
  }, [resetWidgets, onWidgetChange]);

  const handleSearchClear = useCallback(() => {
    setSearchTerm("");
    searchInputRef.current?.focus();
  }, []);

  const getButtonClasses = useCallback((isActive = false) => {
    if (isActive) {
      return `${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} text-white shadow-md`;
    }
    return `
      ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")}
      ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}
      border ${theme.border?.button || (isDarkMode ? "border-gray-700" : "border-gray-300")}
      hover:scale-105 transition-all duration-300
    `;
  }, [theme, isDarkMode]);

  const dropdownBg = theme.background?.section || (isDarkMode ? "bg-gray-900" : "bg-white");
  const borderColor = theme.border?.default || (isDarkMode ? "border-gray-700" : "border-gray-200");
  const headerBg = theme.background?.navigationDots || (isDarkMode ? "bg-gray-800" : "bg-gray-50");

  // Inline version (used inside Control dropdown)
  if (isInline) {
    return (
      <div className="widget-controls-inline">
        {/* Search Bar */}
        <div className="widget-search-container">
          <FaSearch className="widget-search-icon" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search widgets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="widget-search-input"
            aria-label="Search widgets"
          />
          {searchTerm && (
            <button 
              onClick={handleSearchClear} 
              className="widget-search-clear"
              aria-label="Clear search"
            >
              <FaTimes size={12} />
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="widget-stats">
          <span>
            Active: <strong>{activeCount}</strong> / {totalCount}
          </span>
          <span className={`widget-stats-badge ${activeCount === totalCount ? 'all-active' : 'some-hidden'}`}>
            {activeCount === totalCount ? "✅ All Active" : "⚠️ Some Hidden"}
          </span>
        </div>

        {/* Widget List */}
        <div className="widget-list" role="list">
          {filteredWidgets.length === 0 ? (
            <div className="widget-empty">
              <span className="text-4xl block mb-2">🔍</span>
              <p className="text-sm">No widgets found</p>
              {searchTerm && (
                <button 
                  onClick={handleSearchClear}
                  className="widget-empty-clear"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            filteredWidgets.map((widget) => {
              const isActive = widgets[widget.key];
              return (
                <div
                  key={widget.key}
                  className={`widget-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleToggleWidget(widget.key)}
                  role="listitem"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleToggleWidget(widget.key);
                    }
                  }}
                >
                  <div className="widget-item-left">
                    <div className={`widget-icon-wrapper ${isActive ? 'active' : ''}`}>
                      {widget.icon}
                    </div>
                    <div className="widget-item-info">
                      <div className="widget-item-name">
                        <span>{widget.name}</span>
                        <span className="widget-category">{widget.category}</span>
                      </div>
                      <p className="widget-item-description">{widget.description}</p>
                    </div>
                  </div>
                  <div className="widget-item-right">
                    <span className={`widget-status ${isActive ? 'active' : 'inactive'}`}>
                      {isActive ? "Active" : "Hidden"}
                    </span>
                    <div className={`widget-toggle ${isActive ? 'active' : ''}`}>
                      <div className="widget-toggle-ball" />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="widget-footer">
          <button 
            onClick={handleResetWidgets} 
            className="widget-reset-btn"
            aria-label="Reset all widgets to default"
          >
            <FaRedo size={12} className="mr-1" />
            Reset All
          </button>
          <span className="widget-footer-hint">💾 Auto-saved</span>
        </div>
      </div>
    );
  }

  // Standalone floating dropdown version
  return (
    <div className="relative" ref={dropdownRef}>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${getButtonClasses(false)}`}
        aria-label="Toggle widget controls"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <FaCog size={16} className={isOpen ? 'animate-spin-slow' : ''} />
        <span className="text-sm font-medium hidden sm:inline">Widgets</span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500 text-white">
          {activeCount}/{totalCount}
        </span>
        {isOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
      </button>

      {/* Floating Dropdown */}
      {isOpen && (
        <div 
          className={`absolute right-0 mt-2 w-96 rounded-xl shadow-2xl border z-50 overflow-hidden ${dropdownBg} ${borderColor}`}
          role="dialog"
          aria-label="Widget controls"
        >
          {/* Header */}
          <div className={`px-4 py-3 border-b ${headerBg} ${borderColor}`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-sm font-semibold ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
                  🎛️ Widget Controls
                </h3>
                <p className={`text-xs ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-500")} mt-1`}>
                  Manage widget visibility
                </p>
              </div>
              <button
                onClick={handleResetWidgets}
                className={`text-xs px-3 py-1 rounded-lg transition-all hover:scale-105 ${
                  theme.buttonColors?.secondaryButton?.background || 
                  (isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300")
                } ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-700")}`}
                aria-label="Reset all widgets"
              >
                <FaRedo size={10} className="inline mr-1" />
                Reset
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-3">
            {/* Search */}
            <div className="widget-search-container">
              <FaSearch className="widget-search-icon" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search widgets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="widget-search-input"
                aria-label="Search widgets"
              />
              {searchTerm && (
                <button 
                  onClick={handleSearchClear} 
                  className="widget-search-clear"
                  aria-label="Clear search"
                >
                  <FaTimes size={12} />
                </button>
              )}
            </div>

            {/* Stats */}
            <div className="widget-stats">
              <span>
                Active: <strong>{activeCount}</strong> / {totalCount}
              </span>
              <span className={`widget-stats-badge ${activeCount === totalCount ? 'all-active' : 'some-hidden'}`}>
                {activeCount === totalCount ? "✅ All Active" : "⚠️ Some Hidden"}
              </span>
            </div>

            {/* Widget List */}
            <div className="widget-list" role="list">
              {filteredWidgets.length === 0 ? (
                <div className="widget-empty">
                  <span className="text-4xl block mb-2">🔍</span>
                  <p className="text-sm">No widgets found</p>
                  {searchTerm && (
                    <button 
                      onClick={handleSearchClear}
                      className="widget-empty-clear"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              ) : (
                filteredWidgets.map((widget) => {
                  const isActive = widgets[widget.key];
                  return (
                    <div
                      key={widget.key}
                      className={`widget-item ${isActive ? 'active' : ''}`}
                      onClick={() => handleToggleWidget(widget.key)}
                      role="listitem"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleToggleWidget(widget.key);
                        }
                      }}
                    >
                      <div className="widget-item-left">
                        <div className={`widget-icon-wrapper ${isActive ? 'active' : ''}`}>
                          {widget.icon}
                        </div>
                        <div className="widget-item-info">
                          <div className="widget-item-name">
                            <span>{widget.name}</span>
                            <span className="widget-category">{widget.category}</span>
                          </div>
                          <p className="widget-item-description">{widget.description}</p>
                        </div>
                      </div>
                      <div className="widget-item-right">
                        <span className={`widget-status ${isActive ? 'active' : 'inactive'}`}>
                          {isActive ? "Active" : "Hidden"}
                        </span>
                        <div className={`widget-toggle ${isActive ? 'active' : ''}`}>
                          <div className="widget-toggle-ball" />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Footer */}
          <div className={`px-4 py-2 border-t text-center ${headerBg} ${borderColor}`}>
            <p className={`text-xs ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-500")}`}>
              ⌨️ Press <kbd className={`px-1.5 py-0.5 rounded text-xs font-mono ${
                isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
              }`}>Ctrl</kbd> + <kbd className={`px-1.5 py-0.5 rounded text-xs font-mono ${
                isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
              }`}>Shift</kbd> + <kbd className={`px-1.5 py-0.5 rounded text-xs font-mono ${
                isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
              }`}>W</kbd> to toggle
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WidgetControls;