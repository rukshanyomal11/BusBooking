import React, { useState } from "react";
import Sidebar from "../../components/user/Sidebar";

const HelpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for reaching out!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
      <Sidebar />
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="w-full max-w-xl bg-white border border-indigo-100 rounded-3xl shadow-xl p-10 transition duration-500 hover:shadow-2xl">
          <h2 className="text-3xl font-extrabold text-indigo-700 text-center mb-8 tracking-wide">
            ✉️ Get in Touch
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-indigo-600 font-medium mb-1">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="w-full px-5 py-3 bg-indigo-50 border border-indigo-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-indigo-600 font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-5 py-3 bg-indigo-50 border border-indigo-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-indigo-600 font-medium mb-1">
                Your Message
              </label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Type your message here..."
                className="w-full px-5 py-3 bg-indigo-50 border border-indigo-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              ></textarea>
            </div>

            {/* Submit */}
            <div className="text-center mt-6">
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-8 py-3 rounded-xl text-sm font-semibold shadow-md hover:shadow-xl hover:scale-105 transform transition duration-300"
              >
                📩 Send Message
              </button>
            </div>
          </form>

          <p className="text-xs text-gray-500 text-center mt-8">
            We'll get back to you within 24 hours!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
