import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { FaMapMarkerAlt, FaUser, FaPhone, FaCalendarAlt } from "react-icons/fa";

const BookingForm = () => {
  const [tripType, setTripType] = useState("one-way");
  const [selectedDate, setSelectedDate] = useState(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      type: tripType === "one-way" ? "One way" : "Round trip",
      date: selectedDate
        ? selectedDate.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })
        : "",
      from,
      to,
      name,
      number,
      status: "Waiting",
    };
    try {
      await axios.post("http://localhost:5000/api/booking/create", bookingData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Booking request submitted!");
      setTripType("one-way");
      setSelectedDate(null);
      setFrom("");
      setTo("");
      setName("");
      setNumber("");
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        alert("Booking failed: " + (err.response?.data?.message || "Please try again later."));
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto mt-12 p-8 rounded-3xl bg-white/30 backdrop-blur-lg shadow-2xl border border-white/20 animate-fade-in"
    >
      <h2 className="text-4xl font-bold text-center text-indigo-600 mb-8 col-span-full">
        Book Your Journey
      </h2>

      {/* Trip Type */}
      <div className="col-span-full flex justify-center gap-8 mb-6">
        {["one-way", "round-trip"].map((type) => (
          <label key={type} className="flex items-center gap-2 cursor-pointer text-gray-800 font-medium">
            <input
              type="radio"
              name="tripType"
              value={type}
              checked={tripType === type}
              onChange={() => setTripType(type)}
              className="accent-indigo-600 w-5 h-5"
            />
            {type === "one-way" ? "One Way" : "Round Trip"}
          </label>
        ))}
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* From */}
        <div className="relative">
          <span className="absolute top-3.5 left-4 text-indigo-500"><FaMapMarkerAlt /></span>
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="From"
            required
            className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none text-gray-800 bg-white shadow-sm"
          />
        </div>

        {/* To */}
        <div className="relative">
          <span className="absolute top-3.5 left-4 text-indigo-500"><FaMapMarkerAlt /></span>
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="To"
            required
            className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none text-gray-800 bg-white shadow-sm"
          />
        </div>

        {/* Name */}
        <div className="relative">
          <span className="absolute top-3.5 left-4 text-indigo-500"><FaUser /></span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
            className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none text-gray-800 bg-white shadow-sm"
          />
        </div>

        {/* Number */}
        <div className="relative">
          <span className="absolute top-3.5 left-4 text-indigo-500"><FaPhone /></span>
          <input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Phone Number"
            required
            className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none text-gray-800 bg-white shadow-sm"
          />
        </div>

        {/* Date Picker (Full Width) */}
        <div className="relative md:col-span-2">
          <span className="absolute top-3.5 left-4 text-indigo-500">
            <FaCalendarAlt />
          </span>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="Select a date"
            dateFormat="EEE, MMM d"
            minDate={new Date()}
            required
            className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none text-gray-800 bg-white shadow-sm"
          />
        </div>
      </div>

      {/* Submit Button (Full Width) */}
      <div className="mt-8">
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 transition text-white font-semibold py-3 rounded-lg shadow-lg"
        >
          Book Now
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
