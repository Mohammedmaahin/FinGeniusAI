import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

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

    if (!window.confirm("Delete goal?"))
      return;

    await deleteGoal(id);

    loadGoals();

  };

  return (
    <div className="flex min-h-screen bg-[#0B1120]">

      <Sidebar />

      <main className="flex-1">

        <Navbar />

        <div className="p-8">

          <div className="mb-8 flex items-center justify-between">

            <div>

              <h1 className="text-4xl font-bold text-white">
                Goals
              </h1>

              <p className="text-gray-400">
                Track your financial goals.
              </p>

            </div>

            <button
              onClick={() => {
                setEditing(null);
                setOpen(true);
              }}
              className="rounded-xl bg-blue-600 px-5 py-3 text-white"
            >
              + Add Goal
            </button>

          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

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

      </main>

    </div>
  );
};

export default Goals;