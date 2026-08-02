import { Pencil, Trash2 } from "lucide-react";

const TransactionTable = ({
  transactions,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto rounded-3xl bg-[#111827] border border-gray-700">

      <table className="min-w-full">

        <thead className="border-b border-gray-700">

          <tr className="text-left text-gray-400">

            <th className="p-4">Category</th>
            <th className="p-4">Description</th>
            <th className="p-4">Type</th>
            <th className="p-4">Amount</th>
            <th className="p-4">Date</th>
            <th className="p-4">Actions</th>

          </tr>

        </thead>

        <tbody>

          {transactions.map((transaction) => (

            <tr
              key={transaction.id}
              className="border-b border-gray-800 hover:bg-[#1F2937]"
            >

              <td className="p-4 text-white">
                {transaction.category}
              </td>

              <td className="p-4 text-gray-300">
                {transaction.description}
              </td>

              <td className="p-4">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    transaction.type === "INCOME"
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {transaction.type}
                </span>

              </td>

              <td className="p-4 font-semibold text-white">
                ₹{transaction.amount}
              </td>

              <td className="p-4 text-gray-400">
                {new Date(transaction.date).toLocaleDateString()}
              </td>

              <td className="p-4">

                <div className="flex gap-3">

                  <button
                    onClick={() => onEdit(transaction)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default TransactionTable;