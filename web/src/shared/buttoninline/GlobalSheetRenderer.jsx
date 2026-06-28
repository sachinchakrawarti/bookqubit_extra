"use client";

import React, { lazy, Suspense } from "react";
import { useGlobalSheet } from "./GlobalSheetManager";

// Import sheets directly instead of lazy loading for now
import SummarySheet from "./components/sheets/SummarySheet";
import InfoSheet from "./components/sheets/InfoSheet";
import LibrarySheet from "./components/sheets/LibrarySheet";

const SheetFallback = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const GlobalSheetRenderer = () => {
  const { sheetData, closeSheet } = useGlobalSheet();

  if (!sheetData) return null;

  const { type, isMobile, onClose, ...props } = sheetData;

  const handleClose = () => {
    if (onClose) onClose();
    closeSheet();
  };

  const sheetProps = {
    ...props,
    isOpen: true,
    onClose: handleClose,
    isMobile: isMobile ?? false,
  };

  // Render the appropriate sheet
  const renderSheet = () => {
    switch (type) {
      case "summary":
        return <SummarySheet {...sheetProps} />;
      case "info":
        return <InfoSheet {...sheetProps} />;
      case "library":
        return <LibrarySheet {...sheetProps} />;
      default:
        return null;
    }
  };

  return <Suspense fallback={<SheetFallback />}>{renderSheet()}</Suspense>;
};

export default GlobalSheetRenderer;
