"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRTL } from "@/contexts/RTLContext";
import { useFont } from "@/contexts/FontContext";
import {
  FiArrowLeft,
  FiHeart,
  FiBookmark,
  FiShare2,
  FiUsers,
  FiBookOpen,
  FiEye,
  FiCalendar,
  FiUser,
  FiTag,
  FiMoreHorizontal,
  FiEdit2,
  FiTrash2,
  FiFlag,
  FiGrid,
} from "react-icons/fi";
import LibraryActions from "./LibraryActions";
import { getLibraryById, getLibraryBySlug } from "../data/mockLibraries";
import "../collectivelibrary.css";
import "./LibraryDetail.css";

export default function LibraryDetail({ libraryId, slug, onClose }) {
  const router = useRouter();
  const { theme, themeName } = useTheme();
  const { td } = useLanguage();
  const { direction } = useRTL();
  const { currentFont } = useFont();
  const [library, setLibrary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("books");
  const [showActions, setShowActions] = useState(false);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  useEffect(() => {
    let data = null;

    if (slug) {
      // If slug is provided, use it
      data = getLibraryBySlug(slug);
      console.log("Loading library by slug:", slug, data);
    } else if (libraryId) {
      // Fallback to ID
      data = getLibraryById(libraryId);
      console.log("Loading library by ID:", libraryId, data);
    }

    if (data) {
      setLibrary(data);
    }
    setLoading(false);
  }, [libraryId, slug]);

  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      router.push("/collective");
    }
  };

  const handleUpdate = (updatedStats) => {
    if (library) {
      setLibrary({
        ...library,
        stats: { ...library.stats, ...updatedStats },
      });
    }
  };

  if (loading) {
    return (
      <div className="ld-loading">
        <div className="ld-loading-spinner"></div>
        <p>Loading library...</p>
      </div>
    );
  }

  if (!library) {
    return (
      <div className="ld-not-found">
        <div className="ld-not-found-icon">📚</div>
        <h2>Library not found</h2>
        <p>The library you're looking for doesn't exist.</p>
        <Link href="/collective" className="ld-back-btn">
          <FiArrowLeft /> Back to Collective Library
        </Link>
      </div>
    );
  }

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div
      dir={direction}
      style={{ fontFamily: currentFont?.family }}
      className={`library-detail ${isDarkMode ? "dark" : ""}`}
    >
      {/* Back Button */}
      <div className="ld-back">
        <button onClick={handleBack} className="ld-back-btn">
          <FiArrowLeft /> Back to Collective Library
        </button>
      </div>

      {/* Cover Section */}
      <div className="ld-cover-section">
        <div className="ld-cover">
          <img src={library.cover} alt={library.name} />
          <div className="ld-cover-overlay">
            <span className="ld-cover-category">{library.category}</span>
            {library.isFeatured && (
              <span className="ld-cover-featured">⭐ Featured</span>
            )}
          </div>
        </div>
        <div className="ld-info">
          <h1 className="ld-title">{library.name}</h1>
          <p className="ld-description">{library.description}</p>
          <div className="ld-meta">
            <div className="ld-meta-item">
              <FiUser />
              <span>by {library.owner.name}</span>
            </div>
            <div className="ld-meta-item">
              <FiCalendar />
              <span>Created {formatDate(library.createdAt)}</span>
            </div>
            <div className="ld-meta-item">
              <FiTag />
              <span>{library.category}</span>
            </div>
            <div className="ld-meta-item">
              <FiGrid />
              <span>Shelf: {library.shelf || "General"}</span>
            </div>
          </div>
          <div className="ld-tags">
            {library.tags.map((tag, idx) => (
              <span key={idx} className="ld-tag">
                #{tag}
              </span>
            ))}
          </div>
          <div className="ld-owner">
            <img src={library.owner.avatar} alt={library.owner.name} />
            <div>
              <span className="ld-owner-name">{library.owner.name}</span>
              <span className="ld-owner-username">
                @{library.owner.username}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="ld-stats">
        <div className="ld-stat-item">
          <FiBookOpen className="ld-stat-icon" />
          <div>
            <span className="ld-stat-value">{library.books.length}</span>
            <span className="ld-stat-label">Books</span>
          </div>
        </div>
        <div className="ld-stat-item">
          <FiUsers className="ld-stat-icon" />
          <div>
            <span className="ld-stat-value">{library.stats.members}</span>
            <span className="ld-stat-label">Members</span>
          </div>
        </div>
        <div className="ld-stat-item">
          <FiHeart className="ld-stat-icon" />
          <div>
            <span className="ld-stat-value">{library.stats.likes}</span>
            <span className="ld-stat-label">Likes</span>
          </div>
        </div>
        <div className="ld-stat-item">
          <FiEye className="ld-stat-icon" />
          <div>
            <span className="ld-stat-value">{library.stats.views}</span>
            <span className="ld-stat-label">Views</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <LibraryActions library={library} onUpdate={handleUpdate} />

      {/* Tabs */}
      <div className="ld-tabs">
        <button
          className={`ld-tab ${activeTab === "books" ? "active" : ""}`}
          onClick={() => setActiveTab("books")}
        >
          <FiBookOpen /> Books ({library.books.length})
        </button>
        <button
          className={`ld-tab ${activeTab === "about" ? "active" : ""}`}
          onClick={() => setActiveTab("about")}
        >
          <FiUser /> About
        </button>
        <button
          className={`ld-tab ${activeTab === "members" ? "active" : ""}`}
          onClick={() => setActiveTab("members")}
        >
          <FiUsers /> Members
        </button>
      </div>

      {/* Tab Content */}
      <div className="ld-tab-content">
        {activeTab === "books" && (
          <div className="ld-books">
            {library.books.map((book) => (
              <Link
                key={book.id}
                href={`/books/${book.id}`}
                className="ld-book-item"
              >
                <img src={book.cover} alt={book.title} />
                <div>
                  <h4 className="ld-book-title">{book.title}</h4>
                  <p className="ld-book-author">{book.author}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeTab === "about" && (
          <div className="ld-about">
            <div className="ld-about-section">
              <h3>About this Library</h3>
              <p>{library.description}</p>
            </div>
            <div className="ld-about-section">
              <h4>Library Details</h4>
              <div className="ld-about-grid">
                <div className="ld-about-item">
                  <span>Slug</span>
                  <strong>{library.slug}</strong>
                </div>
                <div className="ld-about-item">
                  <span>Shelf</span>
                  <strong>{library.shelf || "General"}</strong>
                </div>
                <div className="ld-about-item">
                  <span>Created</span>
                  <strong>{formatDate(library.createdAt)}</strong>
                </div>
                <div className="ld-about-item">
                  <span>Category</span>
                  <strong>{library.category}</strong>
                </div>
                <div className="ld-about-item">
                  <span>Visibility</span>
                  <strong>{library.isPublic ? "Public" : "Private"}</strong>
                </div>
                <div className="ld-about-item">
                  <span>Books</span>
                  <strong>{library.books.length}</strong>
                </div>
                <div className="ld-about-item">
                  <span>Members</span>
                  <strong>{library.stats.members}</strong>
                </div>
                <div className="ld-about-item">
                  <span>Total Views</span>
                  <strong>{library.stats.views}</strong>
                </div>
              </div>
            </div>
            <div className="ld-about-section">
              <h4>Tags</h4>
              <div className="ld-about-tags">
                {library.tags.map((tag, idx) => (
                  <span key={idx} className="ld-about-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="ld-about-section">
              <h4>Created by</h4>
              <div className="ld-about-owner">
                <img src={library.owner.avatar} alt={library.owner.name} />
                <div>
                  <strong>{library.owner.name}</strong>
                  <span>@{library.owner.username}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "members" && (
          <div className="ld-members">
            <div className="ld-members-list">
              {/* Owner */}
              <div className="ld-member-item owner">
                <img src={library.owner.avatar} alt={library.owner.name} />
                <div>
                  <strong>{library.owner.name}</strong>
                  <span>@{library.owner.username}</span>
                  <span className="ld-member-role">Creator</span>
                </div>
              </div>
              {/* Sample Members */}
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="ld-member-item">
                  <img
                    src={`https://ui-avatars.com/api/?name=Member+${i}&background=3b82f6&color=fff`}
                    alt={`Member ${i}`}
                  />
                  <div>
                    <strong>Member {i}</strong>
                    <span>@member_{i}</span>
                    <span className="ld-member-role">Member</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
