import express from "express";
import protect from "../middleware/auth.middleware.js";
import { generateSummary } from "../services/summary.service.js";

const router = express.Router();

router.get("/summary", protect, async (req, res) => {
  const summary = await generateSummary(req.user.id);

  res.json({
    success: true,
    summary,
  });
});

export default router;