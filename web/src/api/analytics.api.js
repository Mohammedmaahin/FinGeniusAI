import api from "./axios";

export const getAnalytics = () =>
  api.get("/analytics");

export const getFinancialScore = () =>
  api.get("/financial-score");