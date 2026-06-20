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

  // Hide second row (Discovery/Drift/Ethos bar) for Drift and Ethos pages
  // since they have their own navigation
  const hideSecondRow = isSocialApp || isEthos;

  // Show Footer for all pages except Drift and Ethos
  const showFooter = !isSocialApp && !isEthos;

  // Show GoToUp for all pages except Drift and Ethos
  const showGoToUp = !isSocialApp && !isEthos;

  return (
    <>
      <ScrollToTop
        behavior="smooth"
        onMount={true}
        onRouteChange={true}
      />

      <Navbar hideSecondRow={hideSecondRow} />

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