"use client";

import { useState } from "react";
import { FiX, FiClock, FiBookOpen, FiTrendingUp } from "react-icons/fi";

export default function ReadingSpeedCalculator({ onClose }) {
  const [wordsPerMinute, setWordsPerMinute] = useState(200);
  const [bookPages, setBookPages] = useState(300);
  const [wordsPerPage, setWordsPerPage] = useState(250);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const totalWords = bookPages * wordsPerPage;
    const minutes = totalWords / wordsPerMinute;
    const hours = minutes / 60;
    const days = hours / 24;

    setResult({
      totalWords,
      minutes: Math.round(minutes),
      hours: Math.round(hours * 10) / 10,
      days: Math.round(days * 10) / 10,
      sessions: Math.ceil(minutes / 30),
    });
  };

  return (
    <div className="tool-modal">
      <div className="tool-modal-content">
        <div className="tool-modal-header">
          <h2>⚡ Reading Speed Calculator</h2>
          <button className="modal-close" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="tool-modal-body">
          <div className="speed-calculator">
            <div className="speed-input-group">
              <label>
                <FiBookOpen /> Your Reading Speed (words/min)
              </label>
              <input
                type="range"
                min="100"
                max="600"
                value={wordsPerMinute}
                onChange={(e) => setWordsPerMinute(Number(e.target.value))}
              />
              <span className="speed-value">{wordsPerMinute} wpm</span>
              <div className="speed-markers">
                <span>Slow (100)</span>
                <span>Average (200-250)</span>
                <span>Fast (400+)</span>
              </div>
            </div>

            <div className="speed-input-group">
              <label>📄 Book Pages</label>
              <input
                type="number"
                value={bookPages}
                onChange={(e) => setBookPages(Number(e.target.value))}
                min="50"
                max="2000"
              />
            </div>

            <div className="speed-input-group">
              <label>📝 Words Per Page</label>
              <input
                type="number"
                value={wordsPerPage}
                onChange={(e) => setWordsPerPage(Number(e.target.value))}
                min="100"
                max="500"
              />
            </div>

            <button className="calculate-btn" onClick={calculate}>
              Calculate Reading Time
            </button>

            {result && (
              <div className="speed-result">
                <h4>📊 Reading Time Breakdown</h4>
                <div className="result-grid">
                  <div className="result-item">
                    <span className="result-icon">⏱️</span>
                    <div>
                      <strong>{result.minutes} minutes</strong>
                      <span>Total reading time</span>
                    </div>
                  </div>
                  <div className="result-item">
                    <span className="result-icon">🕐</span>
                    <div>
                      <strong>{result.hours} hours</strong>
                      <span>Approximate hours</span>
                    </div>
                  </div>
                  <div className="result-item">
                    <span className="result-icon">📅</span>
                    <div>
                      <strong>{result.days} days</strong>
                      <span>If reading continuously</span>
                    </div>
                  </div>
                  <div className="result-item">
                    <span className="result-icon">📖</span>
                    <div>
                      <strong>{result.sessions} sessions</strong>
                      <span>30-min reading sessions</span>
                    </div>
                  </div>
                </div>
                <div className="total-words">
                  Total: {result.totalWords.toLocaleString()} words
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
