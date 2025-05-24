import React, { useState, useEffect } from "react";

export default function AIChat({ triggerOpen }) {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello! I'm here to help you stay focused. Ask me anything.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { type: "user", text: input }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Thanks! Here's a tip: Take a deep breath before your next session.",
        },
      ]);
    }, 800);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  // Tự động mở chat nếu triggerOpen từ Timer
  useEffect(() => {
    if (triggerOpen) setIsOpen(true);
  }, [triggerOpen]);

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-purple-500 hover:bg-purple-400 text-white px-4 py-2 rounded-full shadow-lg z-50"
        >
          💬 Chat
        </button>
      )}

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[350px] bg-slate-800 rounded-2xl p-4 shadow-xl z-50">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-purple-300">
              🌿 AI Chat
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-sm text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto mb-3 text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`px-4 py-2 rounded-xl ${
                  msg.type === "bot"
                    ? "bg-slate-700 text-white"
                    : "bg-purple-500 text-white ml-auto w-fit"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-slate-700 text-white px-4 py-2 rounded-xl focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={sendMessage}
              className="bg-purple-500 hover:bg-purple-400 text-white font-semibold px-4 py-2 rounded-xl"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
