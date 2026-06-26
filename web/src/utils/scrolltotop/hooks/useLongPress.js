// src/utils/scroller/hooks/useLongPress.js

"use client";

import { useState, useRef, useCallback } from "react";

export const useLongPress = ({
  onLongPress,
  delay = 500,
  onProgress,
  onPressStart,
  onPressEnd,
}) => {
  const [isPressing, setIsPressing] = useState(false);
  const timerRef = useRef(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(0);
  const isLongPressRef = useRef(false);
  const isTouchRef = useRef(false);

  // Update progress animation
  const updateProgress = useCallback(() => {
    const elapsed = Date.now() - startTimeRef.current;
    const progress = Math.min(elapsed / delay, 1);
    if (onProgress) {
      onProgress(progress);
    }

    if (progress < 1 && isPressing) {
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  }, [delay, isPressing, onProgress]);

  // Start long press detection
  const startPress = useCallback((isTouch = false) => {
    setIsPressing(true);
    isLongPressRef.current = false;
    isTouchRef.current = isTouch;
    startTimeRef.current = Date.now();
    if (onPressStart) {
      onPressStart();
    }

    // Start progress animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(updateProgress);

    // Set timer for long press
    timerRef.current = setTimeout(() => {
      if (isPressing) {
        isLongPressRef.current = true;
        setIsPressing(false);
        if (onProgress) {
          onProgress(0);
        }
        if (onLongPress) {
          onLongPress();
        }

        // Vibrate on mobile if supported
        if (navigator.vibrate) {
          navigator.vibrate(50);
        }
      }
      timerRef.current = null;
    }, delay);
  }, [delay, isPressing, onLongPress, onPressStart, onProgress, updateProgress]);

  // End long press detection
  const endPress = useCallback(() => {
    setIsPressing(false);
    if (onProgress) {
      onProgress(0);
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // Reset long press flag
    setTimeout(() => {
      isLongPressRef.current = false;
    }, 100);

    if (onPressEnd) {
      onPressEnd();
    }
  }, [onPressEnd, onProgress]);

  // Handle mouse events
  const handleMouseDown = useCallback((e) => {
    if (isTouchRef.current) return;
    startPress(false);
  }, [startPress]);

  const handleMouseUp = useCallback((e) => {
    if (isTouchRef.current) return;
    endPress();
  }, [endPress]);

  const handleMouseLeave = useCallback(() => {
    if (isTouchRef.current) return;
    endPress();
  }, [endPress]);

  // Handle touch events
  const handleTouchStart = useCallback((e) => {
    // Prevent default to avoid scrolling while pressing
    e.preventDefault();
    startPress(true);
  }, [startPress]);

  const handleTouchEnd = useCallback((e) => {
    e.preventDefault();
    endPress();
  }, [endPress]);

  // Return object with all handlers
  return {
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleTouchStart,
    handleTouchEnd,
    isPressing,
    isLongPress: isLongPressRef.current,
  };
};

export default useLongPress;