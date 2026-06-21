"use client";

import { FiBook, FiUser, FiHash, FiRss, FiFileText } from "react-icons/fi";

export default function SearchStats({ results, totalCount }) {
  const stats = [
    {
      label: "Books",
      count: results.books?.length || 0,
      icon: FiBook,
      color: "#3b82f6",
    },
    {
      label: "Authors",
      count: results.authors?.length || 0,
      icon: FiUser,
      color: "#8b5cf6",
    },
    {
      label: "Tags",
      count: results.tags?.length || 0,
      icon: FiHash,
      color: "#f59e0b",
    },
    {
      label: "News",
      count: results.news?.length || 0,
      icon: FiRss,
      color: "#10b981",
    },
    {
      label: "Blogs",
      count: results.blogs?.length || 0,
      icon: FiFileText,
      color: "#ef4444",
    },
  ];

  return (
    <div className="kg-search-stats">
      <div className="kg-stats-total">
        <span className="kg-stats-number">{totalCount}</span>
        <span className="kg-stats-label">results found</span>
      </div>
      <div className="kg-stats-breakdown">
        {stats.map((stat, idx) => (
          <div key={idx} className="kg-stat-item">
            <stat.icon style={{ color: stat.color }} size={16} />
            <span className="kg-stat-count">{stat.count}</span>
            <span className="kg-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
