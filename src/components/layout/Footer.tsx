import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0a1628] text-white mt-auto border-t border-blue-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Image
              src="/logo-new.png"
              alt="Dr. Jarin's Dental Point"
              width={44}
              height={44}
            />
            <div>
              <p className="font-cormorant text-lg font-semibold">
                {"Dr. Jarin's Dental Point"}
              </p>
              <p className="text-[#38bdf8] text-sm">Better Teeth · Better Health</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-white/60 text-sm">
            {"© 2026 Dr. Jarin's Dental Point. All rights reserved."}
          </p>
          <p className="text-white/60 text-sm mt-1">
            Built by{" "}
            <a
              href="https://puson.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#38bdf8] hover:underline"
            >
              Puson
            </a>
          </p>
        </div>
        <div>
          <nav className="flex flex-col gap-2 text-sm text-white/80 md:text-right">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <Link
              href="/book-appointment"
              className="hover:text-white transition-colors"
            >
              Book
            </Link>
            <Link href="/auth/login" className="hover:text-white transition-colors">
              Login
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
