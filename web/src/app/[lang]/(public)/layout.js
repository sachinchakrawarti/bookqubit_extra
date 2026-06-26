// src/app/[lang]/(public)/layout.jsx

"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/layout/navbar/Navbar";
import Footer from "@/layout/footer/Footer";
import GoToUp from "@/utils/GoToUp";
import ScrollToTop from "@/utils/scrolltotop/ScrollToTop";

export default function PublicLayout({ children }) {
  const pathname = usePathname();

  const isSocialApp = pathname?.includes("/drift") || false;
  const isEthos = pathname?.includes("/ethos") || false;
  const isQubitStationery = pathname?.includes("/qubit-stationery") || false;
  const isQubitReads = pathname?.includes("/qubit-reads") || false;
  const isAuthorDashboard = pathname?.includes("/author-dashboard") || false;
  
  const isHomePages = pathname === "/homepages" || 
                      pathname === "/en/homepages" || 
                      pathname?.endsWith("/homepages") || false;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const hideSecondRow = isSocialApp || isEthos || isQubitStationery || isQubitReads || isAuthorDashboard;
  const hideNavbar = isAuthorDashboard;
  const showFooter = !isSocialApp && !isEthos && !isQubitStationery && !isQubitReads && !isAuthorDashboard && !isHomePages;
  const showGoToUp = !isSocialApp && !isEthos && !isQubitStationery && !isQubitReads && !isAuthorDashboard && !isMobile;

  return (
    <>
      {/* ScrollToTop - Always renders, controls itself */}
      <ScrollToTop />

      {!hideNavbar && <Navbar hideSecondRow={hideSecondRow} />}

      <main className={isMobile ? 'pb-[72px]' : ''}>
        {children}
      </main>

      {showFooter && <Footer />}

      {showGoToUp && (
        <GoToUp
          showAfter={300}
          smooth={true}
        />
      )}
    </>
  );
}