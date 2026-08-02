import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import MobileBottomNav from "../../components/layout/MobileBottomNav";

import StatCard from "../../components/dashboard/StatCard";

import {
  getFinancialScore,
  getAnalytics,
  getAIAdvice,
} from "../../api/dashboard.api";

const Dashboard = () => {
  const [score, setScore] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [scoreRes, analyticsRes, adviceRes] =
        await Promise.all([
          getFinancialScore(),
          getAnalytics(),
          getAIAdvice(),
        ]);

      setScore(scoreRes.data.score);
      setAnalytics(analyticsRes.data.analytics);
      setAdvice(adviceRes.data.advice);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-[#0B1120]">

      <Sidebar />

      <main className="flex-1">

        <Navbar />

        <div className="space-y-6 p-4 pb-24 md:p-8">

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <StatCard
              title="Financial Score"
              value={score?.score ?? 0}
              color="bg-gradient-to-r from-blue-600 to-indigo-600"
            />

            <StatCard
              title="Income"
              value={`₹${analytics?.income ?? 0}`}
              color="bg-gradient-to-r from-green-500 to-green-700"
            />

            <StatCard
              title="Expense"
              value={`₹${analytics?.expense ?? 0}`}
              color="bg-gradient-to-r from-red-500 to-red-700"
            />

            <StatCard
              title="Balance"
              value={`₹${analytics?.balance ?? 0}`}
              color="bg-gradient-to-r from-purple-500 to-pink-600"
            />

          </div>

          <div className="rounded-3xl bg-white p-5 shadow-xl md:p-8 dark:bg-gray-900">

            <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
              🤖 AI Financial Coach
            </h2>

            <p className="leading-7 text-gray-700 dark:text-gray-300">
              {advice}
            </p>

          </div>

        </div>

        <MobileBottomNav />

      </main>

    </div>
  );
};

export default Dashboard;