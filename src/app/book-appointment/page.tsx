"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PublicLayout from "@/components/shared/PublicLayout";
import { useLanguage } from "@/context/LanguageContext";
import { CLINIC_INFO } from "@/lib/clinic-info";
import Link from "next/link";

// Custom metadata mapping for reasons to display rich cards with emojis
const REASON_METADATA = [
  { value: "Checkup", icon: "🔍", labelEn: "Routine Checkup", labelBn: "নিয়মিত চেকআপ", descEn: "General oral inspection & hygiene advice", descBn: "দাঁতের সামগ্রিক পরীক্ষা ও পরামর্শ" },
  { value: "Pain", icon: "⚡", labelEn: "Tooth Pain / Emergency", labelBn: "দাঁতে ব্যথা / জরুরী", descEn: "Acute toothache or dental injury", descBn: "তীব্র ব্যথা বা আঘাতের তাৎক্ষণিক চিকিৎসা" },
  { value: "RCT", icon: "🦷", labelEn: "Root Canal (RCT)", labelBn: "রুট ক্যানেল (RCT)", descEn: "Saving deep decayed or infected teeth", descBn: "ইনফেকশন হওয়া দাঁত সংরক্ষণের চিকিৎসা" },
  { value: "Braces", icon: "😬", labelEn: "Orthodontics / Braces", labelBn: "আঁকা-বাঁকা দাঁতের চিকিৎসা", descEn: "Teeth alignment & jaw correction", descBn: "দাঁত সোজা ও সুন্দর করার আধুনিক চিকিৎসা" },
  { value: "Filling", icon: "✨", labelEn: "Cosmetic Filling", labelBn: "কসমেটিক ফিলিং", descEn: "Restoring cavities with composite fill", descBn: "দাঁতের সাথে মানানসই আধুনিক ফিলিং" },
  { value: "Implant", icon: "🔩", labelEn: "Dental Implant", labelBn: "ডেন্টাল ইমপ্লান্ট", descEn: "Permanent missing teeth replacement", descBn: "হারানো দাঁত স্থায়ীভাবে প্রতিস্থাপন" },
  { value: "Scaling", icon: "💎", labelEn: "Scaling & Polishing", labelBn: "স্কেলিং ও পলিশিং", descEn: "Plaque & stain removal for gum health", descBn: "দাঁতের ময়লা ও পাথর পরিষ্কার করা" },
  { value: "Other", icon: "🏥", labelEn: "Other Treatment", labelBn: "অন্যান্য সেবা", descEn: "Dentures, surgery, extraction, etc.", descBn: "অন্য যেকোনো ধরনের ডেন্টাল চিকিৎসা" },
];

const MORNING_SLOTS = ["11:00 AM", "12:00 PM", "1:00 PM"];
const EVENING_SLOTS = ["5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"];

