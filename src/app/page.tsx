import PublicLayout from "@/components/shared/PublicLayout";
import HeroSection from "@/components/home/HeroSection";
import DoctorSection from "@/components/home/DoctorSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import BookingCTA from "@/components/home/BookingCTA";
import MiniMap from "@/components/home/MiniMap";
import { CLINIC_INFO } from "@/lib/clinic-info";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: CLINIC_INFO.name,
  description: CLINIC_INFO.tagline,
  telephone: CLINIC_INFO.contact.phone,
  email: CLINIC_INFO.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: CLINIC_INFO.address.full,
    addressLocality: "Dhaka",
    addressCountry: "BD",
  },
  openingHours: ["Sa-Th 11:00-14:00", "Sa-Th 17:00-22:00"],
};

export default function HomePage() {
  return (
    <PublicLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <DoctorSection />
      <ServicesPreview />
      <BookingCTA />
      <MiniMap />
    </PublicLayout>
  );
}
