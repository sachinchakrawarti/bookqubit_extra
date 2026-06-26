// src/utils/scroller/helpers/scrollHelpers.js

/**
 * Scroll helper utilities for ScrollToTop component
 */

export const scrollHelpers = {
  /**
   * Scroll to top of page
   * @param {string} behavior - 'smooth' or 'auto'
   */
  scrollToTop: (behavior = 'smooth') => {
    if (typeof window === 'undefined') return;
    
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: behavior,
    });
  },

  /**
   * Scroll to specific position
   * @param {number} y - Y position to scroll to
   * @param {string} behavior - 'smooth' or 'auto'
   */
  scrollTo: (y, behavior = 'smooth') => {
    if (typeof window === 'undefined') return;
    
    window.scrollTo({
      top: y,
      left: 0,
      behavior: behavior,
    });
  },

  /**
   * Scroll to element by ID
   * @param {string} elementId - ID of element to scroll to
   * @param {string} behavior - 'smooth' or 'auto'
   */
  scrollToElement: (elementId, behavior = 'smooth') => {
    if (typeof document === 'undefined') return;
    
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: behavior,
        block: 'start',
      });
    }
  },

  /**
   * Scroll to element with offset
   * @param {string} elementId - ID of element to scroll to
   * @param {number} offset - Offset from top in pixels
   * @param {string} behavior - 'smooth' or 'auto'
   */
  scrollToElementWithOffset: (elementId, offset = 0, behavior = 'smooth') => {
    if (typeof document === 'undefined') return;
    
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: behavior,
      });
    }
  },

  /**
   * Check if at bottom of page
   * @param {number} threshold - Threshold in pixels
   * @returns {boolean}
   */
  isAtBottom: (threshold = 100) => {
    if (typeof window === 'undefined') return false;
    
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    return scrollY + windowHeight >= documentHeight - threshold;
  },

  /**
   * Check if at top of page
   * @returns {boolean}
   */
  isAtTop: () => {
    if (typeof window === 'undefined') return true;
    return window.scrollY <= 0;
  },

  /**
   * Get current scroll position
   * @returns {number} Current scroll Y position
   */
  getScrollPosition: () => {
    if (typeof window === 'undefined') return 0;
    return window.scrollY;
  },

  /**
   * Get scroll percentage
   * @returns {number} Scroll percentage (0-100)
   */
  getScrollPercentage: () => {
    if (typeof window === 'undefined') return 0;
    
    const scrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    
    const maxScroll = documentHeight - windowHeight;
    if (maxScroll <= 0) return 0;
    
    return Math.round((scrollY / maxScroll) * 100);
  },

  /**
   * Get scroll direction
   * @param {number} lastScrollY - Previous scroll position
   * @param {number} currentScrollY - Current scroll position
   * @returns {string} 'up' | 'down' | 'none'
   */
  getScrollDirection: (lastScrollY, currentScrollY) => {
    if (currentScrollY > lastScrollY) return 'down';
    if (currentScrollY < lastScrollY) return 'up';
    return 'none';
  },

  /**
   * Check if user has scrolled past a certain point
   * @param {number} threshold - Threshold in pixels
   * @returns {boolean}
   */
  hasScrolledPast: (threshold) => {
    if (typeof window === 'undefined') return false;
    return window.scrollY > threshold;
  },

  /**
   * Smooth scroll to top with easing
   * @param {number} duration - Animation duration in ms
   */
  smoothScrollToTop: (duration = 500) => {
    if (typeof window === 'undefined') return;
    
    const start = window.scrollY;
    const startTime = performance.now();
    
    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };
    
    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);
      
      window.scrollTo(0, start * (1 - easedProgress));
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };
    
    requestAnimationFrame(animateScroll);
  },

  /**
   * Get visible element at center of viewport
   * @param {string} selector - CSS selector
   * @returns {Element|null} Visible element or null
   */
  getVisibleElement: (selector) => {
    if (typeof document === 'undefined') return null;
    
    const elements = document.querySelectorAll(selector);
    const viewportCenter = window.innerHeight / 2;
    
    for (const element of elements) {
      const rect = element.getBoundingClientRect();
      if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
        return element;
      }
    }
    
    return null;
  },

  /**
   * Lock scroll (prevent scrolling)
   */
  lockScroll: () => {
    if (typeof document === 'undefined') return;
    
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  },

  /**
   * Unlock scroll (allow scrolling)
   */
  unlockScroll: () => {
    if (typeof document === 'undefined') return;
    
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
  },

  /**
   * Toggle scroll lock
   * @param {boolean} lock - Whether to lock or unlock
   */
  toggleScrollLock: (lock) => {
    if (lock) {
      scrollHelpers.lockScroll();
    } else {
      scrollHelpers.unlockScroll();
    }
  },

  /**
   * Get scroll container (window or element)
   * @param {Element} element - Element to check
   * @returns {Element|Window} Scroll container
   */
  getScrollContainer: (element) => {
    if (typeof window === 'undefined') return null;
    
    if (!element) return window;
    
    let current = element;
    while (current) {
      const overflowY = window.getComputedStyle(current).overflowY;
      if (overflowY === 'auto' || overflowY === 'scroll') {
        return current;
      }
      current = current.parentElement;
    }
    
    return window;
  },
};

/**
 * React hook for scroll position
 * @param {number} threshold - Threshold for showing button
 * @returns {Object} Scroll state
 */
export const useScrollState = (threshold = 300) => {
  const [scrollState, setScrollState] = useState({
    scrollY: 0,
    isAtTop: true,
    isAtBottom: false,
    scrollPercentage: 0,
    scrollDirection: 'none',
    showButton: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isAtTop = scrollY <= 0;
      const isAtBottom = scrollHelpers.isAtBottom();
      const scrollPercentage = scrollHelpers.getScrollPercentage();
      const scrollDirection = scrollHelpers.getScrollDirection(
        scrollState.scrollY,
        scrollY
      );
      const showButton = scrollY > threshold;

      setScrollState({
        scrollY,
        isAtTop,
        isAtBottom,
        scrollPercentage,
        scrollDirection,
        showButton,
      });
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrollState;
};

// Add useState and useEffect imports for the hooks
import { useState, useEffect } from 'react';

export default scrollHelpers;