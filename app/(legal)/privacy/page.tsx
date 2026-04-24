import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy — Dispatched",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <>
      <h1>Privacy policy</h1>
      <p className="lead">
        Our privacy policy is being prepared with counsel prior to launch.
      </p>
    </>
  );
}
