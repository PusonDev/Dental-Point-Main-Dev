"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import PublicLayout from "@/components/shared/PublicLayout";
import { useLanguage } from "@/context/LanguageContext";

type ServiceItem = {
  title: string;
  description: string;
  icon: ReactNode;
  accent: string;
  glow: string;
};

const services: ServiceItem[] = [
  { title: "Root Canal Treatment", description: "Treatment of infected tooth pulp to save your natural tooth using modern, painless techniques.", icon: <path d="M12 2C9 2 7 4.2 7 7c0 2.2 1.2 4 2.5 5.2V18l2.5 2 2.5-2v-5.8C14.8 11 16 9.2 16 7c0-2.8-2-5-4-5Z" />, accent: "from-sky-500/20 via-cyan-400/10 to-transparent", glow: "bg-sky-400/20" },
  { title: "Crown & Bridge", description: "Restore damaged teeth with precision-crafted natural-looking crowns and bridges.", icon: <path d="M4 20 L4 10 L9 15 L14 6 L19 15 L24 10 L24 20 Z" />, accent: "from-blue-500/20 via-sky-400/10 to-transparent", glow: "bg-blue-400/20" },
  { title: "Painless Extraction", description: "Safe, gentle removal of damaged, decayed, or wisdom teeth with minimal discomfort.", icon: <path d="M8 4 L8 14 C8 17 10 19 13 19" />, accent: "from-cyan-500/20 via-blue-400/10 to-transparent", glow: "bg-cyan-400/20" },
  { title: "Orthodontics & Braces", description: "Correction of crooked, misaligned teeth and jaw problems for a confident smile.", icon: <rect x="4" y="10" width="6" height="8" rx="2" />, accent: "from-sky-500/20 via-blue-400/10 to-transparent", glow: "bg-sky-400/20" },
  { title: "Cosmetic Filling", description: "Aesthetic cavity filling with tooth-colored composite — invisible and durable.", icon: <path d="M14 4 C10 4 7 7 7 11 C7 15 8 19 10 23 C11 25.5 12 27 14 27 C16 27 17 25.5 18 23 C20 19 21 15 21 11 C21 7 18 4 14 4Z" />, accent: "from-blue-500/20 via-cyan-400/10 to-transparent", glow: "bg-blue-400/20" },
  { title: "Dental Implant", description: "Permanent titanium implants that look, feel, and function exactly like natural teeth.", icon: <path d="M10 14 L18 14 L17 24 L14 26 L11 24 Z" />, accent: "from-sky-500/20 via-blue-400/10 to-transparent", glow: "bg-sky-400/20" },
  { title: "Scaling & Polishing", description: "Professional cleaning to remove plaque, tartar, and stains for fresh, healthy gums.", icon: <path d="M6 22 L14 14" />, accent: "from-cyan-500/20 via-sky-400/10 to-transparent", glow: "bg-cyan-400/20" },
  { title: "Dentures", description: "Full and partial dentures for complete or partial tooth loss restoration.", icon: <path d="M6 20 C6 12 9 6 14 6 C19 6 22 12 22 20" />, accent: "from-blue-500/20 via-sky-400/10 to-transparent", glow: "bg-blue-400/20" },
  { title: "Oral Surgery", description: "Surgical treatment for gum disease, oral cysts, and complex dental conditions.", icon: <path d="M4 24 L16 8" />, accent: "from-sky-500/20 via-cyan-400/10 to-transparent", glow: "bg-sky-400/20" },
  { title: "Trauma & Fracture", description: "Emergency care for broken, chipped, or injured teeth — fast and effective.", icon: <path d="M10 4 C7 4 5 7 5 11 C5 15 7 20 9 24" />, accent: "from-cyan-500/20 via-blue-400/10 to-transparent", glow: "bg-cyan-400/20" },
  { title: "Specialized Care", description: "Gentle dentistry for children, pregnant mothers, diabetic & heart patients.", icon: <path d="M14 24 C14 24 6 18 6 12 C6 9 8 7 11 7 C12.5 7 13.5 8 14 9 C14.5 8 15.5 7 17 7 C20 7 22 9 22 12 C22 18 14 24 14 24Z" />, accent: "from-blue-500/20 via-cyan-400/10 to-transparent", glow: "bg-blue-400/20" },
  { title: "Dental X-Ray", description: "Fast, accurate in-house X-ray with our own modern machine — no referral needed.", icon: <rect x="5" y="5" width="18" height="18" rx="2" />, accent: "from-sky-500/20 via-blue-400/10 to-transparent", glow: "bg-sky-400/20" },
];

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: i * 0.055,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  return (
    <motion.article
      custom={index}
      variants={itemVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -10, rotateX: 4 }}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-[0_18px_50px_rgba(2,6,23,0.28)] backdrop-blur-xl"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
      <motion.div
        animate={{ scale: [1, 1.14, 1], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute -right-10 -top-10 h-36 w-36 rounded-full ${service.glow} blur-3xl`}
        aria-hidden="true"
      />
      <div className="relative z-10">
        <motion.div
          whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
          transition={{ duration: 0.45 }}
          className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10 text-sky-300 shadow-[0_0_30px_rgba(56,189,248,0.14)]"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            {service.icon}
          </svg>
        </motion.div>
        <h2 className="text-lg font-semibold text-[#f0f9ff]">{service.title}</h2>
        <p className="mt-2 text-sm leading-6 text-[#94a3b8]">{service.description}</p>
      </div>
      <motion.div
        className="absolute bottom-4 right-4 h-10 w-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
        animate={{ y: [0, -4, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4.5, repeat: Infinity, delay: index * 0.1 }}
      />
    </motion.article>
  );
}

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <PublicLayout>
      <div className="relative overflow-hidden bg-[#07111f] text-[#f0f9ff]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10%] top-[-10%] h-[35rem] w-[35rem] rounded-full bg-sky-500/10 blur-[140px]" />
          <div className="absolute right-[-12%] top-[18%] h-[28rem] w-[28rem] rounded-full bg-blue-500/10 blur-[140px]" />
          <div className="absolute bottom-[-14%] left-[18%] h-[26rem] w-[26rem] rounded-full bg-cyan-500/10 blur-[140px]" />
        </div>

        <section className="relative overflow-hidden px-4 pt-24 pb-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-[#94a3b8] backdrop-blur-md">
                  {t.services.pageTagline}
                </p>
                <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  {t.services.pageHeadline}
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-7 text-[#94a3b8] sm:text-lg">
                  {t.services.pageDesc}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/book-appointment"
                    className="inline-flex items-center justify-center rounded-full bg-[#38bdf8] px-5 py-3 text-sm font-semibold text-[#08111e] shadow-[0_16px_35px_rgba(56,189,248,0.25)] transition-transform hover:-translate-y-0.5"
                  >
                    {t.services.bookAppointment}
                  </Link>
                  <a
                    href="#services-grid"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-[#f0f9ff] backdrop-blur-md transition-colors hover:bg-white/10"
                  >
                    {t.nav.services}
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_rgba(2,6,23,0.45)] backdrop-blur-xl">
                  <motion.div
                    animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative rounded-[1.75rem] border border-sky-400/20 bg-gradient-to-br from-sky-500/10 via-blue-500/5 to-transparent p-6"
                  >
                    <div className="absolute inset-0 rounded-[1.75rem] bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_50%)]" />
                    <div className="relative z-10 grid grid-cols-2 gap-3">
                      {[
                        { label: "12+", value: "Specialties" },
                        { label: "24/7", value: "Guidance" },
                        { label: "1st", value: "Comfort First" },
                        { label: "∞", value: "Care" },
                      ].map((item) => (
                        <div key={item.label} className="rounded-2xl border border-white/10 bg-[#0b1628]/70 p-4">
                          <div className="text-2xl font-semibold text-white">{item.label}</div>
                          <div className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-400">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.12 }}
              className="mt-10 h-px w-full origin-left bg-gradient-to-r from-transparent via-[#38bdf8]/60 to-transparent"
            />
          </div>
        </section>

        <section id="services-grid" className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-120px" }}
            >
              {services.map((service, index) => (
                <ServiceCard key={service.title} service={service} index={index} />
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_40%)]" />
              <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#38bdf8]">
                    {t.services.needHelp}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold text-[#f0f9ff]">
                    {t.services.guideText}
                  </h3>
                  <p className="mt-3 text-[#94a3b8]">
                    {t.services.guideDesc}
                  </p>
                </div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/book-appointment"
                    className="inline-flex items-center justify-center rounded-full bg-[#38bdf8] px-5 py-3 text-sm font-semibold text-[#0a0f1e] shadow-[0_16px_35px_rgba(56,189,248,0.25)]"
                  >
                    {t.services.bookAppointment}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
