import Link from "next/link";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="disclosures">
      <Link href="/" className="back-link">
        ← Back to Dispatched
      </Link>
      {children}
      <p className="lead">
        Draft pending counsel review. For inquiries, call{" "}
        <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>.
      </p>
    </div>
  );
}
