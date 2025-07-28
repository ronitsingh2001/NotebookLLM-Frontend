import React, { createContext, useState } from "react";

// Define context shape
interface PDFContextType {
  filename: string;
  updateFile: (name: string) => void;
  clearFile: () => void;
}

// Create the context
export const PDFContext = createContext<PDFContextType>({
  filename: "",
  updateFile: () => {},
  clearFile: () => {},
});

// Provider component
export const PDFContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filename, setFilename] = useState("");  
  const updateFile = (name: string) => setFilename(name);
  const clearFile = () => setFilename("");

  return (
    <PDFContext.Provider value={{ filename, updateFile, clearFile }}>
      {children}
    </PDFContext.Provider>
  );
};
