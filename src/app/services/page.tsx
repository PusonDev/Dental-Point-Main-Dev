"use client";

import Link from "next/link";
import PublicLayout from "@/components/shared/PublicLayout";
import { SERVICES, CLINIC_INFO } from "@/lib/clinic-info";
import { useLanguage } from "@/context/LanguageContext";

export default function ServicesPage() {
  const { t, locale } = useLanguage();

  return (
    <PublicLayout>
      <div className="py-12 px-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-primary text-center mb-10">{t.services.title}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div
              key={s.id}
              className="card hover:border-primary border-2 border-transparent transition-all hover:shadow-lg"
            >
              <span className="text-4xl">{s.icon}</span>
              <h3 className="font-bold text-primary mt-3">
                {locale === "bn" ? s.nameBn : s.name}
              </h3>
              <p className="text-gray-600 text-sm mt-2">{s.description}</p>
              <Link
                href="/book-appointment"
                className="inline-block mt-4 text-primary font-semibold text-sm hover:underline"
              >
                {t.services.bookFor} →
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-10 card bg-light-bg text-center">
          <p className="font-medium">{t.services.note}</p>
          <p className="text-primary font-bold mt-2">📷 {t.services.xray}</p>
        </div>
        <div className="mt-8 text-center">
          <p className="mb-4">Have a question? Call us: {CLINIC_INFO.contact.phoneDisplay}</p>
          <Link href="/book-appointment" className="btn-primary">{t.nav.book}</Link>
        </div>
      </div>
    </PublicLayout>
  );
}

