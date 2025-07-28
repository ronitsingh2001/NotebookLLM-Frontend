import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Document, Page, pdfjs } from "react-pdf";
import { useContext, useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import { useEffect, useRef } from "react";
import { PDFContext } from "../store/PDFContext";
export default function PDFViewer() {
  const [numPages, setNumPages] = useState(0);
  const [width, setWidth] = useState(800); // Default width
  const containerRef = useRef<HTMLDivElement>(null);

  const { filename } = useContext(PDFContext);

  // ResizeObserver to make width responsive
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        setWidth(newWidth);
      }
    });

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full flex justify-center h-screen overflow-auto"
    >
      <Document
        file={`${import.meta.env.VITE_API_URL}/pdfs/${filename}`}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {Array.from({ length: numPages }, (_, idx) => (
          <Page
            key={idx}
            pageNumber={idx + 1}
            width={Math.min(width, 600)} // max width for readability
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        ))}
      </Document>
    </div>
  );
}

// node express

// file upload hoga
// validation lagega

// open api call hogi
// request response aayega

// socket bhi use kar saktey

// file upload

// question ki
