import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  getAllStates,
  getState,
  LOW_COVERAGE_THRESHOLD,
  type StateInfo,
} from "@/lib/cities";

type Params = { state: string };

export async function generateStaticParams(): Promise<Params[]> {
  return getAllStates().map((s) => ({ state: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { state } = await params;
  const info = getState(state);
  if (!info) return { title: "Page not found — Dispatched" };
  return {
    title: `${info.name} trucking loans — ${info.lenderPanelCount} lenders on panel · Dispatched`,
    description: `Working capital for ${info.name} trucking owner-operators and small fleets. Soft-match preview first — nothing hits your credit until you pick a lender. ${info.lenderPanelCount} lenders actively funding ${info.name} trucking.`,
  };
}

export default async function StatePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { state } = await params;
  const info = getState(state);
  if (!info) notFound();
  if (info.lenderPanelCount < LOW_COVERAGE_THRESHOLD) redirect("/trucking");

  return (
    <div className="geo-page">
      <SiteNav />
      <section className="geo-hero">
        <div className="geo-container">
          <span className="geo-eyebrow">Trucking loans · {info.name}</span>
          <h1 className="geo-hero-title">
            Working capital for {info.name} truckers.{" "}
            <em>Bank decline is fine.</em>
          </h1>
          <p className="geo-hero-sub">
            {info.lenderPanelCount} lenders on our panel actively fund{" "}
            {info.name} trucking operations — from owner-operators running a
            single truck along {info.primaryCorridor} to small fleets working
            the {info.secondaryCorridor}. Soft-match preview first. Nothing hits
            your credit until you pick a lender and sign an application.
          </p>
          <div className="geo-hero-cta-row">
            <Link
              href="/apply"
              className="geo-btn geo-btn-primary geo-btn-lg"
            >
              Start a soft match
            </Link>
            <Link
              href="/trucking"
              className="geo-btn geo-btn-secondary geo-btn-lg"
            >
              See how it works
            </Link>
          </div>
        </div>
      </section>

      <section className="geo-hero" style={{ paddingTop: 0 }}>
        <div className="geo-container">
          <h2 className="geo-hero-title" style={{ fontSize: "28px" }}>
            {info.cities.length === 1 ? "City page" : "City pages"} in{" "}
            {info.name}
          </h2>
          <p className="geo-hero-sub">
            Each page is written for one city with local stats, repair-cost
            benchmarks, and freight corridors specific to that market.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0" }}>
            {info.cities.map((c) => (
              <li key={c.citySlug} style={{ padding: "12px 0" }}>
                <Link
                  href={`/trucking-loans/${info.slug}/${c.citySlug}/`}
                  className="geo-btn geo-btn-secondary"
                  style={{ textDecoration: "none" }}
                >
                  {c.city}, {info.abbr} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SiteFooter info={info} />
    </div>
  );
}

function SiteNav() {
  return (
    <header className="geo-nav">
      <div className="geo-nav-inner">
        <Link href="/" className="geo-logo" aria-label="Dispatched home">
          <DispatchedMark />
          Dispatched
        </Link>
        <nav className="geo-nav-links" aria-label="Primary">
          <Link href="/trucking" className="geo-active">
            Trucking
          </Link>
          <Link href="/apply">Apply</Link>
          <Link href="/disclosures">Disclosures</Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter({ info }: { info: StateInfo }) {
  return (
    <footer className="geo-footer">
      <div className="geo-container">
        <div className="geo-f-grid">
          <div className="geo-f-col geo-f-brand">
            <Link href="/" className="geo-logo" aria-label="Dispatched home">
              <DispatchedMark />
              Dispatched
            </Link>
            <p>
              Working capital for {info.name} truckers. Licensed activity is
              regulated by {info.licensingAuthority} ({info.licenseType}).
              Dispatched is a marketplace, not a lender.
            </p>
          </div>
          <div className="geo-f-col">
            <h4>Product</h4>
            <Link href="/trucking">Trucking</Link>
            <Link href="/apply">Apply</Link>
          </div>
          <div className="geo-f-col">
            <h4>Compliance</h4>
            <Link href="/disclosures">Disclosures & methodology</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function DispatchedMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 14 L12 14 L16 6 L20 22 L24 14" />
    </svg>
  );
}
