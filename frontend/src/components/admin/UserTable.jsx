import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUsers(res.data);
      } catch (err) {
        alert("Failed to fetch users: " + (err.response?.data?.message || ""));
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/auth/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      alert("Failed to delete user: " + (err.response?.data?.message || ""));
    }
  };

  if (loading)
    return (
      <div className="text-center mt-12 text-gray-600 text-lg font-medium animate-pulse">
        Loading users...
      </div>
    );

  return (
    <section className="max-w-7xl mx-auto p-8 mt-12 bg-white shadow-2xl rounded-3xl overflow-hidden">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center select-none">User List</h2>

      <div className="overflow-x-auto rounded-3xl border border-gray-300 shadow-lg">
        <table className="min-w-full table-auto divide-y divide-gray-300">
          <thead className="bg-gradient-to-r from-blue-400 to-blue-600 text-white sticky top-0 z-10 select-none">
            <tr>
              {["Name", "Number", "Email", "Action"].map((header) => (
                <th
                  key={header}
                  className="px-8 py-5 text-left text-sm font-semibold tracking-wide"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-12 text-center text-gray-500 text-lg font-medium">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user, i) => (
                <tr
                  key={user._id}
                  className={`transition-colors duration-300 cursor-default ${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-indigo-50`}
                >
                  <td className="px-8 py-5 text-sm font-medium text-gray-700">{user.fullName}</td>
                  <td className="px-8 py-5 text-sm text-gray-700">{user.phone}</td>
                  <td className="px-8 py-5 text-sm text-gray-700">{user.email}</td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="group relative flex items-center gap-2 bg-red-100 text-red-600 px-6 py-2 rounded-full text-sm font-semibold hover:bg-red-200 shadow-md transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                      aria-label={`Delete user ${user.fullName}`}
                    >
                      <FaTrashAlt />
                      Delete
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2
                        bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100
                        pointer-events-none select-none transition-opacity duration-200">
                        Delete this user
                      </span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UserTable;
