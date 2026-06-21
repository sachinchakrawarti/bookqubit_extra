"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRTL } from "@/contexts/RTLContext";
import { useFont } from "@/contexts/FontContext";
import {
  FiSearch,
  FiFilter,
  FiX,
  FiBookOpen,
  FiUser,
  FiStar,
  FiMessageSquare,
  FiTrendingUp,
  FiClock,
  FiHeart,
  FiShare2,
  FiBookmark,
  FiExternalLink,
} from "react-icons/fi";
import "./bookqubitlens.css";

// Mock Data
const mockData = {
  news: [
    {
      id: 1,
      title: "New Edition of The Great Gatsby Released",
      source: "Literary Times",
      date: "2024-06-15",
      excerpt:
        "A new illustrated edition of F. Scott Fitzgerald's classic novel has been released with never-before-seen illustrations...",
      category: "Book News",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
      readTime: "3 min",
      likes: 234,
      comments: 45,
    },
    {
      id: 2,
      title: "Dune Movie Sequel Announced",
      source: "SciFi Weekly",
      date: "2024-06-10",
      excerpt:
        "Following the success of the first film, the Dune sequel has been officially confirmed with a 2026 release date...",
      category: "Movie News",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
      readTime: "5 min",
      likes: 567,
      comments: 89,
    },
    {
      id: 3,
      title: "Harper Lee's Lost Manuscript Discovered",
      source: "Book Gazette",
      date: "2024-06-05",
      excerpt:
        "A previously unknown manuscript by Harper Lee has been discovered in a family archive in Alabama...",
      category: "Literary Discovery",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
      readTime: "4 min",
      likes: 890,
      comments: 156,
    },
    {
      id: 4,
      title: "Tolkien's Unpublished Letters Released",
      source: "Fantasy Times",
      date: "2024-06-01",
      excerpt:
        "A collection of previously unpublished letters from J.R.R. Tolkien has been released to the public...",
      category: "Author News",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
      readTime: "3 min",
      likes: 432,
      comments: 67,
    },
    {
      id: 5,
      title: "BookTok: The Rise of Reading Communities",
      source: "Social Media Today",
      date: "2024-05-28",
      excerpt:
        "How TikTok has revolutionized the way people discover and share books, creating a new generation of readers...",
      category: "Trends",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
      readTime: "6 min",
      likes: 1234,
      comments: 234,
    },
  ],
  blogs: [
    {
      id: 1,
      title: "Why 1984 Remains Relevant Today",
      author: "Sarah Johnson",
      date: "2024-06-12",
      excerpt:
        "George Orwell's dystopian masterpiece continues to resonate with modern readers more than ever...",
      category: "Literary Analysis",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
      readTime: 8,
      likes: 567,
      comments: 89,
    },
    {
      id: 2,
      title: "The Impact of Dune on Modern Sci-Fi",
      author: "Michael Chen",
      date: "2024-06-08",
      excerpt:
        "Frank Herbert's epic has influenced generations of science fiction writers and filmmakers...",
      category: "Genre Analysis",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
      readTime: 10,
      likes: 789,
      comments: 123,
    },
    {
      id: 3,
      title: "Reading Guide to Pride and Prejudice",
      author: "Emily Watson",
      date: "2024-06-03",
      excerpt:
        "A comprehensive guide to understanding Jane Austen's beloved classic and its themes...",
      category: "Reading Guide",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
      readTime: 6,
      likes: 345,
      comments: 56,
    },
    {
      id: 4,
      title: "Fantasy vs Sci-Fi: A Comparative Analysis",
      author: "David Kim",
      date: "2024-05-28",
      excerpt:
        "Exploring the similarities and differences between fantasy and science fiction genres...",
      category: "Genre Comparison",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
      readTime: 12,
      likes: 678,
      comments: 90,
    },
    {
      id: 5,
      title: "The Art of Storytelling in Modern Literature",
      author: "Priya Sharma",
      date: "2024-05-25",
      excerpt:
        "How contemporary authors are reimagining traditional storytelling techniques...",
      category: "Writing Tips",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
      readTime: 7,
      likes: 456,
      comments: 78,
    },
  ],
  reviews: [
    {
      id: 1,
      bookTitle: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      reviewer: "Emma Thompson",
      rating: 4.5,
      date: "2024-06-14",
      content:
        "A masterpiece of American literature. The themes of wealth, love, and the American Dream are brilliantly explored...",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
      likes: 234,
      helpful: 156,
    },
    {
      id: 2,
      bookTitle: "1984",
      author: "George Orwell",
      reviewer: "James Anderson",
      rating: 5,
      date: "2024-06-09",
      content:
        "A chilling vision of the future that remains relevant today. Orwell's warnings about surveillance are more important than ever...",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
      likes: 567,
      helpful: 345,
    },
    {
      id: 3,
      bookTitle: "Dune",
      author: "Frank Herbert",
      reviewer: "Michael Rodriguez",
      rating: 4.8,
      date: "2024-06-04",
      content:
        "An epic masterpiece of science fiction that continues to inspire generations. The world-building is phenomenal...",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
      likes: 789,
      helpful: 456,
    },
    {
      id: 4,
      bookTitle: "To Kill a Mockingbird",
      author: "Harper Lee",
      reviewer: "Sarah Williams",
      rating: 5,
      date: "2024-05-30",
      content:
        "A powerful story of racial injustice and loss of innocence in the American South. Essential reading for everyone...",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
      likes: 890,
      helpful: 567,
    },
    {
      id: 5,
      bookTitle: "The Hobbit",
      author: "J.R.R. Tolkien",
      reviewer: "David Brown",
      rating: 4.6,
      date: "2024-05-26",
      content:
        "A timeless fantasy adventure that began it all. Perfect for readers of all ages...",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
      likes: 456,
      helpful: 234,
    },
  ],
  quotes: [
    {
      id: 1,
      text: "So we beat on, boats against the current, borne back ceaselessly into the past.",
      author: "F. Scott Fitzgerald",
      source: "The Great Gatsby",
      likes: 1234,
      shares: 567,
    },
    {
      id: 2,
      text: "Who controls the past controls the future. Who controls the present controls the past.",
      author: "George Orwell",
      source: "1984",
      likes: 987,
      shares: 432,
    },
    {
      id: 3,
      text: "Fear is the mind-killer. Fear is the little-death that brings total obliteration.",
      author: "Frank Herbert",
      source: "Dune",
      likes: 876,
      shares: 345,
    },
    {
      id: 4,
      text: "The only thing we have to fear is fear itself.",
      author: "Harper Lee",
      source: "To Kill a Mockingbird",
      likes: 765,
      shares: 234,
    },
    {
      id: 5,
      text: "Not all those who wander are lost.",
      author: "J.R.R. Tolkien",
      source: "The Lord of the Rings",
      likes: 654,
      shares: 123,
    },
    {
      id: 6,
      text: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
      author: "Jane Austen",
      source: "Pride and Prejudice",
      likes: 543,
      shares: 98,
    },
  ],
  opinions: [
    {
      id: 1,
      title: "Should Classic Books Be Updated for Modern Readers?",
      author: "Mark Twain Fan",
      date: "2024-06-13",
      content:
        "The debate over updating classic literature for modern audiences continues to divide readers...",
      category: "Debate",
      likes: 234,
      comments: 67,
      views: 1234,
    },
    {
      id: 2,
      title: "The Rise of Audio-first Reading Culture",
      author: "AudioBook Lover",
      date: "2024-06-07",
      content:
        "With the rise of audiobooks and podcasts, how is reading culture evolving...",
      category: "Culture",
      likes: 567,
      comments: 89,
      views: 2345,
    },
    {
      id: 3,
      title: "Why Physical Books Will Never Die",
      author: "Book Collector",
      date: "2024-06-01",
      content:
        "Despite the rise of digital reading, physical books continue to hold a special place in readers' hearts...",
      category: "Opinion",
      likes: 789,
      comments: 123,
      views: 3456,
    },
    {
      id: 4,
      title: "Diversity in Literature: Progress and Challenges",
      author: "Reader Advocate",
      date: "2024-05-27",
      content:
        "The publishing industry has made significant strides in diversity, but there's still work to be done...",
      category: "Social",
      likes: 890,
      comments: 156,
      views: 4567,
    },
  ],
};

