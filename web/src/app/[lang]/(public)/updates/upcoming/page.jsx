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
  FiStar,
  FiCalendar,
  FiArrowLeft,
  FiBookOpen,
} from "react-icons/fi";

export default function UpcomingPage() {
  const { theme, themeName } = useTheme();
  const { td } = useLanguage();
  const { direction } = useRTL();
  const { currentFont } = useFont();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [mounted, setMounted] = useState(false);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // Mock upcoming books data
  const upcomingBooks = [
    {
      id: 1,
      title: "The Wind of Change",
      author: "Priya Sharma",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300",
      releaseDate: "July 15, 2024",
      rating: 4.8,
      genre: "Fiction",
      description:
        "A powerful story of transformation and hope in a changing world.",
      pages: 320,
      publisher: "Penguin Books",
      language: "English",
      price: "$24.99",
      preOrder: true,
    },
    {
      id: 2,
      title: "Digital Dreams",
      author: "Amit Patel",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300",
      releaseDate: "July 22, 2024",
      rating: 4.7,
      genre: "Tech",
      description:
        "Exploring the intersection of technology and human consciousness.",
      pages: 280,
      publisher: "Tech Press",
      language: "English",
      price: "$19.99",
      preOrder: true,
    },
    {
      id: 3,
      title: "The Last Kingdom",
      author: "Sarah Williams",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300",
      releaseDate: "August 5, 2024",
      rating: 4.9,
      genre: "Fantasy",
      description: "An epic tale of kingdoms, magic, and destiny.",
      pages: 450,
      publisher: "Fantasy House",
      language: "English",
      price: "$27.99",
      preOrder: true,
    },
    {
      id: 4,
      title: "Shadow of Time",
      author: "Michael Brown",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300",
      releaseDate: "August 12, 2024",
      rating: 4.6,
      genre: "Mystery",
      description:
        "A detective's race against time to solve a decades-old mystery.",
      pages: 360,
      publisher: "Mystery Press",
      language: "English",
      price: "$22.99",
      preOrder: true,
    },
    {
      id: 5,
      title: "Ocean Kingdom",
      author: "Emily Davis",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300",
      releaseDate: "August 20, 2024",
      rating: 4.8,
      genre: "Adventure",
      description:
        "An underwater adventure to discover the lost kingdom of Atlantis.",
      pages: 400,
      publisher: "Adventure Books",
      language: "English",
      price: "$25.99",
      preOrder: true,
    },
    {
      id: 6,
      title: "Starlight Chronicles",
      author: "David Wilson",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300",
      releaseDate: "September 1, 2024",
      rating: 4.9,
      genre: "Sci-Fi",
      description: "A space opera spanning galaxies and civilizations.",
      pages: 520,
      publisher: "Sci-Fi World",
      language: "English",
      price: "$29.99",
      preOrder: true,
    },
    {
      id: 7,
      title: "The Silent Garden",
      author: "Jessica Lee",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300",
      releaseDate: "September 8, 2024",
      rating: 4.7,
      genre: "Romance",
      description: "A love story that blooms in the most unexpected place.",
      pages: 310,
      publisher: "Romance Reads",
      language: "English",
      price: "$21.99",
      preOrder: true,
    },
    {
      id: 8,
      title: "The Last Manuscript",
      author: "Robert Taylor",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300",
      releaseDate: "September 15, 2024",
      rating: 4.8,
      genre: "Thriller",
      description: "A hunt for a lost manuscript that could change history.",
      pages: 380,
      publisher: "Thriller Press",
      language: "English",
      price: "$23.99",
      preOrder: true,
    },
  ];

  useEffect(() => {
    setMounted(true);
    setFilteredBooks(upcomingBooks);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const query = searchQuery.toLowerCase();
    const filtered = upcomingBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.genre.toLowerCase().includes(query),
    );
    setFilteredBooks(filtered);
  }, [searchQuery, mounted]);

  const renderStars = (rating) => {
    return (
      <div className="upcoming-stars">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`upcoming-star ${i < Math.floor(rating) ? "filled" : i < rating ? "half" : "empty"}`}
            fill={i < Math.floor(rating) ? "currentColor" : "none"}
          />
        ))}
        <span className="upcoming-rating-value">{rating}</span>
      </div>
    );
  };

  if (!mounted) return null;

  return (
    <div
      dir={direction}
      style={{ fontFamily: currentFont?.family }}
      className={`upcoming-page ${isDarkMode ? "dark" : ""}`}
    >
      {/* Back Button */}
      <div className="upcoming-back">
        <Link href="/updates" className="upcoming-back-btn">
          <FiArrowLeft /> Back to Updates
        </Link>
      </div>

      {/* Header */}
      <div className="upcoming-header">
        <div className="upcoming-header-content">
          <h1 className="upcoming-title">📅 Upcoming Books</h1>
          <p className="upcoming-subtitle">
            Books releasing soon. Pre-order now!
          </p>
        </div>
      </div>

      {/* Search & Stats */}
      <div className="upcoming-controls">
        <div className="upcoming-search">
          <FiSearch className="upcoming-search-icon" />
          <input
            type="text"
            placeholder="Search upcoming books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="upcoming-search-input"
          />
        </div>
        <div className="upcoming-stats">
          <span>{filteredBooks.length} books</span>
          <span className="upcoming-stat-badge">📅 Coming Soon</span>
        </div>
      </div>

      {/* Books Grid */}
      <div className="upcoming-grid">
        {filteredBooks.length === 0 ? (
          <div className="upcoming-empty">
            <div className="upcoming-empty-icon">📚</div>
            <h3>No upcoming books found</h3>
            <p>Try adjusting your search</p>
          </div>
        ) : (
          filteredBooks.map((book) => (
            <div key={book.id} className="upcoming-card">
              <div className="upcoming-card-cover-wrapper">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="upcoming-card-cover"
                />
                <span className="upcoming-card-badge">Pre-Order</span>
              </div>
              <div className="upcoming-card-content">
                <h3 className="upcoming-card-title">{book.title}</h3>
                <p className="upcoming-card-author">by {book.author}</p>
                <div className="upcoming-card-rating">
                  {renderStars(book.rating)}
                </div>
                <p className="upcoming-card-description">{book.description}</p>
                <div className="upcoming-card-meta">
                  <span className="upcoming-card-genre">{book.genre}</span>
                  <span className="upcoming-card-pages">
                    {book.pages} pages
                  </span>
                </div>
                <div className="upcoming-card-footer">
                  <div className="upcoming-card-release">
                    <FiCalendar />
                    <span>{book.releaseDate}</span>
                  </div>
                  <div className="upcoming-card-price">
                    <span>{book.price}</span>
                  </div>
                </div>
                <button className="upcoming-card-btn">Pre-Order Now</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CSS */}
      <style jsx>{`
        .upcoming-page {
          min-height: 100vh;
          background: ${isDarkMode ? "#111827" : "#f9fafb"};
          padding: 1.5rem;
        }

        .upcoming-back {
          margin-bottom: 1.5rem;
        }

        .upcoming-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: ${isDarkMode ? "#9ca3af" : "#6b7280"};
          text-decoration: none;
          font-size: 0.875rem;
        }

        .upcoming-back-btn:hover {
          color: #3b82f6;
        }

        .upcoming-header {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 2rem;
          text-align: center;
        }

        .upcoming-title {
          font-size: 2rem;
          font-weight: 700;
          color: white;
          margin: 0 0 0.5rem;
        }

        .upcoming-subtitle {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1rem;
          margin: 0;
        }

        .upcoming-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .upcoming-search {
          flex: 1;
          position: relative;
          max-width: 500px;
        }

        .upcoming-search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: ${isDarkMode ? "#6b7280" : "#9ca3af"};
        }

        .upcoming-search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.75rem;
          border: 2px solid ${isDarkMode ? "#374151" : "#e5e7eb"};
          border-radius: 0.75rem;
          background: ${isDarkMode ? "#1f2937" : "white"};
          color: ${isDarkMode ? "#f9fafb" : "#111827"};
          font-size: 1rem;
          outline: none;
        }

        .upcoming-search-input:focus {
          border-color: #3b82f6;
        }

        .upcoming-stats {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.875rem;
          color: ${isDarkMode ? "#9ca3af" : "#6b7280"};
        }

        .upcoming-stat-badge {
          padding: 0.25rem 0.75rem;
          background: ${isDarkMode ? "#374151" : "#e5e7eb"};
          border-radius: 2rem;
        }

        .upcoming-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .upcoming-card {
          background: ${isDarkMode ? "#1f2937" : "white"};
          border-radius: 1rem;
          overflow: hidden;
          transition: all 0.3s;
          border: 1px solid ${isDarkMode ? "#374151" : "#e5e7eb"};
        }

        .upcoming-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .upcoming-card-cover-wrapper {
          position: relative;
        }

        .upcoming-card-cover {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .upcoming-card-badge {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          padding: 0.25rem 0.75rem;
          background: #3b82f6;
          color: white;
          border-radius: 0.5rem;
          font-size: 0.7rem;
          font-weight: 600;
        }

        .upcoming-card-content {
          padding: 1.25rem;
        }

        .upcoming-card-title {
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 0.25rem;
          color: ${isDarkMode ? "#f9fafb" : "#111827"};
        }

        .upcoming-card-author {
          font-size: 0.875rem;
          color: ${isDarkMode ? "#9ca3af" : "#6b7280"};
          margin: 0 0 0.75rem;
        }

        .upcoming-card-rating {
          margin-bottom: 0.75rem;
        }

        .upcoming-stars {
          display: flex;
          align-items: center;
          gap: 0.125rem;
        }

        .upcoming-star {
          width: 16px;
          height: 16px;
        }

        .upcoming-star.filled {
          color: #f59e0b;
          fill: #f59e0b;
        }

        .upcoming-star.half {
          color: #f59e0b;
        }

        .upcoming-star.empty {
          color: ${isDarkMode ? "#4b5563" : "#d1d5db"};
        }

        .upcoming-rating-value {
          font-size: 0.75rem;
          color: ${isDarkMode ? "#9ca3af" : "#6b7280"};
          margin-left: 0.25rem;
        }

        .upcoming-card-description {
          font-size: 0.875rem;
          line-height: 1.5;
          color: ${isDarkMode ? "#9ca3af" : "#6b7280"};
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 0.75rem;
        }

        .upcoming-card-meta {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .upcoming-card-genre {
          font-size: 0.7rem;
          padding: 0.125rem 0.5rem;
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
          border-radius: 0.25rem;
        }

        .upcoming-card-pages {
          font-size: 0.7rem;
          padding: 0.125rem 0.5rem;
          background: ${isDarkMode ? "#374151" : "#f3f4f6"};
          color: ${isDarkMode ? "#9ca3af" : "#6b7280"};
          border-radius: 0.25rem;
        }

        .upcoming-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .upcoming-card-release {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: ${isDarkMode ? "#9ca3af" : "#6b7280"};
        }

        .upcoming-card-price {
          font-size: 1rem;
          font-weight: 700;
          color: #3b82f6;
        }

        .upcoming-card-btn {
          width: 100%;
          padding: 0.5rem;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .upcoming-card-btn:hover {
          transform: scale(1.02);
        }

        .upcoming-empty {
          text-align: center;
          padding: 4rem 2rem;
          grid-column: 1 / -1;
        }

        .upcoming-empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .upcoming-empty h3 {
          font-size: 1.25rem;
          color: ${isDarkMode ? "#f9fafb" : "#111827"};
          margin: 0 0 0.5rem;
        }

        .upcoming-empty p {
          color: ${isDarkMode ? "#9ca3af" : "#6b7280"};
        }

        /* Responsive */
        @media (max-width: 768px) {
          .upcoming-page {
            padding: 1rem;
          }

          .upcoming-title {
            font-size: 1.5rem;
          }

          .upcoming-grid {
            grid-template-columns: 1fr;
          }

          .upcoming-controls {
            flex-direction: column;
            align-items: stretch;
          }

          .upcoming-search {
            max-width: 100%;
          }

          .upcoming-stats {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .upcoming-card-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
