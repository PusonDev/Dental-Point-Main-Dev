"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { CLINIC_INFO } from "@/lib/clinic-info";

interface HeaderProps {
  minimal?: boolean;
}

export default function Header({ minimal = false }: HeaderProps) {
  const { t } = useLanguage();

  if (minimal) {
    return (
      <header className="bg-primary py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
                        <Image src="/logo.png" alt="Prity Dental Logo" width={40} height={40} className="rounded-full" />
          <span className="text-white font-bold">{CLINIC_INFO.name}</span>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-primary sticky top-0 z-40 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
                        <Image src="/logo.png" alt="Prity Dental Logo" width={36} height={36} className="rounded-full" />
          <span className="text-white font-bold text-sm md:text-base hidden sm:block">
            {CLINIC_INFO.name}
          </span>
        </Link>
        <nav className="flex items-center gap-2 md:gap-4 text-sm">
          <Link href="/" className="text-white/90 hover:text-white">{t.nav.home}</Link>
          <Link href="/services" className="text-white/90 hover:text-white">{t.nav.services}</Link>
          <Link href="/book-appointment" className="text-white/90 hover:text-white hidden sm:inline">
            {t.nav.book}
          </Link>
          <Link href="/auth/login" className="text-white/90 hover:text-white">{t.nav.login}</Link>
          <Link
            href="/auth/signup"
            className="bg-white text-primary px-3 py-1.5 rounded-lg font-semibold hover:bg-light-bg"
          >
            {t.nav.signup}
          </Link>
        </nav>
      </div>
    </header>
  );
}
