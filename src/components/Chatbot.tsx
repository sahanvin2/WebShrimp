import { useState, useRef, useEffect, PointerEvent } from "react";
import { X, Send, Sparkles, Trash2, MessageSquareDashed } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "@/lib/site";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: -1, y: -1 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0 });
  const chatRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<{ role: "user" | "assistant", content: string }[]>([
    { role: "assistant", content: "Hi! I'm the AI assistant for Loopingon. How can I help you with your project today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle Dragging
  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (window.innerWidth < 640) return; // Disable drag on mobile
    if (!chatRef.current) return;
    const rect = chatRef.current.getBoundingClientRect();

    if (position.x === -1) {
      setPosition({ x: rect.left, y: rect.top });
      dragRef.current.initialX = rect.left;
      dragRef.current.initialY = rect.top;
    } else {
      dragRef.current.initialX = position.x;
      dragRef.current.initialY = position.y;
    }

    dragRef.current.startX = e.clientX;
    dragRef.current.startY = e.clientY;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || window.innerWidth < 640) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;

    let newX = dragRef.current.initialX + dx;
    let newY = dragRef.current.initialY + dy;

    if (chatRef.current) {
      const rect = chatRef.current.getBoundingClientRect();
      const maxX = window.innerWidth - rect.width;
      const maxY = window.innerHeight - rect.height;
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));
    }

    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (window.innerWidth < 640) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // Chat logic
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const newMessages = [...messages, { role: "user" as const, content: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Connect to the backend API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with the server.");
      }

      const data = await response.json();
      
      if (data.message) {
        setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
      } else if (data.error) {
        setMessages(prev => [...prev, { role: "assistant", content: `Error: ${data.error}` }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I couldn't process that response." }]);
      }
    } catch (error: any) {
      setMessages(prev => [...prev, { role: "assistant", content: `Connection error. Please try again or reach out on WhatsApp.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 640;
  const style = (position.x !== -1 && isDesktop)
    ? { left: position.x, top: position.y, right: 'auto', bottom: 'auto' }
    : {};

  const renderMessageContent = (content: string) => {
    // If there is any mention of WhatsApp, let's inject a button at the bottom of the message
    const lowerContent = content.toLowerCase();
    const hasWhatsapp = lowerContent.includes("whatsapp") || lowerContent.includes("contact");
    
    return (
      <div className="flex flex-col gap-3">
        <span className="whitespace-pre-wrap break-words">{content}</span>
        {hasWhatsapp && (
          <a
            href={`https://wa.me/${siteConfig.phoneDisplay.replace(/[^0-9]/g, '')}?text=Hello! I was chatting with your AI assistant and I'd like to discuss a project.`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 py-3 px-5 bg-black hover:bg-black/90 text-white text-[13px] font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2.5 w-fit self-start active:scale-95"
          >
            <FaWhatsapp className="h-4 w-4" />
            <span>Chat on WhatsApp</span>
          </a>
        )}
      </div>
    );
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-black text-white shadow-2xl flex items-center justify-center hover:bg-black/85 hover:shadow-2xl transition-all duration-300 z-50 overflow-hidden group border border-white/20 hover:border-white/40 backdrop-blur-sm"
          aria-label="Open AI Assistant"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 relative z-10 group-hover:scale-110 transition-transform duration-300" />
        </button>
      )}

      {isOpen && (
        <div
          ref={chatRef}
          style={style}
          className={`fixed z-[9999] flex flex-col bg-white shadow-2xl overflow-hidden transition-all sm:transition-none duration-300
                     bottom-0 left-0 right-0 w-full h-[85vh] rounded-t-[2rem] border-t border-border
                     sm:bottom-8 sm:right-8 sm:left-auto sm:w-[380px] sm:h-[650px] sm:max-h-[85vh] sm:rounded-[2rem] sm:border sm:border-border/50
                     ${isDragging ? "touch-none" : ""}`}
        >
          {/* Header */}
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="p-4 sm:p-5 flex items-center justify-between sm:cursor-move select-none relative shrink-0 bg-gradient-to-r from-black to-gray-900 border-b border-white/10"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-full backdrop-blur-md hover:bg-white/20 transition-colors">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-[15px]">AI Assistant</span>
                <span className="text-white/50 text-[11px] font-medium tracking-wide uppercase">Loopingon</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMessages([{ role: "assistant", content: "Hi! I'm the AI assistant for Loopingon. How can I help you with your project today?" }]);
                }}
                className="text-white/60 hover:text-white bg-transparent hover:bg-white/10 p-2 rounded-full transition-colors"
                title="Clear Chat"
                aria-label="Clear Chat"
                onPointerDown={(e) => e.stopPropagation()}
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                className="text-white/60 hover:text-white bg-transparent hover:bg-white/10 p-2 rounded-full transition-colors"
                title="Close"
                aria-label="Close"
                onPointerDown={(e) => e.stopPropagation()}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto flex flex-col gap-5 bg-[#fafafa] overscroll-contain">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-5 py-3.5 text-[14px] leading-relaxed shadow-sm ${
                    m.role === "user"
                      ? "bg-brand-navy text-white rounded-[1.2rem] rounded-br-sm"
                      : "bg-white border border-border text-brand-navy rounded-[1.2rem] rounded-tl-sm"
                  }`}
                >
                  {renderMessageContent(m.content)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-border rounded-[1.2rem] rounded-tl-sm px-5 py-4 shadow-sm flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex flex-col bg-white border-t border-border shrink-0 p-4" onPointerDown={(e) => e.stopPropagation()}>
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-2 p-1.5 bg-[#f5f5f5] rounded-full border border-border/50 focus-within:border-brand-blue/30 focus-within:bg-white transition-all"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message AI..."
                className="flex-1 bg-transparent border-none px-4 py-2 text-[14px] focus:outline-none text-brand-navy placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="h-10 w-10 shrink-0 rounded-full bg-brand-navy text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-blue transition-colors group"
              >
                <Send className="h-[16px] w-[16px] ml-0.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
            <div className="mt-3 text-center">
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Powered by Loopingon AI</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
