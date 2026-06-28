"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/layout/navbar/Navbar";
import Footer from "@/layout/footer/Footer";
import GoToUp from "@/utils/GoToUp";
import ScrollToTop from "@/utils/scrolltotop/ScrollToTop";
import QuickAction from "@/utils/quickaction/QuickAction";
import useWidgetStore from "@/store/widgetStore";
import { GlobalSheetProvider } from "@/shared/buttoninline/GlobalSheetManager";
import GlobalSheetRenderer from "@/shared/buttoninline/GlobalSheetRenderer";

export default function PublicLayout({ children }) {
  const pathname = usePathname();
  
  // Get widget visibility from store
  const widgets = useWidgetStore((state) => state.widgets);

  // Page detection with useMemo for performance
  const pageFlags = useMemo(() => ({
    isSocialApp: pathname?.includes("/drift") || false,
    isEthos: pathname?.includes("/ethos") || false,
    isQubitStationery: pathname?.includes("/qubit-stationery") || false,
    isQubitReads: pathname?.includes("/qubit-reads") || false,
    isAuthorDashboard: pathname?.includes("/author-dashboard") || false,
    isHomePages: pathname === "/homepages" || 
                 pathname === "/en/homepages" || 
                 pathname?.endsWith("/homepages") || false,
  }), [pathname]);

  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection with cleanup
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Compute layout flags with useMemo
  const layoutFlags = useMemo(() => {
    const { isSocialApp, isEthos, isQubitStationery, isQubitReads, isAuthorDashboard, isHomePages } = pageFlags;
    
    const hideSecondRow = isSocialApp || isEthos || isQubitStationery || isQubitReads || isAuthorDashboard;
    const hideNavbar = isAuthorDashboard;
    const hideWidgets = isSocialApp || isEthos || isQubitStationery || isQubitReads || isAuthorDashboard || isHomePages;
    const showFooter = !isSocialApp && !isEthos && !isQubitStationery && !isQubitReads && !isAuthorDashboard && !isHomePages;
    const showGoToUp = !isSocialApp && !isEthos && !isQubitStationery && !isQubitReads && !isAuthorDashboard && !isHomePages && !isMobile;
    
    return {
      hideSecondRow,
      hideNavbar,
      hideWidgets,
      showFooter,
      showGoToUp,
    };
  }, [pageFlags, isMobile]);

  // Individual widget visibility with page override
  const showScrollToTop = useMemo(() => {
    return !layoutFlags.hideWidgets && widgets.scrollToTop;
  }, [layoutFlags.hideWidgets, widgets.scrollToTop]);

  const showQuickAction = useMemo(() => {
    return !layoutFlags.hideWidgets && widgets.quickAction;
  }, [layoutFlags.hideWidgets, widgets.quickAction]);

  // Render widgets conditionally
  const renderWidgets = useCallback(() => {
    if (layoutFlags.hideWidgets) return null;
    
    return (
      <>
        {showScrollToTop && <ScrollToTop />}
        {showQuickAction && <QuickAction />}
      </>
    );
  }, [layoutFlags.hideWidgets, showScrollToTop, showQuickAction]);

  return (
    <GlobalSheetProvider>
      {/* Global Sheet Renderer - Only ONE instance for the entire app */}
      <GlobalSheetRenderer />

      {/* Widgets - Only render if not hidden and globally visible */}
      {renderWidgets()}

      {/* Navbar */}
      {!layoutFlags.hideNavbar && <Navbar hideSecondRow={layoutFlags.hideSecondRow} />}

      {/* Main Content */}
      <main className={isMobile ? 'pb-[72px]' : ''}>
        {children}
      </main>

      {/* Footer */}
      {layoutFlags.showFooter && <Footer />}

      {/* GoToUp Button */}
      {layoutFlags.showGoToUp && (
        <GoToUp
          showAfter={300}
          smooth={true}
        />
      )}
    </GlobalSheetProvider>
  );
}