function TypingIndicator() {
  return (
    <div className="flex justify-start mb-5">
      <div className="bg-[#181B20] border border-[#2A2F36] rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex gap-2">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>

          <span
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.15s" }}
          ></span>

          <span
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.3s" }}
          ></span>
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;
