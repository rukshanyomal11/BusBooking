import React, { useState } from "react";
import { Mail, Phone, User } from "lucide-react";

const AccountEdit = ({ account, onSave, onClose }) => {
  const [editedAccount, setEditedAccount] = useState({ ...account });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedAccount);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex items-center justify-center z-50 transition-all">
      <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 w-full max-w-xl animate-fadeIn transform scale-100 transition duration-300">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-indigo-700 mb-8 text-center drop-shadow-md tracking-tight">
          ✨ Edit Account
        </h2>

        {/* Input Fields */}
        <div className="space-y-6">
          {/* Name */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Full Name
            </label>
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-4 py-2 shadow-inner focus-within:ring-2 focus-within:ring-indigo-500">
              <User className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                name="name"
                value={editedAccount.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-transparent focus:outline-none text-gray-800"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Phone Number
            </label>
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-4 py-2 shadow-inner focus-within:ring-2 focus-within:ring-indigo-500">
              <Phone className="w-5 h-5 text-gray-500" />
              <input
                type="tel"
                name="number"
                value={editedAccount.number}
                onChange={handleChange}
                placeholder="077-1234567"
                className="w-full bg-transparent focus:outline-none text-gray-800"
              />
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Email Address
            </label>
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-4 py-2 shadow-inner focus-within:ring-2 focus-within:ring-indigo-500">
              <Mail className="w-5 h-5 text-gray-500" />
              <input
                type="email"
                name="email"
                value={editedAccount.email}
                onChange={handleChange}
                placeholder="john@email.com"
                className="w-full bg-transparent focus:outline-none text-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-10">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl border border-gray-400 text-gray-600 hover:bg-gray-100 transition font-semibold shadow-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition font-semibold shadow-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountEdit;
