// components/EthosBadges.jsx
"use client";

import { FiAward } from "react-icons/fi";

export default function EthosBadges({ badges }) {
  return (
    <div className="ethos-badges-card">
      <div className="ethos-badges-header">
        <div className="ethos-badges-title-section">
          <FiAward className="ethos-badges-icon" />
          <h3 className="ethos-badges-title">Badges & Achievements</h3>
          <span className="ethos-badges-count">{badges.length} Earned</span>
        </div>
      </div>

      <div className="ethos-badges-grid">
        {badges.map((badge) => (
          <div key={badge.id} className="ethos-badge-item">
            <div
              className="ethos-badge-icon"
              style={{ backgroundColor: `${badge.color}20`, color: badge.color }}
            >
              {badge.icon}
            </div>
            <div className="ethos-badge-info">
              <span className="ethos-badge-name">{badge.name}</span>
              <span className={`ethos-badge-level ${badge.level.toLowerCase()}`}>
                {badge.level}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}