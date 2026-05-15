"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function BookingCTA() {
  const { t } = useLanguage();

  return (
    <section className="py-16 px-4 bg-primary text-white text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">{t.home.readyTitle}</h2>
        <p className="text-white/80 mb-6">{t.home.readySub}</p>
        <Link
          href="/book-appointment"
          className="inline-block bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-light-bg transition-colors"
        >
          {t.nav.book} →
        </Link>
      </div>
    </section>
  );
}
