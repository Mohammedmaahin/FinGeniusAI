import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import AuthLayout from "../../components/auth/AuthLayout";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

import { login as loginApi } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
  });

  const onSubmit = async (values) => {
    try {
      setServerError("");

      const { data } = await loginApi({
        email: values.email,
        password: values.password,
      });

      login(data.token, data.user);

      navigate("/");
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
          "Unable to login. Please try again."
      );
    }
  };

  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Sign in to continue managing your finances with AI."
    >
      <Card className="shadow-2xl">

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
                  {serverError && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400">
              {serverError}
            </div>
          )}

          <Input
            label="Email Address"
            type="email"
            icon={Mail}
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email",
              },
            })}
          />

          <Input
            label="Password"
            type="password"
            icon={Lock}
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message:
                  "Password must contain at least 8 characters",
              },
            })}
          />

          <div className="flex items-center justify-between">

            <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">

              <input
                type="checkbox"
                className="rounded"
                {...register("remember")}
              />

              Remember me

            </label>

            <button
              type="button"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              Forgot Password?
            </button>

          </div>

          <Button
            type="submit"
            loading={isSubmitting}
          >
            <div className="flex items-center justify-center gap-2">

              Login

              <ArrowRight size={18} />

            </div>
          </Button>

          <div className="flex items-center gap-3">

            <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700" />

            <span className="text-sm text-gray-500">
              Secure Login
            </span>

            <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700" />

          </div>

          <div className="flex items-center justify-center gap-2 rounded-xl bg-blue-50 p-4 text-sm text-blue-700 dark:bg-blue-950/30 dark:text-blue-300">

            <ShieldCheck size={18} />

            Your data is encrypted and securely protected.

          </div>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400">

            Don't have an account?

            <Link
              to="/register"
              className="ml-2 font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              Create Account
            </Link>

          </div>
                  </form>

      </Card>

    </AuthLayout>
  );
};

export default Login;