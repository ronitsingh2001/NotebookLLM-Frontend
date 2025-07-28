import { AlertCircle } from "lucide-react";
import { useContext } from "react";
import { PDFContext } from "../store/PDFContext";

export default function WarningModal({ onCancel }: { onCancel: () => void }) {
  const { clearFile } = useContext(PDFContext);

  function handleUploadNew() {
    clearFile();
    onCancel();
  }

  return (
    <div className="fixed flex justify-center items-center w-screen h-screen">
      <div
        onClick={onCancel}
        className="absolute w-screen h-screen bg-black opacity-50"
      ></div>
      <div className="flex flex-col p-4 rounded-lg z-100 justify-center w-[30rem] bg-white">
        <h1 className="flex gap-2 items-center font-bold text-xl m-0">
          <AlertCircle className="text-yellow-500" />
          Upload New PDF?
        </h1>
        <p className="py-4 pe-8 text-gray-500">
          This will end your current chat session. Are you sure you want to
          upload a new PDF?
        </p>
        <div className="pt-8 flex gap-4 justify-end">
          <button
            onClick={onCancel}
            className="p-2 cursor-pointer px-4 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleUploadNew}
            className="p-2 cursor-pointer px-4 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            Upload New PDF
          </button>
        </div>
      </div>
    </div>
  );
}
