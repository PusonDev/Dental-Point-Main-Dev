"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useAnimation } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
const services = [
  {
    title: "Root Canal Treatment",
    desc: "Treatment of infected tooth pulp to save your natural tooth using modern, painless techniques.",
    icon: "rct",
    color: "blue",
  },
  {
    title: "Crown, Cap & Bridge",
    desc: "Restore damaged teeth with precision-crafted natural-looking crowns and bridges.",
    icon: "crown",
    color: "sky",
  },
  {
    title: "Painless Extraction",
    desc: "Safe, gentle removal of damaged, decayed, or wisdom teeth with minimal discomfort.",
    icon: "extraction",
    color: "blue",
  },
  {
    title: "Orthodontics & Braces",
    desc: "Correction of crooked, misaligned teeth and jaw problems for a confident smile.",
    icon: "braces",
    color: "sky",
  },
  {
    title: "Cosmetic Filling",
    desc: "Aesthetic cavity filling with tooth-colored composite — invisible and durable.",
    icon: "filling",
    color: "blue",
  },
  {
    title: "Dental Implant",
    desc: "Permanent titanium implants that look, feel, and function exactly like natural teeth.",
    icon: "implant",
    color: "sky",
  },
  {
    title: "Scaling & Polishing",
    desc: "Professional cleaning to remove plaque, tartar, and stains for fresh, healthy gums.",
    icon: "scaling",
    color: "blue",
  },
  {
    title: "Dentures",
    desc: "Full and partial dentures for complete or partial tooth loss restoration.",
    icon: "denture",
    color: "sky",
  },
  {
    title: "Oral Surgery",
    desc: "Surgical treatment for gum disease, oral cysts, and complex dental conditions.",
    icon: "surgery",
    color: "blue",
  },
  {
    title: "Trauma & Fracture",
    desc: "Emergency care for broken, chipped, or injured teeth — fast and effective.",
    icon: "trauma",
    color: "sky",
  },
  {
    title: "Specialized Care",
    desc: "Gentle dentistry for children, pregnant mothers, diabetic & heart patients.",
    icon: "specialized",
    color: "blue",
  },
  {
    title: "Dental X-Ray",
    desc: "Fast, accurate in-house X-ray with our own modern machine — no referral needed.",
    icon: "xray",
    color: "sky",
  },
];

