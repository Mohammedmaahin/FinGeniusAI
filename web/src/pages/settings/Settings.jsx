import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

import {
  User,
  Bell,
  Wallet,
  Shield,
  LogOut,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const Settings = () => {

  const { user, logout } = useAuth();

  return (

    <div className="flex min-h-screen bg-[#0B1120]">

      <Sidebar />

      <main className="flex-1">

        <Navbar />

        <div className="space-y-8 p-4 md:p-6 lg:p-8">

          <div>

            <h1 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
              Settings
            </h1>

            <p className="mt-2 text-gray-400">
              Manage your FinGeniusAI preferences.
            </p>

          </div>

          <div className="space-y-6">

            <div className="rounded-3xl bg-[#111827] p-6">

              <div className="mb-4 flex items-center gap-3">

                <User className="text-blue-500" />

                <h2 className="text-xl font-semibold text-white">

                  Account

                </h2>

              </div>

              <p className="text-gray-300">

                Name: {user?.fullName || "-"}

              </p>

              <p className="mt-2 text-gray-300">

                Email: {user?.email || "-"}

              </p>

            </div>

            <div className="rounded-3xl bg-[#111827] p-6">

              <div className="mb-4 flex items-center gap-3">

                <Wallet className="text-green-500" />

                <h2 className="text-xl font-semibold text-white">

                  Financial Preferences

                </h2>

              </div>

              <p className="text-gray-300">

                Currency: INR (₹)

              </p>

              <p className="mt-2 text-gray-300">

                Theme: Dark

              </p>

            </div>

            <div className="rounded-3xl bg-[#111827] p-6">

              <div className="mb-4 flex items-center gap-3">

                <Bell className="text-yellow-500" />

                <h2 className="text-xl font-semibold text-white">

                  Notifications

                </h2>

              </div>

              <p className="text-gray-300">

                ✓ Budget Alerts

              </p>

              <p className="mt-2 text-gray-300">

                ✓ Goal Progress

              </p>

              <p className="mt-2 text-gray-300">

                ✓ AI Insights

              </p>

            </div>

            <div className="rounded-3xl bg-[#111827] p-6">

              <div className="mb-4 flex items-center gap-3">

                <Shield className="text-purple-500" />

                <h2 className="text-xl font-semibold text-white">

                  Security

                </h2>

              </div>

              <button
                onClick={logout}
                className="flex items-center gap-3 rounded-xl bg-red-600 px-5 py-3 text-white transition hover:bg-red-700"
              >

                <LogOut size={20} />

                Logout

              </button>

            </div>

          </div>

        </div>

      </main>

    </div>

  );

};

export default Settings;