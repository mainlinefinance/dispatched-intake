import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of service — Dispatched",
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <>
      <h1>Terms of service</h1>
      <p className="lead">
        Our terms of service are being prepared with counsel prior to launch.
      </p>
    </>
  );
}
