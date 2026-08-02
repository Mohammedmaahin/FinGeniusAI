import { useForm } from "react-hook-form";

const TransactionModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues: initialData || {
      amount: "",
      category: "",
      description: "",
      type: "EXPENSE",
    },
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      <div className="w-full max-w-md rounded-3xl bg-[#111827] p-6">

        <h2 className="mb-6 text-2xl font-bold text-white">
          {initialData ? "Edit Transaction" : "Add Transaction"}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >

          <input
            {...register("amount")}
            type="number"
            placeholder="Amount"
            className="w-full rounded-xl bg-[#1F2937] p-3 text-white"
          />

          <div>
  <label className="mb-2 block text-sm font-medium text-gray-300">
    Category
  </label>

  <input
    {...register("category", {
      required: "Category is required",
    })}
    list="transaction-categories"
    placeholder="Select or type a category"
    className="w-full rounded-xl bg-[#1F2937] p-3 text-white border border-gray-700 focus:border-blue-500 outline-none"
  />

  <datalist id="transaction-categories">
    <option value="Food" />
    <option value="Entertainment" />
    <option value="Salary" />
    <option value="Shopping" />
    <option value="Transport" />
    <option value="Healthcare" />
    <option value="Education" />
    <option value="Bills" />
    <option value="Investment" />
    <option value="Other" />
  </datalist>
</div>

          <input
            {...register("description")}
            placeholder="Description"
            className="w-full rounded-xl bg-[#1F2937] p-3 text-white"
          />

          <select
            {...register("type")}
            className="w-full rounded-xl bg-[#1F2937] p-3 text-white"
          >
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
          </select>

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

export default TransactionModal;