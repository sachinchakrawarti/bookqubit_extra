"use client";

import { useState } from "react";
import { FiBook, FiUser, FiStar, FiTrendingUp, FiX } from "react-icons/fi";

export default function BookComparisonTool({ onClose }) {
  const [book1, setBook1] = useState("");
  const [book2, setBook2] = useState("");
  const [comparisonResult, setComparisonResult] = useState(null);

  const mockBooks = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      rating: 4.5,
      pages: 180,
      genre: "Classic",
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      rating: 4.8,
      pages: 328,
      genre: "Dystopian",
    },
    {
      id: 3,
      title: "Dune",
      author: "Frank Herbert",
      rating: 4.7,
      pages: 412,
      genre: "Sci-Fi",
    },
    {
      id: 4,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      rating: 4.9,
      pages: 281,
      genre: "Classic",
    },
    {
      id: 5,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      rating: 4.6,
      pages: 310,
      genre: "Fantasy",
    },
  ];

  const handleCompare = () => {
    const book1Data = mockBooks.find(
      (b) => b.title.toLowerCase() === book1.toLowerCase(),
    );
    const book2Data = mockBooks.find(
      (b) => b.title.toLowerCase() === book2.toLowerCase(),
    );

    if (book1Data && book2Data) {
      setComparisonResult({
        book1: book1Data,
        book2: book2Data,
        similarity: Math.floor(Math.random() * 40 + 60),
        differences: [
          { aspect: "Theme", diff: Math.floor(Math.random() * 30 + 10) },
          {
            aspect: "Writing Style",
            diff: Math.floor(Math.random() * 30 + 10),
          },
          { aspect: "Complexity", diff: Math.floor(Math.random() * 30 + 10) },
          {
            aspect: "Emotional Tone",
            diff: Math.floor(Math.random() * 30 + 10),
          },
        ],
      });
    }
  };

  return (
    <div className="tool-modal">
      <div className="tool-modal-content">
        <div className="tool-modal-header">
          <h2>📊 Book Comparison Tool</h2>
          <button className="modal-close" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="tool-modal-body">
          <div className="comparison-inputs">
            <div className="comparison-input">
              <label>Book 1</label>
              <input
                type="text"
                placeholder="Enter book title..."
                value={book1}
                onChange={(e) => setBook1(e.target.value)}
                list="book-list"
              />
            </div>
            <div className="comparison-vs">VS</div>
            <div className="comparison-input">
              <label>Book 2</label>
              <input
                type="text"
                placeholder="Enter book title..."
                value={book2}
                onChange={(e) => setBook2(e.target.value)}
                list="book-list"
              />
            </div>
            <datalist id="book-list">
              {mockBooks.map((book) => (
                <option key={book.id} value={book.title} />
              ))}
            </datalist>
          </div>

          <button className="compare-btn" onClick={handleCompare}>
            Compare Books
          </button>

          {comparisonResult && (
            <div className="comparison-result">
              <div className="comparison-summary">
                <div className="comparison-book">
                  <h3>{comparisonResult.book1.title}</h3>
                  <p>by {comparisonResult.book1.author}</p>
                  <div className="book-stats">
                    <span>⭐ {comparisonResult.book1.rating}</span>
                    <span>📄 {comparisonResult.book1.pages} pages</span>
                    <span>🏷️ {comparisonResult.book1.genre}</span>
                  </div>
                </div>
                <div className="comparison-similarity">
                  <div className="similarity-circle">
                    <span>{comparisonResult.similarity}%</span>
                    <span className="similarity-label">Similar</span>
                  </div>
                </div>
                <div className="comparison-book">
                  <h3>{comparisonResult.book2.title}</h3>
                  <p>by {comparisonResult.book2.author}</p>
                  <div className="book-stats">
                    <span>⭐ {comparisonResult.book2.rating}</span>
                    <span>📄 {comparisonResult.book2.pages} pages</span>
                    <span>🏷️ {comparisonResult.book2.genre}</span>
                  </div>
                </div>
              </div>

              <div className="comparison-details">
                <h4>Differences Analysis</h4>
                {comparisonResult.differences.map((diff, idx) => (
                  <div key={idx} className="diff-item">
                    <span>{diff.aspect}</span>
                    <div className="diff-bar">
                      <div
                        className="diff-fill"
                        style={{ width: `${diff.diff}%` }}
                      />
                    </div>
                    <span>{diff.diff}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
