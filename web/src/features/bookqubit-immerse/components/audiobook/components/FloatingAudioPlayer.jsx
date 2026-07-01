// src/features/bookqubit-immerse/components/audiobook/components/FloatingAudioPlayer.jsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import "./FloatingAudioPlayer.css";

const FloatingAudioPlayer = ({
  audioSrc,
  bookTitle,
  bookAuthor,
  bookCover,
  chapters = [],
  currentChapter = 0,
  isPlaying = false,
  currentTime = 0,
  duration = 0,
  volume = 80,
  speed = 1,
  isMuted = false,
  onTogglePlay,
  onSeek,
  onVolumeChange,
  onSpeedChange,
  onToggleMute,
  onNext,
  onPrevious,
  onClose,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const progressRef = useRef(null);

  // Format time helper
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Speed options
  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  // Handle seek
  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const seekTime = x * duration;
    if (onSeek) onSeek(seekTime);
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    if (onVolumeChange) onVolumeChange(newVolume);
  };

  // Handle speed change
  const handleSpeedChange = (newSpeed) => {
    if (onSpeedChange) onSpeedChange(newSpeed);
    setShowSpeedMenu(false);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === "INPUT") return;
      
      switch (e.code) {
        case "Space":
          e.preventDefault();
          if (onTogglePlay) onTogglePlay();
          break;
        case "ArrowRight":
          e.preventDefault();
          if (onSeek && duration) {
            onSeek(Math.min(currentTime + 10, duration));
          }
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (onSeek) {
            onSeek(Math.max(currentTime - 10, 0));
          }
          break;
        case "KeyM":
          if (onToggleMute) onToggleMute();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [currentTime, duration, onSeek, onTogglePlay, onToggleMute]);

  return (
    <>
      {/* Audio Element - External audio is handled by parent */}
      
      {/* Floating Player */}
      <div className={`floating-player ${isExpanded ? "expanded" : ""} ${isMinimized ? "minimized" : ""}`}>
        {!isMinimized ? (
          <>
            {/* Player Header */}
            <div className="player-header">
              <div className="player-header-left">
                <div className="player-cover">
                  {bookCover ? (
                    <img src={bookCover} alt={bookTitle} className="player-cover-image" />
                  ) : (
                    <div className="player-cover-placeholder">
                      <svg className="cover-icon" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="player-info">
                  <h4 className="player-title">{bookTitle || "Audio Book"}</h4>
                  <p className="player-author">{bookAuthor || "Unknown Author"}</p>
                  {chapters.length > 0 && (
                    <div className="player-chapter">
                      {chapters[currentChapter] || `Chapter ${currentChapter + 1}`}
                    </div>
                  )}
                </div>
              </div>
              <div className="player-header-right">
                <button 
                  className="player-btn minimize-btn"
                  onClick={() => setIsMinimized(true)}
                  title="Minimize"
                >
                  <svg className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button 
                  className="player-btn expand-btn"
                  onClick={() => setIsExpanded(!isExpanded)}
                  title={isExpanded ? "Collapse" : "Expand"}
                >
                  <svg className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isExpanded ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                    )}
                  </svg>
                </button>
                <button 
                  className="player-btn close-btn"
                  onClick={onClose}
                  title="Close"
                >
                  <svg className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Player Content */}
            <div className="player-content">
              {/* Progress */}
              <div className="player-progress">
                <span className="progress-time">{formatTime(currentTime)}</span>
                <div 
                  ref={progressRef}
                  className="progress-bar"
                  onClick={handleSeek}
                  onMouseDown={() => setIsDragging(true)}
                  onMouseUp={() => setIsDragging(false)}
                  onMouseLeave={() => setIsDragging(false)}
                >
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                  <div 
                    className="progress-thumb"
                    style={{ left: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
                <span className="progress-time">{formatTime(duration)}</span>
              </div>

              {/* Controls */}
              <div className="player-controls">
                <button 
                  className="control-btn speed-btn"
                  onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  title="Playback Speed"
                >
                  <span className="speed-text">{speed}x</span>
                </button>

                <button 
                  className="control-btn prev-btn"
                  onClick={onPrevious}
                  title="Previous Chapter"
                >
                  <svg className="control-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                </button>

                <button 
                  className="control-btn play-btn-main"
                  onClick={onTogglePlay}
                  title={isPlaying ? "Pause" : "Play"}
                >
                  <svg className="control-icon-large" fill="currentColor" viewBox="0 0 24 24">
                    {isPlaying ? (
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    ) : (
                      <path d="M8 5v14l11-7z" />
                    )}
                  </svg>
                </button>

                <button 
                  className="control-btn next-btn"
                  onClick={onNext}
                  title="Next Chapter"
                >
                  <svg className="control-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </button>

                <button 
                  className="control-btn volume-btn"
                  onClick={onToggleMute}
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  <svg className="control-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isMuted || volume === 0 ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728M5.586 8.464a5 5 0 011.414-1.414m2.828 9.9a9 9 0 012.728 2.728" />
                    )}
                  </svg>
                </button>

                <div className="volume-slider-container">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="volume-slider"
                    style={{
                      background: `linear-gradient(to right, #3b82f6 ${volume}%, #e2e8f0 ${volume}%)`
                    }}
                  />
                </div>
              </div>

              {/* Speed Menu */}
              {showSpeedMenu && (
                <div className="speed-menu">
                  {speedOptions.map((option) => (
                    <button
                      key={option}
                      className={`speed-option ${speed === option ? "active" : ""}`}
                      onClick={() => handleSpeedChange(option)}
                    >
                      {option}x
                      {speed === option && (
                        <svg className="check-icon" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          // Minimized View
          <div className="minimized-player" onClick={() => setIsMinimized(false)}>
            <div className="minimized-cover">
              {bookCover ? (
                <img src={bookCover} alt={bookTitle} className="minimized-cover-image" />
              ) : (
                <div className="minimized-cover-placeholder">
                  <svg className="minimized-cover-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              )}
            </div>
            <div className="minimized-info">
              <div className="minimized-title">{bookTitle || "Audio Book"}</div>
              <div className="minimized-author">{bookAuthor || "Unknown Author"}</div>
            </div>
            <button 
              className="minimized-play-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (onTogglePlay) onTogglePlay();
              }}
            >
              <svg className="minimized-play-icon" fill="currentColor" viewBox="0 0 24 24">
                {isPlaying ? (
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                ) : (
                  <path d="M8 5v14l11-7z" />
                )}
              </svg>
            </button>
            <button 
              className="minimized-expand-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(false);
              }}
            >
              <svg className="minimized-expand-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default FloatingAudioPlayer;