import api from "./axios";

export const getDashboard = () =>
  api.get("/dashboard");

export const getFinancialScore = () =>
  api.get("/financial-score");

export const getAnalytics = () =>
  api.get("/analytics");

export const getAIAdvice = () =>
  api.get("/ai/coach");