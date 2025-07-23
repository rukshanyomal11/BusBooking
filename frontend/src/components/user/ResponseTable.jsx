import React, { useEffect, useState } from "react";
import axios from "axios";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/booking/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBookings(res.data);
      } catch (err) {
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-32">
        <p className="text-gray-600 text-lg animate-pulse">Loading bookings...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-32">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <section className="max-w-3xl mx-auto p-6">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-indigo-800 drop-shadow-md">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500 text-lg italic">No bookings found.</p>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <article
              key={booking._id}
              className="bg-white shadow-xl rounded-3xl p-6 border border-indigo-200 hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
              tabIndex={0}
              aria-label={`Booking from ${booking.from} to ${booking.to} on ${booking.date}`}
            >
              <div className="grid grid-cols-2 gap-6 text-indigo-900 font-semibold">
                <div>
                  <p className="text-sm font-bold text-indigo-700">Trip</p>
                  <p>{booking.type}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-indigo-700">Date</p>
                  <p>{booking.date}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-indigo-700">From</p>
                  <p>{booking.from}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-indigo-700">To</p>
                  <p>{booking.to}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-indigo-700">Name</p>
                  <p>{booking.name}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-indigo-700">Phone</p>
                  <p>{booking.number}</p>
                </div>
                <div className="col-span-2 mt-4">
                  <p className="inline-block font-bold mr-3 text-indigo-700">Status:</p>
                  <span
                    className={`inline-block px-4 py-1 rounded-full text-xs font-semibold select-none ${
                      booking.status === "Accepted"
                        ? "bg-green-200 text-green-900"
                        : booking.status === "Waiting"
                        ? "bg-yellow-200 text-yellow-900"
                        : "bg-red-200 text-red-900"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default UserBookings;
