// src/utils/scroller/hooks/useMobileDetection.js

"use client";

import { useState, useEffect } from "react";

export const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [platform, setPlatform] = useState("unknown");

  useEffect(() => {
    // Check screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check touch device
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    // Check platform
    const checkPlatform = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.includes('windows')) setPlatform('windows');
      else if (userAgent.includes('mac')) setPlatform('mac');
      else if (userAgent.includes('linux')) setPlatform('linux');
      else if (userAgent.includes('android')) setPlatform('android');
      else if (userAgent.includes('ios') || userAgent.includes('iphone') || userAgent.includes('ipad')) setPlatform('ios');
      else setPlatform('unknown');
    };

    checkMobile();
    checkTouch();
    checkPlatform();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Return as object with proper keys
  return {
    isMobile,
    isTouchDevice,
    platform,
    isDesktop: !isMobile,
  };
};

export default useMobileDetection;