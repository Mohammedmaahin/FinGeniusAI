import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = [
  "#2563EB",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
];

const CategoryPieChart = ({ analytics }) => {

  const data = Object.entries(
    analytics?.categoryData || {}
  ).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="rounded-3xl bg-[#111827] p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Expense Categories
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
              />

            ))}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
};

export default CategoryPieChart;