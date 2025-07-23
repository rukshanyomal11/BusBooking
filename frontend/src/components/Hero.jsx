import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    const token = localStorage.getItem("token");
    navigate(token ? "/dashboard/booking" : "/login");
  };

  const images = [
    {
      src: "/images/bus1.jpg",
      alt: "Modern coach bus traveling on highway",
    },
    {
      src: "/images/bus2.jpg",
      alt: "Comfortable bus interior with spacious seating",
    },
    {
      src: "/images/bus3.jpg",
      alt: "Happy travelers boarding a bus",
    },
  ];

  const responsive = {
    all: {
      breakpoint: { max: 3000, min: 0 },
      items: 1,
    },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 py-20">
      {/* Snowing Blue Dots */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(40)].map((_, i) => {
          const size = Math.random() * 8 + 8; 
          const left = Math.random() * 100;
          const duration = Math.random() * 6 + 4;
          const delay = Math.random() * 5;
          const xDrift = Math.random() * 20 - 10;
          const opacityStart = 0.4 + Math.random() * 0.3; 

          return (
            <motion.div
              key={`snow-${i}`}
              className="absolute rounded-full bg-blue-500" // stronger blue color
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: "-10px",
                filter: "drop-shadow(0 0 4px rgba(59, 130, 246, 0.7))", // subtle glow
              }}
              initial={{
                opacity: opacityStart,
                x: 0,
                y: 0,
              }}
              animate={{
                y: "110vh",
                x: [`0px`, `${xDrift}px`, `0px`],
                opacity: [opacityStart, opacityStart - 0.2, opacityStart],
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }}
            />
          );
        })}
      </div>


      <div className="container mx-auto px-4 relative z-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        {/* Left Side */}
        <motion.div
          className="w-full lg:w-1/2 text-center lg:text-left space-y-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 ml-44">
            Start Your Journey
          </span>

          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight text-gray-900">
            Ride with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Comfort & Style
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-700 max-w-xl">
            Fast, secure, and affordable bus bookings for everyone. Experience your trip like never
            before.
          </p>

          <div className="flex justify-center lg:justify-start">
            <button
              onClick={handleBookNow}
              className="group relative inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-xl hover:scale-105 transition-transform duration-300"
            >
              <span className="z-10">Book Now</span>
              <span className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition duration-300 rounded-full blur-lg"></span>
            </button>
          </div>
        </motion.div>

        {/* Right Side: Carousel */}
        <motion.div
          className="w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Carousel
            responsive={responsive}
            autoPlay
            infinite
            autoPlaySpeed={3000}
            showDots={true}
            arrows={false}
          >
            {images.map((img, index) => (
              <div key={index}>
                <img
                  src={img.src}
                  alt={img.alt}
                  loading={index > 0 ? "lazy" : "eager"}
                  className="w-full h-[420px] object-cover transition-transform duration-500 hover:scale-105 rounded-3xl"
                />
              </div>
            ))}
          </Carousel>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-20 fill-white"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28..."
            opacity=".25"
          ></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69..." opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83..." />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
