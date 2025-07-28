import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PDFContextProvider } from "./store/PDFContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PDFContextProvider>
      <App />
    </PDFContextProvider>
  </StrictMode>
);
