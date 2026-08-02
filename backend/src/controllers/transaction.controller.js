import { transactionSchema } from "../validations/transaction.validation.js";
import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from "../services/transaction.service.js";

export const addTransaction = async (req, res) => {
  try {
    const data = transactionSchema.parse(req.body);

    const transaction = await createTransaction(req.user.id, data);

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      transaction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const fetchTransactions = async (req, res) => {
  try {
    const transactions = await getTransactions(req.user.id);

    res.status(200).json({
      success: true,
      transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editTransaction = async (req, res) => {
  try {
    const transaction = await updateTransaction(
      req.params.id,
      req.user.id,
      req.body
    );

    res.json({
      success: true,
      message: "Transaction updated successfully",
      transaction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeTransaction = async (req, res) => {
  try {
    await deleteTransaction(req.params.id, req.user.id);

    res.json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};