"use client";

import { useState } from "react";
import { FiX, FiPlus, FiTrash2, FiTrendingUp } from "react-icons/fi";

export default function BookProgressTracker({ onClose }) {
  const [books, setBooks] = useState([
    { id: 1, title: "The Great Gatsby", totalPages: 180, readPages: 120 },
    { id: 2, title: "1984", totalPages: 328, readPages: 200 },
  ]);
  const [newBook, setNewBook] = useState({ title: "", totalPages: 0 });

  const addBook = () => {
    if (newBook.title && newBook.totalPages > 0) {
      setBooks([...books, { ...newBook, id: Date.now(), readPages: 0 }]);
      setNewBook({ title: "", totalPages: 0 });
    }
  };

  const updateProgress = (id, readPages) => {
    setBooks(
      books.map((book) =>
        book.id === id
          ? { ...book, readPages: Math.min(readPages, book.totalPages) }
          : book,
      ),
    );
  };

  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const getProgress = (readPages, totalPages) => {
    return Math.round((readPages / totalPages) * 100);
  };

  return (
    <div className="tool-modal">
      <div className="tool-modal-content">
        <div className="tool-modal-header">
          <h2>📈 Book Progress Tracker</h2>
          <button className="modal-close" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="tool-modal-body">
          <div className="progress-tracker">
            <div className="add-book-form">
              <input
                type="text"
                placeholder="Book title..."
                value={newBook.title}
                onChange={(e) =>
                  setNewBook({ ...newBook, title: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Total pages..."
                value={newBook.totalPages || ""}
                onChange={(e) =>
                  setNewBook({ ...newBook, totalPages: Number(e.target.value) })
                }
              />
              <button className="add-book-btn" onClick={addBook}>
                <FiPlus /> Add Book
              </button>
            </div>

            <div className="books-list">
              {books.map((book) => {
                const progress = getProgress(book.readPages, book.totalPages);
                return (
                  <div key={book.id} className="book-progress-item">
                    <div className="book-progress-header">
                      <h4>{book.title}</h4>
                      <button
                        className="delete-btn"
                        onClick={() => deleteBook(book.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                    <div className="book-progress-info">
                      <span>
                        {book.readPages} / {book.totalPages} pages
                      </span>
                      <span>{progress}%</span>
                    </div>
                    <div className="book-progress-bar">
                      <div
                        className="book-progress-fill"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="book-progress-input">
                      <input
                        type="range"
                        min="0"
                        max={book.totalPages}
                        value={book.readPages}
                        onChange={(e) =>
                          updateProgress(book.id, Number(e.target.value))
                        }
                      />
                      <span>{book.readPages}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {books.length > 0 && (
              <div className="progress-summary">
                <FiTrendingUp />
                <span>
                  Average Progress:{" "}
                  {Math.round(
                    books.reduce(
                      (acc, b) => acc + getProgress(b.readPages, b.totalPages),
                      0,
                    ) / books.length,
                  )}
                  %
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
