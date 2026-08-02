import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  User,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import AuthLayout from "../../components/auth/AuthLayout";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { register as registerApi } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const password = watch("password");

  const onSubmit = async (values) => {
    try {
      setServerError("");

      const { data } = await registerApi({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      });

      login(data.token, data.user);

      navigate("/");
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
          "Unable to register."
      );
    }
  };

  return (
    <AuthLayout
      title="Create Your Account 🚀"
      subtitle="Start your AI-powered financial journey."
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
            label="Full Name"
            type="text"
            icon={User}
            placeholder="Enter your full name"
            error={errors.fullName?.message}
            {...register("fullName", {
              required: "Full name is required",
              minLength: {
                value: 3,
                message: "Minimum 3 characters",
              },
            })}
          />

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
            placeholder="Create a password"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Minimum 8 characters",
              },
            })}
          />

          {password && (
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span>Password Strength</span>

                <span
                  className={
                    password.length >= 12
                      ? "text-green-600"
                      : password.length >= 8
                      ? "text-yellow-600"
                      : "text-red-600"
                  }
                >
                  {password.length >= 12
                    ? "Strong"
                    : password.length >= 8
                    ? "Medium"
                    : "Weak"}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className={`h-full transition-all duration-500 ${
                    password.length >= 12
                      ? "w-full bg-green-500"
                      : password.length >= 8
                      ? "w-2/3 bg-yellow-500"
                      : "w-1/3 bg-red-500"
                  }`}
                />
              </div>
            </div>
          )}

          <Input
            label="Confirm Password"
            type="password"
            icon={Lock}
            placeholder="Confirm Password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "Confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />

          <label className="flex items-start gap-3 rounded-xl border border-gray-200 p-4 dark:border-gray-700">

            <input
              type="checkbox"
              className="mt-1"
              {...register("terms", {
                required: "Please accept the Terms & Conditions",
              })}
            />

            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                I agree to the
                <span className="mx-1 font-semibold text-blue-600">
                  Terms & Conditions
                </span>
                and
                <span className="mx-1 font-semibold text-blue-600">
                  Privacy Policy
                </span>
              </p>

              {errors.terms && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.terms.message}
                </p>
              )}
            </div>

          </label>

          <Button
            type="submit"
            loading={isSubmitting}
          >
            <div className="flex items-center justify-center gap-2">
              Create Account
              <ArrowRight size={18} />
            </div>
          </Button>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?

            <Link
              to="/login"
              className="ml-2 font-semibold text-blue-600"
            >
              Login
            </Link>
          </div>
                  </form>
      </Card>
    </AuthLayout>
  );
};

export default Register;