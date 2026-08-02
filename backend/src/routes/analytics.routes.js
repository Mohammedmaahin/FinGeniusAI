import express from "express";

import protect from "../middleware/auth.middleware.js";

import { analytics } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/", protect, analytics);

export default router;