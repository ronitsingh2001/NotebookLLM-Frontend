import { useContext, useState } from "react";
import ChatScreen from "./components/ChatScreen";
import UploadPlaceholder from "./components/UploadPlaceholder";
import { PDFContext } from "./store/PDFContext";
import WarningModal from "./components/WarningModal";

export default function App() {
  const { filename } = useContext(PDFContext);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center">
      {!filename && <UploadPlaceholder />}
      {filename && <ChatScreen onOpen={() => setOpen(true)} />}
      {open && <WarningModal onCancel={() => setOpen(false)} />}
    </div>
  );
}
