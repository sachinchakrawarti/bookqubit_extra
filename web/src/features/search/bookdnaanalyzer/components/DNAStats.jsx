"use client";

import { FiBook, FiUser, FiStar, FiTrendingUp } from "react-icons/fi";

export default function DNAStats({ dnaData }) {
  if (!dnaData) return null;

  const stats = [
    {
      label: "DNA Score",
      value: dnaData.dnaScore,
      icon: FiStar,
      color: "#f59e0b",
    },
    {
      label: "Themes",
      value:
        Object.values(dnaData.dna.themes).reduce((a, b) => a + b, 0) /
          Object.values(dnaData.dna.themes).length || 0,
      icon: FiBook,
      color: "#3b82f6",
    },
    {
      label: "Writing Style",
      value:
        Object.values(dnaData.dna.writingStyle).reduce((a, b) => a + b, 0) /
          Object.values(dnaData.dna.writingStyle).length || 0,
      icon: FiUser,
      color: "#8b5cf6",
    },
    {
      label: "Complexity",
      value:
        Object.values(dnaData.dna.complexity).reduce((a, b) => a + b, 0) /
          Object.values(dnaData.dna.complexity).length || 0,
      icon: FiTrendingUp,
      color: "#10b981",
    },
  ];

  return (
    <div className="dna-stats">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className="dna-stat-item">
            <div
              className="dna-stat-icon-wrapper"
              style={{ backgroundColor: `${stat.color}20` }}
            >
              <Icon style={{ color: stat.color }} />
            </div>
            <div className="dna-stat-details">
              <span className="dna-stat-label">{stat.label}</span>
              <span className="dna-stat-value">{Math.round(stat.value)}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
