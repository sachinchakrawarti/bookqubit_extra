// src/app/[lang]/(public)/ethos/layout.jsx
"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "@/themes/useTheme";
import { useRTL } from "@/contexts/RTLContext";
import { useFont } from "@/contexts/FontContext";
import EthosLayout from "@/layout_ethos/ethos_layout/ethos_layout";


export default function EthosLayoutWrapper({ children, params }) {
  const pathname = usePathname();
  const { theme, themeName } = useTheme();
  const { isRTL } = useRTL();
  const { currentFont } = useFont();

  return (
    <EthosLayout
      pathname={pathname}
      themeName={themeName}
      isRTL={isRTL}
      currentFont={currentFont}
    >
      {children}
    </EthosLayout>
  );
}