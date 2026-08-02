import express from "express";

import protect from "../middleware/auth.middleware.js";

import { getFinancialScore } from "../controllers/financialScore.controller.js";

const router = express.Router();

router.get("/",protect,getFinancialScore);

export default router;