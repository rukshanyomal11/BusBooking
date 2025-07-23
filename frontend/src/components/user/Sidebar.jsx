import React, { useEffect, useState } from "react";
import {
  Calendar,
  MessageSquare,
  Users,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser({
          fullName: res.data.fullName,
          email: res.data.email,
          phone: res.data.phone,
        });
      } catch (err) {
        if (err.response?.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          alert(
            "Failed to fetch user profile: " +
              (err.response?.data?.message || "Please try again later.")
          );
        }
      }
    };
    fetchUser();
  }, []);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { label: "Booking", path: "/dashboard/booking", icon: Calendar },
    { label: "Response", path: "/dashboard/response", icon: MessageSquare },
  ];

  const otherItems = [
    { label: "Accounts", path: "/dashboard/accounts", icon: Users },
    { label: "Help", path: "/dashboard/help", icon: HelpCircle },
  ];

  return (
    <aside
      className={`flex flex-col bg-white/95 backdrop-blur-md border-r border-indigo-200 shadow-xl transition-all duration-500 ease-in-out ${
        collapsed ? "w-20" : "w-64"
      } h-screen relative`}
    >
      {/* Toggle button */}
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
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Profile */}
      <div className="mt-10 px-5 mb-10 flex items-center gap-4">
        <div
          className={`w-14 h-14 bg-gradient-to-tr from-indigo-600 to-indigo-400
            rounded-3xl flex items-center justify-center text-white font-extrabold text-3xl shadow-lg transition-transform ${
              collapsed ? "scale-90" : "scale-100"
            }`}
        >
          {user.fullName ? user.fullName[0].toUpperCase() : "U"}
        </div>

        {!collapsed && (
          <div className="truncate">
            <h1 className="text-2xl font-extrabold text-indigo-900 truncate">
              {user.fullName || "User"}
            </h1>
            <p className="text-sm text-indigo-600 truncate">{user.email}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        {!collapsed && (
          <h4 className="text-xs text-indigo-400 uppercase tracking-widest mb-3 font-semibold pl-2">
            Menu
          </h4>
        )}
        <ul className="space-y-3">
          {navItems.map(({ label, path, icon: Icon }) => (
            <li key={path} className="relative group">
              <div
                onClick={() => navigate(path)}
                className={`flex items-center gap-4 px-5 py-3 rounded-2xl text-sm font-semibold cursor-pointer transition-all select-none ${
                  isActive(path)
                    ? "bg-indigo-600 text-white shadow-lg scale-105"
                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md"
                }`}
              >
                <Icon
                  size={20}
                  className={`transition-transform duration-300 group-hover:animate-bounce ${
                    isActive(path) ? "text-white" : "text-indigo-600"
                  }`}
                />
                {!collapsed && <span>{label}</span>}
              </div>
              {collapsed && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap rounded-md bg-gray-900 text-white px-3 py-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                  {label}
                </div>
              )}
            </li>
          ))}
        </ul>

        {!collapsed && (
          <h4 className="text-xs text-indigo-400 uppercase tracking-widest mt-8 mb-3 font-semibold pl-2">
            Others
          </h4>
        )}
        <ul className="space-y-3">
          {otherItems.map(({ label, path, icon: Icon }) => (
            <li key={path} className="relative group">
              <div
                onClick={() => navigate(path)}
                className={`flex items-center gap-4 px-5 py-3 rounded-2xl text-sm font-semibold cursor-pointer transition-all select-none ${
                  isActive(path)
                    ? "bg-indigo-600 text-white shadow-lg scale-105"
                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md"
                }`}
              >
                <Icon
                  size={20}
                  className={`transition-transform duration-300 group-hover:animate-bounce ${
                    isActive(path) ? "text-white" : "text-indigo-600"
                  }`}
                />
                {!collapsed && <span>{label}</span>}
              </div>
              {collapsed && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap rounded-md bg-gray-900 text-white px-3 py-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                  {label}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="mb-8 px-5">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="flex items-center justify-center gap-3 w-full rounded-2xl bg-red-100 text-red-600 hover:bg-red-200 shadow-md py-3 text-sm font-semibold transition-transform duration-300 hover:scale-105"
        >
          <LogOut size={20} />
          {!collapsed && <span>Exit</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
