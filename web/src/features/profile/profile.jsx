"use client";

import { useState, useEffect } from "react";
import ProfileDesktop from "./profile_desktop/profile_desktop";
import ProfileMobile from "./profile_mobile/profile_mobile";

export default function Profile() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) return null;

  return isMobile ? <ProfileMobile /> : <ProfileDesktop />;
}