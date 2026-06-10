import type { Metadata } from "next";
import "./globals.css";
import AppProviders from "@/components/providers/AppProviders";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import ScrollProgress from "@/components/layout/ScrollProgress";
import BanglaToggle from "@/components/layout/BanglaToggle";

export const metadata: Metadata = {
  title: "Dr. Jarin's Dental Point — Better Teeth, Better Health",
  description: "Expert dental care in East Bashabo, Dhaka. BMDC Reg: 8291.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AppProviders>
          <CustomCursor />
          <ScrollProgress />
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <BanglaToggle />
        </AppProviders>
      </body>
    </html>
  );
}
