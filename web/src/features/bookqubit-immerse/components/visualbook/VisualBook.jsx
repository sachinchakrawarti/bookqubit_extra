// src/features/bookqubit-immerse/components/visualbook/VisualBook.jsx
"use client";

import React, { useState } from "react";
import "./VisualBook.css";

const VisualBook = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Sample visual book data
  const visualBooks = [
    {
      id: 1,
      title: "The Art of Visual Storytelling",
      author: "Jane Smith",
      type: "Interactive",
      pages: 120,
      format: "PDF",
      rating: 4.7,
      cover: "/placeholder-book.jpg",
    },
    {
      id: 2,
      title: "Data Visualization Mastery",
      author: "John Davis",
      type: "Infographic",
      pages: 85,
      format: "EPUB",
      rating: 4.5,
      cover: "/placeholder-book.jpg",
    },
    // Add more visual books...
  ];

  return (
    <div className="visualbook-container">
      <div className="visualbook-header">
        <h2 className="visualbook-title">Visual Books</h2>
        <p className="visualbook-subtitle">Interactive, illustrated, and immersive reading experiences</p>
      </div>

      <div className="visualbook-grid">
        {visualBooks.map((book) => (
          <div key={book.id} className="visualbook-card" onClick={() => setSelectedBook(book)}>
            <div className="visualbook-cover">
              <div className="cover-placeholder"></div>
              <div className="visualbook-type-badge">{book.type}</div>
            </div>
            <div className="visualbook-info">
              <h3 className="visualbook-title">{book.title}</h3>
              <p className="visualbook-author">{book.author}</p>
              <div className="visualbook-meta">
                <span className="meta-item">📄 {book.pages} pages</span>
                <span className="meta-item">•</span>
                <span className="meta-item">{book.format}</span>
                <span className="meta-item">•</span>
                <span className="meta-item">⭐ {book.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisualBook;