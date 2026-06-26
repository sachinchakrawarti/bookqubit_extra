// src/utils/scroller/hooks/useScrollDetection.js

"use client";

import { useState, useEffect } from "react";

export const useScrollDetection = ({
  showAfter = 100,
  isManuallyHidden = false,
  shouldHideOnPage = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (shouldHideOnPage || isManuallyHidden) {
      setIsVisible(false);
      return;
    }

    const checkVisibility = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if at bottom of page
      const atBottom = currentScrollY + windowHeight >= documentHeight - 100;
      setIsAtBottom(atBottom);

      // Show button if scrolled past threshold
      if (currentScrollY > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    // Initial check after a small delay
    const initialCheck = setTimeout(checkVisibility, 100);

    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility, { passive: true });
    
    return () => {
      clearTimeout(initialCheck);
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, [showAfter, shouldHideOnPage, isManuallyHidden]);

  // Force visibility on mobile after scrolling
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (shouldHideOnPage || isManuallyHidden) return;

    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      const timer = setInterval(() => {
        if (window.scrollY > showAfter) {
          setIsVisible(true);
        }
      }, 500);

      return () => clearInterval(timer);
    }
  }, [shouldHideOnPage, isManuallyHidden, showAfter]);

  // Return as object with proper keys
  return {
    isVisible,
    isAtBottom,
    lastScrollY,
  };
};

export default useScrollDetection;