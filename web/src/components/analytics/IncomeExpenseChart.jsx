import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const IncomeExpenseChart = ({ analytics }) => {
  const data = Object.entries(
    analytics?.monthlyData || {}
  ).map(([month, value]) => ({
    month,
    income: value.income,
    expense: value.expense,
  }));

  return (
    <div className="rounded-3xl bg-[#111827] p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Income vs Expense
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <BarChart data={data}>

          <XAxis
            dataKey="month"
            stroke="#9CA3AF"
          />

          <YAxis stroke="#9CA3AF" />

          <Tooltip />

          <Bar
            dataKey="income"
            fill="#10B981"
          />

          <Bar
            dataKey="expense"
            fill="#EF4444"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
};

export default IncomeExpenseChart;