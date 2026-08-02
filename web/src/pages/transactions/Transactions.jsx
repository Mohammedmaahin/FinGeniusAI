// src/pages/transactions/Transactions.jsx

import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../../api/transaction.api";

import TransactionTable from "../../components/transactions/TransactionTable";
import TransactionModal from "../../components/transactions/TransactionModal";
import MobileBottomNav from "../../components/layout/MobileBottomNav";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const { data } = await getTransactions();
      setTransactions(data.transactions);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmed) return;

    try {
      await deleteTransaction(id);
      loadTransactions();
    } catch (err) {
      console.error(err);
      alert("Failed to delete transaction.");
    }
  };

  const handleEdit = (transaction) => {
    setEditing(transaction);
    setOpen(true);
  };

  const handleSubmit = async (values) => {
    try {
      values.amount = Number(values.amount);

      if (editing) {
        await updateTransaction(editing.id, values);
      } else {
        await createTransaction(values);
      }

      setOpen(false);
      setEditing(null);

      loadTransactions();
    } catch (err) {
      console.error(err);
      alert("Failed to save transaction.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0B1120]">
      <Sidebar />

      <main className="flex-1">
        <Navbar />

        <div className="p-4 pb-24 md:p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">
                Transactions
              </h1>

              <p className="mt-2 text-gray-400">
                Manage your income and expenses
              </p>
            </div>

            <button
              onClick={() => {
                setEditing(null);
                setOpen(true);
              }}
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              + Add Transaction
            </button>
          </div>

          <TransactionTable
            transactions={transactions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <TransactionModal
          open={open}
          initialData={editing}
          onSubmit={handleSubmit}
          onClose={() => {
            setOpen(false);
            setEditing(null);
          }}
        />
        <MobileBottomNav />
      </main>
    </div>
  );
};

export default Transactions;