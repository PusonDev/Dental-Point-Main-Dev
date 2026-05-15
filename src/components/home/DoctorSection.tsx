"use client";

import { CLINIC_INFO } from "@/lib/clinic-info";
import { useLanguage } from "@/context/LanguageContext";

export default function DoctorSection() {
  const { locale } = useLanguage();

  return (
    <section className="py-16 px-4 bg-light-bg">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div className="aspect-[3/4] max-w-sm mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-8xl">
          👩‍⚕️
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            {locale === "bn" ? CLINIC_INFO.doctor.nameBangla : CLINIC_INFO.doctor.name}
          </h2>
          <ul className="space-y-2 text-dark-text">
            {CLINIC_INFO.doctor.qualifications.map((q) => (
              <li key={q} className="flex items-start gap-2">
                <span className="text-primary">•</span> {q}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-gray-600">{CLINIC_INFO.doctor.bio}</p>
        </div>
      </div>
    </section>
  );
}
