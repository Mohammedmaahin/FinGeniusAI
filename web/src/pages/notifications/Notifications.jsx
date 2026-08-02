import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

import {
  Bell,
  Target,
  Wallet,
  Bot,
} from "lucide-react";

const notifications = [
  {
    icon: Wallet,
    title: "Monthly Budget",
    message: "Great! You're within your monthly budget.",
    time: "2 hours ago",
  },
  {
    icon: Target,
    title: "Goal Progress",
    message: "Keep saving! You're making progress toward your goals.",
    time: "Yesterday",
  },
  {
    icon: Bot,
    title: "AI Coach",
    message: "Your financial insights have been updated.",
    time: "2 days ago",
  },
];

const Notifications = () => {
  return (
    <div className="flex min-h-screen bg-[#0B1120]">

      <Sidebar />

      <main className="flex-1">

        <Navbar />

        <div className="space-y-8 p-4 md:p-6 lg:p-8">

          <div>

            <h1 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
              Notifications
            </h1>

            <p className="mt-2 text-gray-400">
              Stay updated with your finances.
            </p>

          </div>

          <div className="space-y-5">

            {notifications.map((item, index) => {

              const Icon = item.icon;

              return (

                <div
                  key={index}
                  className="flex items-start gap-5 rounded-3xl border border-gray-800 bg-[#111827] p-6"
                >

                  <div className="rounded-2xl bg-blue-600 p-3">

                    <Icon
                      size={22}
                      className="text-white"
                    />

                  </div>

                  <div className="flex-1">

                    <h2 className="text-lg font-semibold text-white">

                      {item.title}

                    </h2>

                    <p className="mt-2 text-gray-300">

                      {item.message}

                    </p>

                    <p className="mt-3 text-sm text-gray-500">

                      {item.time}

                    </p>

                  </div>

                </div>

              );

            })}

          </div>

        </div>

      </main>

    </div>
  );
};

export default Notifications;