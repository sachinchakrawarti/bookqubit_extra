"use client";

import { useState } from "react";
import DNAHelix from "./DNAHelix";

export default function DNAVisualizer({ dnaData }) {
  const [activeTab, setActiveTab] = useState("overview");
  const categories = [
    { id: "themes", label: "📖 Themes", icon: "🧬" },
    { id: "writingStyle", label: "✍️ Writing Style", icon: "📝" },
    { id: "emotionalTone", label: "💭 Emotional Tone", icon: "💫" },
    { id: "complexity", label: "📊 Complexity", icon: "📈" },
    { id: "readingLevel", label: "📚 Reading Level", icon: "📖" },
    { id: "genreAffinity", label: "🎭 Genre Affinity", icon: "🎯" },
  ];

  if (!dnaData) return null;

  const getCategoryData = (category) => {
    return dnaData.dna[category] || {};
  };

  return (
    <div className="dna-visualizer">
      <div className="dna-header">
        <div className="dna-book-info">
          <img
            src={dnaData.cover}
            alt={dnaData.title}
            className="dna-book-cover"
          />
          <div>
            <h2>{dnaData.title}</h2>
            <p>{dnaData.author}</p>
            <div className="dna-score-badge">
              DNA Score: {dnaData.dnaScore}/10
            </div>
          </div>
        </div>
        <div className="dna-summary">
          <p>{dnaData.dna.summary}</p>
        </div>
      </div>

      <div className="dna-tabs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`dna-tab ${activeTab === cat.id ? "active" : ""}`}
            onClick={() => setActiveTab(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="dna-content">
        {activeTab === "overview" && (
          <div className="dna-overview">
            <div className="dna-helix-wrapper">
              <DNAHelix dnaData={dnaData} />
            </div>
            <div className="dna-stats-grid">
              {categories.slice(0, 4).map((cat) => {
                const data = getCategoryData(cat.id);
                const avg =
                  Object.values(data).reduce((a, b) => a + b, 0) /
                    Object.values(data).length || 0;
                return (
                  <div key={cat.id} className="dna-stat-card">
                    <div className="dna-stat-icon">{cat.icon}</div>
                    <div className="dna-stat-info">
                      <span className="dna-stat-label">{cat.label}</span>
                      <span className="dna-stat-value">{Math.round(avg)}%</span>
                    </div>
                    <div className="dna-stat-bar">
                      <div
                        className="dna-stat-fill"
                        style={{ width: `${avg}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {categories.map((cat) => {
          if (cat.id === activeTab) {
            const data = getCategoryData(cat.id);
            return (
              <div key={cat.id} className="dna-category-detail">
                <h3>{cat.label}</h3>
                <div className="dna-category-grid">
                  {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="dna-category-item">
                      <span className="dna-category-key">{key}</span>
                      <div className="dna-category-bar">
                        <div
                          className="dna-category-fill"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                      <span className="dna-category-value">{value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
