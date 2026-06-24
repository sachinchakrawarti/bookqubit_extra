"use client";

import { useTheme } from "@/themes/useTheme";
import CopyrightFooter from "./components/CopyrightFooter";
import ExplorePage from "./components/ExplorePage";
import FooterMain from "./components/FooterMain";
import LegalFooter from "./components/LegalFooter";
import SocialFooter from "./components/SocialFooter";
import BookQubitEcosystem from "./components/BookQubit_Ecosystem";

const Footer = () => {
  const { theme } = useTheme();

  // Guard against undefined theme
  if (!theme) {
    return null;
  }

  return (
    <footer className={`${theme.background?.section || 'bg-white dark:bg-gray-900'} relative overflow-hidden`}>
      <ExplorePage />
      <BookQubitEcosystem />
      <FooterMain />
      <SocialFooter />
      <CopyrightFooter />
      <LegalFooter />
    </footer>
  );
};

export default Footer;