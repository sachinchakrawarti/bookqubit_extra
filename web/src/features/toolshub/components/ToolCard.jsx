"use client";

import { useState } from "react";

export default function ToolCard({ tool, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`tool-card ${isHovered ? "hovered" : ""} ${tool.comingSoon ? "coming-soon" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => !tool.comingSoon && onSelect(tool.id)}
      style={{ borderColor: isHovered ? tool.color : "transparent" }}
    >
      <div className="tool-icon" style={{ backgroundColor: `${tool.color}20` }}>
        <span style={{ color: tool.color }}>{tool.icon}</span>
      </div>
      <div className="tool-content">
        <h3 className="tool-title">{tool.title}</h3>
        <p className="tool-description">{tool.description}</p>
        <div className="tool-footer">
          <span className="tool-category">{tool.category}</span>
          {tool.popular && <span className="tool-badge">🔥 Popular</span>}
          {tool.comingSoon && (
            <span className="tool-badge coming">Coming Soon</span>
          )}
        </div>
      </div>
      {!tool.comingSoon && <div className="tool-arrow">→</div>}
    </div>
  );
}
