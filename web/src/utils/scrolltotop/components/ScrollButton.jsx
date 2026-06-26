// src/utils/scroller/components/ScrollButton.jsx

"use client";

import { useState, useRef, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import ProgressRing from "./ProgressRing";
import Tooltip from "./Tooltip";
import { useLongPress } from "../hooks/useLongPress";

const ScrollButton = ({
  isVisible,
  isHovered,
  setIsHovered,
  onLongPress,
  position = "right",
  buttonSize = "w-12 h-12",
  iconSize = 20,
  bottomOffset = 80,
  isMobile = false,
  longPressDelay = 500,
  customStyles = {},
}) => {
  const [pressProgress, setPressProgress] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const buttonRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [forceShow, setForceShow] = useState(false);

  // Check if touch device
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Force show on mobile after a delay
  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => {
        setForceShow(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  // Position classes
  const positionClasses =
    position === "left" ? "left-4 md:left-6" : "right-4 md:right-6";

  // Dynamic bottom offset for mobile
  const getBottomOffset = () => {
    if (isMobile) {
      return `bottom-[${bottomOffset}px]`;
    }
    return "bottom-8";
  };

  // Long press hook
  const longPressHandlers = useLongPress({
    onLongPress,
    delay: longPressDelay,
    onProgress: setPressProgress,
    onPressStart: () => setIsPressing(true),
    onPressEnd: () => {
      setIsPressing(false);
      setPressProgress(0);
    },
  });

  // Extract handlers safely
  const handleTouchStart = longPressHandlers?.handleTouchStart || (() => {});
  const handleTouchEnd = longPressHandlers?.handleTouchEnd || (() => {});
  const handleMouseDown = longPressHandlers?.handleMouseDown || (() => {});
  const handleMouseUp = longPressHandlers?.handleMouseUp || (() => {});
  const handleLongPressMouseLeave =
    longPressHandlers?.handleMouseLeave || (() => {});

  // Scroll to top function
  const scrollToTop = (e) => {
    if (e) e.preventDefault();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  // Handle click
  const handleClick = (e) => {
    e.preventDefault();
    if (!isPressing) {
      scrollToTop();
    }
  };

  // Handle mouse enter
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsHovered(false);
    handleLongPressMouseLeave();
  };

  // Handle touch start
  const handleTouchStartWrapper = (e) => {
    handleTouchStart(e);
  };

  // Handle touch end
  const handleTouchEndWrapper = (e) => {
    handleTouchEnd(e);
  };

  // Show if visible OR forced on mobile
  const shouldShow = isVisible || (isMobile && forceShow);

  // If not visible and not forced, return null
  if (!shouldShow) return null;

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStartWrapper}
      onTouchEnd={handleTouchEndWrapper}
      onTouchCancel={handleMouseLeave}
      className={`
        fixed z-[9999]
        flex items-center justify-center
        ${buttonSize}
        rounded-full
        shadow-lg
        transition-all duration-300
        hover:scale-110
        active:scale-95
        ${positionClasses}
        ${getBottomOffset()}
        scroll-to-top-btn
        group
        relative
        overflow-visible
        touch-none
        select-none
        cursor-pointer
        ${isMobile ? "mobile-button" : ""}
        animate-fadeIn
      `}
      style={{
        backgroundColor: "#3b82f6",
        color: "#ffffff",
        boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
        transform: "scale(1)",
        opacity: 1,
        ...customStyles,
      }}
      aria-label="Scroll to top - Press and hold to hide"
    >
      {/* Progress Ring */}
      {isPressing && pressProgress > 0 && (
        <ProgressRing progress={pressProgress} size={buttonSize} />
      )}

      <FaArrowUp size={iconSize} className="relative z-10" />

      {/* Tooltip - Only show on desktop */}
      {isHovered && !isPressing && !isTouchDevice && (
        <Tooltip isMobile={isMobile} />
      )}
    </button>
  );
};

export default ScrollButton;
