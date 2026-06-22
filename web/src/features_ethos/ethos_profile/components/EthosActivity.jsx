// components/EthosActivity.jsx
"use client";

import { useState, useEffect, useMemo } from "react";
import {
  FiActivity,
  FiClock,
  FiHash,
  FiArrowUp,
  FiArrowDown,
  FiFilter,
  FiSearch,
  FiX,
  FiCalendar,
  FiExternalLink,
  FiCopy,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import "./EthosActivity.css";

export default function EthosActivity({ activity }) {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [copiedHash, setCopiedHash] = useState(null);
  const [expandedItems, setExpandedItems] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");

  // Filter options
  const filterOptions = [
    { id: "all", label: "All Activity" },
    { id: "voted", label: "Voted" },
    { id: "minted", label: "Minted" },
    { id: "delegated", label: "Delegated" },
    { id: "swapped", label: "Swapped" },
    { id: "bridged", label: "Bridged" },
  ];

  // Get activity icon with variant
  const getActivityIcon = (type) => {
    const iconMap = {
      Voted: <FiArrowUp className="ethos-activity-icon vote" />,
      Minted: <FiArrowUp className="ethos-activity-icon mint" />,
      Delegated: <FiArrowDown className="ethos-activity-icon delegate" />,
      Swapped: <FiArrowUp className="ethos-activity-icon swap" />,
      Bridged: <FiArrowDown className="ethos-activity-icon bridge" />,
    };
    return iconMap[type] || <FiActivity className="ethos-activity-icon" />;
  };

  // Get activity color
  const getActivityColor = (type) => {
    const colorMap = {
      Voted: "#3b82f6",
      Minted: "#ec4899",
      Delegated: "#8b5cf6",
      Swapped: "#f59e0b",
      Bridged: "#06b6d4",
    };
    return colorMap[type] || "#6b7280";
  };

  // Get activity badge color
  const getActivityBadgeClass = (type) => {
    const classMap = {
      Voted: "vote",
      Minted: "mint",
      Delegated: "delegate",
      Swapped: "swap",
      Bridged: "bridge",
    };
    return classMap[type] || "";
  };

  // Copy to clipboard
  const copyToClipboard = (hash, id) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(id);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  // Toggle expand
  const toggleExpand = (id) => {
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // Filter and search activity
  const filteredActivity = useMemo(() => {
    let filtered = [...activity];

    // Apply type filter
    if (filter !== "all") {
      filtered = filtered.filter(item => 
        item.type.toLowerCase() === filter.slice(0, -1) // Remove 'ed' from filter
      );
    }

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.description.toLowerCase().includes(term) ||
        item.type.toLowerCase().includes(term) ||
        item.hash.toLowerCase().includes(term)
      );
    }

    // Apply sort
    filtered.sort((a, b) => {
      const timeA = new Date(a.timestamp || a.time);
      const timeB = new Date(b.timestamp || b.time);
      return sortOrder === "desc" ? timeB - timeA : timeA - timeB;
    });

    return filtered;
  }, [activity, filter, searchTerm, sortOrder]);

  // Get activity stats
  const activityStats = useMemo(() => {
    const total = activity.length;
    const types = {};
    activity.forEach(item => {
      types[item.type] = (types[item.type] || 0) + 1;
    });
    return { total, types };
  }, [activity]);

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="ethos-activity-card">
      {/* Header */}
      <div className="ethos-activity-header">
        <div className="ethos-activity-title-section">
          <FiActivity className="ethos-activity-icon-main" />
          <h3 className="ethos-activity-title">Recent Activity</h3>
          <span className="ethos-activity-total">
            {filteredActivity.length} items
          </span>
        </div>

        <div className="ethos-activity-controls">
          {/* Search */}
          <div className="ethos-activity-search-wrapper">
            <FiSearch className="ethos-activity-search-icon" />
            <input
              type="text"
              placeholder="Search activity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ethos-activity-search-input"
            />
            {searchTerm && (
              <button onClick={clearSearch} className="ethos-activity-clear-search">
                <FiX />
              </button>
            )}
          </div>

          {/* Sort Toggle */}
          <button
            className="ethos-activity-sort-btn"
            onClick={() => setSortOrder(prev => prev === "desc" ? "asc" : "desc")}
            title="Toggle sort order"
          >
            {sortOrder === "desc" ? <FiChevronDown /> : <FiChevronUp />}
          </button>

          {/* Filter Toggle */}
          <button
            className={`ethos-activity-filter-toggle ${showFilters ? "active" : ""}`}
            onClick={() => setShowFilters(prev => !prev)}
          >
            <FiFilter />
            <span className="ethos-activity-filter-count">
              {filter !== "all" ? 1 : 0}
            </span>
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="ethos-activity-filters-dropdown">
          <div className="ethos-activity-filters-grid">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                className={`ethos-activity-filter ${filter === option.id ? "active" : ""}`}
                onClick={() => {
                  setFilter(option.id);
                  setShowFilters(false);
                }}
              >
                {option.label}
                {option.id !== "all" && (
                  <span className="ethos-activity-filter-count-badge">
                    {activityStats.types[option.id.slice(0, -1)] || 0}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Activity Stats */}
      <div className="ethos-activity-stats">
        {Object.entries(activityStats.types).map(([type, count]) => (
          <div key={type} className="ethos-activity-stat-item">
            <span
              className="ethos-activity-stat-dot"
              style={{ backgroundColor: getActivityColor(type) }}
            />
            <span className="ethos-activity-stat-label">{type}</span>
            <span className="ethos-activity-stat-count">{count}</span>
          </div>
        ))}
      </div>

      {/* Activity List */}
      <div className="ethos-activity-list">
        {filteredActivity.length > 0 ? (
          filteredActivity.map((item, index) => (
            <div
              key={item.id}
              className={`ethos-activity-item ${expandedItems.includes(item.id) ? "expanded" : ""}`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Icon */}
              <div className="ethos-activity-icon-wrapper">
                {getActivityIcon(item.type)}
              </div>

              {/* Details */}
              <div className="ethos-activity-details">
                <div className="ethos-activity-info">
                  <span className={`ethos-activity-type ${getActivityBadgeClass(item.type)}`}>
                    {item.type}
                  </span>
                  <span className="ethos-activity-description">
                    {item.description}
                  </span>
                </div>

                <div className="ethos-activity-meta">
                  <span className="ethos-activity-time">
                    <FiClock /> {item.time}
                  </span>
                  <span className="ethos-activity-hash">
                    <FiHash /> 
                    {expandedItems.includes(item.id) 
                      ? item.hash 
                      : `${item.hash.slice(0, 6)}...${item.hash.slice(-4)}`
                    }
                  </span>
                  <button
                    className="ethos-activity-copy-btn"
                    onClick={() => copyToClipboard(item.hash, item.id)}
                    title="Copy hash"
                  >
                    {copiedHash === item.id ? <FiCheck /> : <FiCopy />}
                  </button>
                  <button
                    className="ethos-activity-expand-btn"
                    onClick={() => toggleExpand(item.id)}
                  >
                    {expandedItems.includes(item.id) ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  <a href="#" className="ethos-activity-explorer-link" title="View on explorer">
                    <FiExternalLink />
                  </a>
                </div>

                {/* Expanded Content */}
                {expandedItems.includes(item.id) && (
                  <div className="ethos-activity-expanded-content">
                    <div className="ethos-activity-expanded-row">
                      <span className="ethos-activity-expanded-label">Transaction Hash:</span>
                      <span className="ethos-activity-expanded-value">{item.hash}</span>
                    </div>
                    <div className="ethos-activity-expanded-row">
                      <span className="ethos-activity-expanded-label">Timestamp:</span>
                      <span className="ethos-activity-expanded-value">
                        {item.timestamp || item.time}
                      </span>
                    </div>
                    <div className="ethos-activity-expanded-row">
                      <span className="ethos-activity-expanded-label">Status:</span>
                      <span className="ethos-activity-expanded-value success">✓ Success</span>
                    </div>
                    <div className="ethos-activity-expanded-actions">
                      <button className="ethos-activity-expanded-action">
                        View Details
                      </button>
                      <button className="ethos-activity-expanded-action">
                        Share
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="ethos-activity-empty">
            <FiActivity />
            <h4>No activity found</h4>
            <p>Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      {/* Load More */}
      {filteredActivity.length > 0 && filteredActivity.length < activity.length && (
        <div className="ethos-activity-load-more">
          <button className="ethos-activity-load-more-btn">
            Load More Activities
          </button>
        </div>
      )}
    </div>
  );
}