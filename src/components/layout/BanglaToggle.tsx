"use client";

export default function BanglaToggle() {
  return (
    <button
      onClick={() => alert("বাংলা সংস্করণ শীঘ্রই আসছে!")}
      className="fixed z-50 bottom-6 right-6 bg-[#0a1628]/80 backdrop-blur-xl text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold border border-blue-500/20 hover:border-blue-500/40 transition-all"
      aria-label="Toggle language"
    >
      বাংলা 🇧🇩
    </button>
  );
}