const iconMap: Record<string, JSX.Element> = {
  rct: (
    <svg viewBox="0 0 28 28" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4 C10 4 7 6 6 10 C5 14 6 17 7 21 C8 24 9 26 10 27 C11 28 12 27.5 13 25 C13.5 23 14 21 14 21 C14 21 14.5 23 15 25 C16 27.5 17 28 18 27 C19 26 20 24 21 21 C22 17 23 14 22 10 C21 6 18 4 14 4Z"/>
      <line x1="14" y1="16" x2="12" y2="27"/>
      <line x1="14" y1="16" x2="16" y2="27"/>
    </svg>
  ),
  crown: (
    <svg viewBox="0 0 28 28" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20 L4 10 L9 15 L14 6 L19 15 L24 10 L24 20 Z"/>
      <rect x="4" y="20" width="20" height="4" rx="1"/>
      <circle cx="14" cy="6" r="1.5" fill="currentColor"/>
      <circle cx="4" cy="10" r="1.5" fill="currentColor"/>
      <circle cx="24" cy="10" r="1.5" fill="currentColor"/>
    </svg>
  ),
  extraction: (
    <svg viewBox="0 0 28 28" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 4 L8 14 C8 17 10 19 13 19"/>
      <path d="M20 4 L20 14 C20 17 18 19 15 19"/>
      <path d="M13 19 C13 22 14 25 14 25"/>
      <path d="M15 19 C15 22 14 25 14 25"/>
      <line x1="6" y1="10" x2="22" y2="10"/>
    </svg>
  ),
  braces: (
    <svg viewBox="0 0 28 28" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="10" width="6" height="8" rx="2"/>
      <rect x="11" y="9" width="6" height="9" rx="2"/>
      <rect x="18" y="10" width="6" height="8" rx="2"/>
      <line x1="4" y1="14" x2="24" y2="14"/>
      <rect x="12.5" y="12.5" width="3" height="3" rx="0.5"/>
    </svg>
  ),
  filling: (
    <svg viewBox="0 0 28 28" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4 C10 4 7 7 7 11 C7 15 8 19 10 23 C11 25.5 12 27 14 27 C16 27 17 25.5 18 23 C20 19 21 15 21 11 C21 7 18 4 14 4Z"/>
      <path d="M11 11 C11 9 12.5 8 14 8 C15.5 8 17 9 17 11 C17 13 15.5 14 14 14 C12.5 14 11 13 11 11Z" fill="currentColor" opacity="0.4"/>
    </svg>
  ),
  implant: (
    <svg viewBox="0 0 28 28" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 14 L18 14 L17 24 L14 26 L11 24 Z"/>
      <line x1="12" y1="16" x2="12" y2="24"/>
      <line x1="16" y1="16" x2="16" y2="24"/>
      <line x1="11" y1="19" x2="17" y2="19"/>
      <rect x="8" y="8" width="12" height="6" rx="3"/>
      <line x1="14" y1="4" x2="14" y2="8"/>
    </svg>
  ),
  scaling: (
    <svg viewBox="0 0 28 28" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 22 L14 14"/>
      <path d="M14 14 L18 8 C20 5 23 4 23 4 C23 4 22 7 19 9 L14 14"/>
      <circle cx="8" cy="20" r="2"/>
      <path d="M19 18 L19 22 M17 20 L21 20"/>
      <path d="M22 14 L22 16 M21 15 L23 15"/>
    </svg>
  ),
  denture: (
    <svg viewBox="0 0 28 28" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 20 C6 12 9 6 14 6 C19 6 22 12 22 20"/>
      <rect x="6" y="18" width="4" height="5" rx="1"/>
      <rect x="11" y="17" width="4" height="6" rx="1"/>
      <rect x="16" y="18" width="4" height="5" rx="1"/>
      <line x1="6" y1="20" x2="22" y2="20"/>
    </svg>
  ),
  surgery: (
    <svg viewBox="0 0 28 28" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 24 L16 8"/>
      <path d="M16 8 L22 6 L20 12 L16 8Z"/>
      <line x1="8" y1="20" x2="12" y2="16"/>
      <circle cx="5" cy="23" r="1.5"/>
    </svg>
  ),
  trauma: (
    <svg viewBox="0 0 28 28" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 4 C7 4 5 7 5 11 C5 15 7 20 9 24 C10 26 11 27 12 26 L14 20 L16 26 C17 27 18 26 19 24 C21 20 23 15 23 11 C23 7 21 4 18 4 Z" opacity="0.5"/>
      <path d="M14 4 L11 13 L14 13 L11 22" strokeWidth="2"/>
    </svg>
  ),
  specialized: (
    <svg viewBox="0 0 28 28" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 24 C14 24 6 18 6 12 C6 9 8 7 11 7 C12.5 7 13.5 8 14 9 C14.5 8 15.5 7 17 7 C20 7 22 9 22 12 C22 18 14 24 14 24Z"/>
      <line x1="11" y1="14" x2="17" y2="14"/>
      <line x1="14" y1="11" x2="14" y2="17"/>
    </svg>
  ),
  xray: (
    <svg viewBox="0 0 28 28" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="5" width="18" height="18" rx="2"/>
      <line x1="5" y1="11" x2="23" y2="11"/>
      <line x1="5" y1="17" x2="23" y2="17"/>
      <line x1="11" y1="5" x2="11" y2="23"/>
      <path d="M14 8 L14 9 M14 19 L14 20 M8 14 L9 14 M19 14 L20 14"/>
    </svg>
  ),
};