export default function BookAppointmentPage() {
  const { t, locale } = useLanguage();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  // Form State
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [email, setEmail] = useState("");
  const [specialNote, setSpecialNote] = useState("");
  const [requestedDate, setRequestedDate] = useState("");
  const [requestedTime, setRequestedTime] = useState("");
  const [reason, setReason] = useState("");

  // Get today's date formatted as YYYY-MM-DD for min date attribute
  const [minDate, setMinDate] = useState("");
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setMinDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const handleNextStep = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setError(locale === "bn" ? "অনুগ্রহ করে আপনার নাম লিখুন" : "Please enter your name");
      return;
    }
    if (!patientPhone.trim()) {
      setError(locale === "bn" ? "অনুগ্রহ করে ফোন নম্বর লিখুন" : "Please enter your phone number");
      return;
    }
    setError("");
    setStep(2);
  };

  const handlePrevStep = (e: React.MouseEvent) => {
    e.preventDefault();
    setStep(1);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!reason) {
      setError(locale === "bn" ? "অনুগ্রহ করে অ্যাপয়েন্টমেন্টের কারণ নির্বাচন করুন" : "Please select a reason for visit");
      return;
    }
    if (!requestedDate) {
      setError(locale === "bn" ? "অনুগ্রহ করে পছন্দের তারিখ নির্বাচন করুন" : "Please select a preferred date");
      return;
    }
    if (!requestedTime) {
      setError(locale === "bn" ? "অনুগ্রহ করে পছন্দের সময় নির্বাচন করুন" : "Please select a preferred time slot");
      return;
    }

    setLoading(true);
    setError("");

    const payload = {
      patient_name: patientName.trim(),
      patient_phone: patientPhone.trim(),
      email: email.trim() || undefined,
      requested_date: requestedDate,
      requested_time: requestedTime,
      reason,
      special_note: specialNote.trim() || undefined,
    };

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setLoading(false);
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.error || (locale === "bn" ? "অনুরোধ জমা দেওয়া যায়নি। আবার চেষ্টা করুন।" : "Could not submit request. Please try again."));
        return;
      }
      setDone(true);
    } catch (submitError) {
      setLoading(false);
      const message = submitError instanceof Error ? submitError.message : "Network error";
      setError(locale === "bn" ? `সংযোগ সমস্যা: ${message}` : `Connection error: ${message}`);
    }
  }

  return (
    <PublicLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-sky-50/15 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Main Title Banner */}
          <div className="text-center mb-10">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-3"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {locale === "bn" ? "২ মিনিটে সহজ বুকিং" : "Easy Booking in 2 Mins"}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-blue-800 tracking-tight"
            >
              {t.book.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 mt-2 text-sm md:text-base max-w-xl mx-auto"
            >
              {locale === "bn"
                ? "আমাদের অভিজ্ঞ ডাক্তারের সাথে সুবিধাজনক সময়ে আজই আপনার দাঁতের যত্নের সিরিয়াল বুক করুন"
                : "Secure your consultation slot with our expert dentist at a time that works best for you."}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Side: Sticky Information & Trust Badges */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-4 space-y-6 lg:sticky lg:top-24"
            >
              {/* Doctor Profile Card */}
              <div className="bg-white/80 backdrop-blur-md border border-slate-100 rounded-3xl p-6 shadow-[0_10px_30px_-15px_rgba(30,58,138,0.1)]">
                <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
                  <div className="relative flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-cyan-400 p-[2px] shadow-md">
                    <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center text-2xl">
                      👩‍⚕️
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">
                      {locale === "bn" ? CLINIC_INFO.doctor.nameBangla : CLINIC_INFO.doctor.name}
                    </h3>
                    <p className="text-xs font-semibold text-primary">
                      {CLINIC_INFO.doctor.qualifications[0]} ({CLINIC_INFO.doctor.qualifications[1]})
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex gap-3 text-sm">
                    <span className="text-primary text-base">🏥</span>
                    <div>
                      <p className="font-bold text-slate-700">{locale === "bn" ? "চেম্বারের ঠিকানা" : "Chamber Location"}</p>
                      <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">
                        {locale === "bn" ? CLINIC_INFO.address.fullBangla : CLINIC_INFO.address.full}
                      </p>
                      <a
                        href={CLINIC_INFO.address.googleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1 mt-1"
                      >
                        📍 {locale === "bn" ? "গুগল ম্যাপে দেখুন" : "View on Google Maps"}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3 text-sm pt-2">
                    <span className="text-primary text-base">⏰</span>
                    <div>
                      <p className="font-bold text-slate-700">{locale === "bn" ? "রোগী দেখার সময়" : "Consulting Hours"}</p>
                      <div className="text-slate-500 text-xs mt-0.5 space-y-0.5">
                        <p>{locale === "bn" ? "সকাল সেশন:" : "Morning:"} {locale === "bn" ? CLINIC_INFO.hours.morningBangla : CLINIC_INFO.hours.morning}</p>
                        <p>{locale === "bn" ? "বিকাল সেশন:" : "Evening:"} {locale === "bn" ? CLINIC_INFO.hours.eveningBangla : CLINIC_INFO.hours.evening}</p>
                        <p className="text-red-500 font-medium">{locale === "bn" ? CLINIC_INFO.hours.closedBangla : `Closed on ${CLINIC_INFO.hours.closed}`}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-3xl p-6 shadow-[0_12px_30px_rgba(30,58,138,0.15)] relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-20%] w-[120px] h-[120px] bg-white/10 rounded-full blur-2xl" />
                <h4 className="font-bold text-base mb-3 flex items-center gap-2">
                  🛡️ {locale === "bn" ? "আমাদের বিশেষত্বসমূহ" : "Why Dental Point?"}
                </h4>
                <ul className="space-y-2.5 text-xs text-white/95">
                  <li className="flex items-center gap-2">
                    <span className="bg-white/10 p-1 rounded-md text-cyan-300">✓</span>
                    {locale === "bn" ? "সম্পূর্ণ ব্যাথামুক্ত চিকিৎসা সেবা" : "Gentle & painless treatment experience"}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-white/10 p-1 rounded-md text-cyan-300">✓</span>
                    {locale === "bn" ? "নিজস্ব অত্যাধুনিক দাঁতের এক্স-রে" : "In-house digital X-ray system"}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-white/10 p-1 rounded-md text-cyan-300">✓</span>
                    {locale === "bn" ? "সকল আধুনিক যন্ত্রপাতি ও উন্নত জীবাণুমুক্তকরণ" : "Fully sterilized state-of-the-art tools"}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-white/10 p-1 rounded-md text-cyan-300">✓</span>
                    {locale === "bn" ? "অভিজ্ঞ এবং যত্নশীল ডাক্তার" : "Consultation by highly qualified specialist"}
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Right Side: Interactive Booking Wizard Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="lg:col-span-8"
            >
              <div className="bg-white/90 backdrop-blur-md border border-slate-100 rounded-3xl shadow-[0_15px_40px_-20px_rgba(15,23,42,0.12)] overflow-hidden">
                {done ? (
                  // Success State View
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 md:p-12 text-center"
                  >
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner relative">
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 10, delay: 0.2 }}
                      >
                        ✓
                      </motion.span>
                      <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-ping opacity-75" />
                    </div>

                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-3">
                      {locale === "bn" ? "অনুরোধ সফল হয়েছে!" : "Request Sent Successfully!"}
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed">
                      {t.book.success} {locale === "bn"
                        ? "আমাদের প্রতিনিধি আপনার বুকিং নিশ্চিত করতে দ্রুতই আপনার মোবাইল নম্বরে কল করবেন।"
                        : "We will contact you shortly to confirm your booking details."}
                    </p>

                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-8 max-w-sm mx-auto text-left space-y-2">
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                        {locale === "bn" ? "অ্যাপয়েন্টমেন্ট ডিটেইলস" : "Your Details"}
                      </p>
                      <div className="text-sm text-slate-700 space-y-1">
                        <p><strong className="font-semibold text-slate-800">{locale === "bn" ? "রোগী:" : "Patient:"}</strong> {patientName}</p>
                        <p><strong className="font-semibold text-slate-800">{locale === "bn" ? "তারিখ:" : "Date:"}</strong> {requestedDate}</p>
                        <p><strong className="font-semibold text-slate-800">{locale === "bn" ? "সময়:" : "Time:"}</strong> {requestedTime}</p>
                        <p>
                          <strong className="font-semibold text-slate-800">{locale === "bn" ? "সেবা:" : "Service:"}</strong>{" "}
                          {REASON_METADATA.find(r => r.value === reason)?.[locale === "bn" ? "labelBn" : "labelEn"] || reason}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <Link
                        href="/auth/signup"
                        className="btn-primary hover:scale-[1.02] active:scale-95 transition-all inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl shadow-lg shadow-primary/20"
                      >
                        👤 {locale === "bn" ? "একাউন্ট তৈরি করুন" : "Create Account"}
                      </Link>
                      <a
                        href={`https://wa.me/${CLINIC_INFO.contact.phone.replace("+", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl hover:scale-[1.02] active:scale-95 transition-all inline-flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                      >
                        💬 {locale === "bn" ? "হোয়াটসঅ্যাপ যোগাযোগ" : "WhatsApp Us"}
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  // Form Wizard
                  <form onSubmit={handleSubmit}>
                    {/* Stepper Progress Bar */}
                    <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                          step === 1 ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-emerald-500 text-white"
                        }`}>
                          {step === 1 ? "1" : "✓"}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-400">
                            {locale === "bn" ? "ধাপ ১" : "STEP 1"}
                          </p>
                          <p className={`text-xs font-bold ${step === 1 ? "text-slate-800" : "text-emerald-500"}`}>
                            {locale === "bn" ? "ব্যক্তিগত তথ্য" : "Patient Details"}
                          </p>
                        </div>
                      </div>

                      <div className="flex-1 max-w-[80px] sm:max-w-[120px] h-[2px] bg-slate-200 mx-4 relative overflow-hidden rounded-full">
                        <div
                          className="absolute left-0 top-0 h-full bg-primary transition-all duration-300"
                          style={{ width: step === 1 ? "0%" : "100%" }}
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                          step === 2 ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-slate-200 text-slate-500"
                        }`}>
                          2
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-400">
                            {locale === "bn" ? "ধাপ ২" : "STEP 2"}
                          </p>
                          <p className={`text-xs font-bold ${step === 2 ? "text-slate-800" : "text-slate-400"}`}>
                            {locale === "bn" ? "তারিখ ও সময়" : "Choose Schedule"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="p-6 md:p-8 min-h-[380px]">
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium flex items-center gap-2"
                        >
                          ⚠️ {error}
                        </motion.div>
                      )}

                      <AnimatePresence mode="wait">
                        {step === 1 ? (
                          // Step 1: Patient Information
                          <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-5"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                                  {t.book.name} <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-base">
                                    👤
                                  </span>
                                  <input
                                    type="text"
                                    value={patientName}
                                    onChange={(e) => setPatientName(e.target.value)}
                                    placeholder={locale === "bn" ? "আপনার পুরো নাম লিখুন" : "e.g. John Doe"}
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                                  {t.book.phone} <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm font-medium border-r border-slate-200 pr-2">
                                    🇧🇩 +88
                                  </span>
                                  <input
                                    type="tel"
                                    value={patientPhone}
                                    onChange={(e) => setPatientPhone(e.target.value)}
                                    placeholder="01712XXXXXX"
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-[4.5rem] pr-4 py-3 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800"
                                  />
                                </div>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                                {t.book.email} <span className="text-slate-400 text-xs font-normal">({locale === "bn" ? "ঐচ্ছিক" : "Optional"})</span>
                              </label>
                              <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-base">
                                  ✉️
                                </span>
                                <input
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  placeholder="example@mail.com"
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                                {t.book.note} <span className="text-slate-400 text-xs font-normal">({locale === "bn" ? "ঐচ্ছিক" : "Optional"})</span>
                              </label>
                              <textarea
                                value={specialNote}
                                onChange={(e) => setSpecialNote(e.target.value)}
                                rows={3}
                                placeholder={
                                  locale === "bn"
                                    ? "আপনার কোনো বিশেষ উপসর্গ বা দাঁতের আগের ইতিহাস থাকলে এখানে লিখতে পারেন..."
                                    : "Describe your symptoms or any medical details we should know..."
                                }
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 leading-relaxed"
                              />
                            </div>

                            <div className="pt-4">
                              <button
                                type="button"
                                onClick={handleNextStep}
                                className="btn-primary w-full group relative flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all shadow-md shadow-primary/10 rounded-xl py-3.5"
                              >
                                {locale === "bn" ? "তারিখ ও সময় নির্বাচন করুন" : "Choose Schedule"}
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                              </button>
                            </div>
                          </motion.div>
                        ) : (
                          // Step 2: Schedule Details
                          <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-6"
                          >
                            {/* Reason for Visit Cards */}
                            <div>
                              <label className="block text-sm font-bold text-slate-700 mb-3">
                                {t.book.reason} <span className="text-rose-500">*</span>
                              </label>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {REASON_METADATA.map((item) => {
                                  const isSelected = reason === item.value;
                                  return (
                                    <button
                                      key={item.value}
                                      type="button"
                                      onClick={() => setReason(item.value)}
                                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                                        isSelected
                                          ? "border-primary bg-primary/5 text-primary ring-2 ring-primary/30"
                                          : "border-slate-100 hover:border-slate-300 hover:bg-slate-50 text-slate-600"
                                      }`}
                                    >
                                      <span className="text-2xl mb-1.5">{item.icon}</span>
                                      <span className="font-bold text-xs">
                                        {locale === "bn" ? item.labelBn : item.labelEn}
                                      </span>
                                      <span className="text-[10px] text-slate-400 mt-0.5 line-clamp-1 hidden sm:block">
                                        {locale === "bn" ? item.descBn : item.descEn}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Date Picker */}
                              <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                                  {t.book.date} <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-base pointer-events-none">
                                    📅
                                  </span>
                                  <input
                                    type="date"
                                    min={minDate}
                                    value={requestedDate}
                                    onChange={(e) => setRequestedDate(e.target.value)}
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800"
                                  />
                                </div>
                              </div>

                              {/* Time Selector Dropdown Fallback */}
                              <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                                  {t.book.time} <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-base pointer-events-none">
                                    ⏰
                                  </span>
                                  <select
                                    value={requestedTime}
                                    onChange={(e) => setRequestedTime(e.target.value)}
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 appearance-none"
                                  >
                                    <option value="">{locale === "bn" ? "সময় নির্বাচন করুন" : "Select time"}</option>
                                    <optgroup label={locale === "bn" ? "সকাল সেশন" : "Morning Session"}>
                                      {MORNING_SLOTS.map((time) => (
                                        <option key={time} value={time}>{time}</option>
                                      ))}
                                    </optgroup>
                                    <optgroup label={locale === "bn" ? "বিকাল সেশন" : "Evening Session"}>
                                      {EVENING_SLOTS.map((time) => (
                                        <option key={time} value={time}>{time}</option>
                                      ))}
                                    </optgroup>
                                  </select>
                                  <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 pointer-events-none">
                                    ▼
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Direct Interactive Time Chips Grid */}
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                {locale === "bn" ? "ক্লিক করে সময় বেছে নিন" : "Or Click Preferred Slot"}
                              </label>

                              {/* Morning Slots */}
                              <div className="mb-4">
                                <span className="text-xs font-semibold text-slate-500 inline-block mb-1.5">
                                  🌅 {locale === "bn" ? "সকাল সেশন" : "Morning Session"} (11:00 AM - 2:00 PM)
                                </span>
                                <div className="flex flex-wrap gap-2">
                                  {MORNING_SLOTS.map((time) => {
                                    const isSelected = requestedTime === time;
                                    return (
                                      <button
                                        key={time}
                                        type="button"
                                        onClick={() => setRequestedTime(time)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                                          isSelected
                                            ? "border-primary bg-primary text-white shadow-md shadow-primary/20"
                                            : "border-slate-200 bg-white hover:bg-slate-50 text-slate-600"
                                        }`}
                                      >
                                        {time}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Evening Slots */}
                              <div>
                                <span className="text-xs font-semibold text-slate-500 inline-block mb-1.5">
                                  🌆 {locale === "bn" ? "বিকাল সেশন" : "Evening Session"} (5:00 PM - 10:00 PM)
                                </span>
                                <div className="flex flex-wrap gap-2">
                                  {EVENING_SLOTS.map((time) => {
                                    const isSelected = requestedTime === time;
                                    return (
                                      <button
                                        key={time}
                                        type="button"
                                        onClick={() => setRequestedTime(time)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                                          isSelected
                                            ? "border-primary bg-primary text-white shadow-md shadow-primary/20"
                                            : "border-slate-200 bg-white hover:bg-slate-50 text-slate-600"
                                        }`}
                                      >
                                        {time}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4 pt-4 border-t border-slate-100">
                              <button
                                type="button"
                                onClick={handlePrevStep}
                                className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold px-6 py-3.5 rounded-xl border border-slate-200 active:scale-95 transition-all text-sm flex items-center justify-center gap-1.5"
                              >
                                <span>←</span> {locale === "bn" ? "পিছনে যান" : "Go Back"}
                              </button>
                              <button
                                type="submit"
                                disabled={loading}
                                className="flex-[2] btn-primary hover:scale-[1.01] active:scale-95 transition-all shadow-md shadow-primary/20 rounded-xl py-3.5 text-sm font-bold flex items-center justify-center gap-2"
                              >
                                {loading ? (
                                  <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    {t.common.loading}
                                  </>
                                ) : (
                                  <>
                                    📅 {t.book.submit}
                                  </>
                                )}
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
