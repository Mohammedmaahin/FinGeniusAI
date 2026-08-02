import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import MobileBottomNav from "../../components/layout/MobileBottomNav";

import {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} from "../../api/goal.api";

import GoalCard from "../../components/goals/GoalCard";
import GoalModal from "../../components/goals/GoalModal";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      const { data } = await getGoals();
      setGoals(data.goals);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (values) => {
    try {
      values.targetAmount = Number(values.targetAmount);
      values.savedAmount = Number(values.savedAmount);

      if (editing) {
        await updateGoal(editing.id, values);
      } else {
        await createGoal(values);
      }

      setOpen(false);
      setEditing(null);

      loadGoals();
    } catch (err) {
      console.error(err);
      alert("Failed to save goal.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete goal?")) return;

    try {
      await deleteGoal(id);
      loadGoals();
    } catch (err) {
      console.error(err);
      alert("Failed to delete goal.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0B1120]">

      <Sidebar />

      <main className="flex-1">

        <Navbar />

        <div className="space-y-6 p-4 pb-24 md:p-8">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>

              <h1 className="text-2xl font-bold text-white md:text-4xl">
                Goals
              </h1>

              <p className="mt-2 text-sm text-gray-400 md:text-base">
                Track your financial goals.
              </p>

            </div>

            <button
              onClick={() => {
                setEditing(null);
                setOpen(true);
              }}
              className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 md:w-auto"
            >
              + Add Goal
            </button>

          </div>

          {goals.length === 0 ? (

            <div className="rounded-3xl border border-dashed border-gray-700 bg-[#111827] p-10 text-center">

              <h2 className="text-xl font-semibold text-white">
                No Goals Yet
              </h2>

              <p className="mt-3 text-gray-400">
                Create your first financial goal to start tracking your progress.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

              {goals.map((goal) => (

                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onEdit={(goal) => {
                    setEditing(goal);
                    setOpen(true);
                  }}
                  onDelete={handleDelete}
                />

              ))}

            </div>

          )}

        </div>

        <GoalModal
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

export default Goals;