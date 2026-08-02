const Logo = ({ size = "lg" }) => {
  const sizes = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-4xl",
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-xl font-bold text-white shadow-lg">
        F
      </div>

      <div>
        <h1 className={`${sizes[size]} font-bold tracking-tight text-gray-900 dark:text-white`}>
          FinGeniusAI
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          AI Financial Intelligence
        </p>
      </div>
    </div>
  );
};

export default Logo;