import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Do not sell my personal information — Dispatched",
  robots: { index: false, follow: false },
};

export default function DoNotSellPage() {
  return (
    <>
      <h1>Do not sell my personal information</h1>
      <p className="lead">
        Our do-not-sell disclosure and preference mechanism are being prepared
        with counsel prior to launch.
      </p>
    </>
  );
}
