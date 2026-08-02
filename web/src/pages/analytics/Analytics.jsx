import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

import {
  getAnalytics,
  getFinancialScore,
} from "../../api/analytics.api";

import { getGoals } from "../../api/goal.api";

import StatCard from "../../components/dashboard/StatCard";
import IncomeExpenseChart from "../../components/analytics/IncomeExpenseChart";
import CategoryPieChart from "../../components/analytics/CategoryPieChart";

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [score, setScore] = useState(null);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [analyticsRes, scoreRes, goalsRes] =
        await Promise.all([
          getAnalytics(),
          getFinancialScore(),
          getGoals(),
        ]);

      setAnalytics(analyticsRes.data.analytics);
      setScore(scoreRes.data.score);
      setGoals(goalsRes.data.goals);
    } catch (err) {
      console.error(err);
    }
  };

  const totalGoals = goals.length;

  const completedGoals = goals.filter(
    (g) => g.savedAmount >= g.targetAmount
  ).length;

  const activeGoals = totalGoals - completedGoals;

  return (
    <div className="flex min-h-screen bg-[#0B1120]">

      <Sidebar />

      <main className="flex-1">

        <Navbar />

        <div className="space-y-8 p-8">

          <div>

            <h1 className="text-4xl font-bold text-white">
              Financial Analytics
            </h1>

            <p className="mt-2 text-gray-400">
              Track your financial performance and goals.
            </p>

          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

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
              color="bg-gradient-to-r from-blue-600 to-indigo-700"
            />

            <StatCard
              title="Score"
              value={score?.score ?? 0}
              color="bg-gradient-to-r from-purple-600 to-pink-600"
            />

          </div>

          <div className="grid gap-6 xl:grid-cols-2">

            <IncomeExpenseChart analytics={analytics} />

            <CategoryPieChart analytics={analytics} />

          </div>

          <div className="rounded-3xl border border-gray-700 bg-[#111827] p-6">

            <h2 className="mb-6 text-2xl font-bold text-white">
              🎯 Goal Analytics
            </h2>

            <div className="grid gap-6 md:grid-cols-3">

              <div className="rounded-2xl bg-[#1F2937] p-6">

                <p className="text-gray-400">
                  Total Goals
                </p>

                <h3 className="mt-3 text-4xl font-bold text-white">
                  {totalGoals}
                </h3>

              </div>

              <div className="rounded-2xl bg-[#1F2937] p-6">

                <p className="text-gray-400">
                  Active Goals
                </p>

                <h3 className="mt-3 text-4xl font-bold text-yellow-400">
                  {activeGoals}
                </h3>

              </div>

              <div className="rounded-2xl bg-[#1F2937] p-6">

                <p className="text-gray-400">
                  Completed Goals
                </p>

                <h3 className="mt-3 text-4xl font-bold text-green-400">
                  {completedGoals}
                </h3>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Analytics;