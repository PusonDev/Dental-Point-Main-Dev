"use client";

import { CLINIC_INFO } from "@/lib/clinic-info";
import { useLanguage } from "@/context/LanguageContext";

export default function MiniMap() {
  const { locale } = useLanguage();

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <iframe
          title="Clinic Location"
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.7!2d${CLINIC_INFO.address.coordinates.lng}!3d${CLINIC_INFO.address.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zDr. Jarin's Dental Point!5e0!3m2!1sen!2sbd!4v1`}
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
