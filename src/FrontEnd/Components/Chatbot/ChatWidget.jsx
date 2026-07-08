import { useContext } from "react";
import { ChatContext } from "../../Context/ChatContext";
import { FiMessageCircle, FiX } from "react-icons/fi";

import ChatWindow from "./ChatWindow";

function ChatWidget() {
  const { isOpen, setIsOpen } = useContext(ChatContext);

  return (
    <>
      <ChatWindow />
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
        fixed
        bottom-6
        right-6
        z-[9999]

        w-16
        h-16

        rounded-full

        bg-gradient-to-br
        from-[#EF4444]
        to-[#B91C1C]

        text-white

        flex
        items-center
        justify-center

        shadow-2xl
        shadow-red-500/40

        hover:scale-110
        hover:rotate-6

        transition-all
        duration-300

        animate-pulse
      "
      >
        {isOpen ? (
          <FiX className="text-3xl" />
        ) : (
          <FiMessageCircle className="text-3xl" />
        )}
      </button>
    </>
  );
}

export default ChatWidget;
