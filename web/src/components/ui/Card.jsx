const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-3xl border border-gray-200 bg-white p-8 shadow-xl transition-all dark:border-gray-800 dark:bg-gray-900 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;