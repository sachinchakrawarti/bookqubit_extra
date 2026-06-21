"use client";

import Link from "next/link";
import { FiStar, FiCalendar, FiClock } from "react-icons/fi";

export default function UpdateCard({ item, type, color }) {
  const renderStars = (rating) => {
    return (
      <div className="update-stars">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`update-star ${i < Math.floor(rating) ? "filled" : i < rating ? "half" : "empty"}`}
            fill={i < Math.floor(rating) ? "currentColor" : "none"}
          />
        ))}
      </div>
    );
  };

  const getDateLabel = () => {
    if (item.date) return "📅 " + item.date;
    if (item.launchDate) return "🚀 " + item.launchDate;
    if (item.releaseDate) return "📅 " + item.releaseDate;
    return "";
  };

  return (
    <div className="update-card">
      <div className="update-card-cover-wrapper">
        <img src={item.cover} alt={item.title} className="update-card-cover" />
        <span className="update-card-type" style={{ backgroundColor: color }}>
          {type === "announcements"
            ? "📢"
            : type === "upcoming"
              ? "📅"
              : type === "launchedWeek"
                ? "🎉"
                : "📚"}
        </span>
      </div>
      <div className="update-card-content">
        <h3 className="update-card-title">{item.title}</h3>
        <p className="update-card-author">by {item.author}</p>

        {item.excerpt && <p className="update-card-excerpt">{item.excerpt}</p>}

        {item.rating && (
          <div className="update-card-rating">
            {renderStars(item.rating)}
            <span className="update-card-rating-value">{item.rating}</span>
          </div>
        )}

        {item.genre && <span className="update-card-genre">{item.genre}</span>}

        <div className="update-card-meta">
          <span className="update-card-date">{getDateLabel()}</span>
        </div>

        <Link href={`/updates/${item.slug}`} className="update-card-btn">
          View Details →
        </Link>
      </div>
    </div>
  );
}
