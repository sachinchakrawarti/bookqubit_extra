"use client";

import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BookSelector({ books, onSelect, selectedId, label }) {
  const { td } = useLanguage();
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()),
  );

  const selectedBook = books.find((b) => b.id === selectedId);

  return (
    <div className="book-selector">
      <label className="book-selector-label">
        {label || td("selectBook") || "Select a book"}
      </label>
      <div className="book-selector-input" onClick={() => setIsOpen(!isOpen)}>
        {selectedBook ? (
          <div className="book-selector-selected">
            <span>{selectedBook.title}</span>
            <span className="book-selector-author">{selectedBook.author}</span>
          </div>
        ) : (
          <span className="book-selector-placeholder">
            {td("chooseBook") || "Choose a book..."}
          </span>
        )}
        <button
          className="book-selector-clear"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(null);
          }}
        >
          <FiX />
        </button>
      </div>

      {isOpen && (
        <div className="book-selector-dropdown">
          <div className="book-selector-search">
            <FiSearch />
            <input
              type="text"
              placeholder={td("searchBooks") || "Search books..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="book-selector-list">
            {filteredBooks.length === 0 ? (
              <div className="book-selector-empty">
                {td("noBooksFound") || "No books found"}
              </div>
            ) : (
              filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className={`book-selector-item ${selectedId === book.id ? "selected" : ""}`}
                  onClick={() => {
                    onSelect(book.id);
                    setIsOpen(false);
                    setSearch("");
                  }}
                >
                  <img src={book.cover} alt={book.title} />
                  <div>
                    <span className="book-selector-item-title">
                      {book.title}
                    </span>
                    <span className="book-selector-item-author">
                      {book.author}
                    </span>
                  </div>
                  {selectedId === book.id && (
                    <span className="book-selector-check">✓</span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
