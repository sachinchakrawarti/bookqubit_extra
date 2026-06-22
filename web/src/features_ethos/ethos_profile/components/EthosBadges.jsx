// components/EthosBadges.jsx
"use client";

import { useState, useMemo } from "react";
import {
  FiAward,
  FiFilter,
  FiSearch,
  FiX,
  FiGrid,
  FiList,
  FiChevronDown,
  FiChevronUp,
  FiInfo,
  FiStar,
  FiLock,
  FiUnlock,
  FiTrendingUp,
  FiCheckCircle,
} from "react-icons/fi";
import "./EthosBadges.css";

export default function EthosBadges({ badges }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [filterLevel, setFilterLevel] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [selectedBadge, setSelectedBadge] = useState(null);

  // Get unique levels for filter
  const levels = useMemo(() => {
    const levelSet = new Set(badges.map(b => b.level));
    return ["all", ...Array.from(levelSet)];
  }, [badges]);

  // Filter and sort badges
  const filteredBadges = useMemo(() => {
    let filtered = [...badges];

    // Filter by level
    if (filterLevel !== "all") {
      filtered = filtered.filter(b => b.level === filterLevel);
    }

    // Filter by search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(b =>
        b.name.toLowerCase().includes(term)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "level":
          const levelOrder = { Platinum: 0, Gold: 1, Silver: 2 };
          return (levelOrder[a.level] || 3) - (levelOrder[b.level] || 3);
        case "recent":
          return (b.id || 0) - (a.id || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [badges, filterLevel, searchTerm, sortBy]);

  // Stats
  const stats = useMemo(() => {
    const total = badges.length;
    const levels = {};
    badges.forEach(b => {
      levels[b.level] = (levels[b.level] || 0) + 1;
    });
    return { total, levels };
  }, [badges]);

  // Get level icon
  const getLevelIcon = (level) => {
    switch (level.toLowerCase()) {
      case "platinum":
        return <FiStar className="ethos-badge-level-icon platinum" />;
      case "gold":
        return <FiAward className="ethos-badge-level-icon gold" />;
      case "silver":
        return <FiAward className="ethos-badge-level-icon silver" />;
      default:
        return <FiAward className="ethos-badge-level-icon" />;
    }
  };

  // Get level color
  const getLevelColor = (level) => {
    const colors = {
      Platinum: "#ec4899",
      Gold: "#f59e0b",
      Silver: "#9ca3af",
    };
    return colors[level] || "#6b7280";
  };

  // Get level background
  const getLevelBg = (level) => {
    const colors = {
      Platinum: "rgba(236, 72, 153, 0.1)",
      Gold: "rgba(245, 158, 11, 0.1)",
      Silver: "rgba(156, 163, 175, 0.1)",
    };
    return colors[level] || "rgba(107, 114, 128, 0.1)";
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
  };

  // Select badge
  const handleBadgeClick = (badge) => {
    setSelectedBadge(selectedBadge?.id === badge.id ? null : badge);
  };

  return (
    <div className="ethos-badges-card">
      {/* Header */}
      <div className="ethos-badges-header">
        <div className="ethos-badges-title-section">
          <FiAward className="ethos-badges-icon" />
          <h3 className="ethos-badges-title">Badges & Achievements</h3>
          <span className="ethos-badges-count">{stats.total} Earned</span>
        </div>

        <div className="ethos-badges-controls">
          {/* Search */}
          <div className="ethos-badges-search-wrapper">
            <FiSearch className="ethos-badges-search-icon" />
            <input
              type="text"
              placeholder="Search badges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ethos-badges-search-input"
            />
            {searchTerm && (
              <button onClick={clearSearch} className="ethos-badges-clear-search">
                <FiX />
              </button>
            )}
          </div>

          {/* View Toggle */}
          <div className="ethos-badges-view-toggle">
            <button
              className={`ethos-badges-view-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
              title="Grid view"
            >
              <FiGrid />
            </button>
            <button
              className={`ethos-badges-view-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
              title="List view"
            >
              <FiList />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="ethos-badges-stats-bar">
        {Object.entries(stats.levels).map(([level, count]) => (
          <button
            key={level}
            className={`ethos-badges-stat-item ${filterLevel === level ? "active" : ""}`}
            onClick={() => setFilterLevel(filterLevel === level ? "all" : level)}
            style={{
              borderColor: filterLevel === level ? getLevelColor(level) : "transparent",
            }}
          >
            <span
              className="ethos-badges-stat-dot"
              style={{ backgroundColor: getLevelColor(level) }}
            />
            <span className="ethos-badges-stat-label">{level}</span>
            <span className="ethos-badges-stat-count">{count}</span>
          </button>
        ))}
        {filterLevel !== "all" && (
          <button
            className="ethos-badges-clear-filter"
            onClick={() => setFilterLevel("all")}
          >
            <FiX /> Clear Filter
          </button>
        )}
      </div>

      {/* Sort */}
      <div className="ethos-badges-sort">
        <span className="ethos-badges-sort-label">Sort by:</span>
        <select
          className="ethos-badges-sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="level">Level</option>
          <option value="recent">Most Recent</option>
        </select>
      </div>

      {/* Badges Grid */}
      <div className={`ethos-badges-grid ${viewMode}`}>
        {filteredBadges.length > 0 ? (
          filteredBadges.map((badge) => (
            <div
              key={badge.id}
              className={`ethos-badge-item ${selectedBadge?.id === badge.id ? "selected" : ""}`}
              onClick={() => handleBadgeClick(badge)}
            >
              <div
                className="ethos-badge-icon-wrapper"
                style={{
                  backgroundColor: getLevelBg(badge.level),
                  borderColor: getLevelColor(badge.level),
                }}
              >
                <div
                  className="ethos-badge-icon"
                  style={{ color: getLevelColor(badge.level) }}
                >
                  {badge.icon}
                </div>
                {badge.level === "Platinum" && (
                  <div className="ethos-badge-rare">
                    <FiStar />
                  </div>
                )}
              </div>

              <div className="ethos-badge-info">
                <div className="ethos-badge-name-wrapper">
                  <span className="ethos-badge-name">{badge.name}</span>
                  {getLevelIcon(badge.level)}
                </div>
                <span className={`ethos-badge-level ${badge.level.toLowerCase()}`}>
                  {badge.level}
                </span>
                {badge.description && (
                  <p className="ethos-badge-description">{badge.description}</p>
                )}
                {badge.earnedAt && (
                  <span className="ethos-badge-date">
                    Earned: {badge.earnedAt}
                  </span>
                )}
              </div>

              {badge.progress && (
                <div className="ethos-badge-progress">
                  <div className="ethos-badge-progress-bar">
                    <div
                      className="ethos-badge-progress-fill"
                      style={{
                        width: `${badge.progress}%`,
                        backgroundColor: getLevelColor(badge.level),
                      }}
                    />
                  </div>
                  <span className="ethos-badge-progress-text">
                    {badge.progress}%
                  </span>
                </div>
              )}

              {selectedBadge?.id === badge.id && (
                <div className="ethos-badge-details">
                  <div className="ethos-badge-details-row">
                    <FiInfo className="ethos-badge-details-icon" />
                    <span>Click to close details</span>
                  </div>
                  {badge.requirements && (
                    <div className="ethos-badge-requirements">
                      <span className="ethos-badge-requirements-label">
                        Requirements:
                      </span>
                      <ul>
                        {badge.requirements.map((req, idx) => (
                          <li key={idx}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="ethos-badges-empty">
            <FiAward />
            <h4>No badges found</h4>
            <p>Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      {/* Summary */}
      {filteredBadges.length > 0 && (
        <div className="ethos-badges-footer">
          <span className="ethos-badges-footer-text">
            Showing {filteredBadges.length} of {stats.total} badges
          </span>
          {filteredBadges.length === stats.total && (
            <span className="ethos-badges-footer-complete">
              <FiCheckCircle /> All badges displayed
            </span>
          )}
        </div>
      )}
    </div>
  );
}