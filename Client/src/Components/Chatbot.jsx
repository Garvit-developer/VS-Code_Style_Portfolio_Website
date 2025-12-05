import React, { useState, useRef, useEffect } from "react";
import { marked } from "marked";
import { Send, Bot, User } from "lucide-react";

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { type: "incoming", text: "Hi there! I'm your Copilot. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const chatboxRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const formatBotResponse = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const links = tempDiv.querySelectorAll("a");
    links.forEach((link) => {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
      link.style.color = "#3794ff";
      link.style.textDecoration = "underline";
    });

    return tempDiv.innerHTML;
  };

  const generateResponse = async (userMsg) => {
    const API_URL = "http://localhost:5000/api/chat";
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: userMsg, history: [] }),
      });

      if (!response.ok) throw new Error("Server Error");

      const data = await response.json();
      const botResponse = data.reply || "No reply received from server.";

      setMessages((prev) => [
        ...prev,
        { type: "incoming", text: formatBotResponse(marked.parse(botResponse)) },
      ]);

      if (data.suggestions?.length > 0) {
        setMessages((prev) => [
          ...prev,
          { type: "suggestions", suggestions: data.suggestions },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { type: "incoming", text: "Error connecting to server." },
      ]);
      console.error(error);
    }
  };

  const handleSend = (msg) => {
    const userMsg = msg || input.trim();
    if (!userMsg) return;

    setMessages((prev) => [...prev, { type: "outgoing", text: userMsg }]);
    setInput("");

    // Simulate thinking
    setMessages((prev) => [...prev, { type: "incoming", text: "Thinking..." }]);

    setTimeout(() => {
      // Remove "Thinking..."
      setMessages((prev) => prev.slice(0, -1));
      generateResponse(userMsg);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="flex flex-col h-full w-full bg-[#252526] text-[#cccccc] font-sans text-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#3e3e42] select-none">
        <span className="font-semibold text-xs uppercase tracking-wider text-[#bbbbbb]">Chat</span>
        {/* Optional: Add more header controls like 'Clear Chat' here */}
      </div>

      {/* Chat Area */}
      <div
        ref={chatboxRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
        style={{ scrollBehavior: "smooth" }}
      >
        {messages.map((msg, idx) =>
          msg.type === "suggestions" ? (
            <div key={idx} className="flex flex-wrap gap-2 mt-2">
              {msg.suggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(sug)}
                  className="bg-[#37373d] hover:bg-[#2a2d2e] text-[#cccccc] px-3 py-1 rounded-sm text-xs border border-[#454545] transition-colors"
                >
                  {sug}
                </button>
              ))}
            </div>
          ) : (
            <div key={idx} className={`flex gap-3 ${msg.type === "outgoing" ? "flex-row-reverse" : ""}`}>
              {/* Avatar */}
              <div className={`w-6 h-6 rounded-sm flex items-center justify-center shrink-0 ${msg.type === "incoming" ? "bg-[#007acc]" : "bg-[#4d4d4d]"}`}>
                {msg.type === "incoming" ? <Bot size={14} className="text-white" /> : <User size={14} className="text-white" />}
              </div>

              {/* Message Content */}
              <div className={`flex-1 max-w-[85%] ${msg.type === "outgoing" ? "text-right" : "text-left"}`}>
                <div className="font-bold text-xs mb-1 text-[#e7e7e7]">
                  {msg.type === "incoming" ? "Copilot" : "You"}
                </div>
                <div
                  className="leading-relaxed break-words"
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              </div>
            </div>
          )
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#252526] border-t border-[#3e3e42]">
        <div className="relative bg-[#3c3c3c] rounded-sm border border-[#3c3c3c] focus-within:border-[#007acc] transition-colors">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Copilot a question or type '/' for commands"
            className="w-full bg-transparent text-[#cccccc] p-2 pr-10 text-sm resize-none focus:outline-none placeholder-[#858585] custom-scrollbar"
            rows={1}
            style={{ minHeight: "36px", maxHeight: "120px" }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className={`absolute right-2 bottom-2 p-1 rounded-sm transition-colors ${input.trim() ? "text-white hover:bg-[#4d4d4d]" : "text-[#6e6e6e] cursor-not-allowed"
              }`}
          >
            <Send size={14} />
          </button>
        </div>
        <div className="text-[10px] text-[#858585] mt-2 text-center">
          AI-generated content may be incorrect.
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #424242;
          border-radius: 0px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4f4f4f;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
