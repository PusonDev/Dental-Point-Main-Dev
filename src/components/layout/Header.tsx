"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { CLINIC_INFO } from "@/lib/clinic-info";
import NavSignUp from "@/components/layout/NavSignUp";
import NavSignIn from "@/components/layout/NavSignIn";

// Simple magnetic hover effect for 3‑D movement
function MagneticItem({ children, className }: { children: React.ReactNode; className?: string }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    setPos({ x, y });
  };
  const reset = () => setPos({ x: 0, y: 0 });
  return (
    <motion.div
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ rotateX: pos.y, rotateY: -pos.x }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

export default function Header() {
  const { t, tc } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [
    { name: t?.nav?.home ?? "Home", href: "/" },
    { name: t?.nav?.services ?? "Services", href: "/services" },
    { name: t?.nav?.book ?? "Book", href: "/book-appointment" },
  ];

  return (
    <header className="bg-[#050d1a]/90 backdrop-blur-xl shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo-new.png" alt="Prity Dental Logo" width={44} height={44} className="rounded-full" />
          <div>
            <p className="font-cormorant text-lg font-semibold">{CLINIC_INFO.name}</p>
            <p className="text-[#38bdf8] text-sm">{tc("home.heroSubtitle", "Better Teeth · Better Health")}</p>
          </div>
        </Link>
        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6 text-white">
          {links.map((l) => (
            <MagneticItem key={l.href} className="cursor-pointer">
              <Link href={l.href} className="hover:text-[#38bdf8] transition-colors">
                {l.name}
              </Link>
            </MagneticItem>
          ))}
          <MagneticItem className="cursor-pointer">
            <NavSignUp className="hover:text-[#38bdf8] transition-colors" />
          </MagneticItem>
          <MagneticItem className="cursor-pointer">
            <NavSignIn className="hover:text-[#38bdf8] transition-colors" />
          </MagneticItem>
        </nav>
        {/* Mobile menu button */}
        <button className="text-white lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#050d1a]/95 backdrop-blur-xl border-t border-blue-900/40"
          >
            <div className="px-4 py-4 flex flex-col gap-2 text-white">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="py-2 hover:text-[#38bdf8] transition-colors" onClick={() => setMobileOpen(false)}>
                  {l.name}
                </Link>
              ))}
              <NavSignUp
                className="py-2 hover:text-[#38bdf8] transition-colors"
                onClick={() => setMobileOpen(false)}
              />
              <NavSignIn
                className="py-2 hover:text-[#38bdf8] transition-colors"
                onClick={() => setMobileOpen(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
