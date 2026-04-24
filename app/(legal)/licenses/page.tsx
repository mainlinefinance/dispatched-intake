import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Licenses — Dispatched",
  robots: { index: false, follow: false },
};

export default function LicensesPage() {
  return (
    <>
      <h1>Licenses</h1>
      <p className="lead">
        State-specific commercial-loan broker license disclosures are being
        prepared with counsel prior to launch.
      </p>
    </>
  );
}
