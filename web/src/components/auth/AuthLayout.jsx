import Logo from "../ui/Logo";
import ThemeToggle from "../ui/ThemeToggle";

const features = [
  {
    title: "AI Financial Coach",
    description: "Receive personalized financial guidance powered by AI.",
  },
  {
    title: "Smart Analytics",
    description: "Understand your income, expenses, and savings instantly.",
  },
  {
    title: "Goal Tracking",
    description: "Stay focused on your financial goals with live progress.",
  },
];

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors dark:bg-[#0B1120] dark:text-white">

      <div className="absolute right-6 top-6 z-20">
        <ThemeToggle />
      </div>

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left Panel */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 p-16 text-white">

          <Logo />

          <h2 className="mt-10 text-5xl font-bold leading-tight">
            AI-Powered Financial Intelligence
          </h2>

          <p className="mt-6 text-lg text-blue-100">
            Manage expenses, grow savings, achieve goals and receive
            intelligent financial insights — all from one platform.
          </p>

          <div className="mt-12 space-y-6">

            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md"
              >
                <h3 className="text-lg font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-blue-100">
                  {feature.description}
                </p>
              </div>
            ))}

          </div>

        </div>

        {/* Right Panel */}
        <div className="flex items-center justify-center p-6 sm:p-10">

          <div className="w-full max-w-md">

            <div className="mb-8 lg:hidden">
              <Logo />
            </div>

            <h1 className="text-4xl font-bold">
              {title}
            </h1>

            <p className="mt-3 text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>

            <div className="mt-8">
              {children}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AuthLayout;