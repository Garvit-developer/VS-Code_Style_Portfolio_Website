import React, { useState, useRef, useEffect } from "react";
import { marked } from "marked";
import { X, Send, Bot, MessageCircle, Minus, Maximize2, Move } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { type: "incoming", text: "Hi there <br/> How can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [position, setPosition] = useState({
    x: window.innerWidth - 420,
    y: 100,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showDragGuide, setShowDragGuide] = useState(false);
  const [mobileHeight, setMobileHeight] = useState(window.innerHeight);

  const chatboxRef = useRef(null);
  const chatWindowRef = useRef(null);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile) {
        setPosition({ x: 0, y: 0 });
        setMobileHeight(window.innerHeight);
      } else {
        setPosition((prev) => ({
          x: Math.min(prev.x, window.innerWidth - 500),
          y: Math.min(prev.y, window.innerHeight - 530),
        }));
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update mobile height on keyboard open/resize
  useEffect(() => {
    if (!isMobile) return;

    const handleHeightChange = () => {
      setMobileHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleHeightChange);
    return () => window.removeEventListener("resize", handleHeightChange);
  }, [isMobile]);

  // Mouse trail effect for dragging
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (isDragging) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      return () =>
        document.removeEventListener("mousemove", handleGlobalMouseMove);
    }
  }, [isDragging]);

  // Dragging functionality
  const handleMouseDown = (e) => {
    if (isMobile) return; // Disable dragging on mobile

    const rect = chatWindowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
    setShowDragGuide(true);

    chatWindowRef.current.style.transform = "scale(1.02)";
    chatWindowRef.current.style.transition = "transform 0.2s ease";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    const maxX =
      window.innerWidth - (isMinimized ? 400 : chatWindowRef.current?.offsetWidth || 400);
    const maxY =
      window.innerHeight - (isMinimized ? 60 : chatWindowRef.current?.offsetHeight || 600);

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setShowDragGuide(false);

    if (chatWindowRef.current) {
      chatWindowRef.current.style.transform = "scale(1)";
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none";

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.userSelect = "auto";
      };
    }
  }, [isDragging, dragOffset]);

  // Function to format AI responses (links)
  const formatBotResponse = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const links = tempDiv.querySelectorAll("a");
    links.forEach((link) => {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
      link.style.color = "#ef4444";
      link.style.textDecoration = "underline";
      link.addEventListener("mouseover", () => (link.style.color = "#b91c1c"));
      link.addEventListener("mouseout", () => (link.style.color = "#ef4444"));
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

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log("🤖 Bot response:", data);
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
      console.error("❌ Chatbot Error:", error);
      setMessages((prev) => [
        ...prev,
        { type: "incoming", text: " Error connecting to server." },
      ]);
    }
  };

  const handleSend = (msg) => {
    const userMsg = msg || input.trim();
    if (!userMsg) return;

    setMessages((prev) => [...prev, { type: "outgoing", text: userMsg }]);
    setInput("");

    setMessages((prev) => [...prev, { type: "incoming", text: "Thinking..." }]);

    setTimeout(() => {
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

  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = "hidden"; // Disable background scroll
    } else {
      document.body.style.overflow = "auto"; // Re-enable
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [isOpen, isMobile]);

  return (
    <>
      {/* Mouse Trail */}
      {isDragging && !isMobile && (
        <div
          className="fixed w-20 h-20 bg-transparent rounded-full pointer-events-none z-[10001] transition-all duration-75"
          style={{
            left: mousePosition.x - 40,
            top: mousePosition.y - 40,
            transform: "scale(1.5)",
          }}
        />
      )}

      {/* Toggle Button */}
      {(!isOpen || !isMobile) && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`fixed z-50 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-red-500/25 hover:rotate-12 active:scale-95 ${isMobile ? "bottom-16 right-5 w-14 h-14" : "bottom-20 right-4 w-16 h-16"
            }`}
          style={{
            transform: isOpen && !isMobile ? "rotate(180deg)" : "rotate(0deg)",
            transition:
              "transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
          }}
        >
          <span className="flex items-center justify-center">
            {isOpen && !isMobile ? (
              <X size={28} className="transition-all duration-300" />
            ) : (
              <MessageCircle
                size={isMobile ? 24 : 28}
                className="transition-all duration-300"
              />
            )}
          </span>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className={`fixed bg-white flex flex-col z-[100] transition-all duration-300 ${isMobile
            ? "rounded-none"
            : `w-[400px] ${isMinimized ? "h-[60px]" : "h-[500px]"} rounded-2xl shadow-2xl`
            } ${isDragging ? "shadow-red-500/20" : ""}`}
          style={
            isMobile
              ? { top: 0, left: 0, width: "100%", height: mobileHeight }
              : {
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: isDragging ? "grabbing" : "default",
                boxShadow: isDragging
                  ? "0 25px 50px -12px rgba(239, 68, 68, 0.25)"
                  : "",
              }
          }
        >
          {/* Mobile Header */}
          {isMobile ? (
            <>
              <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-500 to-gray-900 text-white p-4 flex items-center justify-between z-50 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 backdrop-blur rounded-full flex items-center justify-center">
                    <img
                      src="/GeekTheoryIcon.webp"
                      alt="logo"
                      className="p-[1px]"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Geek Theory Assistant</h3>
                    <p className="text-xs text-white/80">Always Here to Help</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X size={20} />
                </button>
              </header>

              {/* Add top padding to avoid content being hidden under fixed header */}
              <div className="pt-24">{/* Your mobile content goes here */}</div>
            </>
          ) : (
            /* Desktop Header */
            <header
              className={`bg-gradient-to-r from-gray-700 to-black text-white px-4 py-[15px] rounded-t-2xl flex items-center justify-between cursor-grab active:cursor-grabbing hover:from-gray-800 hover:to-gray-900 transition-all duration-300 ${isDragging ? "opacity-90" : ""
                }`}
              onMouseDown={handleMouseDown}
              onMouseEnter={() =>
                !isDragging &&
                chatWindowRef.current &&
                (chatWindowRef.current.style.transform = "translateY(-2px)")
              }
              onMouseLeave={() =>
                !isDragging &&
                chatWindowRef.current &&
                (chatWindowRef.current.style.transform = "translateY(0)")
              }
            >
              <div className="flex items-center gap-3">
                <div className="w-14 h-10 bg-whi rounded-full flex items-center justify-center shadow-lg">
                  <img src="/GeekTheoryIcon.webp" alt="logo" className="p-[1px]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Geek Theory Assistant</h3>
                  <p className="text-xs text-gray-300">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isDragging && (
                  <Move size={16} className="text-blue-400 animate-pulse" />
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMinimized(!isMinimized);
                  }}
                  className="w-8 h-8 hover:bg-white/10 rounded flex items-center justify-center transition-colors"
                >
                  {isMinimized ? <Maximize2 size={14} /> : <Minus size={14} />}
                </button>
              </div>
            </header>
          )}


          {/* Chat Content */}
          {!isMinimized && (
            <>
              {/* Chatbox */}
              <ul
                ref={chatboxRef}
                className={`flex-1 overflow-y-auto p-4 space-y-4 ${isMobile
                  ? "bg-gradient-to-b from-gray-50 to-white"
                  : "bg-gray-50"
                  }`}
                style={{
                  maxHeight: isMobile
                    ? `calc(${mobileHeight}px - 140px)`
                    : "430px",
                  scrollBehavior: "smooth",
                }}
              >
                {messages.map((msg, idx) =>
                  msg.type === "suggestions" ? (
                    <div
                      key={idx}
                      className="flex flex-wrap gap-2 ml-10 animate-slideUp"
                    >
                      {msg.suggestions.map((sug, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(sug)}
                          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-200 hover:from-red-600 hover:to-red-700"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <li
                      key={idx}
                      className={`flex ${msg.type === "outgoing" ? "justify-end" : "items-start"
                        } animate-slideUp`}
                    >
                      {msg.type === "incoming" && (
                        <span className="bg-gradient-to-br from-red-500 to-red-600 text-white w-8 h-8 flex items-center justify-center rounded-full mr-2 shadow-md animate-pulse-slow">
                          <Bot size={18} />
                        </span>
                      )}
                      <div
                        className={`px-4 py-3 rounded-2xl text-sm shadow-sm transition-all duration-200 hover:shadow-md ${msg.type === "outgoing"
                          ? "bg-gradient-to-r from-red-500 to-red-600 text-white rounded-br-sm max-w-[80%]"
                          : "bg-white text-gray-800 rounded-tl-sm border border-gray-200 max-w-[80%]"
                          }`}
                        dangerouslySetInnerHTML={{ __html: msg.text }}
                      />
                    </li>
                  )
                )}
              </ul>

              {/* Input Area */}
              <div
                className={`border-t bg-white p-4 ${isMobile ? "sticky bottom-0 " : "rounded-b-2xl"
                  }`}
              >
                <div
                  className={`flex items-center gap-3 bg-gray-100 rounded-full p-2 ${isMobile ? "shadow-lg" : ""
                    }`}
                >
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="flex-1 bg-transparent resize-none px-3 py-1 text-sm focus:outline-none placeholder-gray-500"
                    rows={1}
                    style={{ maxHeight: "80px", overflowY: "auto" }}
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim()}
                    className={`p-2 rounded-full transition-all duration-200 ${input.trim()
                      ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg transform hover:scale-105 hover:-rotate-40"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                  >
                    <Send
                      size={18}
                      className={input.trim() ? "transform rotate-45" : ""}
                    />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Chatbot;
