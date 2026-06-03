"use client";

import Link from "next/link";
import PublicLayout from "@/components/shared/PublicLayout";
import { SERVICES, CLINIC_INFO } from "@/lib/clinic-info";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function ServicesPage() {
  const { t, locale } = useLanguage();

  return (
    <PublicLayout>
      <div className="py-12 px-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-primary text-center mb-10">{t.services.title}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div
              key={s.id}
              className="card hover:border-primary border-2 border-transparent transition-all hover:shadow-lg"
            >
              <span className="text-4xl">{s.icon}</span>
              <h3 className="font-bold text-primary mt-3">
                {locale === "bn" ? s.nameBn : s.name}
              </h3>
              <p className="text-gray-600 text-sm mt-2">{s.description}</p>
              <Link
                href="/book-appointment"
                className="inline-block mt-4 text-primary font-semibold text-sm hover:underline"
              >
                {t.services.bookFor} →
              </Link>
            </div>
          ))}
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-16 relative overflow-hidden rounded-[2rem] bg-slate-900 border border-blue-500/20 p-[2px] group"
        >
          {/* Animated Shimmer Background */}
          <motion.div 
            animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(59,130,246,0.3)_50%,transparent_100%)] bg-[length:200%_100%]" 
          />
          
          <div className="relative bg-slate-950/90 backdrop-blur-2xl rounded-[30px] p-8 sm:p-12 text-center flex flex-col items-center justify-center h-full border border-white/5 overflow-hidden">
            
            {/* Glowing Icon */}
            <motion.div 
              animate={{ 
                boxShadow: ["0px 0px 0px 0px rgba(59,130,246,0)", "0px 0px 25px 5px rgba(59,130,246,0.3)", "0px 0px 0px 0px rgba(59,130,246,0)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-20 h-20 rounded-full bg-blue-900/30 flex items-center justify-center mb-6 border border-blue-500/30"
            >
              <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">⚙️</span>
            </motion.div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight drop-shadow-md">
              {t.services.note}
            </h3>
            
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-blue-500 to-transparent my-4 opacity-50" />

            <p className="text-blue-200 font-medium text-lg sm:text-xl flex items-center justify-center gap-3 mt-2">
              <span className="text-2xl animate-pulse drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">📷</span> 
              <span>{t.services.xray}</span>
            </p>

            {/* Corner Ambience */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-600 rounded-full blur-[100px] opacity-20 pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-indigo-600 rounded-full blur-[100px] opacity-20 pointer-events-none" />
          </div>
        </motion.div>
        <div className="mt-8 text-center">
          <p className="mb-4">Have a question? Call us: {CLINIC_INFO.contact.phoneDisplay}</p>
          <Link href="/book-appointment" className="btn-primary">{t.nav.book}</Link>
        </div>
      </div>
    </PublicLayout>
  );
}

