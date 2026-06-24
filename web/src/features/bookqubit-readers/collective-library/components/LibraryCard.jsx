"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FiHeart,
  FiBookmark,
  FiShare2,
  FiUsers,
  FiEye,
  FiBookOpen,
  FiGrid,
} from "react-icons/fi";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LibraryCard({
  library,
  featured = false,
  trending = false,
  viewMode = "grid",
  onClick,
}) {
  const { theme, themeName } = useTheme();
  const { td } = useLanguage();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState(library.stats.likes);
  const [saves, setSaves] = useState(library.stats.saves);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) {
      setSaves(saves - 1);
    } else {
      setSaves(saves + 1);
    }
    setIsSaved(!isSaved);
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: library.name,
        text: `Check out "${library.name}" on BookQubit Collective Library`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleCardClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(library);
    }
  };

  // Use slug for URL if available, otherwise fallback to id
  const detailUrl = library.slug
    ? `/collective/${library.slug}`
    : `/collective/${library.id}`;

  if (viewMode === "list") {
    return (
      <Link
        href={detailUrl}
        className="cl-library-card list-view"
        onClick={handleCardClick}
      >
        <div className="cl-library-card-cover">
          <img src={library.cover} alt={library.name} />
          {featured && (
            <span className="cl-library-featured-badge">⭐ Featured</span>
          )}
          {trending && (
            <span className="cl-library-trending-badge">🔥 Trending</span>
          )}
          <span className="cl-library-shelf-badge">
            <FiGrid /> {library.shelf || "General"}
          </span>
        </div>
        <div className="cl-library-card-content">
          <div className="cl-library-card-header">
            <h3 className="cl-library-card-title">{library.name}</h3>
            <span className="cl-library-card-category">{library.category}</span>
          </div>
          <p className="cl-library-card-description">{library.description}</p>
          <div className="cl-library-card-owner">
            <img src={library.owner.avatar} alt={library.owner.name} />
            <span>{library.owner.name}</span>
            <span className="cl-library-card-username">
              @{library.owner.username}
            </span>
          </div>
          <div className="cl-library-card-tags">
            {library.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="cl-library-card-tag">
                #{tag}
              </span>
            ))}
          </div>
          <div className="cl-library-card-footer">
            <div className="cl-library-card-stats">
              <span>
                <FiBookOpen /> {library.books.length} books
              </span>
              <span>
                <FiUsers /> {library.stats.members} members
              </span>
              <span>
                <FiEye /> {library.stats.views}
              </span>
            </div>
            <div className="cl-library-card-actions">
              <button
                className={`cl-action-btn ${isLiked ? "liked" : ""}`}
                onClick={handleLike}
              >
                <FiHeart /> {likes}
              </button>
              <button
                className={`cl-action-btn ${isSaved ? "saved" : ""}`}
                onClick={handleSave}
              >
                <FiBookmark /> {saves}
              </button>
              <button className="cl-action-btn" onClick={handleShare}>
                <FiShare2 />
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={detailUrl}
      className="cl-library-card"
      onClick={handleCardClick}
    >
      <div className="cl-library-card-cover">
        <img src={library.cover} alt={library.name} />
        {featured && (
          <span className="cl-library-featured-badge">⭐ Featured</span>
        )}
        {trending && (
          <span className="cl-library-trending-badge">🔥 Trending</span>
        )}
        <span className="cl-library-book-count">
          {library.books.length} books
        </span>
        {library.shelf && (
          <span className="cl-library-shelf-badge">{library.shelf}</span>
        )}
      </div>
      <div className="cl-library-card-content">
        <div className="cl-library-card-header">
          <h3 className="cl-library-card-title">{library.name}</h3>
          <span className="cl-library-card-category">{library.category}</span>
        </div>
        <p className="cl-library-card-description">{library.description}</p>
        <div className="cl-library-card-owner">
          <img src={library.owner.avatar} alt={library.owner.name} />
          <span>{library.owner.name}</span>
          <span className="cl-library-card-username">
            @{library.owner.username}
          </span>
        </div>
        <div className="cl-library-card-footer">
          <div className="cl-library-card-stats">
            <span>
              <FiUsers /> {library.stats.members}
            </span>
            <span>
              <FiEye /> {library.stats.views}
            </span>
          </div>
          <div className="cl-library-card-actions">
            <button
              className={`cl-action-btn ${isLiked ? "liked" : ""}`}
              onClick={handleLike}
            >
              <FiHeart /> {likes}
            </button>
            <button
              className={`cl-action-btn ${isSaved ? "saved" : ""}`}
              onClick={handleSave}
            >
              <FiBookmark /> {saves}
            </button>
            <button className="cl-action-btn" onClick={handleShare}>
              <FiShare2 />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
