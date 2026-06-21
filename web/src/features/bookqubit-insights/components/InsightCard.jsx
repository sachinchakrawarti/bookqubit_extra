"use client";

import Link from "next/link";
import {
  FiArrowRight,
  FiTrendingUp,
  FiTrendingDown,
  FiMinus,
} from "react-icons/fi";

export default function InsightCard({ insight }) {
  const getTrendIcon = (change) => {
    if (change.startsWith("+")) return <FiTrendingUp className="trend-up" />;
    if (change.startsWith("-"))
      return <FiTrendingDown className="trend-down" />;
    return <FiMinus className="trend-neutral" />;
  };

  return (
    <div className="insight-card">
      <div className="insight-card-header">
        <div className="insight-card-icon" style={{ color: insight.color }}>
          {insight.icon}
        </div>
        <h3 className="insight-card-title">{insight.title}</h3>
      </div>

      <p className="insight-card-description">{insight.description}</p>

      <div className="insight-card-metrics">
        {insight.metrics.slice(0, 4).map((metric, idx) => (
          <div key={idx} className="insight-metric">
            <span className="insight-metric-value">{metric.value}</span>
            <span className="insight-metric-label">{metric.label}</span>
            <span className="insight-metric-change">
              {getTrendIcon(metric.change)} {metric.change}
            </span>
          </div>
        ))}
      </div>

      <div className="insight-card-trends">
        {insight.trends.slice(0, 4).map((trend, idx) => (
          <div key={idx} className="insight-trend">
            <span className="insight-trend-name">{trend.name}</span>
            <div className="insight-trend-bar">
              <div
                className="insight-trend-fill"
                style={{
                  width: `${trend.value || trend.popularity || 0}%`,
                  backgroundColor: insight.color,
                }}
              />
            </div>
            <span className="insight-trend-value">
              {trend.value || trend.popularity || 0}%
            </span>
          </div>
        ))}
      </div>

      <Link href={`/insights/${insight.slug}`} className="insight-card-btn">
        View Details <FiArrowRight />
      </Link>
    </div>
  );
}
