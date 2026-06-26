// src/features/bookqubit-flow/components/hooks/useInfiniteFeed.js

import { useState, useEffect, useRef, useCallback } from "react";
import { generateFeedItems } from "../utils/feedData";

export const useInfiniteFeed = (itemsPerPage = 10) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const observerRef = useRef(null);
  const loaderRef = useRef(null);

  // Load more items
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      const newItems = generateFeedItems(page, itemsPerPage);

      if (newItems.length === 0 || page >= 8) {
        setHasMore(false);
      } else {
        setItems((prev) => [...prev, ...newItems]);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      setError(err.message || "Failed to load feed");
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, itemsPerPage]);

  // Handle like
  const handleLike = useCallback((itemId, isLiked) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              isLiked,
              likes: isLiked ? item.likes + 1 : item.likes - 1,
            }
          : item
      )
    );
  }, []);

  // Handle share
  const handleShare = useCallback((itemId) => {
    const item = items.find((i) => i.id === itemId);
    if (item) {
      if (navigator.share) {
        navigator
          .share({
            title: item.title || "Check this out!",
            text: item.text || item.description || "Check out this post!",
            url: window.location.href,
          })
          .catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href).catch(() => {});
        alert("Link copied to clipboard!");
      }
    }
  }, [items]);

  // Refresh feed
  const refresh = useCallback(() => {
    setItems([]);
    setPage(0);
    setHasMore(true);
    setError(null);
    setTimeout(() => loadMore(), 100);
  }, [loadMore]);

  // Setup intersection observer
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && hasMore) {
        loadMore();
      }
    }, options);

    const loaderElement = document.getElementById("feed-loader");
    if (loaderElement) {
      observer.observe(loaderElement);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loading, hasMore, loadMore]);

  // Initial load
  useEffect(() => {
    loadMore();
  }, []);

  return {
    items,
    loading,
    hasMore,
    error,
    loadMore,
    handleLike,
    handleShare,
    refresh,
    loaderRef,
  };
};