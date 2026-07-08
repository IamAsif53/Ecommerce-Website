function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex mb-5 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-md ${
          isUser
            ? "bg-[#EF4444] text-white rounded-br-md"
            : "bg-[#181B20] text-gray-200 border border-[#2A2F36] rounded-bl-md"
        }`}
      >
        <p className="text-sm leading-6 whitespace-pre-wrap">
          {message.content}
        </p>

        <p className="text-[10px] mt-2 opacity-60 text-right">
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}

export default ChatMessage;
