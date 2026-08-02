import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = forwardRef(
  (
    {
      label,
      type = "text",
      error,
      icon: Icon,
      className = "",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    return (
      <div className="space-y-2">

        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}

        <div className="relative">

          {Icon && (
            <Icon
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          )}

          <input
            ref={ref}
            {...props}
            type={
              isPassword
                ? showPassword
                  ? "text"
                  : "password"
                : type
            }
            className={`
              w-full
              rounded-2xl
              border
              ${error ? "border-red-500" : "border-gray-300 dark:border-gray-700"}
              bg-white
              dark:bg-gray-900
              py-3
              ${Icon ? "pl-11" : "pl-4"}
              ${isPassword ? "pr-12" : "pr-4"}
              text-gray-900
              dark:text-white
              outline-none
              transition
              focus:border-blue-600
              focus:ring-4
              focus:ring-blue-200
              dark:focus:ring-blue-900
              ${className}
            `}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;