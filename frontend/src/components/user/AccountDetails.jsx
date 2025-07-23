import React, { useState, useEffect } from "react";
import AccountEdit from "./AccountEdit";
import axios from "axios";

const AccountDetails = () => {
  const [account, setAccount] = useState({
    name: "",
    number: "",
    email: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setAccount({
          name: res.data.fullName,
          number: res.data.phone,
          email: res.data.email,
        });
      } catch (err) {
        alert(
          "Failed to fetch account details: " +
            (err.response?.data?.message || "Please try again later.")
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAccount();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isEditModalOpen ? "hidden" : "auto";
  }, [isEditModalOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsEditModalOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleSaveFromModal = async (updatedAccount) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/me",
        {
          fullName: updatedAccount.name,
          phone: updatedAccount.number,
          email: updatedAccount.email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAccount({
        name: res.data.fullName,
        number: res.data.phone,
        email: res.data.email,
      });
      setIsEditModalOpen(false);
      alert("Profile updated successfully!");
    } catch (err) {
      alert(
        "Failed to update profile: " +
          (err.response?.data?.message || "Please try again later.")
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-300 h-16 w-16"></div>
        <style>{`
          .loader {
            border-top-color: #6366f1;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center min-h-screen px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">Account Details</h1>

      <div className="bg-white shadow-xl rounded-3xl px-12 py-10 w-full max-w-2xl transition-all duration-300">
        <h2 className="text-3xl font-semibold text-indigo-700 mb-6 border-b pb-3">
          Profile Information
        </h2>

        {/* Grid layout for 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={account.name}
              readOnly
              className="w-full px-5 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={account.number}
              readOnly
              className="w-full px-5 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={account.email}
              readOnly
              className="w-full px-5 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-7 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {isEditModalOpen && (
        <AccountEdit
          account={account}
          onSave={handleSaveFromModal}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AccountDetails;
