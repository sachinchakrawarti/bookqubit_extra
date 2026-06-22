"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRTL } from "@/contexts/RTLContext";
import { useFont } from "@/contexts/FontContext";
import { FiArrowRight, FiStar, FiBookOpen, FiGrid } from "react-icons/fi";
import "./bookqubitdiscovery.css";

export default function BookqubitDiscovery() {
  const { theme, themeName } = useTheme();
  const { td } = useLanguage();
  const { direction } = useRTL();
  const { currentFont } = useFont();
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Discovery Categories
  const categories = [
    { id: "all", label: "All", icon: <FiGrid />, color: "#3b82f6" },
    { id: "books", label: "Books", icon: <FiBookOpen />, color: "#3b82f6" },
    { id: "comics", label: "Comics", icon: "🦸", color: "#ef4444" },
    { id: "academic", label: "Academic", icon: "🎓", color: "#10b981" },
  ];

  // Discovery Items
  const discoveryItems = [
    // Books
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300",
      rating: 4.8,
      genre: "Classic",
      category: "books",
      slug: "the-great-gatsby",
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300",
      rating: 4.9,
      genre: "Dystopian",
      category: "books",
      slug: "1984",
    },
    {
      id: 3,
      title: "Dune",
      author: "Frank Herbert",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300",
      rating: 4.7,
      genre: "Science Fiction",
      category: "books",
      slug: "dune",
    },
    {
      id: 4,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300",
      rating: 4.9,
      genre: "Classic",
      category: "books",
      slug: "to-kill-a-mockingbird",
    },
    {
      id: 5,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300",
      rating: 4.6,
      genre: "Fantasy",
      category: "books",
      slug: "the-hobbit",
    },
    {
      id: 6,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300",
      rating: 4.7,
      genre: "Romance",
      category: "books",
      slug: "pride-and-prejudice",
    },
    // Comics
    {
      id: 101,
      title: "The Dark Knight Returns",
      author: "Frank Miller",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300",
      rating: 4.9,
      genre: "Superhero",
      category: "comics",
      slug: "dark-knight-returns",
    },
    {
      id: 102,
      title: "Watchmen",
      author: "Alan Moore",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300",
      rating: 4.8,
      genre: "Superhero",
      category: "comics",
      slug: "watchmen",
    },
    {
      id: 103,
      title: "Spider-Man: One More Day",
      author: "J. Michael Straczynski",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300",
      rating: 4.5,
      genre: "Superhero",
      category: "comics",
      slug: "spider-man-one-more-day",
    },
    {
      id: 104,
      title: "X-Men: Days of Future Past",
      author: "Chris Claremont",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300",
      rating: 4.7,
      genre: "Superhero",
      category: "comics",
      slug: "x-men-days-of-future-past",
    },
    {
      id: 105,
      title: "The Walking Dead Vol. 1",
      author: "Robert Kirkman",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300",
      rating: 4.6,
      genre: "Horror",
      category: "comics",
      slug: "walking-dead-vol-1",
    },
    {
      id: 106,
      title: "Saga Vol. 1",
      author: "Brian K. Vaughan",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300",
      rating: 4.8,
      genre: "Sci-Fi Fantasy",
      category: "comics",
      slug: "saga-vol-1",
    },
    // Academic
    {
      id: 201,
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300",
      rating: 4.8,
      genre: "Computer Science",
      category: "academic",
      slug: "introduction-to-algorithms",
    },
    {
      id: 202,
      title: "Principles of Economics",
      author: "N. Gregory Mankiw",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300",
      rating: 4.6,
      genre: "Economics",
      category: "academic",
      slug: "principles-of-economics",
    },
    {
      id: 203,
      title: "Campbell Biology",
      author: "Neil A. Campbell",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300",
      rating: 4.7,
      genre: "Biology",
      category: "academic",
      slug: "campbell-biology",
    },
    {
      id: 204,
      title: "Fundamentals of Physics",
      author: "David Halliday",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300",
      rating: 4.8,
      genre: "Physics",
      category: "academic",
      slug: "fundamentals-of-physics",
    },
    {
      id: 205,
      title: "Organic Chemistry",
      author: "Paula Yurkanis Bruice",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300",
      rating: 4.5,
      genre: "Chemistry",
      category: "academic",
      slug: "organic-chemistry",
    },
    {
      id: 206,
      title: "Calculus: Early Transcendentals",
      author: "James Stewart",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300",
      rating: 4.7,
      genre: "Mathematics",
      category: "academic",
      slug: "calculus-early-transcendentals",
    },
  ];

  const filteredItems =
    activeCategory === "all"
      ? discoveryItems
      : discoveryItems.filter((item) => item.category === activeCategory);

  const renderStars = (rating) => {
    return (
      <div className="discovery-stars">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`discovery-star ${i < Math.floor(rating) ? "filled" : i < rating ? "half" : "empty"}`}
            fill={i < Math.floor(rating) ? "currentColor" : "none"}
          />
        ))}
      </div>
    );
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      dir={direction}
      style={{ fontFamily: currentFont?.family }}
      className={`bookqubit-discovery ${isDarkMode ? "dark" : ""}`}
    >
      {/* Header */}
      <div className="discovery-header">
        <div className="discovery-header-content">
          <h1 className="discovery-title">🔍 BookQubit Discovery</h1>
          <p className="discovery-subtitle">
            Discover books, comics & academic resources
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="discovery-categories">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`discovery-category-btn ${activeCategory === cat.id ? "active" : ""}`}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              borderColor:
                activeCategory === cat.id ? cat.color : "transparent",
              color: activeCategory === cat.id ? cat.color : undefined,
            }}
          >
            <span className="discovery-category-icon">{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="discovery-results">
        <span>{filteredItems.length} items found</span>
      </div>

      {/* Grid */}
      <div className="discovery-grid">
        {filteredItems.map((item) => (
          <Link
            key={item.id}
            href={`/${item.category}/${item.slug}`}
            className="discovery-card"
          >
            <div className="discovery-card-cover-wrapper">
              <img
                src={item.cover}
                alt={item.title}
                className="discovery-card-cover"
              />
              <span className="discovery-card-badge">{item.genre}</span>
            </div>
            <div className="discovery-card-content">
              <h3 className="discovery-card-title">{item.title}</h3>
              <p className="discovery-card-author">by {item.author}</p>
              {renderStars(item.rating)}
              <span className="discovery-card-category-tag">
                {item.category}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="discovery-empty">
          <div className="discovery-empty-icon">🔍</div>
          <h3>No items found</h3>
          <p>Try selecting a different category</p>
        </div>
      )}
    </div>
  );
}
