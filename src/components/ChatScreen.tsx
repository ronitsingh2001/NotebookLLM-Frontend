import { Bot, User, X } from "lucide-react";
import PDFViewer from "./PdfViewer";
import { useState, useContext } from "react";
import { PDFContext } from "../store/PDFContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import TipsPlaceholder from "./TipsPlaceHolder";

type QnAItem = { query: string; response: string };

export default function ChatScreen({ onOpen }: { onOpen: () => void }) {
  const { filename } = useContext(PDFContext);

  const [QnA, setQnA] = useState<QnAItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleQuery = async () => {
    const query = input.trim();
    if (!query || loading) return;
    setLoading(true);
    setError(null);

    setQnA((state) => [...state, { query, response: "" }]);
    setInput("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, filename }),
      });

      if (!res.ok) {
        throw new Error("Server error. Please try again.");
      }

      const data = await res.json();
      if (!data.response) {
        throw new Error("No response from server.");
      }

      setQnA((state) => {
        const newState = [...state];
        newState[newState.length - 1] = { query, response: data.response };
        return newState;
      });
    } catch (err: any) {
      setQnA((state) => {
        const newState = [...state];
        newState[newState.length - 1] = {
          query,
          response: "Error. Please try again.",
        };
        return newState;
      });
      setError(err?.message || "Unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex p-4 h-screen w-full">
      {/* Chat Section */}
      <div className="w-1/2 flex flex-col bg-gray-100 p-4 shadow relative border border-gray-100">
        <button
          onClick={onOpen}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow cursor-pointer hover:bg-gray-50"
        >
          <X className="h-5 w-5" />
        </button>
        {/* Tips if no query */}
        {QnA.length === 0 && <TipsPlaceholder />}
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-2 border border-red-200">
            {error}
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {QnA.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 text-sm">
              <UserQuery content={item.query} />
              {!item.response && <ResponsePending />}
              {item.response && <BotResponse content={item.response} />}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="mt-4 pt-2 border-t border-gray-200 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask about the document..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleQuery()}
            className="flex-1 p-3 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
            disabled={loading}
            autoFocus
          />
          <button
            onClick={handleQuery}
            className={`bg-purple-600 disabled:opacity-60 disabled:cursor-not-allowed text-white px-4 py-2 rounded-full hover:bg-purple-700 shadow-md transition-all duration-200`}
            disabled={loading || !input.trim()}
          >
            ➤
          </button>
        </div>
      </div>

      <div className="w-1/2 bg-white rounded shadow-xl p-4 overflow-y-auto border border-gray-100">
        <PDFViewer />
      </div>
    </div>
  );
}

function UserQuery({ content }: { content: string }) {
  return (
    <div className="flex gap-4 user bg-blue-50 p-4 rounded w-full text-gray-900 shadow fade-in">
      <User size={18} className="text-blue-500" />
      <span>{content}</span>
    </div>
  );
}

function BotResponse({ content }: { content: string }) {
  return (
    <div className="flex gap-4 bot bg-gray-50 px-4 py-3 rounded w-full shadow fade-in prose prose-invert prose-pre:bg-gray-900 prose-code:text-sm">
      <span>
        <Bot size={18} className="text-purple-500" />
      </span>
      <span>
        <ReactMarkdown
          children={content}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        />
      </span>
    </div>
  );
}

function ResponsePending() {
  return (
    <div className="text-white flex gap-4 items-center p-4 rounded bg-gray-50  w-full shadow fade-in">
      <span className="typing flex gap-1 items-end">
        <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce [animation-delay:0s]"></span>
        <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
        <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
      </span>
    </div>
  );
}
