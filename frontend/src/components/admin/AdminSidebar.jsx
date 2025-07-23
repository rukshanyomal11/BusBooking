import React, { useState } from "react";
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
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex flex-col bg-white/95 backdrop-blur-lg border-r border-gray-300 shadow-xl
        transition-all duration-500 ease-in-out
        ${collapsed ? "w-20" : "w-64"} h-screen relative`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed((prev) => !prev)}
        aria-label="Toggle Sidebar"
        className="absolute -right-4 top-8 z-50 bg-indigo-600 p-2 rounded-full shadow-lg text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      >
        <svg
          className={`w-5 h-5 transform transition-transform duration-300 ${
            collapsed ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Header */}
      <div
        className={`flex items-center gap-4 mt-10 mb-14 px-5 ${
          collapsed ? "justify-center" : "justify-start"
        }`}
      >
        <div
          className={`w-14 h-14 bg-gradient-to-tr from-indigo-600 to-indigo-400
            rounded-3xl flex items-center justify-center text-white font-extrabold text-3xl shadow-lg
            transition-transform duration-500 ${
              collapsed ? "scale-90" : "scale-100"
            }`}
        >
          A
        </div>

        {!collapsed && (
          <div>
            <h1 className="text-3xl font-extrabold text-indigo-700 tracking-wider select-none">
              Admin
            </h1>
            <p className="text-xs text-gray-500 mt-1 font-medium tracking-wide select-none">
              Dashboard Control
            </p>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-2 space-y-6">
        <h4
          className={`text-sm text-gray-500 uppercase tracking-widest font-semibold pl-3 select-none
            ${collapsed ? "hidden" : "block"}`}
        >
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
                {!collapsed && <span>{label}</span>}
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

              {/* Tooltip if collapsed */}
              {collapsed && (
                <div
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-2
                    whitespace-nowrap rounded-md bg-gray-900 text-white px-3 py-1 text-xs font-semibold opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 select-none z-50"
                >
                  {label}
                </div>
              )}
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
          {!collapsed && <span>Exit</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
