const StatCard = ({
  title,
  value,
  color,
}) => {
  return (
    <div
      className={`rounded-3xl p-6 text-white shadow-xl ${color}`}
    >
      <p className="text-sm opacity-80">
        {title}
      </p>

      <h2 className="mt-3 text-4xl font-bold">
        {value}
      </h2>
    </div>
  );
};

export default StatCard;