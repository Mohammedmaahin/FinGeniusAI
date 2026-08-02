import express from "express";

import protect from "../middleware/auth.middleware.js";

import {
  coach,
  chat,
} from "../controllers/ai.controller.js";

const router = express.Router();

// Dashboard AI Summary
router.get("/coach", protect, coach);

// AI Chat
router.post("/chat", protect, chat);

export default router;