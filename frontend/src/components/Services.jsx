import React from "react";
import { motion } from "framer-motion";
import { FaBus, FaCalendarCheck, FaMoneyBillWave, FaHeadset } from "react-icons/fa";

const Services = () => {
  const services = [
    {
      title: "Easy Online Booking",
      description: "Book your bus in minutes with our user-friendly platform.",
      icon: <FaCalendarCheck className="text-4xl mb-4" />,
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      hoverGradient: "from-blue-100 to-indigo-100",
    },
    {
      title: "Comfortable Travel",
      description: "Enjoy modern buses with AC, Wi-Fi, and spacious seating.",
      icon: <FaBus className="text-4xl mb-4" />,
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50",
      hoverGradient: "from-emerald-100 to-teal-100",
    },
    {
      title: "Affordable Prices",
      description: "Get the best deals and discounts on bus tickets.",
      icon: <FaMoneyBillWave className="text-4xl mb-4" />,
      gradient: "from-amber-500 to-orange-600",
      bgGradient: "from-amber-50 to-orange-50",
      hoverGradient: "from-amber-100 to-orange-100",
    },
    {
      title: "24/7 Support",
      description: "Our support team is available anytime to assist you.",
      icon: <FaHeadset className="text-4xl mb-4" />,
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50",
      hoverGradient: "from-purple-100 to-pink-100",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-200 to-pink-300 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-block mb-6">
            <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 uppercase tracking-wider">
              Our Services
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            <span className="text-gray-800">Why Choose </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
              EasyBus?
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-30"></div>
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We provide exceptional services to make your journey comfortable, affordable, and hassle-free.
          </p>
          
          {/* Decorative Line */}
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
            >
              {/* Card Container */}
              <div className={`relative bg-gradient-to-br ${service.bgGradient} p-8 rounded-3xl 
                shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50
                group-hover:scale-105 group-hover:rotate-1 backdrop-blur-sm
                overflow-hidden`}>
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
                </div>
                
                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.hoverGradient} 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon Container */}
                  <div className="flex justify-center mb-6">
                    <div className={`relative p-4 bg-gradient-to-r ${service.gradient} rounded-2xl 
                      shadow-lg group-hover:shadow-xl transition-all duration-300 
                      group-hover:scale-110 text-white`}>
                      {service.icon}
                      
                      {/* Icon Glow Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} 
                        rounded-2xl opacity-50 blur-lg group-hover:opacity-75 transition-opacity duration-300`}></div>
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce"></div>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-4 
                    group-hover:text-gray-900 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 text-center leading-relaxed 
                    group-hover:text-gray-700 transition-colors duration-300">
                    {service.description}
                  </p>
                  
                  {/* Bottom Accent */}
                  <div className="mt-6 flex justify-center">
                    <div className={`w-16 h-1 bg-gradient-to-r ${service.gradient} rounded-full 
                      transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                  </div>
                </div>
                
                {/* Corner Decorations */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/20 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Card Shadow/Glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-3xl 
                opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 -z-10 
                transform group-hover:scale-110`}></div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>
            <span className="text-gray-700 font-medium">Ready to experience the difference?</span>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.1 + 0.5}s` }}
                ></div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 fill-white">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Services;