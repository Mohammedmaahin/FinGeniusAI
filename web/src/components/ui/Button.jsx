const Button = ({
  children,
  loading = false,
  variant = "primary",
  size = "md",
  fullWidth = true,
  className = "",
  ...props
}) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl hover:scale-[1.02]",

    secondary:
      "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white",

    outline:
      "border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-3",
    lg: "px-6 py-4 text-lg",
  };

  return (
    <button
      {...props}
      disabled={loading}
      className={`
        rounded-2xl
        font-semibold
        transition-all
        duration-300
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          Please wait...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;