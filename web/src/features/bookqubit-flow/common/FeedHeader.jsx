// src/features/bookqubit-flow/components/common/FeedHeader.jsx

"use client";

import {
  FaFire,
  FaRocket,
  FaComment,
  FaNewspaper,
  FaBlog,
  FaStar,
  FaSync,
} from "react-icons/fa";

const FILTERS = [
  { id: "all", label: "All", icon: null },
  { id: "featured", label: "Featured", icon: <FaFire className="w-3 h-3" /> },
  { id: "trending", label: "Trending", icon: <FaRocket className="w-3 h-3" /> },
  { id: "comment", label: "Comments", icon: <FaComment className="w-3 h-3" /> },
  { id: "news", label: "News", icon: <FaNewspaper className="w-3 h-3" /> },
  { id: "blog", label: "Blogs", icon: <FaBlog className="w-3 h-3" /> },
  { id: "review", label: "Reviews", icon: <FaStar className="w-3 h-3" /> },
];

export default function FeedHeader({
  title,
  subtitle,
  activeFilter,
  onFilterChange,
  onRefresh,
  theme,
}) {
  return (
    <div className="flow-header mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1
            className={`
              text-2xl sm:text-3xl font-bold
              ${theme.textColors?.primary || "text-gray-900 dark:text-white"}
            `}
          >
            {title}
          </h1>
          <p
            className={`
              text-sm
              ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
            `}
          >
            {subtitle}
          </p>
        </div>

        <button
          onClick={onRefresh}
          className={`
            px-4 py-2 text-sm font-medium rounded-lg
            ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"}
            ${theme.buttonColors?.primaryButton?.textColor || "text-white"}
            ${theme.shadow?.button || "shadow-md"}
            transition-all duration-200 hover:scale-105
            flex items-center gap-2
          `}
        >
          <FaSync className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs mt-4">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`
              filter-tab
              flex items-center gap-1.5
              px-3 py-1.5 rounded-full text-sm font-medium
              transition-all duration-200
              ${
                activeFilter === filter.id
                  ? `
                    ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"}
                    ${theme.buttonColors?.primaryButton?.textColor || "text-white"}
                    shadow-md
                  `
                  : `
                    ${theme.background?.navigationDots || "bg-gray-100 dark:bg-gray-800"}
                    ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
                    hover:bg-gray-200 dark:hover:bg-gray-700
                  `
              }
            `}
          >
            {filter.icon}
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
