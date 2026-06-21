"use client";

import { useState } from "react";
import useBookDNA from "../hooks/useBookDNA";
import BookSelector from "./BookSelector";
import DNAVisualizer from "./DNAVisualizer";
import DNAStats from "./DNAStats";
import ComparisonView from "./ComparisonView";
import { useLanguage } from "@/contexts/LanguageContext";
import "../bookdnaanalyzer.css";

export default function BookDNAAnalyzer() {
  const { td } = useLanguage();
  const {
    selectedBook,
    compareBook,
    comparisonResult,
    loading,
    error,
    getDNA,
    getAllDNA,
    compareBooks,
    resetComparison,
    selectCompareBook,
    setSelectedBook,
  } = useBookDNA();

  const [showComparison, setShowComparison] = useState(false);

  const allBooks = getAllDNA();
  const availableBooks = allBooks.filter((b) => b.id !== selectedBook?.id);

  const handleSelectBook = (bookId) => {
    if (bookId) {
      const book = getDNA(bookId);
      if (book) {
        setSelectedBook(book);
      }
    } else {
      setSelectedBook(null);
    }
  };

  const handleCompare = () => {
    if (selectedBook && compareBook) {
      const result = compareBooks(selectedBook.id, compareBook.id);
      if (result) {
        setShowComparison(true);
      }
    }
  };

  if (loading) {
    return (
      <div className="dna-loading">
        <div className="loading-spinner"></div>
        <p>{td("loadingDNA") || "Loading DNA data..."}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dna-error">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="book-dna-analyzer">
      <div className="dna-header-main">
        <h1>🧬 Book DNA Analyzer</h1>
        <p>
          {td("dnaDescription") ||
            "Analyze and compare books based on themes, writing style, and more"}
        </p>
      </div>

      <div className="dna-controls">
        <div className="dna-selectors">
          <BookSelector
            books={allBooks}
            onSelect={handleSelectBook}
            selectedId={selectedBook?.id}
            label={td("selectBook") || "Select a book to analyze"}
          />
          {selectedBook && (
            <BookSelector
              books={availableBooks}
              onSelect={(id) => selectCompareBook(id)}
              selectedId={compareBook?.id}
              label={td("compareWith") || "Compare with (optional)"}
            />
          )}
        </div>
        <div className="dna-actions">
          {selectedBook && compareBook && (
            <button className="dna-compare-btn" onClick={handleCompare}>
              🔄 {td("compareBooks") || "Compare Books"}
            </button>
          )}
          {selectedBook && (
            <button
              className="dna-reset-btn"
              onClick={() => {
                setSelectedBook(null);
                resetComparison();
              }}
            >
              {td("reset") || "Reset"}
            </button>
          )}
        </div>
      </div>

      {selectedBook && (
        <div className="dna-results">
          <div className="dna-visualizer-wrapper">
            <DNAVisualizer dnaData={selectedBook} />
          </div>
          <div className="dna-stats-wrapper">
            <DNAStats dnaData={selectedBook} />
          </div>
        </div>
      )}

      {!selectedBook && (
        <div className="dna-welcome">
          <div className="dna-welcome-icon">🧬</div>
          <h3>
            {td("selectBookPrompt") || "Select a book to start analyzing"}
          </h3>
          <p>
            {td("dnaHelp") ||
              "Choose a book from the dropdown above to explore its unique DNA"}
          </p>
        </div>
      )}

      {showComparison && comparisonResult && (
        <ComparisonView
          result={comparisonResult}
          book1={selectedBook}
          book2={compareBook}
          onClose={() => setShowComparison(false)}
        />
      )}
    </div>
  );
}
