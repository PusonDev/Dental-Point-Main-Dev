import PublicLayout from "@/components/shared/PublicLayout";
import LeadForm from "@/components/landing/LeadForm";
import { CLINIC_INFO } from "@/lib/clinic-info";
import Link from "next/link";

export const metadata = { title: "Free Consultation" };

const TRUST = ["BMDC Reg: 8291", "In-House X-Ray", "Painless Treatment", "East Bashabo, Dhaka"];

export default function LandingPage() {
  return (
    <PublicLayout minimalHeader>
      <section className="bg-gradient-to-b from-primary to-primary-dark text-white py-12 px-4">
        <div className="max-w-lg mx-auto text-center space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">{CLINIC_INFO.tagline}</h1>
          <p className="text-white/90 text-sm md:text-base">
            Permanent solution for your dental problems — expert care in East Bashabo
          </p>
        </div>
      </section>

      <section className="py-8 px-4 -mt-6">
        <LeadForm />
      </section>

      <section className="px-4 pb-8">
        <div className="max-w-md mx-auto flex flex-wrap justify-center gap-2">
          {TRUST.map((badge) => (
            <span
              key={badge}
              className="text-xs bg-light-bg text-primary px-3 py-1.5 rounded-full font-medium border border-primary/20"
            >
              ✓ {badge}
            </span>
          ))}
        </div>
        <p className="text-center mt-6 text-sm text-gray-600">
          Prefer to call?{" "}
          <a href={`tel:${CLINIC_INFO.contact.phone}`} className="text-primary font-semibold">
            {CLINIC_INFO.contact.phoneDisplay}
          </a>
        </p>
        <p className="text-center mt-2">
          <Link href="/book-appointment" className="text-primary text-sm font-semibold underline">
            Book appointment directly →
          </Link>
        </p>
      </section>
    </PublicLayout>
  );
}
