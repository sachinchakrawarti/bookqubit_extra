// src/features/bookqubit-flow/components/common/LoadingState.jsx

"use client";

export default function LoadingState({ theme }) {
  return (
    <div className="loading-container">
      <div className="loading-spinner" />
      <span
        className={`
          text-sm
          ${theme.textColors?.secondary || "text-gray-600 dark:text-gray-400"}
        `}
      >
        Loading more...
      </span>
    </div>
  );
}
