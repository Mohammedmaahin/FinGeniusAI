import { Pencil, Trash2 } from "lucide-react";

const GoalCard = ({
  goal,
  onEdit,
  onDelete,
}) => {

  const percentage = Math.min(
    100,
    (goal.savedAmount / goal.targetAmount) * 100 || 0
  );

  return (
    <div className="rounded-3xl border border-gray-700 bg-[#111827] p-6">

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-xl font-bold text-white">
            {goal.title}
          </h2>

          <p className="mt-2 text-gray-400">
            Target ₹{goal.targetAmount}
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={() => onEdit(goal)}
            className="text-blue-400"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(goal.id)}
            className="text-red-400"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

      <div className="mt-6 h-3 rounded-full bg-gray-700">

        <div
          className="h-3 rounded-full bg-blue-600"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <div className="mt-4 flex justify-between">

        <span className="text-gray-400">

          Saved

        </span>

        <span className="font-semibold text-white">

          ₹{goal.savedAmount}

        </span>

      </div>

      <div className="mt-2 flex justify-between">

        <span className="text-gray-400">

          Deadline

        </span>

        <span className="text-white">

          {new Date(goal.deadline).toLocaleDateString()}

        </span>

      </div>

    </div>
  );
};

export default GoalCard;