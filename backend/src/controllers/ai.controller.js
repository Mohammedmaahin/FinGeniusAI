import {
  financialCoach,
  chatWithAI,
} from "../services/ai.service.js";

import { chatSchema } from "../validations/chat.validation.js";

export const coach = async (req, res) => {

  try {

    const advice = await financialCoach(req.user.id);

    res.json({
      success: true,
      advice,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

export const chat = async (req, res) => {
  try {
    const { message } = chatSchema.parse(req.body);

    const reply = await chatWithAI(
      req.user.id,
      message
    );

    res.json({
      success: true,
      reply,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};