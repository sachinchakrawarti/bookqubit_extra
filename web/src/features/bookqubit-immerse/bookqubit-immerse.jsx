// src/features/bookqubit-immerse/bookqubit-immerse.jsx
"use client";

import React, { useState, useEffect } from "react";
import "./bookqubit-immerse.css";

const BookQubitImmerse = () => {
  const [activeTab, setActiveTab] = useState("audiobook");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [speed, setSpeed] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(darkModeMedia.matches);
    const handler = (e) => setIsDarkMode(e.matches);
    darkModeMedia.addEventListener("change", handler);
    return () => darkModeMedia.removeEventListener("change", handler);
  }, []);

  // Format time helper
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`bookqubit-immerse ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      {/* Header Section */}
      <header className="immerse-header">
        <div className="header-container">
          <div className="header-left">
            <h1 className="header-title">BookQubit Immerse</h1>
            <p className="header-subtitle">Audio Books · Visual Books · Explainer Videos · Podcasts</p>
          </div>
          <div className="header-right">
            <button className="header-btn search-btn">
              <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search</span>
            </button>
            <button className="header-btn library-btn">
              <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>Library</span>
            </button>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <nav className="tabs-nav">
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === "audiobook" ? "active" : ""}`}
            onClick={() => setActiveTab("audiobook")}
          >
            <svg className="tab-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728M5.586 8.464a5 5 0 011.414-1.414m2.828 9.9a9 9 0 012.728 2.728" />
            </svg>
            <span>Audio Books</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === "visualbook" ? "active" : ""}`}
            onClick={() => setActiveTab("visualbook")}
          >
            <svg className="tab-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>Visual Books</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === "explainer" ? "active" : ""}`}
            onClick={() => setActiveTab("explainer")}
          >
            <svg className="tab-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Explainer Videos</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === "podcast" ? "active" : ""}`}
            onClick={() => setActiveTab("podcast")}
          >
            <svg className="tab-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <span>Podcasts</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="content-area">
        {/* Featured Section */}
        <section className="featured-section">
          <div className="featured-card">
            <div className="featured-image">
              <div className="featured-placeholder">
                <svg className="featured-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <div className="featured-content">
              <span className="featured-badge">Featured</span>
              <h2 className="featured-title">The Art of Immersion</h2>
              <p className="featured-description">Experience books like never before with our immersive reading platform</p>
              <div className="featured-meta">
                <span className="meta-item">45 min</span>
                <span className="meta-item">•</span>
                <span className="meta-item">4.8 ★</span>
                <span className="meta-item">•</span>
                <span className="meta-item">12 chapters</span>
              </div>
              <button className="featured-btn">
                <svg className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Start Exploring
              </button>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <section className="content-grid-section">
          <div className="section-header">
            <h3 className="section-title">Popular in {activeTab}</h3>
            <button className="view-all-btn">View All →</button>
          </div>

          <div className="content-grid">
            {/* Grid Item 1 */}
            <div className="grid-item">
              <div className="grid-item-image">
                <div className="grid-placeholder"></div>
                <div className="grid-item-overlay">
                  <button className="play-btn">
                    <svg className="play-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="grid-item-content">
                <h4 className="grid-item-title">The Great Gatsby</h4>
                <p className="grid-item-author">F. Scott Fitzgerald</p>
                <div className="grid-item-meta">
                  <span className="meta-rating">4.5 ★</span>
                  <span className="meta-duration">8h 30m</span>
                </div>
              </div>
            </div>

            {/* Grid Item 2 */}
            <div className="grid-item">
              <div className="grid-item-image">
                <div className="grid-placeholder"></div>
                <div className="grid-item-overlay">
                  <button className="play-btn">
                    <svg className="play-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="grid-item-content">
                <h4 className="grid-item-title">1984</h4>
                <p className="grid-item-author">George Orwell</p>
                <div className="grid-item-meta">
                  <span className="meta-rating">4.8 ★</span>
                  <span className="meta-duration">6h 45m</span>
                </div>
              </div>
            </div>

            {/* Grid Item 3 */}
            <div className="grid-item">
              <div className="grid-item-image">
                <div className="grid-placeholder"></div>
                <div className="grid-item-overlay">
                  <button className="play-btn">
                    <svg className="play-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="grid-item-content">
                <h4 className="grid-item-title">Sapiens</h4>
                <p className="grid-item-author">Yuval Noah Harari</p>
                <div className="grid-item-meta">
                  <span className="meta-rating">4.9 ★</span>
                  <span className="meta-duration">15h 20m</span>
                </div>
              </div>
            </div>

            {/* Grid Item 4 */}
            <div className="grid-item">
              <div className="grid-item-image">
                <div className="grid-placeholder"></div>
                <div className="grid-item-overlay">
                  <button className="play-btn">
                    <svg className="play-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="grid-item-content">
                <h4 className="grid-item-title">The Alchemist</h4>
                <p className="grid-item-author">Paulo Coelho</p>
                <div className="grid-item-meta">
                  <span className="meta-rating">4.6 ★</span>
                  <span className="meta-duration">5h 15m</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Player Bar */}
        <div className="player-bar">
          <div className="player-container">
            <div className="player-left">
              <div className="player-cover">
                <div className="player-cover-placeholder"></div>
              </div>
              <div className="player-info">
                <h4 className="player-title">The Great Gatsby</h4>
                <p className="player-author">F. Scott Fitzgerald</p>
              </div>
            </div>

            <div className="player-center">
              <div className="player-controls">
                <button className="control-btn shuffle-btn">
                  <svg className="control-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </button>
                <button className="control-btn prev-btn">
                  <svg className="control-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                </button>
                <button className="control-btn play-btn-main" onClick={() => setIsPlaying(!isPlaying)}>
                  <svg className="control-icon-large" fill="currentColor" viewBox="0 0 24 24">
                    {isPlaying ? (
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    ) : (
                      <path d="M8 5v14l11-7z" />
                    )}
                  </svg>
                </button>
                <button className="control-btn next-btn">
                  <svg className="control-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </button>
                <button className="control-btn repeat-btn">
                  <svg className="control-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>

              <div className="player-progress">
                <span className="progress-time current">{formatTime(currentTime)}</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
                </div>
                <span className="progress-time total">{formatTime(duration)}</span>
              </div>
            </div>

            <div className="player-right">
              <button className="volume-btn">
                <svg className="control-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728M5.586 8.464a5 5 0 011.414-1.414m2.828 9.9a9 9 0 012.728 2.728" />
                </svg>
              </button>
              <div className="volume-control">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="volume-slider"
                />
              </div>
              <button className="speed-btn">
                <span className="speed-text">{speed}x</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookQubitImmerse;