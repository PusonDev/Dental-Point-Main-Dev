"use client";

import { motion } from "framer-motion";
import { CLINIC_INFO } from "@/lib/clinic-info";
import { useLanguage } from "@/context/LanguageContext";

export default function DoctorSection() {
  const { locale, t } = useLanguage();
  const doctorName = locale === "bn" ? CLINIC_INFO.doctor.nameBangla : CLINIC_INFO.doctor.name;

  return (
    <section className="relative overflow-hidden py-20 lg:py-24">
      <div className="absolute -left-32 top-10 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute right-0 top-1/2 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center"
        >
          <div className="relative rounded-[2rem] border border-white/5 bg-slate-950/90 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cyan-500/15 via-transparent to-transparent" />
            <div className="relative z-10 flex flex-col gap-8">
              <div className="flex flex-col gap-4 rounded-[2rem] border border-white/5 bg-slate-900/90 p-6 shadow-lg shadow-slate-950/20">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-500/10 text-5xl">
                      👩‍⚕️
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Meet Your Doctor</p>
                      <h3 className="mt-2 text-3xl font-semibold text-white lg:text-4xl">{doctorName}</h3>
                    </div>
                  </div>
                  <div className="rounded-3xl bg-white/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200 shadow-inner shadow-cyan-500/10">
                    Expert Care
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                    <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Experience</p>
                    <p className="mt-3 text-3xl font-semibold text-white">5+ Years</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                    <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Role</p>
                    <p className="mt-3 text-3xl font-semibold text-white">Bangladesh Bank Consultant</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] bg-cyan-500/5 p-6 text-slate-100 shadow-[0_20px_60px_rgba(14,116,144,0.12)]">
                  <p className="text-sm text-cyan-200 uppercase tracking-[0.2em]">Qualification</p>
                  <ul className="mt-4 space-y-3 text-slate-300 text-sm">
                    <li>BDS — University of Dhaka</li>
                    <li>BMDC Registration No. 8291</li>
                    <li>PGT — Conservative Dentistry, BSMMU</li>
                  </ul>
                </div>
                <div className="rounded-[2rem] bg-violet-500/5 p-6 text-slate-100 shadow-[0_20px_60px_rgba(124,58,237,0.12)]">
                  <p className="text-sm text-violet-200 uppercase tracking-[0.2em]">Specialty</p>
                  <ul className="mt-4 space-y-3 text-slate-300 text-sm">
                    <li>OMS — Shaheed Suhrawardy Medical College & Hospital</li>
                    <li>Consultant Dentist, Bangladesh Bank</li>
                    <li>Personalized gentle care in a calm environment</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/95 p-10 shadow-2xl shadow-slate-950/30">
              <div className="mb-6">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Meet Your Doctor</p>
                <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">{doctorName}</h2>
              </div>
              <p className="text-slate-300 leading-8">{t.home.doctorBio}</p>
              <ul className="mt-8 grid gap-3 text-slate-300 text-sm sm:grid-cols-2">
                <li className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3">BDS — University of Dhaka</li>
                <li className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3">BMDC Registration No. 8291</li>
                <li className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3">PGT — Conservative Dentistry, BSMMU</li>
                <li className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3">OMS — Shaheed Suhrawardy Medical College & Hospital</li>
              </ul>
            </div>

            <motion.blockquote
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-[2rem] border border-cyan-500/20 bg-cyan-500/10 p-8 text-slate-100 shadow-xl shadow-cyan-500/10"
            >
              <p className="text-xl font-semibold italic">
                “Every patient deserves a smile they&apos;re proud to share — that&apos;s my commitment to you.”
              </p>
            </motion.blockquote>

            <motion.a
              href="/book-appointment"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-7 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-400"
            >
              Book Appointment
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
