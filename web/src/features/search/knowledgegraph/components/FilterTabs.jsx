"use client";

import {
  FiBook,
  FiUser,
  FiHash,
  FiRss,
  FiFileText,
  FiGrid,
} from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FilterTabs({ selected, onSelect, counts }) {
  const { td } = useLanguage();

  const tabs = [
    { id: "all", label: td("all") || "All", icon: FiGrid },
    { id: "books", label: td("books") || "Books", icon: FiBook },
    { id: "authors", label: td("authors") || "Authors", icon: FiUser },
    { id: "tags", label: td("tags") || "Tags", icon: FiHash },
    { id: "news", label: td("news") || "News", icon: FiRss },
    { id: "blogs", label: td("blogs") || "Blogs", icon: FiFileText },
  ];

  return (
    <div className="kg-filter-tabs">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const count = counts[tab.id] || 0;
        const isActive = selected === tab.id;

        return (
          <button
            key={tab.id}
            className={`kg-filter-tab ${isActive ? "active" : ""}`}
            onClick={() => onSelect(tab.id)}
          >
            <Icon size={16} />
            <span>{tab.label}</span>
            {count > 0 && <span className="kg-filter-count">{count}</span>}
          </button>
        );
      })}
    </div>
  );
}
