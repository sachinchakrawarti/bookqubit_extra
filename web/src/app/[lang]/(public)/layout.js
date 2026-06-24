"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/layout/navbar/Navbar";
import Footer from "@/layout/footer/Footer";
import GoToUp from "@/utils/GoToUp";
import ScrollToTop from "@/utils/ScrollToTop";

export default function PublicLayout({ children }) {
  const pathname = usePathname();

  const isSocialApp = pathname?.includes("/drift") || false;
  const isEthos = pathname?.includes("/ethos") || false;
  const isQubitStationery = pathname?.includes("/qubit-stationery") || false;
  const isQubitReads = pathname?.includes("/qubit-reads") || false;
  const isAuthorDashboard = pathname?.includes("/author-dashboard") || false;

  // Hide second row for Drift, Ethos, QubitStationery, QubitReads, and Author Dashboard pages
  const hideSecondRow = isSocialApp || isEthos || isQubitStationery || isQubitReads || isAuthorDashboard;

  // Hide entire Navbar for Author Dashboard
  const hideNavbar = isAuthorDashboard;

  // Show Footer for all pages except Drift, Ethos, QubitStationery, QubitReads, and Author Dashboard
  const showFooter = !isSocialApp && !isEthos && !isQubitStationery && !isQubitReads && !isAuthorDashboard;

  // Show GoToUp for all pages except Drift, Ethos, QubitStationery, QubitReads, and Author Dashboard
  const showGoToUp = !isSocialApp && !isEthos && !isQubitStationery && !isQubitReads && !isAuthorDashboard;

  return (
    <>
      <ScrollToTop
        behavior="smooth"
        onMount={true}
        onRouteChange={true}
      />

      {!hideNavbar && <Navbar hideSecondRow={hideSecondRow} />}

      <main>
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