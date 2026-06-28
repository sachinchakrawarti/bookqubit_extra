// src/features/bookqubit-discovery/books/bookdeatils/hooks/useSectionObserver.js

"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Custom hook for observing which section is in view
 * @param {Object} options - Configuration options
 * @param {Array} options.sections - Array of section IDs to observe
 * @param {string} options.activeSection - Currently active section
 * @param {number} options.offset - Offset from top to trigger (default: 120)
 * @param {number} options.threshold - Intersection threshold (default: 0.3)
 * @param {Function} options.onSectionChange - Callback when section changes
 * @param {boolean} options.enableAutoScroll - Enable auto-scroll on section change
 * @param {number} options.scrollDelay - Delay before auto-scroll (default: 100)
 * @returns {Object} Section observer state and functions
 */
export const useSectionObserver = ({
  sections = [],
  activeSection: initialActiveSection = null,
  offset = 120,
  threshold = 0.3,
  onSectionChange = null,
  enableAutoScroll = false,
  scrollDelay = 100,
}) => {
  const [activeSection, setActiveSection] = useState(initialActiveSection);
  const [sectionRefs, setSectionRefs] = useState({});
  const [sectionVisibility, setSectionVisibility] = useState({});
  const [sectionProgress, setSectionProgress] = useState({});
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("none");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const observerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const autoScrollTimeoutRef = useRef(null);

  // Create refs for sections
  const createSectionRefs = useCallback(() => {
    const refs = {};
    sections.forEach((sectionId) => {
      refs[sectionId] = { current: null };
    });
    setSectionRefs(refs);
    return refs;
  }, [sections]);

  // Initialize refs on mount
  useEffect(() => {
    if (sections.length > 0) {
      const refs = createSectionRefs();
      setSectionRefs(refs);
    }
  }, [sections, createSectionRefs]);

  // Handle scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      } else {
        setScrollDirection("none");
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Setup intersection observer
  useEffect(() => {
    if (!sections.length || !Object.keys(sectionRefs).length) return;

    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const options = {
      root: null,
      rootMargin: `-${offset}px 0px -${offset}px 0px`,
      threshold: threshold,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.dataset.sectionId;
        if (!sectionId) return;

        const isVisible = entry.isIntersecting;
        const ratio = entry.intersectionRatio;
        const boundingRect = entry.boundingClientRect;
        const rootBounds = entry.rootBounds;

        // Update visibility
        setSectionVisibility((prev) => ({
          ...prev,
          [sectionId]: isVisible,
        }));

        // Update progress (how much of the section is visible)
        setSectionProgress((prev) => ({
          ...prev,
          [sectionId]: ratio,
        }));

        // Update active section if visible
        if (isVisible && sectionId !== activeSection) {
          setActiveSection(sectionId);
          if (onSectionChange) {
            onSectionChange(sectionId);
          }
        }
      });
    }, options);

    // Observe all section elements
    Object.entries(sectionRefs).forEach(([sectionId, ref]) => {
      if (ref.current) {
        ref.current.dataset.sectionId = sectionId;
        observerRef.current.observe(ref.current);
      }
    });

    setIsInitialized(true);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sections, sectionRefs, offset, threshold, activeSection, onSectionChange]);

  // Auto-scroll to section
  const scrollToSection = useCallback(
    (sectionId, behavior = "smooth") => {
      if (!sectionRefs[sectionId]?.current) return;

      setIsScrolling(true);
      const element = sectionRefs[sectionId].current;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: behavior,
      });

      setActiveSection(sectionId);
      if (onSectionChange) {
        onSectionChange(sectionId);
      }

      // Reset scrolling state after animation
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, behavior === "smooth" ? 500 : 100);
    },
    [sectionRefs, offset, onSectionChange]
  );

  // Auto-scroll on section change
  useEffect(() => {
    if (!enableAutoScroll || !activeSection || isScrolling) return;

    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current);
    }

    autoScrollTimeoutRef.current = setTimeout(() => {
      scrollToSection(activeSection, "smooth");
    }, scrollDelay);

    return () => {
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current);
      }
    };
  }, [activeSection, enableAutoScroll, isScrolling, scrollToSection, scrollDelay]);

  // Get section ref
  const getSectionRef = useCallback(
    (sectionId) => {
      return sectionRefs[sectionId] || null;
    },
    [sectionRefs]
  );

  // Get section visibility
  const isSectionVisible = useCallback(
    (sectionId) => {
      return sectionVisibility[sectionId] || false;
    },
    [sectionVisibility]
  );

  // Get section progress
  const getSectionProgress = useCallback(
    (sectionId) => {
      return sectionProgress[sectionId] || 0;
    },
    [sectionProgress]
  );

  // Get visible sections
  const getVisibleSections = useCallback(() => {
    return Object.keys(sectionVisibility).filter(
      (id) => sectionVisibility[id]
    );
  }, [sectionVisibility]);

  // Get section by position
  const getSectionByPosition = useCallback(
    (position = "top") => {
      let targetSection = null;
      let targetPosition = position === "top" ? Infinity : -Infinity;

      Object.entries(sectionRefs).forEach(([sectionId, ref]) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const elementPosition = rect.top + window.pageYOffset;

        if (position === "top") {
          if (elementPosition < targetPosition) {
            targetPosition = elementPosition;
            targetSection = sectionId;
          }
        } else {
          if (elementPosition > targetPosition) {
            targetPosition = elementPosition;
            targetSection = sectionId;
          }
        }
      });

      return targetSection;
    },
    [sectionRefs]
  );

  // Reset observer
  const resetObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    setIsInitialized(false);
    setSectionVisibility({});
    setSectionProgress({});
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current);
      }
    };
  }, []);

  return {
    // State
    activeSection,
    sectionRefs,
    sectionVisibility,
    sectionProgress,
    isScrolling,
    scrollDirection,
    isInitialized,

    // Functions
    scrollToSection,
    getSectionRef,
    isSectionVisible,
    getSectionProgress,
    getVisibleSections,
    getSectionByPosition,
    resetObserver,
    setActiveSection,
  };
};

export default useSectionObserver;