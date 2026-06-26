// src/utils/scroller/helpers/deviceDetector.js

/**
 * Device detection utilities for ScrollToTop component
 * Detects device type, platform, and capabilities
 */

export const deviceDetector = {
  /**
   * Check if device is mobile (screen size <= 768px)
   * @returns {boolean}
   */
  isMobile: () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768;
  },

  /**
   * Check if device is tablet (screen size between 769px and 1024px)
   * @returns {boolean}
   */
  isTablet: () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth > 768 && window.innerWidth <= 1024;
  },

  /**
   * Check if device is desktop (screen size > 1024px)
   * @returns {boolean}
   */
  isDesktop: () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth > 1024;
  },

  /**
   * Check if device supports touch events
   * @returns {boolean}
   */
  isTouchDevice: () => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || 
           navigator.maxTouchPoints > 0 || 
           navigator.msMaxTouchPoints > 0;
  },

  /**
   * Check if device has mouse support
   * @returns {boolean}
   */
  hasMouse: () => {
    if (typeof window === 'undefined') return false;
    return !deviceDetector.isTouchDevice() || window.matchMedia('(hover: hover)').matches;
  },

  /**
   * Get device platform
   * @returns {string} 'ios' | 'android' | 'windows' | 'mac' | 'linux' | 'unknown'
   */
  getPlatform: () => {
    if (typeof window === 'undefined') return 'unknown';
    
    const ua = navigator.userAgent.toLowerCase();
    
    if (ua.includes('android')) return 'android';
    if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod')) return 'ios';
    if (ua.includes('windows')) return 'windows';
    if (ua.includes('mac')) return 'mac';
    if (ua.includes('linux')) return 'linux';
    
    return 'unknown';
  },

  /**
   * Get device OS
   * @returns {string} OS name
   */
  getOS: () => {
    if (typeof window === 'undefined') return 'Unknown';
    
    const platform = deviceDetector.getPlatform();
    
    switch(platform) {
      case 'ios': return 'iOS';
      case 'android': return 'Android';
      case 'windows': return 'Windows';
      case 'mac': return 'macOS';
      case 'linux': return 'Linux';
      default: return 'Unknown';
    }
  },

  /**
   * Check if device is iOS
   * @returns {boolean}
   */
  isIOS: () => {
    return deviceDetector.getPlatform() === 'ios';
  },

  /**
   * Check if device is Android
   * @returns {boolean}
   */
  isAndroid: () => {
    return deviceDetector.getPlatform() === 'android';
  },

  /**
   * Check if device is Windows
   * @returns {boolean}
   */
  isWindows: () => {
    return deviceDetector.getPlatform() === 'windows';
  },

  /**
   * Check if device is Mac
   * @returns {boolean}
   */
  isMac: () => {
    return deviceDetector.getPlatform() === 'mac';
  },

  /**
   * Get screen orientation
   * @returns {string} 'portrait' | 'landscape'
   */
  getOrientation: () => {
    if (typeof window === 'undefined') return 'portrait';
    
    const { innerHeight, innerWidth } = window;
    return innerHeight > innerWidth ? 'portrait' : 'landscape';
  },

  /**
   * Check if device is in landscape mode
   * @returns {boolean}
   */
  isLandscape: () => {
    return deviceDetector.getOrientation() === 'landscape';
  },

  /**
   * Check if device is in portrait mode
   * @returns {boolean}
   */
  isPortrait: () => {
    return deviceDetector.getOrientation() === 'portrait';
  },

  /**
   * Get device screen width
   * @returns {number}
   */
  getScreenWidth: () => {
    if (typeof window === 'undefined') return 0;
    return window.innerWidth;
  },

  /**
   * Get device screen height
   * @returns {number}
   */
  getScreenHeight: () => {
    if (typeof window === 'undefined') return 0;
    return window.innerHeight;
  },

  /**
   * Check if device supports vibration
   * @returns {boolean}
   */
  supportsVibration: () => {
    if (typeof window === 'undefined') return false;
    return 'vibrate' in navigator;
  },

  /**
   * Check if device supports sharing via Web Share API
   * @returns {boolean}
   */
  supportsShare: () => {
    if (typeof window === 'undefined') return false;
    return 'share' in navigator;
  },

  /**
   * Get device capabilities summary
   * @returns {Object}
   */
  getCapabilities: () => {
    return {
      isMobile: deviceDetector.isMobile(),
      isTablet: deviceDetector.isTablet(),
      isDesktop: deviceDetector.isDesktop(),
      isTouchDevice: deviceDetector.isTouchDevice(),
      hasMouse: deviceDetector.hasMouse(),
      platform: deviceDetector.getPlatform(),
      os: deviceDetector.getOS(),
      orientation: deviceDetector.getOrientation(),
      screenWidth: deviceDetector.getScreenWidth(),
      screenHeight: deviceDetector.getScreenHeight(),
      supportsVibration: deviceDetector.supportsVibration(),
      supportsShare: deviceDetector.supportsShare(),
    };
  },
};

/**
 * React hook to get device info
 * @returns {Object} Device info with reactive updates
 */
export const useDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isTouchDevice: false,
    hasMouse: false,
    platform: 'unknown',
    os: 'Unknown',
    orientation: 'portrait',
    screenWidth: 0,
    screenHeight: 0,
    supportsVibration: false,
    supportsShare: false,
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      setDeviceInfo({
        isMobile: deviceDetector.isMobile(),
        isTablet: deviceDetector.isTablet(),
        isDesktop: deviceDetector.isDesktop(),
        isTouchDevice: deviceDetector.isTouchDevice(),
        hasMouse: deviceDetector.hasMouse(),
        platform: deviceDetector.getPlatform(),
        os: deviceDetector.getOS(),
        orientation: deviceDetector.getOrientation(),
        screenWidth: deviceDetector.getScreenWidth(),
        screenHeight: deviceDetector.getScreenHeight(),
        supportsVibration: deviceDetector.supportsVibration(),
        supportsShare: deviceDetector.supportsShare(),
      });
    };

    updateDeviceInfo();

    window.addEventListener('resize', updateDeviceInfo);
    window.addEventListener('orientationchange', updateDeviceInfo);

    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
      window.removeEventListener('orientationchange', updateDeviceInfo);
    };
  }, []);

  return deviceInfo;
};

// Add useState and useEffect imports for the hook
import { useState, useEffect } from 'react';

export default deviceDetector;