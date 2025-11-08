import React from "react";
import { NavLink } from "react-router-dom";
import { FaSignOutAlt, FaUserFriends, FaEnvelopeOpenText } from "react-icons/fa";

const navItems = [
  {
    to: "/admin/users",
    label: "Users",
    icon: FaUserFriends,
  },
  {
    to: "/admin/requests",
    label: "Requests",
    icon: FaEnvelopeOpenText,
  },
];

const AdminSidebar = () => {
  return (
    <aside className="flex flex-col bg-white/95 backdrop-blur-lg border-r border-gray-300 shadow-xl w-64 h-screen relative">
      {/* Header */}
      <div className="flex items-center gap-4 mt-10 mb-14 px-5 justify-start">
        <div className="w-14 h-14 bg-gradient-to-tr from-indigo-600 to-indigo-400 rounded-3xl flex items-center justify-center text-white font-extrabold text-3xl shadow-lg">
          A
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-indigo-700 tracking-wider select-none">
            Admin
          </h1>
          <p className="text-xs text-gray-500 mt-1 font-medium tracking-wide select-none">
            Dashboard Control
          </p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-2 space-y-6">
        <h4 className="text-sm text-gray-500 uppercase tracking-widest font-semibold pl-3 select-none">
          Navigation
        </h4>

        <ul className="space-y-4 relative">
          {navItems.map(({ to, label, icon: Icon }) => (
            <li key={to} className="relative group">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-2xl px-5 py-3 text-sm font-semibold
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg scale-105"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md"
                  }`
                }
              >
                <Icon
                  className="text-lg transition-transform duration-300 group-hover:animate-bounce"
                  aria-hidden="true"
                />
                <span>{label}</span>
              </NavLink>

              {/* Active indicator bar */}
              <NavLink
                to={to}
                end
                className={({ isActive }) =>
                  `absolute left-0 top-0 h-full w-1 rounded-r-lg transition-all duration-300 ${
                    isActive ? "bg-indigo-600" : "opacity-0"
                  }`
                }
              >
                {/* empty but used for bar */}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Exit Button */}
      <div className="mb-8 px-5">
        <button
          className="flex items-center justify-center gap-3 w-full rounded-2xl
            bg-red-100 text-red-600 hover:bg-red-200 shadow-md py-3 text-sm font-semibold
            transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
          aria-label="Exit"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Exit</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
