import Nav from "@/components/landing/Nav";
import Footer from "@/components/landing/Footer";

export default function GlossaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
