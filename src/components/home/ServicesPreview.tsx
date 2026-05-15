"use client";

import Link from "next/link";
import { SERVICES } from "@/lib/clinic-info";
import { useLanguage } from "@/context/LanguageContext";

export default function ServicesPreview() {
  const { t, locale } = useLanguage();
  const preview = SERVICES.slice(0, 4);

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-10">
          {t.services.title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {preview.map((s) => (
            <div
              key={s.id}
              className="card text-center hover:border-primary border-2 border-transparent transition-colors"
            >
              <span className="text-3xl">{s.icon}</span>
              <p className="font-semibold mt-2 text-sm">
                {locale === "bn" ? s.nameBn : s.name.split(" ")[0]}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/services" className="btn-primary inline-block">
            {t.home.viewServices} →
          </Link>
        </div>
      </div>
    </section>
  );
}
