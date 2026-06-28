// src/features/bookqubit-discovery/books/bookdeatils/hooks/useMobileDetection.js

"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for detecting mobile devices and responsive breakpoints
 * @param {Object} options - Configuration options
 * @param {number} options.mobileBreakpoint - Mobile breakpoint in pixels (default: 768)
 * @param {number} options.tabletBreakpoint - Tablet breakpoint in pixels (default: 1024)
 * @param {number} options.desktopBreakpoint - Desktop breakpoint in pixels (default: 1280)
 * @param {boolean} options.includeTouchDetection - Include touch detection (default: true)
 * @param {boolean} options.includeOrientation - Include orientation detection (default: true)
 * @param {boolean} options.includePlatform - Include platform detection (default: true)
 * @param {Function} options.onChange - Callback when device type changes
 * @returns {Object} Device detection state and functions
 */
export const useMobileDetection = ({
  mobileBreakpoint = 768,
  tabletBreakpoint = 1024,
  desktopBreakpoint = 1280,
  includeTouchDetection = true,
  includeOrientation = true,
  includePlatform = true,
  onChange = null,
} = {}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [orientation, setOrientation] = useState("portrait");
  const [platform, setPlatform] = useState("unknown");
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [deviceType, setDeviceType] = useState("unknown");
  const [isInitialized, setIsInitialized] = useState(false);

  // Check device type based on screen width
  const getDeviceType = useCallback(
    (width) => {
      if (width <= mobileBreakpoint) return "mobile";
      if (width <= tabletBreakpoint) return "tablet";
      return "desktop";
    },
    [mobileBreakpoint, tabletBreakpoint]
  );

  // Check if device supports touch
  const checkTouchDevice = useCallback(() => {
    if (typeof window === "undefined") return false;
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }, []);

  // Get device orientation
  const getOrientation = useCallback(() => {
    if (typeof window === "undefined") return "portrait";
    const { innerHeight, innerWidth } = window;
    return innerHeight > innerWidth ? "portrait" : "landscape";
  }, []);

  // Get device platform
  const getPlatform = useCallback(() => {
    if (typeof window === "undefined") return "unknown";
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("android")) return "android";
    if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod"))
      return "ios";
    if (ua.includes("windows")) return "windows";
    if (ua.includes("mac")) return "mac";
    if (ua.includes("linux")) return "linux";
    return "unknown";
  }, []);

  // Get screen dimensions
  const getScreenDimensions = useCallback(() => {
    if (typeof window === "undefined")
      return { width: 0, height: 0 };
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }, []);

  // Update device state
  const updateDeviceState = useCallback(() => {
    const { width, height } = getScreenDimensions();
    const device = getDeviceType(width);
    const touch = checkTouchDevice();
    const orient = getOrientation();
    const plat = getPlatform();

    setScreenWidth(width);
    setScreenHeight(height);
    setIsMobile(device === "mobile");
    setIsTablet(device === "tablet");
    setIsDesktop(device === "desktop");
    setDeviceType(device);
    setOrientation(orient);
    setPlatform(plat);

    if (includeTouchDetection) {
      setIsTouchDevice(touch);
    }

    return { device, width, height, touch, orient, plat };
  }, [
    getScreenDimensions,
    getDeviceType,
    checkTouchDevice,
    getOrientation,
    getPlatform,
    includeTouchDetection,
  ]);

  // Handle window resize
  const handleResize = useCallback(() => {
    const prevDevice = deviceType;
    const newState = updateDeviceState();

    if (onChange && prevDevice !== newState.device) {
      onChange(newState);
    }
  }, [deviceType, updateDeviceState, onChange]);

  // Initialize detection
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initial detection
    updateDeviceState();
    setIsInitialized(true);

    // Add event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [updateDeviceState, handleResize]);

  // Get device info
  const getDeviceInfo = useCallback(() => {
    return {
      isMobile,
      isTablet,
      isDesktop,
      isTouchDevice,
      orientation,
      platform,
      screenWidth,
      screenHeight,
      deviceType,
    };
  }, [
    isMobile,
    isTablet,
    isDesktop,
    isTouchDevice,
    orientation,
    platform,
    screenWidth,
    screenHeight,
    deviceType,
  ]);

  // Check if device matches a specific platform
  const isPlatform = useCallback(
    (platformName) => {
      return platform === platformName;
    },
    [platform]
  );

  // Check if device is in a specific orientation
  const isOrientation = useCallback(
    (orientationName) => {
      return orientation === orientationName;
    },
    [orientation]
  );

  // Get CSS class name for current device
  const getDeviceClassName = useCallback(() => {
    const classes = [];
    if (isMobile) classes.push("is-mobile");
    if (isTablet) classes.push("is-tablet");
    if (isDesktop) classes.push("is-desktop");
    if (isTouchDevice) classes.push("is-touch");
    if (!isTouchDevice) classes.push("is-not-touch");
    classes.push(`is-${orientation}`);
    classes.push(`platform-${platform}`);
    return classes.join(" ");
  }, [isMobile, isTablet, isDesktop, isTouchDevice, orientation, platform]);

  // Get responsive value based on device type
  const getResponsiveValue = useCallback(
    (values) => {
      if (values.mobile !== undefined && isMobile) return values.mobile;
      if (values.tablet !== undefined && isTablet) return values.tablet;
      if (values.desktop !== undefined && isDesktop) return values.desktop;
      return values.default || values.desktop || values.mobile || null;
    },
    [isMobile, isTablet, isDesktop]
  );

  return {
    // States
    isMobile,
    isTablet,
    isDesktop,
    isTouchDevice,
    orientation,
    platform,
    screenWidth,
    screenHeight,
    deviceType,
    isInitialized,

    // Functions
    updateDeviceState,
    getDeviceInfo,
    isPlatform,
    isOrientation,
    getDeviceClassName,
    getResponsiveValue,
  };
};

export default useMobileDetection;