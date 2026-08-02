import api from "./axios";

export const getAIAdvice = () =>
  api.get("/ai/coach");

export const askAI = (message) =>
  api.post("/ai/chat", {
    message,
  });