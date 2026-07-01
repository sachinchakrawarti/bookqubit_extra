// src/features/bookqubit-immerse/components/audiobook/hooks/useAudioBookData.js
"use client";

import { useState, useEffect, useCallback } from "react";

const useAudioBookData = () => {
  const [audiobooks, setAudiobooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  // Sample audiobook data
  const sampleData = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      narrator: "Jake Gyllenhaal",
      duration: "8h 30m",
      durationSeconds: 30600,
      rating: 4.5,
      chapters: 12,
      category: "Classic",
      cover: "/placeholder-book.jpg",
      audioUrl: "/audio/great-gatsby.mp3",
      description: "A story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
      publishYear: 1925,
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      narrator: "Simon Prebble",
      duration: "6h 45m",
      durationSeconds: 24300,
      rating: 4.8,
      chapters: 10,
      category: "Dystopian",
      cover: "/placeholder-book.jpg",
      audioUrl: "/audio/1984.mp3",
      description: "A dystopian social science fiction novel and cautionary tale.",
      publishYear: 1949,
    },
    {
      id: 3,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      narrator: "Derek Perkins",
      duration: "15h 20m",
      durationSeconds: 55200,
      rating: 4.9,
      chapters: 20,
      category: "Non-fiction",
      cover: "/placeholder-book.jpg",
      audioUrl: "/audio/sapiens.mp3",
      description: "A brief history of humankind, from the Stone Age to the 21st century.",
      publishYear: 2011,
    },
    {
      id: 4,
      title: "The Alchemist",
      author: "Paulo Coelho",
      narrator: "Jeremy Irons",
      duration: "5h 15m",
      durationSeconds: 18900,
      rating: 4.6,
      chapters: 8,
      category: "Fiction",
      cover: "/placeholder-book.jpg",
      audioUrl: "/audio/alchemist.mp3",
      description: "A philosophical story about a young shepherd on a journey to find his personal legend.",
      publishYear: 1988,
    },
    {
      id: 5,
      title: "Dune",
      author: "Frank Herbert",
      narrator: "Scott Brick",
      duration: "21h 10m",
      durationSeconds: 76200,
      rating: 4.7,
      chapters: 25,
      category: "Science Fiction",
      cover: "/placeholder-book.jpg",
      audioUrl: "/audio/dune.mp3",
      description: "Set in the distant future, a young man fights to save the desert planet Arrakis.",
      publishYear: 1965,
    },
  ];

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setAudiobooks(sampleData);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Get chapters for a book
  const getChapters = useCallback((bookId) => {
    const book = audiobooks.find(b => b.id === bookId);
    if (!book) return [];
    return Array.from({ length: book.chapters }, (_, i) => 
      `Chapter ${i + 1}`
    );
  }, [audiobooks]);

  // Get book by ID
  const getBookById = useCallback((bookId) => {
    return audiobooks.find(b => b.id === bookId);
  }, [audiobooks]);

  // Get unique categories
  const categories = ["All", ...new Set(audiobooks.map(book => book.category))];

  // Recently played
  const addToRecentlyPlayed = useCallback((book) => {
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(b => b.id !== book.id);
      return [book, ...filtered].slice(0, 5);
    });
  }, []);

  const getRecentlyPlayed = useCallback(() => {
    return recentlyPlayed;
  }, [recentlyPlayed]);

  return {
    audiobooks,
    loading,
    error,
    categories,
    getChapters,
    getBookById,
    getRecentlyPlayed,
    addToRecentlyPlayed,
    recentlyPlayed,
  };
};

export default useAudioBookData;