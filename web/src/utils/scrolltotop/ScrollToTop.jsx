// src/utils/scrolltotop/ScrollToTop.jsx

"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { FaArrowUp, FaTimes, FaClock } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [hideDuration, setHideDuration] = useState(30);
  const [isHidden, setIsHidden] = useState(false);
  const [hideTimer, setHideTimer] = useState(null);
  const [isPressing, setIsPressing] = useState(false);
  const [pressProgress, setPressProgress] = useState(0);

  const pressTimerRef = useRef(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(0);
  const isLongPressRef = useRef(false);

  // Handle scroll to show/hide button
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show after scrolling 100px
      if (currentScrollY > 100 && !isHidden) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHidden]);

  // Update progress animation
  const updateProgress = () => {
    const elapsed = Date.now() - startTimeRef.current;
    const progress = Math.min(elapsed / 500, 1);
    setPressProgress(progress);

    if (progress < 1 && isPressing) {
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  };

  // Start long press detection
  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;

    setIsPressing(true);
    setPressProgress(0);
    isLongPressRef.current = false;
    startTimeRef.current = Date.now();

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(updateProgress);

    pressTimerRef.current = setTimeout(() => {
      if (isPressing) {
        isLongPressRef.current = true;
        setIsPressing(false);
        setPressProgress(0);
        setShowPopup(true);

        if (navigator.vibrate) {
          navigator.vibrate(50);
        }
      }
      pressTimerRef.current = null;
    }, 500);
  };

  // End long press detection
  const handlePointerUp = (e) => {
    setIsPressing(false);
    setPressProgress(0);

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }

    // If not a long press, scroll to top
    if (!isLongPressRef.current && !showPopup) {
      scrollToTop();
    }

    setTimeout(() => {
      isLongPressRef.current = false;
    }, 100);
  };

  // Handle pointer leave
  const handlePointerLeave = () => {
    setIsPressing(false);
    setPressProgress(0);
    isLongPressRef.current = false;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  // Handle hide button
  const handleHideButton = () => {
    setShowPopup(false);
    setIsHidden(true);
    setIsVisible(false);

    if (hideTimer) {
      clearTimeout(hideTimer);
      setHideTimer(null);
    }

    const timer = setTimeout(() => {
      setIsHidden(false);
      // Check if we should show again
      if (window.scrollY > 100) {
        setIsVisible(true);
      }
    }, hideDuration * 1000);

    setHideTimer(timer);
  };

  // Handle cancel
  const handleCancel = () => {
    setShowPopup(false);
    if (hideTimer) {
      clearTimeout(hideTimer);
      setHideTimer(null);
    }
  };

  // Handle duration change
  const handleDurationChange = (seconds) => {
    setHideDuration(seconds);
  };

  // Duration options
  const durationOptions = [
    { label: "30s", value: 30 },
    { label: "1 min", value: 60 },
    { label: "2 min", value: 120 },
    { label: "5 min", value: 300 },
    { label: "10 min", value: 600 },
    { label: "Forever", value: 9999 },
  ];

  // Don't show if hidden or not visible
  if (isHidden || !isVisible) return null;

  return (
    <>
      {/* Scroll to Top Button */}
      <button
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        className="fixed z-[9999] flex items-center justify-center w-14 h-14 md:w-12 md:h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 right-4 md:right-6 bottom-[100px] md:bottom-8 bg-blue-600 hover:bg-blue-700 text-white group touch-none select-none"
        style={{
          boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
        }}
        aria-label="Scroll to top - Press and hold to hide"
      >
        {/* Progress Ring */}
        {isPressing && pressProgress > 0 && (
          <svg
            className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="4"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${pressProgress * 282.7} 282.7`}
              className="transition-all duration-75"
            />
          </svg>
        )}

        <FaArrowUp size={20} className="relative z-10" />

        {/* Tooltip */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="flex flex-col items-center gap-0.5">
            <span>Click to scroll up</span>
            <span className="text-[10px] text-gray-400">Hold to hide</span>
          </div>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45"></div>
        </div>
      </button>

      {/* Hide Popup */}
      {showPopup && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn"
          onClick={handleCancel}
        >
          <div
            className="relative w-[320px] max-w-[90vw] p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleCancel}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <FaTimes className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
                <FaClock className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Hide Scroll Button
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Choose how long to hide the button
                </p>
              </div>
            </div>

            {/* Duration options */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {durationOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleDurationChange(option.value)}
                  className={`
                    py-2 px-3 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${
                      hideDuration === option.value
                        ? "bg-sky-600 text-white shadow-md scale-105"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Selected duration display */}
            <div className="flex items-center justify-between mb-4 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Selected:
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {hideDuration === 9999
                  ? "Forever"
                  : hideDuration >= 60
                    ? `${Math.floor(hideDuration / 60)} min${hideDuration >= 120 ? "s" : ""}`
                    : `${hideDuration} sec`}
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="flex-1 py-2.5 rounded-lg font-medium text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleHideButton}
                className="flex-1 py-2.5 rounded-lg font-medium text-sm bg-gradient-to-r from-sky-600 to-sky-500 text-white hover:scale-105 transition-all duration-200 shadow-md"
              >
                Hide Button
              </button>
            </div>

            {/* Info text */}
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 text-center">
              The button will reappear after the selected time
            </p>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx="true">{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default ScrollToTop;
