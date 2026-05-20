import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AppProviders from "@/components/providers/AppProviders";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import ScrollProgress from "@/components/layout/ScrollProgress";
import BanglaToggle from "@/components/layout/BanglaToggle";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "600"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Dr. Jarin's Dental Point — Better Teeth, Better Health",
  description: "Expert dental care in East Bashabo, Dhaka. BMDC Reg: 8291.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${jakarta.variable} font-sans antialiased`}>
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
