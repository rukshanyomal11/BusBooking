import React from "react";
import Sidebar from "../../components/user/Sidebar";
import BookingForm from "../../components/user/BookingForm";

const BookingPage = () => {
  return (
    <div className="flex min-h-screen bg-blue-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 text-center select-none">
            Booking
          </h1>
          
        </header>

        <section className="mt-6 bg-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto">
          <BookingForm />
        </section>
      </main>
    </div>
  );
};

export default BookingPage;
