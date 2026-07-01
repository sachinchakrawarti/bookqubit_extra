// src/features/bookqubit-immerse/components/podcast/Podcast.jsx
"use client";

import React, { useState } from "react";
import "./Podcast.css";

const Podcast = () => {
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  // Sample podcast data
  const podcasts = [
    {
      id: 1,
      title: "Book Talk Weekly",
      host: "Sarah Johnson",
      episodes: 45,
      description: "Weekly discussions about the latest books and literary trends",
      rating: 4.8,
      category: "Literature",
      cover: "/placeholder-podcast.jpg",
    },
    {
      id: 2,
      title: "The Author's Corner",
      host: "Michael Roberts",
      episodes: 32,
      description: "In-depth interviews with bestselling authors",
      rating: 4.6,
      category: "Interviews",
      cover: "/placeholder-podcast.jpg",
    },
    // Add more podcasts...
  ];

  return (
    <div className="podcast-container">
      <div className="podcast-grid">
        {podcasts.map((podcast) => (
          <div key={podcast.id} className="podcast-card" onClick={() => setSelectedEpisode(podcast)}>
            <div className="podcast-cover">
              <div className="cover-placeholder"></div>
              <div className="podcast-play-overlay">
                <button className="podcast-play-btn">
                  <svg className="play-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="podcast-info">
              <h3 className="podcast-title">{podcast.title}</h3>
              <p className="podcast-host">with {podcast.host}</p>
              <p className="podcast-description">{podcast.description}</p>
              <div className="podcast-meta">
                <span className="meta-item">🎙️ {podcast.episodes} episodes</span>
                <span className="meta-item">•</span>
                <span className="meta-item">⭐ {podcast.rating}</span>
                <span className="meta-item">•</span>
                <span className="meta-item">{podcast.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Podcast;