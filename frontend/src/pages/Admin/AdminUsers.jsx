import React from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import UserTable from "../../components/admin/UserTable";

const AdminUsers = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 text-center select-none">
            Admin Users
          </h1>
          <p className="mt-2 text-center text-gray-600 max-w-xl mx-auto select-none">
            Manage all users here.
          </p>
        </header>

        <section className="mt-6 bg-white rounded-3xl shadow-2xl p-8">
          <UserTable />
        </section>
      </main>
    </div>
  );
};

export default AdminUsers;
