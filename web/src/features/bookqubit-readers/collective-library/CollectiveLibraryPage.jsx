"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRTL } from "@/contexts/RTLContext";
import { useFont } from "@/contexts/FontContext";
import LibraryCard from "./components/LibraryCard";
import LibraryStats from "./components/LibraryStats";
import {
  mockLibraries,
  getFeaturedLibraries,
  getTrendingLibraries,
  getCategories,
} from "./data/mockLibraries";
import { FiSearch, FiPlus, FiGrid, FiList } from "react-icons/fi";
import "./collectivelibrary.css";

export default function CollectiveLibrary() {
  const { theme, themeName } = useTheme();
  const { td } = useLanguage();
  const { direction } = useRTL();
  const { currentFont } = useFont();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [filteredLibraries, setFilteredLibraries] = useState([]);
  const [featuredLibraries, setFeaturedLibraries] = useState([]);
  const [trendingLibraries, setTrendingLibraries] = useState([]);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";
  const categories = getCategories();

  useEffect(() => {
    setMounted(true);
    setFeaturedLibraries(getFeaturedLibraries());
    setTrendingLibraries(getTrendingLibraries().slice(0, 4));
    setFilteredLibraries(mockLibraries);
  }, []);

  useEffect(() => {
    let filtered = mockLibraries;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((lib) => lib.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (lib) =>
          lib.name.toLowerCase().includes(query) ||
          lib.description.toLowerCase().includes(query) ||
          lib.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          lib.owner.name.toLowerCase().includes(query),
      );
    }

    setFilteredLibraries(filtered);
  }, [searchQuery, selectedCategory]);

  if (!mounted) return null;

  return (
    <div
      dir={direction}
      style={{ fontFamily: currentFont?.family }}
      className={`collective-library ${isDarkMode ? "dark" : ""}`}
    >
      {/* Header */}
      <div className="cl-header">
        <div className="cl-header-content">
          <h1 className="cl-title">📚 Collective Library</h1>
          <p className="cl-subtitle">
            Building a community of readers, one library at a time
          </p>
        </div>
      </div>

      {/* Stats */}
      <LibraryStats libraries={mockLibraries} />

      {/* Create Library Button */}
      <div className="cl-create-btn-wrapper">
        <Link href="/collective/create" className="cl-create-btn">
          <FiPlus /> Start a Collective
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="cl-controls">
        <div className="cl-search">
          <FiSearch className="cl-search-icon" />
          <input
            type="text"
            placeholder="Search libraries by name, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="cl-search-input"
          />
        </div>
        <div className="cl-filters">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="cl-filter-select"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>
          <div className="cl-view-toggle">
            <button
              className={`cl-view-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <FiGrid />
            </button>
            <button
              className={`cl-view-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <FiList />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Libraries */}
      {featuredLibraries.length > 0 && (
        <div className="cl-featured">
          <div className="cl-section-header">
            <h2 className="cl-section-title">✨ Featured Collectives</h2>
            <span className="cl-section-badge">Curated by BookQubit</span>
          </div>
          <div className="cl-featured-grid">
            {featuredLibraries.map((library) => (
              <LibraryCard
                key={library.id}
                library={library}
                featured={true}
                viewMode={viewMode}
              />
            ))}
          </div>
        </div>
      )}

      {/* Trending Libraries */}
      {trendingLibraries.length > 0 && (
        <div className="cl-trending">
          <div className="cl-section-header">
            <h2 className="cl-section-title">🔥 Trending Now</h2>
            <Link href="/collective/trending" className="cl-section-link">
              View All →
            </Link>
          </div>
          <div className="cl-trending-grid">
            {trendingLibraries.map((library) => (
              <LibraryCard
                key={library.id}
                library={library}
                trending={true}
                viewMode={viewMode}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Libraries */}
      <div className="cl-all">
        <div className="cl-section-header">
          <h2 className="cl-section-title">📚 All Collectives</h2>
          <span className="cl-section-count">
            {filteredLibraries.length} libraries
          </span>
        </div>
        <div
          className={`cl-all-grid ${viewMode === "list" ? "list-view" : ""}`}
        >
          {filteredLibraries.map((library) => (
            <LibraryCard
              key={library.id}
              library={library}
              viewMode={viewMode}
            />
          ))}
        </div>
        {filteredLibraries.length === 0 && (
          <div className="cl-empty">
            <div className="cl-empty-icon">📚</div>
            <h3>No libraries found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
