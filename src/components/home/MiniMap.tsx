"use client";

import { CLINIC_INFO } from "@/lib/clinic-info";
import { useLanguage } from "@/context/LanguageContext";

export default function MiniMap() {
  const { locale } = useLanguage();

  const mapUrl = `https://www.google.com/maps?q=${CLINIC_INFO.address.coordinates.lat},${CLINIC_INFO.address.coordinates.lng}&z=17&output=embed`;

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <iframe
          title="Clinic Location"
          src={mapUrl}
          className="w-full h-64 rounded-xl border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="mt-4 text-center text-dark-text space-y-1">
          <p>📍 {locale === "bn" ? CLINIC_INFO.address.fullBangla : CLINIC_INFO.address.full}</p>
          <p>📞 {CLINIC_INFO.contact.phoneDisplay}</p>
          <p>🕐 {CLINIC_INFO.hours.morning} | {CLINIC_INFO.hours.evening}</p>
          <a
            href={CLINIC_INFO.address.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline text-sm"
          >
            Open in Google Maps →
          </a>
        </div>
      </div>
    </section>
  );
}
