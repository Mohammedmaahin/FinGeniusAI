import { Bot, User } from "lucide-react";

const ChatBubble = ({ type, text }) => {
  const isUser = type === "user";

  return (
    <div
      className={`flex items-end gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg">
          <Bot size={20} className="text-white" />
        </div>
      )}

      <div
        className={`max-w-[90%] rounded-3xl px-5 py-4 shadow-lg sm:max-w-[75%] ${
          isUser
            ? "rounded-br-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white"
            : "rounded-bl-lg border border-gray-700 bg-[#111827] text-gray-100"
        }`}
      >
        <p className="whitespace-pre-wrap break-words leading-7">
          {text}
        </p>
      </div>

      {isUser && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg">
          <User size={20} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default ChatBubble;