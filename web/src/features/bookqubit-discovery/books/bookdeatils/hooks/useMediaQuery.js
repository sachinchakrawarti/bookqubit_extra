// src/features/bookqubit-discovery/books/bookdeatils/hooks/useMediaQuery.js

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

/**
 * Custom hook for responsive media queries
 * @param {Object} options - Configuration options
 * @param {string} options.query - CSS media query string
 * @param {boolean} options.defaultState - Default state before hydration (default: false)
 * @param {Function} options.onChange - Callback when query matches changes
 * @param {number} options.debounceDelay - Debounce delay in ms (default: 100)
 * @returns {Object} Media query state and functions
 */
export const useMediaQuery = ({
  query = "(min-width: 768px)",
  defaultState = false,
  onChange = null,
  debounceDelay = 100,
} = {}) => {
  const [matches, setMatches] = useState(defaultState);
  const [isInitialized, setIsInitialized] = useState(false);
  const [mediaQuery, setMediaQuery] = useState(null);
  const [error, setError] = useState(null);

  // Create media query list
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const mq = window.matchMedia(query);
      setMediaQuery(mq);
      setMatches(mq.matches);
      setIsInitialized(true);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to create media query");
      console.error("Media query error:", err);
    }
  }, [query]);

  // Handle media query change
  useEffect(() => {
    if (!mediaQuery) return;

    let timeoutId = null;

    const handleChange = (event) => {
      // Debounce the change
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        const newMatches = event.matches;
        setMatches(newMatches);

        if (onChange) {
          onChange(newMatches);
        }
      }, debounceDelay);
    };

    // Add listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [mediaQuery, onChange, debounceDelay]);

  // Force update
  const forceUpdate = useCallback(() => {
    if (mediaQuery) {
      setMatches(mediaQuery.matches);
    }
  }, [mediaQuery]);

  // Get current query string
  const getQueryString = useCallback(() => {
    return query;
  }, [query]);

  // Check if matches a specific query
  const matchesQuery = useCallback(
    (customQuery) => {
      if (typeof window === "undefined") return false;
      try {
        return window.matchMedia(customQuery).matches;
      } catch {
        return false;
      }
    },
    []
  );

  // Get CSS class based on match
  const getMatchClassName = useCallback(
    (className = "mq-match") => {
      return matches ? className : "";
    },
    [matches]
  );

  // Get opposite match class
  const getOppositeClassName = useCallback(
    (className = "mq-not-match") => {
      return !matches ? className : "";
    },
    [matches]
  );

  return {
    // State
    matches,
    isInitialized,
    error,

    // Functions
    forceUpdate,
    getQueryString,
    matchesQuery,
    getMatchClassName,
    getOppositeClassName,
  };
};

/**
 * Pre-defined media query hooks
 */
export const useIsMobile = (options = {}) => {
  return useMediaQuery({
    query: "(max-width: 767px)",
    ...options,
  });
};

export const useIsTablet = (options = {}) => {
  return useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
    ...options,
  });
};

export const useIsDesktop = (options = {}) => {
  return useMediaQuery({
    query: "(min-width: 1024px)",
    ...options,
  });
};

export const useIsLargeDesktop = (options = {}) => {
  return useMediaQuery({
    query: "(min-width: 1280px)",
    ...options,
  });
};

export const useIsPortrait = (options = {}) => {
  return useMediaQuery({
    query: "(orientation: portrait)",
    ...options,
  });
};

export const useIsLandscape = (options = {}) => {
  return useMediaQuery({
    query: "(orientation: landscape)",
    ...options,
  });
};

export const useIsDarkMode = (options = {}) => {
  return useMediaQuery({
    query: "(prefers-color-scheme: dark)",
    ...options,
  });
};

export const useIsLightMode = (options = {}) => {
  return useMediaQuery({
    query: "(prefers-color-scheme: light)",
    ...options,
  });
};

export const usePrefersReducedMotion = (options = {}) => {
  return useMediaQuery({
    query: "(prefers-reduced-motion: reduce)",
    ...options,
  });
};

export const usePrefersHighContrast = (options = {}) => {
  return useMediaQuery({
    query: "(prefers-contrast: high)",
    ...options,
  });
};

export const useIsTouchDevice = (options = {}) => {
  return useMediaQuery({
    query: "(hover: none) and (pointer: coarse)",
    ...options,
  });
};

export const useHasHover = (options = {}) => {
  return useMediaQuery({
    query: "(hover: hover)",
    ...options,
  });
};

// Combined media query hook
export const useResponsive = (options = {}) => {
  const isMobile = useIsMobile(options);
  const isTablet = useIsTablet(options);
  const isDesktop = useIsDesktop(options);
  const isDarkMode = useIsDarkMode(options);
  const isPortrait = useIsPortrait(options);
  const prefersReducedMotion = usePrefersReducedMotion(options);

  return {
    isMobile: isMobile.matches,
    isTablet: isTablet.matches,
    isDesktop: isDesktop.matches,
    isDarkMode: isDarkMode.matches,
    isPortrait: isPortrait.matches,
    prefersReducedMotion: prefersReducedMotion.matches,
    isInitialized: isMobile.isInitialized,
  };
};

export default useMediaQuery;