import { useContext, useState } from "react";
import { FiSend } from "react-icons/fi";
import { ChatContext } from "../../Context/ChatContext";
import { sendMessage } from "../../services/chatService";

function ChatInput() {
  const { addMessage, loading, setLoading } = useContext(ChatContext);

  const [text, setText] = useState("");

  const handleSend = async () => {
    if (!text.trim() || loading) return;

    const userMessage = text.trim();

    addMessage({
      role: "user",
      content: userMessage,
    });

    setText("");

    setLoading(true);

    try {
      const response = await sendMessage(userMessage);

      addMessage({
        role: "assistant",
        content: response.reply,
      });
    } catch (error) {
      console.log(error);
      console.log(error.response);

      addMessage({
        role: "assistant",
        content:
          error.response?.data?.message ||
          error.message ||
          "Sorry, something went wrong.",
      });
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-3">
      <textarea
        rows={1}
        value={text}
        disabled={loading}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask Techit AI..."
        className="
        flex-1

        bg-[#111214]

        text-white

        border

        border-[#2A2F36]

        rounded-xl

        px-4

        py-3

        resize-none

        outline-none

        focus:border-[#EF4444]
      "
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className="
        w-12

        rounded-xl

        bg-[#EF4444]

        hover:bg-[#DC2626]

        text-white

        flex

        items-center

        justify-center

        transition
      "
      >
        <FiSend size={20} />
      </button>
    </div>
  );
}

export default ChatInput;
