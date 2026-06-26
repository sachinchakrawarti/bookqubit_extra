// src/features/bookqubit-flow/components/common/ErrorState.jsx

"use client";

export default function ErrorState({ error, onRetry, theme }) {
  return (
    <div className="error-container">
      <span className="text-red-500">{error}</span>
      <button
        onClick={onRetry}
        className="text-sky-500 hover:text-sky-600 font-medium"
      >
        Retry
      </button>
    </div>
  );
}
