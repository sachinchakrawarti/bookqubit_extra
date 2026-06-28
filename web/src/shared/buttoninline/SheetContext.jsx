"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

const SheetContext = createContext();

export const SheetProvider = ({ children }) => {
  const [activeSheet, setActiveSheet] = useState(null);
  const [activeBookId, setActiveBookId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openSheet = useCallback((sheetName, bookId) => {
    setActiveSheet(sheetName);
    setActiveBookId(bookId);
    setIsOpen(true);
  }, []);

  const closeSheet = useCallback(() => {
    setActiveSheet(null);
    setActiveBookId(null);
    setIsOpen(false);
  }, []);

  return (
    <SheetContext.Provider
      value={{
        activeSheet,
        activeBookId,
        isOpen,
        openSheet,
        closeSheet,
      }}
    >
      {children}
    </SheetContext.Provider>
  );
};

export const useSheet = () => {
  const context = useContext(SheetContext);
  if (!context) {
    throw new Error("useSheet must be used within a SheetProvider");
  }
  return context;
};

export default SheetContext;
