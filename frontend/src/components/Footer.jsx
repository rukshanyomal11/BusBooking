import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white pt-20 pb-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="group">
              <h3 className="text-3xl font-bold mb-8 flex items-center group-hover:scale-105 transition-transform duration-300">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">Easy</span>
                <span className="text-white ml-1">Bus</span>
                <div className="ml-3 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
              </h3>
            </div>
            
            <p className="text-indigo-100 mb-8 text-lg leading-relaxed max-w-md">
              Your trusted platform for fast, affordable, and comfortable bus travel across the country.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center group hover:translate-x-2 transition-transform duration-300">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-full mr-4 group-hover:shadow-lg transition-shadow duration-300">
                  <FaMapMarkerAlt className="text-white" />
                </div>
                <span className="text-indigo-100 group-hover:text-white transition-colors duration-300">
                  123 Travel Lane, City, Country
                </span>
              </div>
              
              <div className="flex items-center group hover:translate-x-2 transition-transform duration-300">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-full mr-4 group-hover:shadow-lg transition-shadow duration-300">
                  <FaEnvelope className="text-white" />
                </div>
                <span className="text-indigo-100 group-hover:text-white transition-colors duration-300">
                  EasyBus@gmail.com
                </span>
              </div>
              
              <div className="flex items-center group hover:translate-x-2 transition-transform duration-300">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-full mr-4 group-hover:shadow-lg transition-shadow duration-300">
                  <FaPhone className="text-white" />
                </div>
                <span className="text-indigo-100 group-hover:text-white transition-colors duration-300">
                  +94 123456789
                </span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center md:items-end justify-center">
            <h3 className="text-2xl font-semibold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
              Connect With Us
            </h3>
            <div className="flex space-x-6">
              {[
                { icon: <FaFacebook size={24} />, url: "https://facebook.com", color: "from-blue-600 to-blue-700" },
                { icon: <FaTwitter size={24} />, url: "https://twitter.com", color: "from-sky-500 to-sky-600" },
                { icon: <FaInstagram size={24} />, url: "https://instagram.com", color: "from-pink-500 to-purple-600" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-gradient-to-r ${social.color} hover:scale-110 text-white p-4 rounded-full 
                    transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-purple-500/25
                    relative overflow-hidden group`}
                  aria-label={`${social.url.split('//')[1]} link`}
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  {social.icon}
                </a>
              ))}
            </div>
            
            {/* Decorative Elements */}
            <div className="mt-8 flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gradient-to-r from-indigo-700 to-purple-700 mt-16 pt-8">
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-indigo-800 to-purple-800 rounded-full px-8 py-3 shadow-lg">
              <p className="text-indigo-200 font-medium">
                &copy; {new Date().getFullYear()} EasyBus. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
    </footer>
  );
};

export default Footer;