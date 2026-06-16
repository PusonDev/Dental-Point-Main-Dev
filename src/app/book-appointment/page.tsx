"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppointmentQR from "@/components/AppointmentQR";
import ConfirmationPage from "@/components/ConfirmationPage";
import { useLanguage } from "@/context/LanguageContext";

const BACKGROUND_COLOR = "#0a0f1e"; // deep navy
const CARD_BG_COLOR = "rgba(255,255,255,0.04)";
const ACCENT_COLOR = "#38bdf8"; // sky-400
const TEXT_PRIMARY_COLOR = "#f0f9ff";
const TEXT_MUTED_COLOR = "#94a3b8";

const servicesList = [
  "Teeth Whitening",
  "Dental Implants",
  "Orthodontics / Braces",
  "Root Canal",
  "Teeth Cleaning",
  "Dental Checkup",
  "Veneers",
  "Pediatric Dentistry",
  "Emergency Dental Care",
];

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

export default function BookAppointmentPage() {
  const router = useRouter();
  const { tc, locale } = useLanguage();
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setMinDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const handleNext = () => {
    if (step === 1) {
      if (!fullName || !phone) {
        alert("Please fill in all required personal information.");
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 2) {
      if (!selectedService || !selectedDate || !selectedTime) {
        alert("Please select a service, date, and time.");
        return;
      }
    }
    setFormSubmitted(true);
    router.push("/confirmation"); // Redirect to confirmation page
  };

  const stepVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const trustBadges = [
    { icon: "🏆", text: tc("book.badge1", "20+ Years Experience") },
    { icon: "✨", text: tc("book.badge2", "Painless Procedures") },
    { icon: "⚡", text: tc("book.badge3", "Same-Day Appointments") },
  ];

  return (
    <div
      className="min-h-screen text-white pt-20 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: BACKGROUND_COLOR }}
    >
      {/* Subtle Background Glow Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[150px] pointer-events-none z-0"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sky-500/20 rounded-full blur-[150px] pointer-events-none z-0"
      />

      <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-lg border border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* Left Panel */}
          <motion.div
            className="lg:col-span-2 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 z-0 opacity-10">
              {/* Animated Tooth/Smile SVG */}
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-full h-full text-[#38bdf8]"
                animate={{
                  y: [
                    "0%",
                    "-5%",
                    "0%",
                    "5%",
                    "0%",
                  ],
                }}
                transition={{
                  duration: 8,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <path d="M8.25 6.75C8.25 5.507 9.257 4.5 10.5 4.5h3C14.743 4.5 15.75 5.507 15.75 6.75v5.5C15.75 13.593 14.743 14.5 13.5 14.5h-3c-1.243 0-2.25-.907-2.25-2.25v-5.5zM21 12c0 2.485-2.099 4.5-4.688 4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 16.5 3 14.485 3 12c0-7.22 9-12 9-12s9 4.78 9 12z" />
              </motion.svg>
            </div>

            <div className="relative z-10">
              <motion.h2
                className="text-5xl font-extrabold mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {tc("home.heroTitle", "ডা: জেরীনের")}
              </motion.h2>
              <motion.p
                className="text-xl text-[#94a3b8] mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {tc("home.bookCta", "Your Journey to a Brighter Smile Starts Here.")}
              </motion.p>

              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {trustBadges.map((badge, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-center gap-4 bg-white/5 rounded-xl p-4 border border-white/10"
                  >
                    <span className="text-3xl text-[#38bdf8]">
                      {badge.icon}
                    </span>
                    <p className="text-lg font-semibold">{badge.text}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Panel - Booking Form */}
          <div className="lg:col-span-3 p-8 md:p-12 bg-[#0a0f1e] relative">
            <div className="flex justify-between items-center mb-8">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors duration-300 ${
                      stepNum === step
                        ? "bg-[#38bdf8] text-white"
                        : stepNum < step
                        ? "bg-emerald-500 text-white"
                        : "bg-white/10 text-[#94a3b8]"
                    }`}
                  >
                    {stepNum < step ? "✓" : stepNum}
                  </div>
                  <p className="text-xs mt-2 text-[#94a3b8]">
                    {stepNum === 1 && tc("book.step1", "Personal Info")}
                    {stepNum === 2 && tc("book.step2", "Service & Date")}
                    {stepNum === 3 && tc("book.step3", "Confirm Booking")}
                  </p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="relative">
              <AnimatePresence mode="wait" custom={step}>
                {step === 1 && (
                  <motion.div
                    key="step1"
                    custom={1}
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-[#f0f9ff] text-sm font-semibold mb-2">
                        {tc("book.name", "Full Name")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-[#38bdf8] rounded-xl px-4 py-3 text-white placeholder:text-[#94a3b8]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[#f0f9ff] text-sm font-semibold mb-2">
                        {tc("book.phone", "Phone Number")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-[#38bdf8] rounded-xl px-4 py-3 text-white placeholder:text-[#94a3b8]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[#f0f9ff] text-sm font-semibold mb-2">
                        {tc("book.email", "Email")} ({locale === "bn" ? "ঐচ্ছিক" : "Optional"})
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-[#38bdf8] rounded-xl px-4 py-3 text-white placeholder:text-[#94a3b8]"
                      />
                    </div>
                    <motion.button
                      type="button"
                      onClick={handleNext}
                      className="w-full bg-[#38bdf8] text-[#0a0f1e] py-3 rounded-xl font-semibold hover:bg-sky-500 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {tc("book.next1", "Next: Select Service & Date")}
                    </motion.button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    custom={-1}
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-[#f0f9ff] text-sm font-semibold mb-2">
                        {tc("book.service", "Select Service")} <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-[#38bdf8] rounded-xl px-4 py-3 text-white placeholder:text-[#94a3b8] appearance-none"
                        required
                      >
                        <option value="" disabled>{tc("book.chooseService", "Select a service")}</option>
                        {servicesList.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#f0f9ff] text-sm font-semibold mb-2">
                        {tc("book.date", "Select Date")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        min={minDate}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-[#38bdf8] rounded-xl px-4 py-3 text-white placeholder:text-[#94a3b8]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[#f0f9ff] text-sm font-semibold mb-2">
                        {tc("book.time", "Select Time Slot")} <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {timeSlots.map((time) => (
                          <motion.button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                              selectedTime === time
                                ? "bg-[#38bdf8] text-[#0a0f1e]"
                                : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {time}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <motion.button
                        type="button"
                        onClick={handleBack}
                        className="flex-1 bg-white/10 text-white py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {tc("common.back", "Back")}
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={handleNext}
                        className="flex-1 bg-[#38bdf8] text-[#0a0f1e] py-3 rounded-xl font-semibold hover:bg-sky-500 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {tc("book.next2", "Next: Confirm")}
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    custom={1}
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-bold text-[#f0f9ff] mb-4">
                      {tc("book.confirmTitle", "Confirm Your Appointment")}
                    </h3>
                    <div
                      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-3"
                    >
                      <p>
                        <strong className="text-[#38bdf8]">{tc("book.name", "Name")}:</strong> {fullName}
                      </p>
                      <p>
                        <strong className="text-[#38bdf8]">{tc("book.phone", "Phone")}:</strong> {phone}
                      </p>
                      {email && (
                        <p>
                          <strong className="text-[#38bdf8]">{tc("book.email", "Email")}:</strong> {email}
                        </p>
                      )}
                      <p>
                        <strong className="text-[#38bdf8]">{tc("book.service", "Service")}:</strong> {" "}
                        {selectedService}
                      </p>
                      <p>
                        <strong className="text-[#38bdf8]">{tc("book.date", "Date")}:</strong> {selectedDate}
                      </p>
                      <p>
                        <strong className="text-[#38bdf8]">{tc("book.time", "Time")}:</strong> {selectedTime}
                      </p>
                    </div>
                    <div className="flex justify-center p-4">
                      <AppointmentQR data={`${fullName}-${selectedDate}-${selectedTime}`} />
                    </div>
                    <div className="flex gap-4">
                      <motion.button
                        type="button"
                        onClick={handleBack}
                        className="flex-1 bg-white/10 text-white py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {tc("common.back", "Back")}
                      </motion.button>
                      <motion.button
                        type="submit"
                        className="flex-1 bg-emerald-500 text-white py-3 rounded-xl font-semibold hover:bg-emerald-600 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {tc("book.submit", "Confirm Booking")}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
