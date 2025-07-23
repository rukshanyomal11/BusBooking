import React, { useState, useEffect } from "react";
import axios from "axios";

const RequestTable = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/booking/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(res.data);
      } catch {
        setError("Failed to fetch booking requests.");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleAccept = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/booking/${id}/status`,
        { status: "Accepted" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status: "Accepted" } : req))
      );
      alert(`✅ Request ${id} accepted!`);
    } catch {
      alert("Failed to accept the request.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/booking/${id}/status`,
        { status: "Deleted" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests((prev) => prev.filter((req) => req._id !== id));
      alert(`❌ Request ${id} deleted!`);
    } catch {
      alert("Failed to delete the request.");
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-600 mt-10 text-lg font-medium animate-pulse">
        Loading booking requests...
      </p>
    );
  if (error) return <p className="text-center text-red-600 mt-10 text-lg">{error}</p>;

  return (
    <section className="max-w-7xl mx-auto p-8 mt-12 bg-white shadow-2xl rounded-3xl overflow-hidden">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center select-none">Travel Requests</h2>

      <div className="overflow-x-auto rounded-3xl border border-gray-300 shadow-lg">
        <table className="min-w-full table-auto divide-y divide-gray-300">
          <thead className="bg-gradient-to-r from-blue-400 to-blue-600 text-white sticky top-0 z-10 select-none">
            <tr>
              {[
                "Type",
                "Date",
                "From",
                "To",
                "Name",
                "Number",
                "Status",
                "Actions",
              ].map((head) => (
                <th
                  key={head}
                  className="px-8 py-5 text-left text-sm font-semibold tracking-wide"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {requests.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-12 text-center text-gray-500 text-lg font-medium">
                  No active requests.
                </td>
              </tr>
            ) : (
              requests.map((r, i) => (
                <tr
                  key={r._id}
                  className={`transition-colors duration-300 cursor-default ${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-indigo-50`}
                >
                  <td className="px-8 py-5 text-sm font-medium text-gray-800">{r.type}</td>
                  <td className="px-8 py-5 text-sm text-gray-700">{r.date}</td>
                  <td className="px-8 py-5 text-sm text-gray-700">{r.from}</td>
                  <td className="px-8 py-5 text-sm text-gray-700">{r.to}</td>
                  <td className="px-8 py-5 text-sm text-gray-800">{r.name}</td>
                  <td className="px-8 py-5 text-sm text-gray-800">{r.number}</td>
                  <td className="px-8 py-5">
                    <span
                      className={`inline-block px-5 py-2 rounded-full text-xs font-semibold ${
                        r.status === "Accepted"
                          ? "bg-green-300 text-green-900 shadow-inner"
                          : r.status === "Waiting"
                          ? "bg-yellow-300 text-yellow-900 shadow-inner"
                          : "bg-red-300 text-red-900 shadow-inner"
                      } select-none`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 space-x-4 whitespace-nowrap flex items-center">
                    {r.status === "Waiting" && (
                      <>
                        <button
                          onClick={() => handleAccept(r._id)}
                          className="group relative bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                          aria-label={`Accept request ${r._id}`}
                        >
                          Accept
                          <span className="absolute -top-7 left-1/2 -translate-x-1/2
                            bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100
                            pointer-events-none select-none transition-opacity duration-200">
                            Accept this request
                          </span>
                        </button>

                        <button
                          onClick={() => handleDelete(r._id)}
                          className="group relative bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                          aria-label={`Delete request ${r._id}`}
                        >
                          Delete
                          <span className="absolute -top-7 left-1/2 -translate-x-1/2
                            bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100
                            pointer-events-none select-none transition-opacity duration-200">
                            Delete this request
                          </span>
                        </button>
                      </>
                    )}
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

export default RequestTable;
