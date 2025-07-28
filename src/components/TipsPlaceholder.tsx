import { FileText } from "lucide-react";

export default function TipsPlaceholder() {
  return (
    <div className="rounded-xl text-purple-700">
      <p className="font-bold flex gap-2">
        <FileText /> Your document is ready!
      </p>
      <p className="text-sm pt-2">
        You can now ask questions about your document. For example:
      </p>
      <ul className="text-sm list-disc ml-6 pt-2">
        <li>"What is the main topic of this document?"</li>
        <li>"Can you summarize the key points?"</li>
        <li>"What are the conclusions or recommendations?"</li>
      </ul>
    </div>
  );
}
