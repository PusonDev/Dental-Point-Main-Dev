"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

// Magnetic hover component for subtle 3D movement
function MagneticItem({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mx = e.clientX - (rect.left + rect.width / 2);
    const my = e.clientY - (rect.top + rect.height / 2);
    // small displacement for a refined effect
    x.set(mx * 0.2);
    y.set(my * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ rotateX, rotateY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Footer() {
  const { t } = useLanguage(); // placeholder for future i18n
  const links = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Book", href: "/book-appointment" },
    { name: "Login", href: "/auth/login" },
  ];

  return (
    <footer className="bg-[#0a1628] text-white mt-auto border-t border-blue-900/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          >
            <Image src="/logo-new.png" alt="Prity Dental Logo" width={44} height={44} />
          </motion.div>
          <div>
            <p className="font-cormorant text-lg font-semibold">Dr. Jarin's Dental Point</p>
            <p className="text-[#38bdf8] text-sm">Better Teeth · Better Health</p>
          </div>
        </div>

        {/* Center: Credit */}
        <p className="text-white/60 text-center text-sm">
          © {new Date().getFullYear()} Dr. Jarin's Dental Point. All rights reserved. Built by{' '}
          <a
            href="https://puson.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#38bdf8] hover:underline"
          >
            Puson
          </a>
        </p>

        {/* Right: Horizontal navigation with magnetic hover */}
        <nav className="flex justify-center md:justify-end gap-6">
          {links.map((item, idx) => (
            <MagneticItem key={idx} className="group relative">
              <Link href={item.href} className="text-slate-300 text-lg font-medium transition-colors duration-300">
                <span className="relative z-10 group-hover:text-white">{item.name}</span>
                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 bg-blue-500/20 rounded-md blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </Link>
            </MagneticItem>
          ))}
        </nav>
      </div>
    </footer>
  );
}
