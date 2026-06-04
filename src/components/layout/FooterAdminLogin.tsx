"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function FooterAdminLogin() {
  const { t } = useLanguage();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    setTilt({ x, y });
  };

  const resetTilt = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      className="flex justify-center md:justify-end w-full"
      style={{ perspective: 900 }}
    >
      <motion.div
        className="relative"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={resetTilt}
        animate={{
          rotateX: tilt.y,
          rotateY: -tilt.x,
          z: hovered ? 24 : 0,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/40 via-blue-600/50 to-indigo-600/40 blur-md"
          animate={{
            opacity: hovered ? 1 : 0.35,
            scale: hovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.3 }}
          style={{ transform: "translateZ(-12px)" }}
        />

        <Link
          href="/admin/login"
          className="relative flex items-center gap-2.5 px-5 py-3 rounded-xl border border-cyan-400/30 bg-gradient-to-br from-[#0f2744]/90 to-[#0a1628]/95 text-sm font-semibold text-cyan-100 shadow-[0_8px_32px_rgba(56,189,248,0.15)] hover:text-white hover:border-cyan-300/50 transition-colors"
          style={{ transform: "translateZ(16px)" }}
        >
          <motion.span
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/15 border border-cyan-400/25 text-base"
            animate={{ rotateY: hovered ? 360 : 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            🔐
          </motion.span>
          <span className="tracking-wide">{t.footer.adminLogin}</span>
        </Link>
      </motion.div>
    </div>
  );
}
