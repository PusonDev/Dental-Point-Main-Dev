"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { CLINIC_INFO } from "@/lib/clinic-info";
import DentalAnimation from "./DentalAnimation";

export default function HeroSection() {
  const { t, locale } = useLanguage();

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-primary to-primary-dark flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <DentalAnimation />
      <div className="relative z-10 flex flex-col items-center gap-4 max-w-lg">
        <div className="mb-4 p-6 bg-white rounded-2xl shadow-lg flex items-center justify-center">
          <Image src="/logo.png" alt="Prity Dental Logo" width={160} height={160} className="rounded-full" />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white">
          {locale === "bn" ? CLINIC_INFO.nameBangla : t.home.heroTitle}
        </h1>
        <p className="text-accent text-lg md:text-xl">{t.home.heroSubtitle}</p>

        <Link
          href="/book-appointment"
          className="mt-6 bg-white text-primary px-8 py-5 rounded-2xl font-bold text-lg md:text-xl shadow-xl animate-pulseGlow w-full max-w-sm"
        >
          📅 {t.home.bookCta}
        </Link>
        <p className="text-white/70 text-sm">{t.home.bookSub}</p>

        <div className="flex gap-4 mt-4">
          <Link href="/auth/signup" className="btn-secondary text-sm px-5 py-2">
            {t.nav.signup}
          </Link>
          <Link href="/auth/login" className="btn-secondary text-sm px-5 py-2">
            {t.nav.login}
          </Link>
        </div>
      </div>
    </section>
  );
}
