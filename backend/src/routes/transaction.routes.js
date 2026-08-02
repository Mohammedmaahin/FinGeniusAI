import express from "express";
import protect from "../middleware/auth.middleware.js";

import {
  addTransaction,
  fetchTransactions,
  editTransaction,
  removeTransaction,
} from "../controllers/transaction.controller.js";

const router = express.Router();

router.post("/", protect, addTransaction);

router.get("/", protect, fetchTransactions);

router.put("/:id", protect, editTransaction);

router.delete("/:id", protect, removeTransaction);

export default router;