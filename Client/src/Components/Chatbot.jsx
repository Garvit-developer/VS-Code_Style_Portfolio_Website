import React, { useState, useRef, useEffect } from "react";
import { marked } from "marked";
import { Send, Bot, User, X, Sparkles } from "lucide-react";

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { type: "incoming", text: "Hi there! I'm your Copilot. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
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
      link.style.color = "#4fc3f7";
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
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = (msg) => {
    const userMsg = msg || input.trim();
    if (!userMsg) return;

    setMessages((prev) => [...prev, { type: "outgoing", text: userMsg }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
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
    <div className="chatbot-container flex flex-col h-full w-full bg-[#1e1e1e] text-[#cccccc] text-sm">
      {/* Header */}
      <div className="chatbot-header flex items-center justify-between px-3 py-2 bg-gradient-to-r from-[#2d2d30] to-[#252526] border-b border-[#3e3e42] select-none">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#4ec9b0] animate-pulse"></div>
          <span className="font-bold text-[13px] uppercase tracking-wider text-[#cccccc]">
            <Sparkles size={13} className="inline mr-1" />
            Copilot Chat
          </span>
        </div>
        <button
          onClick={onClose}
          className="chatbot-close-btn text-[#cccccc] hover:text-white hover:bg-[#3e3e42] p-1 rounded transition-all duration-200"
          title="Close"
        >
          <X size={16} />
        </button>
      </div>

      {/* Chat Area */}
      <div
        ref={chatboxRef}
        className="flex-1 overflow-y-auto p-3 space-y-3 chatbot-scrollbar"
        style={{ scrollBehavior: "smooth" }}
      >
        {messages.map((msg, idx) =>
          msg.type === "suggestions" ? (
            <div key={idx} className="flex flex-wrap gap-1.5 mt-1.5 animate-fadeIn">
              {msg.suggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(sug)}
                  className="suggestion-btn bg-gradient-to-r from-[#37373d] to-[#2d2d30] hover:from-[#007acc] hover:to-[#005a9e] text-[#cccccc] hover:text-white px-2.5 py-1.5 rounded text-[10px] border border-[#454545] hover:border-[#007acc] transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  {sug}
                </button>
              ))}
            </div>
          ) : (
            <div key={idx} className={`message-wrapper flex gap-2 ${msg.type === "outgoing" ? "flex-row-reverse" : ""} animate-slideIn`}>
              {/* Avatar */}
              <div className={`avatar-container w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${msg.type === "incoming"
                ? "bg-gradient-to-br from-[#007acc] to-[#005a9e] shadow-lg shadow-[#007acc]/30 animate-pulse-subtle"
                : "bg-gradient-to-br from-[#5a5a5a] to-[#3d3d3d] shadow-md"
                }`}>
                {msg.type === "incoming" ? <Bot size={13} className="text-white" /> : <User size={13} className="text-white" />}
              </div>

              {/* Message Content */}
              <div className={`message-content flex-1 max-w-[85%] ${msg.type === "outgoing" ? "text-right" : "text-left"}`}>
                <div className="font-semibold text-[10px] mb-1 text-[#e7e7e7]">
                  {msg.type === "incoming" ? "Copilot" : "You"}
                </div>
                <div
                  className={`message-bubble ${msg.type === "incoming"
                    ? "bg-[#2d2d30] border border-[#3e3e42]"
                    : "bg-gradient-to-r from-[#007acc]/40 to-[#1f9cf0]/30 border border-[#007acc]/40"
                    } rounded-lg px-3 py-2 shadow-md backdrop-blur-sm leading-relaxed break-words transition-all duration-300 hover:shadow-lg text-xs`}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              </div>
            </div>
          )
        )}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-2 animate-slideIn">
            <div className="avatar-container w-6 h-6 rounded-md flex items-center justify-center shrink-0 bg-gradient-to-br from-[#007acc] to-[#005a9e] shadow-lg shadow-[#007acc]/30 animate-pulse">
              <Bot size={13} className="text-white" />
            </div>
            <div className="message-content flex-1">
              <div className="font-semibold text-[10px] mb-1 text-[#e7e7e7]">Copilot</div>
              <div className="message-bubble bg-[#2d2d30] border border-[#3e3e42] rounded-lg px-3 py-2 shadow-md backdrop-blur-sm">
                <div className="typing-indicator flex gap-1">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="chatbot-input-area px-1.5 pt-2 bg-gradient-to-t from-[#252526] to-[#2d2d30] border-t border-[#3e3e42]">
        <div className="input-wrapper relative bg-[#3c3c3c] rounded-lg border-2 border-[#3c3c3c] focus-within:border-[#007acc] focus-within:shadow-lg focus-within:shadow-[#007acc]/20 transition-all duration-300">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Copilot a question about me..."
            className="w-full bg-transparent text-[#cccccc] p-2 pr-10 text-xs resize-none focus:outline-none placeholder-[#858585] chatbot-scrollbar"
            rows={1}
            style={{ minHeight: "26px", maxHeight: "100px" }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className={`send-btn absolute right-2 bottom-2 p-2 rounded-md transition-all duration-300 ${input.trim()
              ? "bg-gradient-to-r from-[#007acc] to-[#005a9e] text-white hover:shadow-lg hover:shadow-[#007acc]/40 hover:scale-110 active:scale-95"
              : "text-[#6e6e6e] cursor-not-allowed opacity-50"
              }`}
          >
            <Send size={14} />
          </button>
        </div>
        <div className="text-[9px] text-[#858585]  text-center flex items-center justify-center gap-1">
          <span className="inline-block w-0.5 h-0.5 bg-[#858585] rounded-full"></span>
          AI-generated content may be incorrect
        </div>
      </div>

      <style>{`
        /* Scrollbar Styling */
        .chatbot-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .chatbot-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .chatbot-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #4a4a4a 0%, #3a3a3a 100%);
          border-radius: 4px;
          border: 2px solid transparent;
          background-clip: content-box;
        }
        .chatbot-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #5a5a5a 0%, #4a4a4a 100%);
          background-clip: content-box;
        }

        /* Animations */
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes pulseSubtle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-8px);
            opacity: 1;
          }
        }

        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-pulse-subtle {
          animation: pulseSubtle 3s ease-in-out infinite;
        }

        /* Typing Indicator */
        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .typing-indicator .dot {
          width: 5px;
          height: 5px;
          background: #007acc;
          border-radius: 50%;
          animation: typing 1.4s infinite;
        }

        .typing-indicator .dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator .dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        /* Message Bubble Enhancements */
        .message-bubble {
          position: relative;
          overflow: hidden;
        }

        .message-bubble::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
          transition: left 0.5s;
        }

        .message-bubble:hover::before {
          left: 100%;
        }

        /* Code blocks in messages */
        .message-bubble pre {
          background: rgba(0, 0, 0, 0.3);
          padding: 6px;
          border-radius: 4px;
          margin: 8px 0;
          overflow-x: auto;
        }

        .message-bubble code {
          background: rgba(0, 0, 0, 0.2);
          padding: 1px 4px;
          border-radius: 2px;
          font-family: 'Consolas', 'Monaco', monospace;
          font-size: 0.9em;
        }

        .message-bubble pre code {
          background: transparent;
          padding: 0;
        }

        /* Links in messages */
        .message-bubble a {
          color: #4fc3f7;
          text-decoration: underline;
          transition: color 0.2s;
        }

        .message-bubble a:hover {
          color: #81d4fa;
        }

        /* Close button hover effect */
        .chatbot-close-btn:hover {
          transform: rotate(90deg);
        }

        /* Send button pulse when active */
        .send-btn:not(:disabled):hover {
          animation: pulseSubtle 1s ease-in-out infinite;
        }

        /* Suggestion button shine effect */
        .suggestion-btn {
          position: relative;
          overflow: hidden;
        }

        .suggestion-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s;
        }

        .suggestion-btn:hover::before {
          left: 100%;
        }

        /* Container fade-in */
        .chatbot-container {
          animation: fadeIn 0.3s ease-out;
        }

        /* Header gradient animation */
        .chatbot-header {
          position: relative;
          overflow: hidden;
        }

        .chatbot-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 122, 204, 0.1), transparent);
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
