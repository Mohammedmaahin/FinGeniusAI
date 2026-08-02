import { useEffect, useRef, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import MobileBottomNav from "../../components/layout/MobileBottomNav";

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
          text:
            "👋 Welcome to FinGeniusAI!\n\nI'm your personal AI Financial Coach.\n\nAsk me about budgeting, savings, investments, expenses or your financial goals.",
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

        <div className="mx-auto w-full max-w-5xl p-4 pb-24 md:p-8">

          <h1 className="text-2xl font-bold text-white md:text-4xl">
            🤖 AI Financial Coach
          </h1>

          <p className="mt-2 text-sm text-gray-400 md:text-base">
            Ask anything about budgeting, savings,
            investments or your financial goals.
          </p>

          {messages.length <= 2 && (
            <div className="mt-6 mb-8">
              <SuggestedQuestions
                onAsk={sendMessage}
              />
            </div>
          )}

          <div className="mb-6 space-y-4">

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
                text="🤖 FinGeniusAI is thinking..."
              />
            )}

            <div ref={messagesEndRef} />

          </div>

          <div className="sticky bottom-20 z-10 rounded-2xl bg-[#0B1120]/95 backdrop-blur">

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
                placeholder="Ask FinGeniusAI..."
                className="flex-1 rounded-xl border border-gray-700 bg-[#111827] p-4 text-white outline-none transition focus:border-blue-500 disabled:opacity-60"
              />

              <button
                disabled={loading}
                onClick={() =>
                  sendMessage(input)
                }
                className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Thinking..."
                  : "Send"}
              </button>

            </div>

          </div>

        </div>

        <MobileBottomNav />

      </main>

    </div>
  );
};

export default AICoach;