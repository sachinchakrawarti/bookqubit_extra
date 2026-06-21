"use client";

import { useState, useCallback } from "react";
import { getBookDNA, getAllDNAData, compareDNA } from "../data/mockDNAData";

export default function useBookDNA() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [compareBook, setCompareBook] = useState(null);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get DNA for a book
  const getDNA = useCallback((bookId) => {
    setLoading(true);
    setError(null);
    try {
      const dna = getBookDNA(bookId);
      if (dna) {
        setSelectedBook(dna);
        return dna;
      } else {
        setError("Book DNA not found");
        return null;
      }
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get all DNA data
  const getAllDNA = useCallback(() => {
    return getAllDNAData();
  }, []);

  // Compare two books
  const compareBooks = useCallback((bookId1, bookId2) => {
    setLoading(true);
    setError(null);
    try {
      const result = compareDNA(bookId1, bookId2);
      if (result) {
        setComparisonResult(result);
        return result;
      } else {
        setError("Could not compare books");
        return null;
      }
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Reset comparison
  const resetComparison = useCallback(() => {
    setCompareBook(null);
    setComparisonResult(null);
  }, []);

  // Select book for comparison
  const selectCompareBook = useCallback((bookId) => {
    const book = getBookDNA(bookId);
    if (book) {
      setCompareBook(book);
      return book;
    }
    return null;
  }, []);

  return {
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
  };
}