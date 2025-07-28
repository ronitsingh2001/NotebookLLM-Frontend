import { useContext, useRef, useState } from "react";
import { Upload } from "lucide-react";
import UploadProgress from "./UploadProgress";
import { PDFContext } from "../store/PDFContext";

export default function UploadPlaceholder() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { updateFile } = useContext(PDFContext);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const uploadFile = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("pdf", file);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      updateFile(data.filename);
    } catch (err) {
      console.log(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setIsUploading(true);
      uploadFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type === "application/pdf") {
      console.log("PDF dropped:", file);
      setIsUploading(true);
      uploadFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div
      className="relative flex flex-col bg-gray-200 items-center justify-center w-screen h-screen"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {isDragging && (
        <div className="absolute w-screen h-screen inset-0 bg-black z-100 opacity-50 flex items-center justify-center pointer-events-none"></div>
      )}
      {isUploading && <UploadProgress progress={75} />}

      <div
        onClick={handleClick}
        className="flex flex-col items-center justify-center gap-2 p-8 bg-white rounded-xl cursor-pointer shadow-xl hover:shadow-xs z-20"
      >
        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="bg-purple-100 p-4 rounded-full mb-4">
          <Upload className="text-purple-600 font-bold" />
        </div>
        <h1 className="font-bold">Upload PDF to start chatting</h1>
        <p className="text-xs text-gray-400">
          Click or drag and drop your file here
        </p>
      </div>
    </div>
  );
}
