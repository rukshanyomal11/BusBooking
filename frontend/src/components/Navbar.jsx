import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-100 px-6 py-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="group flex items-center space-x-2 transition-all duration-300 hover:scale-105"
        >
          <div className="relative">
            <div className="text-3xl font-extrabold flex items-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Easy
              </span>
              <span className="text-gray-800 ml-1">Bus</span>
            </div>
            {/* Animated underline */}
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-500 ease-out"></div>
          </div>
          
          {/* Logo Icon */}
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center space-x-6">
          {!isLoggedIn ? (
            <>
              <Link 
                to="/" 
                className="relative text-gray-700 font-medium hover:text-blue-600 transition-all duration-300 py-2 px-4 rounded-lg hover:bg-blue-50 group"
              >
                <span className="relative z-10">Home</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
              </Link>
              
              <Link 
                to="/login" 
                className="relative text-gray-700 font-medium hover:text-blue-600 transition-all duration-300 py-2 px-4 rounded-lg hover:bg-blue-50 group"
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
              </Link>
              
              <Link 
                to="/signup" 
                className="group relative overflow-hidden bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Sign Up</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </span>
            </button>
          )}
        </div>
      </div>
      
      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
    </nav>
  );
};

export default Navbar;