// src/features/bookqubit-immerse/components/audiobook/components/NowPlayingBanner.jsx
"use client";

import React from "react";
import "./NowPlayingBanner.css";

const NowPlayingBanner = ({
  book,
  isPlaying,
  progress,
  duration,
  currentTime,
  onTogglePlay,
  onClose,
  onShowChapters,
}) => {
  return (
    <div className="now-playing-banner">
      <div className="now-playing-content">
        {/* Cover */}
        <div className="now-playing-cover">
          <div className="cover-placeholder-small"></div>
        </div>

        {/* Info */}
        <div className="now-playing-info">
          <span className="now-playing-label">
            <span className="pulse-dot"></span>
            Now Playing
          </span>
          <h4 className="now-playing-title">{book?.title || "Unknown Title"}</h4>
          <p className="now-playing-author">{book?.author || "Unknown Author"}</p>
        </div>

        {/* Progress */}
        <div className="now-playing-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${Math.min(progress || 0, 100)}%` }}
            ></div>
          </div>
          <span className="progress-text">
            {currentTime || "0:00"} / {duration || "0:00"}
          </span>
        </div>

        {/* Actions */}
        <div className="now-playing-actions">
          <button 
            className="now-playing-btn chapters-btn"
            onClick={(e) => {
              e.stopPropagation();
              if (onShowChapters) onShowChapters();
            }}
            title="View Chapters"
            aria-label="View chapters"
          >
            <svg className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>

          <button 
            className="now-playing-btn play-btn-mini"
            onClick={(e) => {
              e.stopPropagation();
              if (onTogglePlay) onTogglePlay();
            }}
            title={isPlaying ? "Pause" : "Play"}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <svg className="btn-icon" fill="currentColor" viewBox="0 0 24 24">
              {isPlaying ? (
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              ) : (
                <path d="M8 5v14l11-7z" />
              )}
            </svg>
          </button>

          <button 
            className="now-playing-btn close-btn"
            onClick={(e) => {
              e.stopPropagation();
              if (onClose) onClose();
            }}
            title="Close"
            aria-label="Close player"
          >
            <svg className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NowPlayingBanner;