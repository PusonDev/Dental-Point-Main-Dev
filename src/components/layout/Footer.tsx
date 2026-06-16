"use client";
import { motion } from 'framer-motion';
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import FooterAdminLogin from "@/components/layout/FooterAdminLogin";

export default function Footer() {
  const { tc } = useLanguage();

  return (
    <footer className="bg-[#0a1628] text-white mt-auto border-t border-blue-900/20 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-center">
        {/* Left: Logo (clickable to home) */}
        <Link href="/" className="flex items-center gap-3" aria-label="Go to homepage">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          >
            <Image src="/logo-new.png" alt="Prity Dental Logo" width={44} height={44} />
          </motion.div>
          <div>
            <p className="font-cormorant text-lg font-semibold">Dr. Jarin&apos;s Dental Point</p>
            <p className="text-[#38bdf8] text-sm">{tc("home.heroSubtitle", "Better Teeth · Better Health")}</p>
          </div>
        </Link>

        {/* Center: Credit */}
        <p className="text-white/60 text-center text-sm">
          © {new Date().getFullYear()} Dr. Jarin&apos;s Dental Point. {tc("footer.rights", "All rights reserved")} by{" "}
          <a
            href="https://puson.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#38bdf8] hover:underline"
          >
            puson.dev
          </a>
        </p>

        <FooterAdminLogin />
      </div>
    </footer>
  );
}
