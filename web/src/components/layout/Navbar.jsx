import {
  Bell,
  UserCircle,
} from "lucide-react";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:h-20 md:px-6 dark:border-gray-800 dark:bg-gray-950">

      <div>
        <h2 className="text-lg font-bold text-gray-900 md:text-3xl dark:text-white">
          Welcome Back 👋
        </h2>

        <p className="hidden text-gray-500 md:block dark:text-gray-400">
          Here's your financial overview.
        </p>
      </div>

      <div className="flex items-center gap-3 md:gap-5">

        <Link
          to="/notifications"
          className="text-gray-700 transition hover:text-blue-600 dark:text-gray-300"
        >
          <Bell size={24} />
        </Link>

        <UserCircle
          size={34}
          className="text-gray-700 dark:text-gray-300"
        />

      </div>

    </header>
  );
};

export default Navbar;