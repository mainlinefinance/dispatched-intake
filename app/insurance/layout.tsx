import TcpaScripts from "@/components/quote/TcpaScripts";
import Nav from "@/components/landing/Nav";
import Footer from "@/components/landing/Footer";

/* Wrap the whole insurance subtree in `.landing`. The Nav and Footer
   components live in components/landing/ and all their styles in
   app/styles/landing.css are scoped under `.landing .nav` and
   `.landing .footer`. Without this wrapper the chrome renders unstyled
   — no sticky nav, no dark footer, no logo treatment. The page-level
   wrappers each /insurance route uses (.ins-page, .deep-money-page,
   .estimator-page, .research-page) nest cleanly inside .landing without
   conflict; they scope their own content-area rules and don't touch
   the chrome. */

export default function InsuranceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="landing">
      <Nav />
      {children}
      <Footer />
      <TcpaScripts />
    </div>
  );
}
