import express from "express";
import protect from "../middleware/auth.middleware.js";

import {
  addGoal,
  fetchGoals,
  editGoal,
  removeGoal
} from "../controllers/goal.controller.js";

const router = express.Router();

router.post("/", protect, addGoal);

router.get("/", protect, fetchGoals);

router.put("/:id", protect, editGoal);

router.delete("/:id", protect, removeGoal);

export default router;