function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return <span ref={ref}>{count}</span>;
}

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white/3 border border-white/8 rounded-2xl p-7 hover:-translate-y-1.5 hover:border-blue-500/30 hover:shadow-[0_20px_50px_rgba(29,78,216,0.3)] transition-all duration-300 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-4 right-4 text-6xl font-cormorant text-white/3 font-semibold">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div
        className={`w-13 h-13 rounded-xl flex items-center justify-center mb-4 ${
          service.color === "blue"
            ? "bg-blue-500/15"
            : "bg-sky-500/15"
        }`}
      >
        <div
          className={`w-7 h-7 ${
            service.color === "blue" ? "stroke-blue-400" : "stroke-sky-400"
          }`}
        >
          {iconMap[service.icon]}
        </div>
      </div>
      <h3 className="font-cormorant text-xl font-semibold mb-2 group-hover:text-sky-400 transition-colors">
        {service.title}
      </h3>
      <p className="text-white/60 text-sm leading-relaxed">{service.desc}</p>
      <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  const { t } = useLanguage();
  const heroRef = useRef(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{ x: number; y: number; vx: number; vy: number }> = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(59, 130, 246, 0.3)";
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            name: "Dr. Jarin's Dental Point",
            description: "Expert dental care in East Bashabo, Dhaka. BMDC Reg: 8291.",
            telephone: "+8801616753364",
            email: "drjarinsdentalpoint14@gmail.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "1/1, East Bashabo, Kodomtola, Shobujbag, Dhaka-1214",
              addressLocality: "Dhaka",
              addressCountry: "BD",
            },
            openingHours: ["Sa-Th 11:00-14:00", "Sa-Th 17:00-22:00"],
          }),
        }}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <canvas
          ref={particlesRef}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
        />
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{
              x: [50, -50, 50],
              y: [-50, 50, -50],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6"
              >
                <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
                <span className="text-sm text-white/80">
                  BMDC Reg: 8291 · Now Accepting Patients
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="font-cormorant text-5xl md:text-6xl font-light leading-tight mb-6"
              >
                Where Smiles
                <br />
                <span className="italic text-[#1d4ed8]">Begin & Shine</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-white/70 text-lg mb-8 max-w-lg"
              >
                Expert, gentle dental care in the heart of East Bashabo, Dhaka.
                Modern techniques. Lasting results.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-wrap gap-4 mb-12"
              >
                <Link
                  href="/book-appointment"
                  className="btn-primary px-8 py-3 text-lg"
                >
                  {t.nav.book} →
                </Link>
                <Link
                  href="/services"
                  className="btn-secondary px-8 py-3 text-lg"
                >
                  {t.nav.services}
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-wrap gap-6 text-white/60 text-sm"
              >
                <div className="flex items-center gap-2">
                  <Counter target={500} />+ · Happy Patients
                </div>
                <div className="w-px h-4 bg-white/20" />
                <div className="flex items-center gap-2">
                  <Counter target={12} /> · Services Offered
                </div>
                <div className="w-px h-4 bg-white/20" />
                <div className="flex items-center gap-2">
                  2x · Daily Sessions
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <motion.div
                animate={{
                  translateY: [0, -14, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full max-w-md mx-auto"
              >
                <div className="relative bg-gradient-to-br from-blue-500/15 to-transparent rounded-3xl p-8 border border-blue-500/20">
                  <Image
                    src="/main-logo-3.png"
                    alt="Prity Dental Main Logo"
                    width={280}
                    height={320}
                    className="w-full h-auto object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    priority
                  />

                  <motion.div
                    animate={{
                      translateY: [0, -8, 0],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-4 -right-4 bg-[#0a1628]/85 backdrop-blur-xl border border-blue-500/20 rounded-xl px-4 py-2 text-sm text-white/80"
                  >
                    Painless Treatment ✓
                  </motion.div>

                  <motion.div
                    animate={{
                      translateY: [0, -8, 0],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: -2 }}
                    className="absolute -bottom-4 -left-4 bg-[#0a1628]/85 backdrop-blur-xl border border-blue-500/20 rounded-xl px-4 py-2 text-sm text-white/80"
                  >
                    11 AM – 10 PM
                  </motion.div>

                  <motion.div
                    animate={{
                      translateY: [0, -8, 0],
                    }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: -4 }}
                    className="absolute top-1/2 -right-8 bg-[#0a1628]/85 backdrop-blur-xl border border-blue-500/20 rounded-xl px-4 py-2 text-sm text-white/80"
                  >
                    BMDC #8291 ✓
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[#0f2040]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-cormorant text-4xl md:text-5xl font-semibold mb-4">
              Our Services
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Comprehensive dental care tailored to your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Section */}
      <section className="py-20 bg-[#050d1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <motion.div
                animate={{
                  borderRadius: [
                    "60% 40% 30% 70% / 60% 30% 70% 40%",
                    "30% 60% 70% 40% / 50% 60% 30% 60%",
                    "60% 40% 30% 70% / 60% 30% 70% 40%",
                  ],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="relative bg-gradient-to-br from-[#0f2040] to-[#0a1628] rounded-3xl p-8 border border-blue-500/18 aspect-square flex items-center justify-center"
              >
                <div className="text-9xl">👩‍⚕️</div>

                <motion.div
                  animate={{
                    translateY: [0, -6, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-6 right-6 bg-[#0a1628]/85 backdrop-blur-xl border border-blue-500/20 rounded-xl px-4 py-2 text-sm text-white/80"
                >
                  5+ Years Experience
                </motion.div>

                <motion.div
                  animate={{
                    translateY: [0, -6, 0],
                  }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: -2 }}
                  className="absolute top-6 left-6 bg-[#0a1628]/85 backdrop-blur-xl border border-blue-500/20 rounded-xl px-4 py-2 text-sm text-white/80"
                >
                  🏥 Bangladesh Bank Consultant
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sky-400 text-sm font-medium mb-2 block">
                Meet Your Doctor
              </span>
              <h2 className="font-cormorant text-4xl md:text-5xl font-semibold mb-4">
                Dr. Jarin Tasnim <span className="text-[#1d4ed8]">Rahman</span>
              </h2>
              <div className="w-10 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-6" />

              <p className="text-white/70 mb-6 leading-relaxed">
                Dr. Jarin Tasnim Rahman is a dedicated dentist committed to providing
                exceptional dental care with a gentle touch. With expertise in various
                dental procedures, she ensures each patient receives personalized
                treatment in a comfortable environment.
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3 text-white/80">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
                  BDS — University of Dhaka
                </li>
                <li className="flex items-start gap-3 text-white/80">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
                  BMDC Registration No. 8291
                </li>
                <li className="flex items-start gap-3 text-white/80">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
                  PGT — Conservative Dentistry, BSMMU
                </li>
                <li className="flex items-start gap-3 text-white/80">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
                  OMS — Shaheed Suhrawardy Medical College & Hospital
                </li>
                <li className="flex items-start gap-3 text-white/80">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
                  Consultant Dentist, Bangladesh Bank
                </li>
              </ul>

              <blockquote className="font-cormorant italic text-white/60 text-lg mb-6 border-l-2 border-blue-500/30 pl-4">
                {"\"Every patient deserves a smile they're proud to share — that's my commitment to you.\""}
              </blockquote>

              <Link href="/book-appointment" className="btn-primary inline-block">
                Book Appointment
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#0f2040]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-cormorant text-4xl md:text-5xl font-semibold mb-4">
              Why Choose Us
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Experience the difference of patient-centered dental care
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Pain-Free Care", icon: "syringe" },
              { title: "Advanced Equipment", icon: "microscope" },
              { title: "Easy Online Booking", icon: "calendar" },
              { title: "Family Friendly", icon: "people" },
              { title: "Flexible Hours", icon: "clock" },
              { title: "BMDC Certified", icon: "badge" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white/3 border border-white/8 rounded-2xl p-6 hover:bg-blue-500/8 transition-all duration-300"
              >
                <div className="w-8 h-8 mb-4 stroke-blue-400">
                  <svg viewBox="0 0 32 32" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {item.icon === "syringe" && <><path d="M8 4 L8 14 C8 17 10 19 13 19 L13 28 M16 4 L16 14 C16 17 14 19 11 19 L11 28 M6 10 L18 10" /></>}
                    {item.icon === "microscope" && <><path d="M16 4 L16 12 L12 16 L12 24 L20 24 L20 16 L16 12 M8 24 L24 24 M16 24 L16 28" /></>}
                    {item.icon === "calendar" && <><rect x="4" y="6" width="24" height="20" rx="2" /><line x1="4" y1="12" x2="28" y2="12" /><line x1="12" y1="4" x2="12" y2="8" /><line x1="20" y1="4" x2="20" y2="8" /></>}
                    {item.icon === "people" && <><path d="M12 12 C12 12 8 12 8 16 L8 24 L16 24 L16 16 C16 12 12 12 12 12Z" /><circle cx="12" cy="8" r="4" /><path d="M24 12 C24 12 20 12 20 16 L20 24 L28 24 L28 16 C28 12 24 12 24 12Z" /><circle cx="24" cy="8" r="4" /></>}
                    {item.icon === "clock" && <><circle cx="16" cy="16" r="12" /><path d="M16 8 L16 16 L22 16" /></>}
                    {item.icon === "badge" && <><path d="M16 4 L20 8 L24 4 L24 12 L28 16 L24 20 L24 28 L20 24 L16 28 L12 24 L8 28 L8 20 L4 16 L8 12 L8 4 L12 8 Z" /></>}
                  </svg>
                </div>
                <h3 className="font-cormorant text-xl font-semibold">{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#050d1a] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 2],
                opacity: [0.5, 0.3, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
                ease: "easeOut",
              }}
              className="absolute border border-blue-500/12 rounded-full"
              style={{
                width: `${300 + i * 200}px`,
                height: `${300 + i * 200}px`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-cormorant text-4xl md:text-5xl font-semibold mb-4">
              Ready to Love Your Smile?
            </h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
              Book your appointment today and take the first step towards a healthier,
              brighter smile.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/book-appointment"
                className="btn-primary px-8 py-3 text-lg"
              >
                📅 Book Your Appointment
              </Link>
              <a
                href="tel:+8801616753364"
                className="btn-secondary px-8 py-3 text-lg"
              >
                📞 01616 753364
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.home.contactTitle || "Contact Us"}
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              {t.home.contactSub || "Get in touch with us for any queries or appointments"}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                { icon: "📍", text: t.home.address || "1/1, East Bashabo, Kodomtola, Shobujbag, Dhaka-1214" },
                { icon: "📞", text: t.home.phone || "01616 753364" },
                { icon: "✉️", text: t.home.email || "drjarinsdentalpoint14@gmail.com" },
                { icon: "🕐", text: t.home.hours || "Morning: 11:00 AM – 2:00 PM | Evening: 5:00 PM – 10:00 PM" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white/3 border border-white/8 rounded-xl p-5 hover:translate-x-1 transition-transform duration-300"
                >
                  <p className="text-white/80 flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden border border-blue-500/20"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.227581177651!2d90.431981!3d23.738361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ0JzE4LjEiTiA5MMKwMjUnNTUuMSJF!5e0!3m2!1sbn!2sbd!4v1716320000000!5m2!1sbn!2sbd"
                width="100%"
                height="380"
                style={{ border: 0, filter: "brightness(0.85) saturate(1.2)" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
