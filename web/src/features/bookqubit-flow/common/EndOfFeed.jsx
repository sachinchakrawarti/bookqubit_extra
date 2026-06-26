// src/features/bookqubit-flow/components/common/EndOfFeed.jsx

"use client";

export default function EndOfFeed({ theme }) {
  return (
    <div
      className={`
        text-center py-8
        ${theme.textColors?.secondary || "text-gray-500 dark:text-gray-400"}
      `}
    >
      <p className="text-sm">🎉 You've reached the end of the feed!</p>
    </div>
  );
}
