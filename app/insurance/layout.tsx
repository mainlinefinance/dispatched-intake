import TcpaScripts from "@/components/quote/TcpaScripts";
import Nav from "@/components/landing/Nav";
import Footer from "@/components/landing/Footer";

export default function InsuranceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
      <TcpaScripts />
    </>
  );
}
