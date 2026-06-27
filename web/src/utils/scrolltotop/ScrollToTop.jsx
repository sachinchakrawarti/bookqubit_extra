// src/utils/scrolltotop/ScrollToTop.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import useWidgetStore from '../../store/widgetStore';
import './ScrollToTop.css';

const ScrollToTop = () => {
  // Using Zustand
  const isVisible = useWidgetStore((state) => state.widgets.scrollToTop);

  const [showButton, setShowButton] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);

  // Memoize scroll handler
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    // Show button after scrolling 300px
    setShowButton(scrollY > 300);
  }, []);

  // Throttled scroll handler
  useEffect(() => {
    let timeoutId;
    const throttledScroll = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null;
      }, 100);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  // Smooth scroll to top with progress tracking
  const scrollToTop = useCallback(() => {
    if (isScrolling) return; // Prevent multiple clicks
    
    setIsScrolling(true);
    const startPosition = window.scrollY;
    const duration = 500; // ms
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function - easeInOutCubic
      const easeInOutCubic = (t) => {
        return t < 0.5 
          ? 4 * t * t * t 
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };
      
      const scrollPosition = startPosition - (startPosition * easeInOutCubic(progress));
      
      window.scrollTo(0, scrollPosition);
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        window.scrollTo(0, 0);
        setIsScrolling(false);
      }
    };

    requestAnimationFrame(animateScroll);
  }, [isScrolling]);

  // Keyboard shortcut: Press 'Home' key to scroll to top
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Home' && showButton) {
        e.preventDefault();
        scrollToTop();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showButton, scrollToTop]);

  // Show/hide button based on scroll position with intersection observer (optional)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Show button when user scrolls past 300px
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowButton(scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // If widget is hidden globally, don't render
  if (!isVisible) return null;

  return (
    <>
      {showButton && (
        <button
          className={`scroll-to-top ${isHovered ? 'hover' : ''} ${isScrolling ? 'scrolling' : ''}`}
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          aria-label="Scroll to top"
          title="Scroll to top (Home key)"
          disabled={isScrolling}
        >
          {/* Progress Ring */}
          <svg 
            className="scroll-progress-ring"
            width="50" 
            height="50" 
            viewBox="0 0 50 50"
          >
            <circle
              className="progress-ring-bg"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="3"
            />
            <circle
              className="progress-ring-fill"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              style={{
                strokeDasharray: 125.6,
                strokeDashoffset: 125.6 - (125.6 * Math.min(window.scrollY / 1000, 1))
              }}
            />
          </svg>
          
          {/* Arrow Icon */}
          <svg 
            className="scroll-icon"
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
          
          <span className="tooltip">
            Back to Top
            <span className="tooltip-shortcut">⌘ Home</span>
          </span>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;