import { useForm } from "react-hook-form";

const GoalModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues: initialData || {
      title: "",
      targetAmount: "",
      savedAmount: 0,
      deadline: "",
    },
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="w-full max-w-md rounded-3xl bg-[#111827] p-6">

        <h2 className="mb-6 text-2xl font-bold text-white">
          {initialData ? "Edit Goal" : "Create Goal"}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >

          <input
            {...register("title")}
            placeholder="Goal Title"
            className="w-full rounded-xl border border-gray-700 bg-[#1F2937] p-3 text-white"
          />

          <input
            {...register("targetAmount")}
            type="number"
            placeholder="Target Amount"
            className="w-full rounded-xl border border-gray-700 bg-[#1F2937] p-3 text-white"
          />

          <input
            {...register("savedAmount")}
            type="number"
            placeholder="Saved Amount"
            className="w-full rounded-xl border border-gray-700 bg-[#1F2937] p-3 text-white"
          />

          <input
            {...register("deadline")}
            type="date"
            className="w-full rounded-xl border border-gray-700 bg-[#1F2937] p-3 text-white"
          />

          <div className="flex gap-4">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl bg-gray-700 py-3 text-white"
            >
              Cancel
            </button>

            <button
              className="flex-1 rounded-xl bg-blue-600 py-3 text-white"
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default GoalModal;