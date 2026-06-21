"use client";

import {
  FiStar,
  FiUser,
  FiClock,
  FiBookOpen,
  FiTag,
  FiArrowRight,
} from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ResultCard({ item, type }) {
  const { td } = useLanguage();

  if (type === "book") {
    return (
      <div className="kg-result-card book-card">
        <div className="kg-result-header">
          <h3 className="kg-result-title">{item.title}</h3>
          <div className="kg-result-rating">
            <FiStar className="star-filled" />
            <span>{item.rating}</span>
          </div>
        </div>
        <p className="kg-result-author">by {item.author}</p>
        <p className="kg-result-description">{item.description}</p>
        <div className="kg-result-meta">
          <span className="kg-result-genre">{item.genre}</span>
          <span className="kg-result-year">{item.year}</span>
          <span className="kg-result-followers">👤 {item.followers}</span>
        </div>
        <div className="kg-result-tags">
          {item.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="kg-result-tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="kg-result-related">
          <span className="kg-related-label">
            {td("relatedAuthors") || "Related Authors:"}
          </span>
          {item.relatedAuthors.slice(0, 2).map((author, idx) => (
            <span key={idx} className="kg-related-item">
              {author}
            </span>
          ))}
        </div>
        <button className="kg-result-action">
          {td("viewDetails") || "View Details"} <FiArrowRight />
        </button>
      </div>
    );
  }

  if (type === "author") {
    return (
      <div className="kg-result-card author-card">
        <div className="kg-result-header">
          <h3 className="kg-result-title">{item.name}</h3>
          <span className="kg-result-followers">👤 {item.followers}</span>
        </div>
        <p className="kg-result-description">{item.bio}</p>
        <div className="kg-result-meta">
          <span className="kg-result-books">📚 {item.books.length} books</span>
          <span className="kg-result-genres">{item.genres.join(", ")}</span>
        </div>
        <div className="kg-result-related">
          <span className="kg-related-label">
            {td("relatedAuthors") || "Related Authors:"}
          </span>
          {item.relatedAuthors.slice(0, 3).map((author, idx) => (
            <span key={idx} className="kg-related-item">
              {author}
            </span>
          ))}
        </div>
        <button className="kg-result-action">
          {td("viewProfile") || "View Profile"} <FiArrowRight />
        </button>
      </div>
    );
  }

  if (type === "tag") {
    return (
      <div className="kg-result-card tag-card">
        <div className="kg-result-header">
          <h3 className="kg-result-title">{item.name}</h3>
          <span className="kg-result-count">{item.count} posts</span>
        </div>
        <p className="kg-result-description">
          {td("tagCategory") || "Category:"} {item.category}
        </p>
        <button className="kg-result-action">
          {td("exploreTag") || "Explore Tag"} <FiArrowRight />
        </button>
      </div>
    );
  }

  if (type === "news") {
    return (
      <div className="kg-result-card news-card">
        <div className="kg-result-header">
          <h3 className="kg-result-title">{item.title}</h3>
          <span className="kg-result-date">{item.date}</span>
        </div>
        <p className="kg-result-description">{item.excerpt}</p>
        <div className="kg-result-meta">
          <span className="kg-result-source">{item.source}</span>
          <span className="kg-result-category">{item.category}</span>
        </div>
        <button className="kg-result-action">
          {td("readMore") || "Read More"} <FiArrowRight />
        </button>
      </div>
    );
  }

  if (type === "blog") {
    return (
      <div className="kg-result-card blog-card">
        <div className="kg-result-header">
          <h3 className="kg-result-title">{item.title}</h3>
          <span className="kg-result-date">{item.date}</span>
        </div>
        <p className="kg-result-description">{item.excerpt}</p>
        <div className="kg-result-meta">
          <span className="kg-result-author">by {item.author}</span>
          <span className="kg-result-category">{item.category}</span>
          <span className="kg-result-readtime">{item.readTime} min read</span>
        </div>
        <button className="kg-result-action">
          {td("readBlog") || "Read Blog"} <FiArrowRight />
        </button>
      </div>
    );
  }

  return null;
}
