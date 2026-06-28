"use client";

import React, { Suspense } from "react";
import { usePathname } from "next/navigation";

// Import BottonInLine Desktop
const BottonInLine_Desktop = React.lazy(
  () =>
    import("@/features/book/bookdeatils/components/desktop/BottonInLine_Desktop"),
);

const FloatingActionBarFallback = () => (
  <div className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-50">
    <div className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg">
      <div className="w-5 h-5 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  </div>
);

const FloatingActionBar = ({ book }) => {
  const pathname = usePathname();

  // Only show on book detail pages or book list pages
  const isBookPage =
    pathname?.includes("/books/") || pathname?.includes("/books");

  if (!book?.id || !isBookPage) {
    return null;
  }

  // BottonInLine handlers
  const handleLike = (liked) => {
    console.log(`${liked ? "Liked" : "Unliked"}:`, book?.title);
  };

  const handleAddToLibrary = (shelf) => {
    console.log(`Added to library shelf "${shelf}":`, book?.title);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: book?.title || "Book",
          text: `Check out "${book?.title}" by ${book?.author}`,
          url: window.location.href,
        })
        .catch((err) => console.log("Error sharing:", err));
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert("Link copied to clipboard!"))
        .catch((err) => console.log("Error copying to clipboard:", err));
    }
  };

  const handleReport = () => {
    console.log("Report book:", book?.title);
  };

  const handleAskAI = () => {
    console.log("Ask AI about:", book?.title);
  };

  return (
    <Suspense fallback={<FloatingActionBarFallback />}>
      <div className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-50">
        <BottonInLine_Desktop
          bookId={book.id}
          bookName={book.title || "Book"}
          authorName={book.author || "Unknown Author"}
          launchYear={book.publicationYear || book.year || "N/A"}
          initialLiked={book.userLiked || false}
          initialInLibrary={book.userInLibrary || false}
          onLike={handleLike}
          onAddToLibrary={handleAddToLibrary}
          onShare={handleShare}
          onReport={handleReport}
          onAskAI={handleAskAI}
        />
      </div>
    </Suspense>
  );
};

export default FloatingActionBar;
