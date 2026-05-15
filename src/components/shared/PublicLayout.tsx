import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BanglaToggle from "@/components/layout/BanglaToggle";

export default function PublicLayout({
  children,
  minimalHeader = false,
}: {
  children: React.ReactNode;
  minimalHeader?: boolean;
}) {
  return (
    <>
      <Header minimal={minimalHeader} />
      <main className="min-h-screen flex flex-col">{children}</main>
      <Footer />
      <BanglaToggle />
    </>
  );
}
