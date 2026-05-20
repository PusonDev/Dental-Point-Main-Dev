"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { CLINIC_INFO } from "@/lib/clinic-info";
import DentalAnimation from "./DentalAnimation";

export default function HeroSection() {
  const { t, locale } = useLanguage();

  return (
    <section className="relative min-h-screen bg-[#0a0f1c] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Background Ambient Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/20 rounded-full blur-[120px]" />
      </div>

      <DentalAnimation />
      
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl w-full">
        <div className="mb-4 flex items-center justify-center relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition duration-500"></div>
          <div className="relative bg-white/5 p-2 rounded-2xl backdrop-blur-sm border border-white/10">
            <Image src="/logo.png" alt="Dr. Jarin's Dental Point Logo" width={180} height={180} className="rounded-xl" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-cyan-200 tracking-tight leading-tight">
          {locale === "bn" ? CLINIC_INFO.nameBangla : t.home.heroTitle}
        </h1>
        
        <p className="text-blue-100/80 text-lg md:text-2xl font-light max-w-xl">
          {t.home.heroSubtitle}
        </p>

        <div className="w-full max-w-md mt-8 flex flex-col items-center gap-4">
          <Link
            href="/book-appointment"
            className="group relative w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-5 rounded-2xl font-bold text-lg md:text-xl shadow-[0_0_40px_rgba(56,189,248,0.3)] hover:shadow-[0_0_60px_rgba(56,189,248,0.5)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            <span className="relative z-10 text-2xl">📅</span>
            <span className="relative z-10 tracking-wide">আজই অ্যাপয়েন্টমেন্ট বুক করুন</span>
          </Link>
          <p className="text-white/50 text-sm font-medium tracking-wider uppercase">{t.home.bookSub}</p>
        </div>

        <div className="flex gap-4 mt-8 w-full max-w-sm">
          <Link href="/auth/signup" className="flex-1 text-center bg-white/5 hover:bg-white/10 border border-white/10 text-white backdrop-blur-md px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:border-white/20">
            {t.nav.signup}
          </Link>
          <Link href="/auth/login" className="flex-1 text-center bg-white/5 hover:bg-white/10 border border-white/10 text-white backdrop-blur-md px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:border-white/20">
            {t.nav.login}
          </Link>
        </div>
      </div>
    </section>
  );
}
