import {
  LayoutDashboard,
  Wallet,
  Target,
  BarChart3,
  Bot,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
  {
    icon: LayoutDashboard,
    path: "/",
    label: "Home",
  },
  {
    icon: Wallet,
    path: "/transactions",
    label: "Money",
  },
  {
    icon: Target,
    path: "/goals",
    label: "Goals",
  },
  {
    icon: BarChart3,
    path: "/analytics",
    label: "Analytics",
  },
  {
    icon: Bot,
    path: "/ai",
    label: "AI",
  },
];

const MobileBottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around border-t border-gray-800 bg-[#111827] py-3 lg:hidden">

      {menu.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs ${
                isActive
                  ? "text-blue-500"
                  : "text-gray-400"
              }`
            }
          >
            <Icon size={22} />
            <span className="mt-1">
              {item.label}
            </span>
          </NavLink>
        );
      })}

    </nav>
  );
};

export default MobileBottomNav;