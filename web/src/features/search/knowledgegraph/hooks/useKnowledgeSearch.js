"use client";

import { useState, useCallback, useEffect } from "react";
import { searchKnowledge, mockSearchData } from "../data/mockSearchData";

export function useKnowledgeSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({
    books: [],
    authors: [],
    tags: [],
    news: [],
    blogs: [],
  });
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [recentSearches, setRecentSearches] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Perform search
  const performSearch = useCallback(
    (searchQuery) => {
      setLoading(true);
      // Simulate API delay
      setTimeout(() => {
        const searchResults = searchKnowledge(searchQuery);
        setResults(searchResults);
        setLoading(false);

        // Save to recent searches
        if (searchQuery.trim().length > 0) {
          setRecentSearches((prev) => {
            const updated = [searchQuery, ...prev.filter((s) => s !== searchQuery)];
            return updated.slice(0, 10);
          });
        }
      }, 300);
    },
    []
  );

  // Get suggestions as user types
  const getSuggestions = useCallback((searchQuery) => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const term = searchQuery.toLowerCase().trim();
    const allItems = [
      ...mockSearchData.books.map((b) => ({ label: b.title, type: "book" })),
      ...mockSearchData.authors.map((a) => ({ label: a.name, type: "author" })),
      ...mockSearchData.tags.map((t) => ({ label: t.name, type: "tag" })),
    ];

    const matches = allItems
      .filter((item) => item.label.toLowerCase().includes(term))
      .slice(0, 5);

    setSuggestions(matches);
  }, []);

  // Handle search input change
  const handleSearch = useCallback(
    (value) => {
      setQuery(value);
      getSuggestions(value);
      if (value.trim().length >= 2) {
        performSearch(value);
      } else {
        setResults({
          books: [],
          authors: [],
          tags: [],
          news: [],
          blogs: [],
        });
      }
    },
    [performSearch, getSuggestions]
  );

  // Clear search
  const clearSearch = useCallback(() => {
    setQuery("");
    setResults({
      books: [],
      authors: [],
      tags: [],
      news: [],
      blogs: [],
    });
    setSuggestions([]);
  }, []);

  // Filter results by type
  const getFilteredResults = useCallback(() => {
    if (selectedFilter === "all") return results;

    const filtered = {};
    const keys = Object.keys(results);
    keys.forEach((key) => {
      if (key === selectedFilter) {
        filtered[key] = results[key];
      } else {
        filtered[key] = [];
      }
    });
    return filtered;
  }, [results, selectedFilter]);

  // Get total result count
  const getTotalCount = useCallback(() => {
    let total = 0;
    Object.keys(results).forEach((key) => {
      total += results[key].length;
    });
    return total;
  }, [results]);

  return {
    query,
    setQuery: handleSearch,
    results,
    loading,
    selectedFilter,
    setSelectedFilter,
    recentSearches,
    suggestions,
    clearSearch,
    getFilteredResults,
    getTotalCount,
  };
}