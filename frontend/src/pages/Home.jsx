import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Hero />
      <Services />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
      </div>
      <Footer />
    </div>
  );
};

export default Home;