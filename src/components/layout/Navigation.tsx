"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import NavSignUp from "@/components/layout/NavSignUp";
import NavSignIn from "@/components/layout/NavSignIn";

export default function Navigation() {
  const { t, tc } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[#050d1a]/90 border-b border-blue-900/40"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-new.png"
              alt="Dr. Jarin's Dental Point"
              width={44}
              height={44}
            />
            <div className="hidden sm:block">
              <span className="font-cormorant text-xl font-semibold text-white block leading-tight">
                {"Dr. Jarin's Dental Point"}
              </span>
              <span className="text-[#38bdf8] text-sm block">
                {tc("home.heroSubtitle", "Better Teeth · Better Health")}
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-[#f0f6ff]/80 hover:text-white transition-colors"
            >
              {t.nav.home}
            </Link>
            <Link
              href="/services"
              className="text-[#f0f6ff]/80 hover:text-white transition-colors"
            >
              {t.nav.services}
            </Link>
            <Link
              href="/#contact"
              className="text-[#f0f6ff]/80 hover:text-white transition-colors"
            >
              {tc("nav.contact", "Contact")}
            </Link>
            <NavSignUp />
            <NavSignIn />
            <Link
              href="/book-appointment"
              className="bg-[#1d4ed8] hover:bg-[#2563eb] text-white px-5 py-2 rounded-full font-medium transition-all shadow-lg shadow-blue-500/30"
            >
              {t.nav.book}
            </Link>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#050d1a]/95 backdrop-blur-xl border-t border-blue-900/40"
          >
            <div className="px-4 py-4 space-y-3">
              <Link
                href="/"
                className="block text-[#f0f6ff]/80 hover:text-white py-2"
                onClick={() => setMobileOpen(false)}
              >
                {t.nav.home}
              </Link>
              <Link
                href="/services"
                className="block text-[#f0f6ff]/80 hover:text-white py-2"
                onClick={() => setMobileOpen(false)}
              >
                {t.nav.services}
              </Link>
              <Link
                href="/book-appointment"
                className="block text-[#f0f6ff]/80 hover:text-white py-2"
                onClick={() => setMobileOpen(false)}
              >
                {t.nav.book}
              </Link>
              <Link
                href="/#contact"
                className="block text-[#f0f6ff]/80 hover:text-white py-2"
                onClick={() => setMobileOpen(false)}
              >
                {tc("nav.contact", "Contact")}
              </Link>
              <NavSignUp
                className="block text-[#f0f6ff]/80 hover:text-white py-2"
                onClick={() => setMobileOpen(false)}
              />
              <NavSignIn
                className="block text-[#f0f6ff]/80 hover:text-white py-2"
                onClick={() => setMobileOpen(false)}
              />
              <Link
                href="/book-appointment"
                className="block bg-[#1d4ed8] hover:bg-[#2563eb] text-white px-5 py-2 rounded-full font-medium text-center mt-4"
                onClick={() => setMobileOpen(false)}
              >
                {t.nav.book}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
