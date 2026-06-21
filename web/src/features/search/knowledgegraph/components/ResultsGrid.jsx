"use client";

import ResultCard from "./ResultCard";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ResultsGrid({ results, selectedFilter }) {
  const { td } = useLanguage();

  const getVisibleResults = () => {
    if (selectedFilter === "all") {
      const allResults = [];
      const categories = Object.keys(results);
      categories.forEach((category) => {
        results[category].forEach((item) => {
          allResults.push({ ...item, _type: category });
        });
      });
      return allResults;
    }
    return (
      results[selectedFilter]?.map((item) => ({
        ...item,
        _type: selectedFilter,
      })) || []
    );
  };

  const visibleResults = getVisibleResults();

  if (visibleResults.length === 0) {
    return (
      <div className="kg-no-results">
        <div className="kg-no-results-icon">🔍</div>
        <h3>{td("noResults") || "No results found"}</h3>
        <p>
          {td("tryDifferentSearch") ||
            "Try different keywords or check your spelling"}
        </p>
      </div>
    );
  }

  return (
    <div className="kg-results-grid">
      {visibleResults.map((item, idx) => (
        <ResultCard key={idx} item={item} type={item._type} />
      ))}
    </div>
  );
}
