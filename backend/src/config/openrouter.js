import axios from "axios";

const openrouter = axios.create({
  baseURL: "https://openrouter.ai/api/v1",

  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,

    "HTTP-Referer": "http://localhost:5000",

    "X-Title": "FinGeniusAI",

    "Content-Type": "application/json",
  },
});

export default openrouter;