"use client";

import Link from "next/link";
import Image from "next/image";
import { CLINIC_INFO } from "@/lib/clinic-info";
import { useLanguage } from "@/context/LanguageContext";
import BuiltBy from "./BuiltBy";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary-dark text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Image src="/logo.png" alt="Prity Dental Logo" width={40} height={40} />
            <div>
              <p className="font-bold">{CLINIC_INFO.name}</p>
              <p className="text-accent text-sm">{CLINIC_INFO.tagline}</p>
            </div>
          </div>
        </div>
        <div>
          <p className="font-semibold mb-3">Links</p>
          <nav className="flex flex-col gap-2 text-sm text-white/80">
            <Link href="/" className="hover:text-white">{t.nav.home}</Link>
            <Link href="/services" className="hover:text-white">{t.nav.services}</Link>
            <Link href="/book-appointment" className="hover:text-white">{t.nav.book}</Link>
            <Link href="/auth/login" className="hover:text-white">{t.nav.login}</Link>
          </nav>
        </div>
        <div>
          <p className="font-semibold mb-3">Contact</p>
          <p className="text-sm text-white/80">📞 {CLINIC_INFO.contact.phoneDisplay}</p>
          <p className="text-sm text-white/80">✉️ {CLINIC_INFO.contact.email}</p>
          <p className="text-sm text-white/80 mt-2">📍 {CLINIC_INFO.address.full}</p>
          <p className="text-sm text-white/80 mt-1">
            🕐 {CLINIC_INFO.hours.morning} | {CLINIC_INFO.hours.evening}
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-sm text-white/60">
        © {new Date().getFullYear()} {CLINIC_INFO.name} | {t.footer.rights}
      </div>
      <BuiltBy />
    </footer>
  );
}
