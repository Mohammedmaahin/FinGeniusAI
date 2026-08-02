import openrouter from "../config/openrouter.js";
import { AI_MODEL } from "../constants/aiModels.js";

import { generateSummary } from "./summary.service.js";
import {
  buildCoachPrompt,
  buildChatPrompt,
} from "./prompt.service.js";

import {
  getCachedAdvice,
  saveAdvice,
} from "./aiCache.service.js";


export const financialCoach = async (userId) => {

  const cached = await getCachedAdvice(userId);

  if (cached) {
    return cached;
  }

  const summary = await generateSummary(userId);

  const prompt = buildCoachPrompt(summary);

  const response = await openrouter.post(
    "/chat/completions",
    {
      model: AI_MODEL,

      max_tokens: 220,

      temperature: 0.5,

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }
  );

  const advice =
    response.data.choices[0].message.content;

  await saveAdvice(userId, advice);

  return advice;
};


export const chatWithAI = async (userId, message) => {
  const summary = await generateSummary(userId);

  const prompt = buildChatPrompt(summary, message);

  const response = await openrouter.post(
    "/chat/completions",
    {
      model: AI_MODEL,
      max_tokens: 220,
      temperature: 0.3,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }
  );

  return response.data.choices[0].message.content;
};