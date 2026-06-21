"use client";

import { useState } from "react";

export default function ComparisonView({ result, book1, book2, onClose }) {
  const [activeCategory, setActiveCategory] = useState("themes");

  if (!result) return null;

  const categories = [
    { id: "themes", label: "Themes" },
    { id: "writingStyle", label: "Writing Style" },
    { id: "emotionalTone", label: "Emotional Tone" },
    { id: "complexity", label: "Complexity" },
  ];

  const getCategoryData = (category) => {
    return result[category] || { differences: {}, averageDiff: 0 };
  };

  const renderComparison = () => {
    const data = getCategoryData(activeCategory);
    const keys = Object.keys(data.differences);

    return (
      <div className="comparison-category">
        <div className="comparison-header">
          <span className="comparison-book1">{book1?.title || "Book 1"}</span>
          <span className="comparison-diff">Difference</span>
          <span className="comparison-book2">{book2?.title || "Book 2"}</span>
        </div>
        {keys.map((key) => (
          <div key={key} className="comparison-row">
            <span className="comparison-key">{key}</span>
            <div className="comparison-bars">
              <div className="comparison-bar-wrapper">
                <div
                  className="comparison-bar bar1"
                  style={{
                    width: `${100 - data.differences[key]}%`,
                    backgroundColor: "#3b82f6",
                  }}
                />
              </div>
              <div className="comparison-bar-wrapper">
                <div
                  className="comparison-bar bar2"
                  style={{
                    width: `${100 - data.differences[key]}%`,
                    backgroundColor: "#8b5cf6",
                  }}
                />
              </div>
            </div>
            <span className="comparison-diff-value">
              {Math.round(data.differences[key])}%
            </span>
          </div>
        ))}
        <div className="comparison-average">
          Average Difference: <strong>{Math.round(data.averageDiff)}%</strong>
        </div>
      </div>
    );
  };

  return (
    <div className="comparison-overlay">
      <div className="comparison-modal">
        <div className="comparison-header-main">
          <h2>📊 DNA Comparison</h2>
          <button className="comparison-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="comparison-books">
          <div className="comparison-book-info">
            <img src={book1?.cover} alt={book1?.title} />
            <div>
              <strong>{book1?.title}</strong>
              <span>by {book1?.author}</span>
              <span>Score: {book1?.dnaScore}/10</span>
            </div>
          </div>
          <div className="comparison-vs">VS</div>
          <div className="comparison-book-info">
            <img src={book2?.cover} alt={book2?.title} />
            <div>
              <strong>{book2?.title}</strong>
              <span>by {book2?.author}</span>
              <span>Score: {book2?.dnaScore}/10</span>
            </div>
          </div>
        </div>

        <div className="comparison-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`comparison-tab ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="comparison-content">{renderComparison()}</div>

        <div className="comparison-result">
          <span>Overall Similarity:</span>
          <strong>{Math.round(result.overallSimilarity)}%</strong>
          <span className="comparison-match-level">
            {result.overallSimilarity > 80
              ? "Very Similar"
              : result.overallSimilarity > 60
                ? "Similar"
                : result.overallSimilarity > 40
                  ? "Somewhat Similar"
                  : "Different"}
          </span>
        </div>
      </div>
    </div>
  );
}
