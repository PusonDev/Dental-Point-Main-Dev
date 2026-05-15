import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppProviders from "@/components/providers/AppProviders";
import { CLINIC_INFO } from "@/lib/clinic-info";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: CLINIC_INFO.name,
    template: `%s | ${CLINIC_INFO.name}`,
  },
  description: `${CLINIC_INFO.tagline} — Expert dental care in East Bashabo, Dhaka. BMDC Reg: 8291.`,
  keywords: ["dentist", "dental clinic", "Dhaka", "East Bashabo", "Dr Jarin"],
  openGraph: {
    title: CLINIC_INFO.name,
    description: CLINIC_INFO.tagline,
    locale: "en_BD",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
