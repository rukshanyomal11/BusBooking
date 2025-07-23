import React from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import RequestTable from "../../components/admin/RequestTable";

const AdminRequests = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 text-center select-none">
            Admin Requests
          </h1>
          <p className="mt-2 text-center text-gray-600 max-w-xl mx-auto select-none">
            View and respond to requests efficiently.
          </p>
        </header>

        <section className="mt-6 bg-white rounded-3xl shadow-2xl p-8">
          <RequestTable />
        </section>
      </main>
    </div>
  );
};

export default AdminRequests;
