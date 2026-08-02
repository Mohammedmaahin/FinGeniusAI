import {
  LayoutDashboard,
  Wallet,
  Target,
  BarChart3,
  Bot,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { Bell } from "lucide-react";

const menu = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/",
  },
  {
    icon: Wallet,
    label: "Transactions",
    path: "/transactions",
  },
  {
    icon: Target,
    label: "Goals",
    path: "/goals",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    path: "/analytics",
  },
  {
    icon: Bot,
    label: "AI Coach",
    path: "/ai",
  },
  {
    icon: Settings,
    label: "Settings",
    path: "/settings",
  },
  {
  icon: Bell,
  label: "Notifications",
  path: "/notifications",
},
];

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex w-72 shrink-0 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">

      <div className="border-b border-gray-200 dark:border-gray-800 p-6">

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          FinGeniusAI
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          AI Financial Intelligence
        </p>

      </div>

      <nav className="flex-1 p-4">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `mb-2 flex items-center gap-4 rounded-2xl px-5 py-4 transition
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              <Icon size={22} />

              {item.label}
            </NavLink>
          );
        })}

      </nav>

    </aside>
  );
};

export default Sidebar;