const BookQubitLens = () => {
  const { theme, themeName } = useTheme();
  const { td } = useLanguage();
  const { direction } = useRTL();
  const { currentFont } = useFont();

  const [activeTab, setActiveTab] = useState("news");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  const tabs = [
    { id: "news", label: "News", icon: <FiTrendingUp /> },
    { id: "blogs", label: "Blogs", icon: <FiBookOpen /> },
    { id: "reviews", label: "Reviews", icon: <FiStar /> },
    { id: "quotes", label: "Quotes", icon: <FiMessageSquare /> },
    { id: "opinions", label: "Opinions", icon: <FiUser /> },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let data = mockData[activeTab] || [];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      data = data.filter((item) => {
        const searchableText =
          item.title || item.bookTitle || item.text || item.author || "";
        return searchableText.toLowerCase().includes(query);
      });
    }

    if (selectedCategory !== "all" && activeTab !== "quotes") {
      data = data.filter(
        (item) =>
          item.category &&
          item.category.toLowerCase().includes(selectedCategory.toLowerCase()),
      );
    }

    setFilteredData(data);
  }, [activeTab, searchQuery, selectedCategory, mounted]);

  const getCategories = () => {
    const data = mockData[activeTab] || [];
    const categories = new Set();
    data.forEach((item) => {
      if (item.category) categories.add(item.category);
    });
    return ["all", ...Array.from(categories)];
  };

  const renderStars = (rating) => {
    return (
      <div className="lens-stars">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`lens-star ${i < Math.floor(rating) ? "filled" : i < rating ? "half" : "empty"}`}
            fill={i < Math.floor(rating) ? "currentColor" : "none"}
          />
        ))}
      </div>
    );
  };

  const renderContent = () => {
    if (filteredData.length === 0) {
      return (
        <div className="lens-empty">
          <div className="lens-empty-icon">🔍</div>
          <h3>No results found</h3>
          <p>Try adjusting your search or filter</p>
        </div>
      );
    }

    switch (activeTab) {
      case "news":
        return filteredData.map((item) => (
          <div key={item.id} className="lens-card news-card">
            <img
              src={item.image}
              alt={item.title}
              className="lens-card-image"
            />
            <div className="lens-card-content">
              <span className="lens-card-category">{item.category}</span>
              <h3 className="lens-card-title">{item.title}</h3>
              <p className="lens-card-excerpt">{item.excerpt}</p>
              <div className="lens-card-meta">
                <span>📅 {item.date}</span>
                <span>📰 {item.source}</span>
                <span>⏱️ {item.readTime}</span>
              </div>
              <div className="lens-card-actions">
                <button className="lens-action-btn">
                  <FiHeart /> {item.likes}
                </button>
                <button className="lens-action-btn">
                  <FiMessageSquare /> {item.comments}
                </button>
                <button className="lens-action-btn">
                  <FiShare2 />
                </button>
                <button className="lens-action-btn primary">
                  Read More <FiExternalLink />
                </button>
              </div>
            </div>
          </div>
        ));

      case "blogs":
        return filteredData.map((item) => (
          <div key={item.id} className="lens-card blog-card">
            <img
              src={item.image}
              alt={item.title}
              className="lens-card-image"
            />
            <div className="lens-card-content">
              <span className="lens-card-category">{item.category}</span>
              <h3 className="lens-card-title">{item.title}</h3>
              <p className="lens-card-author">by {item.author}</p>
              <p className="lens-card-excerpt">{item.excerpt}</p>
              <div className="lens-card-meta">
                <span>📅 {item.date}</span>
                <span>⏱️ {item.readTime} min read</span>
              </div>
              <div className="lens-card-actions">
                <button className="lens-action-btn">
                  <FiHeart /> {item.likes}
                </button>
                <button className="lens-action-btn">
                  <FiMessageSquare /> {item.comments}
                </button>
                <button className="lens-action-btn primary">
                  Read Blog <FiExternalLink />
                </button>
              </div>
            </div>
          </div>
        ));

      case "reviews":
        return filteredData.map((item) => (
          <div key={item.id} className="lens-card review-card">
            <img
              src={item.image}
              alt={item.bookTitle}
              className="lens-card-image"
            />
            <div className="lens-card-content">
              <h3 className="lens-card-title">{item.bookTitle}</h3>
              <p className="lens-card-author">by {item.author}</p>
              {renderStars(item.rating)}
              <p className="lens-card-excerpt">{item.content}</p>
              <div className="lens-card-meta">
                <span>👤 {item.reviewer}</span>
                <span>📅 {item.date}</span>
              </div>
              <div className="lens-card-actions">
                <button className="lens-action-btn">
                  <FiHeart /> {item.likes}
                </button>
                <button className="lens-action-btn">
                  👍 {item.helpful} helpful
                </button>
                <button className="lens-action-btn primary">
                  Full Review <FiExternalLink />
                </button>
              </div>
            </div>
          </div>
        ));

      case "quotes":
        return filteredData.map((item) => (
          <div key={item.id} className="lens-card quote-card">
            <div className="lens-quote-content">
              <div className="lens-quote-icon">"</div>
              <p className="lens-quote-text">{item.text}</p>
              <div className="lens-quote-author">
                <strong>{item.author}</strong>
                <span>— {item.source}</span>
              </div>
              <div className="lens-quote-actions">
                <button className="lens-action-btn">
                  <FiHeart /> {item.likes}
                </button>
                <button className="lens-action-btn">
                  <FiShare2 /> {item.shares}
                </button>
                <button className="lens-action-btn primary">
                  <FiBookmark /> Save
                </button>
              </div>
            </div>
          </div>
        ));

      case "opinions":
        return filteredData.map((item) => (
          <div key={item.id} className="lens-card opinion-card">
            <div className="lens-card-content">
              <span className="lens-card-category">{item.category}</span>
              <h3 className="lens-card-title">{item.title}</h3>
              <p className="lens-card-author">by {item.author}</p>
              <p className="lens-card-excerpt">{item.content}</p>
              <div className="lens-card-meta">
                <span>📅 {item.date}</span>
                <span>👁️ {item.views} views</span>
              </div>
              <div className="lens-card-actions">
                <button className="lens-action-btn">
                  <FiHeart /> {item.likes}
                </button>
                <button className="lens-action-btn">
                  <FiMessageSquare /> {item.comments}
                </button>
                <button className="lens-action-btn primary">
                  Read Opinion <FiExternalLink />
                </button>
              </div>
            </div>
          </div>
        ));

      default:
        return null;
    }
  };

  if (!mounted) return null;

  return (
    <div
      dir={direction}
      style={{ fontFamily: currentFont?.family }}
      className={`bookqubit-lens ${isDarkMode ? "dark" : ""}`}
    >
      {/* Header */}
      <div className="lens-header">
        <div className="lens-header-content">
          <h1 className="lens-title">🔍 BookQubit Lens</h1>
          <p className="lens-subtitle">
            Discover news, blogs, reviews, quotes & opinions about books
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="lens-controls">
        <div className="lens-search">
          <FiSearch className="lens-search-icon" />
          <input
            type="text"
            placeholder="Search news, blogs, reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="lens-search-input"
          />
          {searchQuery && (
            <button
              className="lens-search-clear"
              onClick={() => setSearchQuery("")}
            >
              <FiX />
            </button>
          )}
        </div>
        <button
          className={`lens-filter-btn ${showFilters ? "active" : ""}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <FiFilter /> Filters
        </button>
      </div>

      {/* Filters Bar */}
      {showFilters && (
        <div className="lens-filters-bar">
          <div className="lens-filter-group">
            <label>Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="lens-filter-select"
            >
              {getCategories().map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="lens-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`lens-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => {
              setActiveTab(tab.id);
              setSelectedCategory("all");
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
            <span className="lens-tab-count">
              {mockData[tab.id]?.length || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="lens-results">
        <div className="lens-results-header">
          <span className="lens-results-count">
            {filteredData.length} {activeTab}
          </span>
          <span className="lens-results-sort">
            <select className="lens-sort-select">
              <option>Latest</option>
              <option>Most Popular</option>
              <option>Top Rated</option>
            </select>
          </span>
        </div>
        <div className="lens-results-grid">{renderContent()}</div>
      </div>
    </div>
  );
};

export default BookQubitLens;
