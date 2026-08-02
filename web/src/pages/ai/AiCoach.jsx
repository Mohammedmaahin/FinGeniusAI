import { useEffect, useRef, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

import { getAIAdvice, askAI } from "../../api/ai.api";

import ChatBubble from "../../components/ai/ChatBubble";
import SuggestedQuestions from "../../components/ai/SuggestedQuestions";

const AICoach = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadInitialAdvice();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const loadInitialAdvice = async () => {
    try {
      setMessages([
        {
          type: "ai",
          text: "👋 Welcome to FinGeniusAI! I'm your personal AI financial coach. Ask me anything about budgeting, savings, investments or your financial goals.",
        },
      ]);

      const { data } = await getAIAdvice();

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: data.advice,
        },
      ]);
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          err.message
      );
    }
  };

  const sendMessage = async (message) => {
    if (!message.trim() || loading) return;

    const userMessage = {
      type: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const { data } = await askAI(message);

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: data.reply,
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text:
            err.response?.data?.message ||
            "Unable to contact AI.",
        },
      ]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-[#0B1120]">
      <Sidebar />

      <main className="flex-1">
        <Navbar />

        <div className="mx-auto w-full max-w-5xl p-4 md:p-6 lg:p-8">
          <h1 className="mb-2 text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            🤖 AI Financial Coach
          </h1>

          <p className="mb-8 text-gray-400">
            Ask anything about budgeting, savings,
            investments or your financial goals.
          </p>

          {messages.length <= 2 && (
            <div className="mb-8">
              <SuggestedQuestions
                onAsk={sendMessage}
              />
            </div>
          )}

          <div className="mb-8 space-y-4">
            {messages.map((message, index) => (
              <ChatBubble
                key={index}
                type={message.type}
                text={message.text}
              />
            ))}

            {loading && (
              <ChatBubble
                type="ai"
                text="🤖 FinGeniusAI is analyzing your finances..."
              />
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={input}
              disabled={loading}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage(input);
                }
              }}
              placeholder="Ask about savings, budgeting, investments, goals..."
              className="flex-1 rounded-xl border border-gray-700 bg-[#111827] p-4 text-white outline-none disabled:opacity-60"
            />

            <button
              disabled={loading}
              onClick={() => sendMessage(input)}
              className="rounded-xl bg-blue-600 px-8 py-4 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Thinking..." : "Send"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AICoach;