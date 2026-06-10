"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const servicesData = [
  {
    title: "Teeth Whitening",
    description: "Brighten your smile with our professional teeth whitening services.",
    price: "$150 - $300",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-10 h-10 text-[#38bdf8]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 3.104V2.376a1.5 1.5 0 011.03-.783l1.008-.344a1.5 1.5 0 011.03.783v.728m-1.5 6a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0 0v-4.5m0 0a1.5 1.5 0 00-1.5-1.5H9.75A1.5 1.5 0 008.25 6v.75m-7.5 3.375h18a2.25 2.25 0 002.25-2.25v-1.374L17.625 4.78c-.765-.36-1.572-.533-2.404-.533H9.75C6.93 4.247 4.5 6.678 4.5 9.497v1.873M4.5 9.497a1.5 1.5 0 01-1.5 1.5H2.25A1.5 1.5 0 01.75 9.497V7.622c0-.573.113-1.123.324-1.636l2.167-5.071a1.5 1.5 0 011.03-.783l1.008-.344a1.5 1.5 0 011.03.783v.728M9.75 14.625a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0 0v-4.5m0 0a1.5 1.5 0 00-1.5-1.5H9.75A1.5 1.5 0 008.25 6v.75m-7.5 3.375h18a2.25 2.25 0 002.25-2.25v-1.374L17.625 4.78c-.765-.36-1.572-.533-2.404-.533H9.75C6.93 4.247 4.5 6.678 4.5 9.497v1.873M4.5 9.497a1.5 1.5 0 01-1.5 1.5H2.25A1.5 1.5 0 01.75 9.497V7.622c0-.573.113-1.123.324-1.636l2.167-5.071a1.5 1.5 0 011.03-.783l1.008-.344a1.5 1.5 0 011.03.783v.728M9.75 14.625a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0 0v-4.5m0 0a1.5 1.5 0 00-1.5-1.5H9.75A1.5 1.5 0 008.25 6v.75"
        />
      </svg>
    ),
  },
  {
    title: "Dental Implants",
    description: "Permanent solutions for missing teeth with natural-looking implants.",
    price: "$2000 - $5000",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-10 h-10 text-[#38bdf8]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    ),
  },
  {
    title: "Orthodontics / Braces",
    description: "Straighten your teeth for a perfect smile with our orthodontic treatments.",
    price: "$3000 - $7000",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-10 h-10 text-[#38bdf8]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.644 11.23a.879.879 0 00-1.04-.374m1.04.374a.879.879 0 01-1.04-.374m1.04.374V19.5m-1.5-3.628a.879.879 0 00-1.04-.374m1.04.374a.879.879 0 01-1.04-.374m1.04.374V19.5M10.5 4.5l-1.5 3m1.5-3l1.5 3M10.5 4.5v3.75m-1.5 6H8.25m-.75 0H6.75m-1.5 0H4.5m-1.5 0H2.25M11.25 10.5h1.5A2.25 2.25 0 0115 12.75v5.062a2.25 2.25 0 01-2.25 2.25H11.25m0-9.75h-1.5A2.25 2.25 0 007.5 12.75v5.062a2.25 2.25 0 002.25 2.25h1.5M11.25 10.5V6m0 0H8.25M6 6H4.5m-1.5 0H2.25m1.5 3V6m-1.5 0V9m-1.5 0V6m-1.5 0V9m1.5-3V9m-1.5 0V6"
        />
      </svg>
    ),
  },
  {
    title: "Root Canal",
    description: "Effective treatment to save a tooth that is infected or badly decayed.",
    price: "$800 - $1500",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-10 h-10 text-[#38bdf8]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    ),
  },
  {
    title: "Teeth Cleaning",
    description: "Regular cleaning for maintaining oral hygiene and preventing cavities.",
    price: "$75 - $150",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-10 h-10 text-[#38bdf8]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a8.25 8.25 0 11-16.5 0V12A2.25 2.25 0 006.75 14.25h0a2.25 2.25 0 002.25 2.25H12a2.25 2.25 0 002.25-2.25v-2.875m-6.572 1.115a2.25 2.25 0 10-.154 3.012l.092-.092Z"
        />
      </svg>
    ),
  },
  {
    title: "Veneers",
    description: "Custom-made shells to improve the appearance of your teeth.",
    price: "$900 - $2500 per tooth",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-10 h-10 text-[#38bdf8]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 3.104V2.376a1.5 1.5 0 011.03-.783l1.008-.344a1.5 1.5 0 011.03.783v.728m-1.5 6a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0 0v-4.5m0 0a1.5 1.5 0 00-1.5-1.5H9.75A1.5 1.5 0 008.25 6v.75m-7.5 3.375h18a2.25 2.25 0 002.25-2.25v-1.374L17.625 4.78c-.765-.36-1.572-.533-2.404-.533H9.75C6.93 4.247 4.5 6.678 4.5 9.497v1.873M4.5 9.497a1.5 1.5 0 01-1.5 1.5H2.25A1.5 1.5 0 01.75 9.497V7.622c0-.573.113-1.123.324-1.636l2.167-5.071a1.5 1.5 0 011.03-.783l1.008-.344a1.5 1.5 0 011.03.783v.728M9.75 14.625a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0 0v-4.5m0 0a1.5 1.5 0 00-1.5-1.5H9.75A1.5 1.5 0 008.25 6v.75m-7.5 3.375h18a2.25 2.25 0 002.25-2.25v-1.374L17.625 4.78c-.765-.36-1.572-.533-2.404-.533H9.75C6.93 4.247 4.5 6.678 4.5 9.497v1.873M4.5 9.497a1.5 1.5 0 01-1.5 1.5H2.25A1.5 1.5 0 01.75 9.497V7.622c0-.573.113-1.123.324-1.636l2.167-5.071a1.5 1.5 0 011.03-.783l1.008-.344a1.5 1.5 0 011.03.783v.728M9.75 14.625a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0 0v-4.5m0 0a1.5 1.5 0 00-1.5-1.5H9.75A1.5 1.5 0 008.25 6v.75"
        />
      </svg>
    ),
  },
  {
    title: "Pediatric Dentistry",
    description: "Gentle and comprehensive dental care for children of all ages.",
    price: "$100 - $300",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-10 h-10 text-[#38bdf8]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.644 11.23a.879.879 0 00-1.04-.374m1.04.374a.879.879 0 01-1.04-.374m1.04.374V19.5m-1.5-3.628a.879.879 0 00-1.04-.374m1.04.374a.879.879 0 01-1.04-.374m1.04.374V19.5M10.5 4.5l-1.5 3m1.5-3l1.5 3M10.5 4.5v3.75m-1.5 6H8.25m-.75 0H6.75m-1.5 0H4.5m-1.5 0H2.25M11.25 10.5h1.5A2.25 2.25 0 0115 12.75v5.062a2.25 2.25 0 01-2.25 2.25H11.25m0-9.75h-1.5A2.25 2.25 0 007.5 12.75v5.062a2.25 2.25 0 002.25 2.25h1.5M11.25 10.5V6m0 0H8.25M6 6H4.5m-1.5 0H2.25m1.5 3V6m-1.5 0V9m-1.5 0V6m-1.5 0V9m1.5-3V9m-1.5 0V6"
        />
      </svg>
    ),
  },
  {
    title: "Emergency Dental Care",
    description: "Immediate care for dental emergencies, pain relief, and urgent issues.",
    price: "Varies",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-10 h-10 text-[#38bdf8]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>
    ),
  },
];

const ServicesPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7 },
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-[#f0f9ff]">
      <motion.section
        className="relative py-20 md:py-32 text-center overflow-hidden"
      >
        <div className="container mx-auto px-6">
          <motion.h1
            {...fadeInUp}
            className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight"
          >
            Our Dental Services
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="text-xl md:text-2xl text-[#94a3b8] max-w-3xl mx-auto"
          >
            Comprehensive care for a healthier, brighter smile.
          </motion.p>
        </div>
      </motion.section>

      <div className="bg-gradient-to-r from-transparent via-[#38bdf8]/30 to-transparent h-px w-full my-12" />

      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{
                y: -6,
                boxShadow: "0 20px 40px rgba(56,189,248,0.15)",
              }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center transition-all duration-300 ease-in-out"
            >
              <div className="mb-6 flex justify-center">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-[#94a3b8] mb-4">{service.description}</p>
              <span className="inline-block bg-[#38bdf8]/20 text-[#38bdf8] text-sm font-semibold px-4 py-1 rounded-full mb-6">
                {service.price}
              </span>
              <Link href="/book-appointment" passHref>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 w-full bg-[#38bdf8] text-[#0a0f1e] py-3 rounded-xl font-semibold transition-colors duration-200"
                >
                  Book Now
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <div className="bg-gradient-to-r from-transparent via-[#38bdf8]/30 to-transparent h-px w-full my-12" />

      <footer className="py-10 text-center text-[#94a3b8]">
        <p>Built by Puson · puson.dev</p>
      </footer>
    </div>
  );
};

export default ServicesPage;
