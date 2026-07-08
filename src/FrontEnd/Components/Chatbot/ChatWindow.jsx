import { useContext, useEffect, useRef, useState } from "react";
import { FiTrash2, FiX } from "react-icons/fi";

import { ChatContext } from "../../Context/ChatContext";

import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

function ChatWindow() {
  const { isOpen, setIsOpen, clearChat, messages, loading } =
    useContext(ChatContext);

  const bottomRef = useRef(null);

  /*
  ==========================================
  Chat Position
  ==========================================
  */

  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem("chatPosition");

    if (saved) {
      return JSON.parse(saved);
    }

    return {
      x: window.innerWidth - 410,
      y: window.innerHeight - 720,
    };
  });

  /*
  ==========================================
  Dragging
  ==========================================
  */

  const [dragging, setDragging] = useState(false);

  const dragOffset = useRef({
    x: 0,
    y: 0,
  });

  const handleMouseDown = (e) => {
    if (e.target.closest("button") || e.target.closest("textarea")) {
      return;
    }

    setDragging(true);

    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;

    const newX = e.clientX - dragOffset.current.x;
    const newY = e.clientY - dragOffset.current.y;

    setPosition({
      x: newX,
      y: newY,
    });
  };

  const handleMouseUp = () => {
    if (!dragging) return;

    setDragging(false);

    localStorage.setItem("chatPosition", JSON.stringify(position));
  };

  /*
  ==========================================
  Auto Scroll
  ==========================================
  */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  /*
  ==========================================
  Global Mouse Events
  ==========================================
  */

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  /*
  ==========================================
  Clear Chat
  ==========================================
  */

  const handleClearChat = async () => {
    const ok = window.confirm(
      "Are you sure you want to clear your chat history?",
    );

    if (!ok) return;

    await clearChat();
  };

  if (!isOpen) return null;
  return (
    <div
      style={{
        left: position.x,
        top: position.y,
      }}
      className="
      fixed
      z-[9999]

      w-[380px]
      h-[650px]

      rounded-3xl

      bg-[#111214]

      border
      border-[#2A2F36]

      shadow-[0_20px_60px_rgba(0,0,0,0.55)]

      overflow-hidden

      flex
      flex-col

      transition-shadow
      duration-300
    "
    >
      {/* ================= HEADER ================= */}

      <div
        onMouseDown={handleMouseDown}
        className="
        h-20

        px-6

        cursor-move
        select-none

        bg-[#181B20]

        border-b
        border-[#2A2F36]

        flex
        items-center
        justify-between
      "
      >
        <div className="flex items-center gap-4">
          <div
            className="
            w-12
            h-12

            rounded-full

            bg-gradient-to-br
            from-[#EF4444]
            to-[#B91C1C]

            flex
            items-center
            justify-center

            text-white
            font-bold
          "
          >
            AI
          </div>

          <div>
            <h2 className="text-white font-bold text-lg">Techit AI</h2>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>

              <span className="text-xs text-green-400">Online</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleClearChat}
            className="
            p-2

            rounded-lg

            text-gray-400

            hover:text-red-400

            hover:bg-[#24282F]

            transition-all
          "
          >
            <FiTrash2 size={18} />
          </button>

          <button
            onClick={() => setIsOpen(false)}
            className="
            p-2

            rounded-lg

            text-gray-400

            hover:text-white

            hover:bg-[#24282F]

            transition-all
          "
          >
            <FiX size={20} />
          </button>
        </div>
      </div>

      {/* ================= MESSAGES ================= */}

      <div
        className="
        flex-1

        overflow-y-auto

        px-5
        py-5

        bg-[#111214]

        scrollbar-thin
      "
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div
              className="
              w-20
              h-20

              rounded-full

              bg-gradient-to-br
              from-[#EF4444]
              to-[#B91C1C]

              flex
              items-center
              justify-center

              text-white
              text-3xl

              mb-5
            "
            >
              🤖
            </div>

            <h2 className="text-xl font-bold text-white">
              Welcome to Techit AI
            </h2>

            <p className="text-gray-400 mt-3 text-sm leading-7 max-w-[260px]">
              Ask me about products, prices, shipping, warranty, recommendations
              or anything related to our store.
            </p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}

            {loading && <TypingIndicator />}

            <div ref={bottomRef} />
          </>
        )}
      </div>

      {/* ================= INPUT ================= */}

      <div
        className="
        p-4

        border-t

        border-[#2A2F36]

        bg-[#181B20]
      "
      >
        <ChatInput />
      </div>
    </div>
  );
}

export default ChatWindow;
