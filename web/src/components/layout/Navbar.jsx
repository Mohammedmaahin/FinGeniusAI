import {
  Bell,
  UserCircle,
} from "lucide-react";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6 dark:border-gray-800 dark:bg-gray-950">

      <div>
        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
          Welcome Back 👋
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Here's your financial overview.
        </p>
      </div>

      <div className="flex items-center gap-5">

        <Link
          to="/notifications"
          className="text-gray-700 transition hover:text-blue-600 dark:text-gray-300"
        >
          <Bell size={24} />
        </Link>

        <UserCircle
          size={36}
          className="text-gray-700 dark:text-gray-300"
        />

      </div>

    </header>
  );
};

export default Navbar;