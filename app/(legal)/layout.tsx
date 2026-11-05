import Link from "next/link";
import { HAS_SUPPORT_PHONE, PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="disclosures">
      <Link href="/" className="back-link">
        ← Back to Dispatched
      </Link>
      {children}
      <p className="lead">
        Draft pending counsel review. For inquiries,{" "}
        {HAS_SUPPORT_PHONE ? (
          <>
            call <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
          </>
        ) : (
          <>
            email{" "}
            <a href="mailto:support@dispatched.finance">
              support@dispatched.finance
            </a>
          </>
        )}
        .
      </p>
    </div>
  );
}
