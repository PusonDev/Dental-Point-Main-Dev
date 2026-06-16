"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PublicLayout from "@/components/shared/PublicLayout";
import type { ReactNode } from "react";

type ServiceItem = {
  title: string;
  description: string;
  icon: ReactNode;
};

const services: ServiceItem[] = [
  { title: "Teeth Whitening", description: "Brighter smile in a safe, clinic-controlled setting.", icon: <path d="M12 3l2.2 4.5L19 9.8l-3.5 3.4.8 4.8L12 15.8 7.7 18l.8-4.8L5 9.8l4.8-.3L12 3Z" /> },
  { title: "Dental Implants", description: "Natural-looking replacement for missing teeth.", icon: <path d="M12 2C8.1 2 5 5.1 5 9c0 5 7 13 7 13s7-8 7-13c0-3.9-3.1-7-7-7Zm0 9.2A2.2 2.2 0 1 1 12 6.8a2.2 2.2 0 0 1 0 4.4Z" /> },
  { title: "Orthodontics / Braces", description: "Straighten alignment with modern orthodontic care.", icon: <path d="M6 6h12v2H6V6Zm0 4h12v2H6v-2Zm0 4h12v2H6v-2Z" /> },
  { title: "Root Canal", description: "Relieve pain and save the natural tooth.", icon: <path d="M12 2C9 2 7 4.2 7 7c0 2.2 1.2 4 2.5 5.2V18l2.5 2 2.5-2v-5.8C14.8 11 16 9.2 16 7c0-2.8-2-5-4-5Z" /> },
  { title: "Teeth Cleaning", description: "Routine scaling and polishing for gum health.", icon: <path d="M5 11h14v2H5v-2Zm2-5h10v2H7V6Zm2 10h6v2H9v-2Z" /> },
  { title: "Dental Checkup", description: "Comprehensive exam and preventive planning for lasting oral health.", icon: <path d="M9 2a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm0 12.25A5.25 5.25 0 1 1 14.25 9 5.256 5.256 0 0 1 9 14.25Zm5.75-.75l3.5 3.5-1.5 1.5-3.5-3.5 1.5-1.5Z" /> },
  { title: "Veneers", description: "Refine shape and color for a polished smile.", icon: <path d="M7 4h10l2 5-7 11L5 9l2-5Zm2.2 2L8 8.2 12 15l4-6.8L14.8 6H9.2Z" /> },
  { title: "Pediatric Dentistry", description: "Gentle care for children and first-time visits.", icon: <path d="M12 3a5 5 0 0 0-5 5v2H6a2 2 0 0 0-2 2v2h4v5h4v-5h2v5h4v-5h4v-2a2 2 0 0 0-2-2h-1V8a5 5 0 0 0-5-5Z" /> },
  { title: "Emergency Dental Care", description: "Fast response for pain, trauma, or urgent issues.", icon: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /> },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

export default function ServicesPage() {
  return (
    <PublicLayout>
      <div className="bg-[#0a0f1e] text-[#f0f9ff]">
        <section className="relative overflow-hidden px-4 pt-24 pb-12 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_30%)]" />
          <div className="relative mx-auto max-w-7xl">
            <motion.div {...fadeInUp} className="max-w-3xl">
              <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-[#94a3b8] backdrop-blur-md">
                Premium treatments. Gentle care. Clear pricing.
              </p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Dental services designed around comfort and confidence.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#94a3b8] sm:text-lg">
                From preventive cleaning to emergency care, every service is delivered with modern tools, calm guidance, and a smile-first experience.
              </p>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ duration: 0.7, delay: 0.15 }} className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-[#38bdf8]/60 to-transparent" />
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            >
              {services.map((service) => (
                <motion.article
                  key={service.title}
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                  whileHover={{ y: -4, boxShadow: "0 16px 32px rgba(56,189,248,0.12)" }}
                  transition={{ duration: 0.25 }}
                  className="group rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.04)] p-3 backdrop-blur-md flex flex-col justify-between"
                >
                  <div>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl border border-[#38bdf8]/20 bg-[#38bdf8]/10 text-[#38bdf8]">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        {service.icon}
                      </svg>
                    </div>
                    <h2 className="text-base font-semibold text-[#f0f9ff]">{service.title}</h2>
                    <p className="mt-2 text-sm leading-5 text-[#94a3b8]">{service.description}</p>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#38bdf8]">Need help choosing?</p>
                  <h3 className="mt-3 text-2xl font-bold text-[#f0f9ff]">We’ll guide you to the right treatment, without the pressure.</h3>
                  <p className="mt-3 text-[#94a3b8] whitespace-nowrap overflow-x-auto">
                    Book a consultation and let the clinic help you decide the safest, fastest, and most effective path forward.
                  </p>
                </div>
                <Link href="/book-appointment" className="inline-flex items-center justify-center rounded-full bg-[#38bdf8] px-4 py-2 text-sm font-semibold text-[#0a0f1e] whitespace-nowrap">
                  Book an Appointment
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
