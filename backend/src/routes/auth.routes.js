import express from "express";
import protect from "../middleware/auth.middleware.js";

import {
  register,
  login,
  getProfile,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth Route Working",
  });
});

router.post("/register", register);

router.post("/login", login);

router.get("/me", protect, getProfile);

export default router;