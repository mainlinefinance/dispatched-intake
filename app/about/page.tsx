import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/landing/Footer";
import Nav from "@/components/landing/Nav";
import {
  Breadcrumbs,
  type BreadcrumbItem,
} from "@/components/seo/Breadcrumbs";
import { JsonLd, breadcrumbList, person } from "@/components/seo/JsonLd";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";

const FOUNDER_NAME = "Angelo Orru Neto";
const FOUNDER_TITLE = "Founder";
const FOUNDER_LINKEDIN = "https://www.linkedin.com/in/angelo-orru-neto-b4109917b/";
const FOUNDER_PHOTO = "/about/angelo.jpg"; // Drop the JPG into public/about/

const FOUNDER_BIO_SHORT =
  "Founder of Dispatched. Operator-engineer with a decade in clinical-data infrastructure. Built Dispatched to apply the same intake-to-routing discipline that powers high-volume healthcare data work to a market that needs it: U.S. trucking finance and insurance.";

export const metadata: Metadata = {
  title: "About — Angelo Orru Neto, Founder | Dispatched",
  description:
    "Meet the founder of Dispatched. Operator-engineer background in clinical-data infrastructure, applied to a matching marketplace for trucking finance and insurance.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Dispatched — Founder Angelo Orru Neto",
    description:
      "Operator-engineer background in clinical-data infrastructure, applied to a matching marketplace for U.S. trucking finance and insurance.",
    url: "/about",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Dispatched — Founder Angelo Orru Neto",
    description:
      "Operator-engineer background in clinical-data infrastructure, applied to a matching marketplace for U.S. trucking finance and insurance.",
  },
};

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dispatched", url: "https://dispatched.finance/" },
  { name: "About", url: "https://dispatched.finance/about" },
];

export default function AboutPage() {
  return (
    <div className="about-page">
      <JsonLd payload={breadcrumbList(breadcrumbs)} />
      <JsonLd
        payload={person({
          name: FOUNDER_NAME,
          jobTitle: FOUNDER_TITLE,
          description: FOUNDER_BIO_SHORT,
          imageUrl: `https://dispatched.finance${FOUNDER_PHOTO}`,
          alumniOf: "Fundação Getulio Vargas",
          sameAs: [FOUNDER_LINKEDIN],
        })}
      />
      <Nav />
      <main id="main-content" className="about-main">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />

          <header className="about-header">
            <h1>About Dispatched</h1>
            <p className="about-lede">
              A matching platform for U.S. trucking finance and insurance.
              Lender-paid. Soft pull first. One application, panel routing.
            </p>
          </header>

          <section className="about-founder">
            <div className="about-founder-photo">
              <Image
                src={FOUNDER_PHOTO}
                alt={`${FOUNDER_NAME}, ${FOUNDER_TITLE} of Dispatched`}
                width={320}
                height={320}
                priority
              />
            </div>
            <div className="about-founder-body">
              <h2>{FOUNDER_NAME}</h2>
              <p className="about-founder-title">{FOUNDER_TITLE}</p>

              <p>
                Dispatched is built on a simple operator thesis: the gap
                between an owner-operator&rsquo;s real cash flow and a bank&rsquo;s
                checklist is the entire problem. Banks underwrite small-fleet
                trucking with consumer-credit instruments. The lenders that
                actually fund this market underwrite on revenue, deposit
                history, and equipment. Owner-operators just don&rsquo;t know
                which is which, and stack rejections at every door.
              </p>

              <p>
                I spent the last decade building data infrastructure for
                pharma and clinical operations &mdash; structured intake,
                NLP-driven feasibility, EHR-routed recruitment, real-world
                evidence at scale. The same playbook works here: clean intake
                &rarr; structured signal &rarr; matched outcome. One trucker
                application gets routed to the lenders most likely to fund
                it, on a panel that pays Dispatched on funded loans rather
                than billing the trucker.
              </p>

              <p>
                I hold a degree from Fundação Getulio Vargas in São Paulo,
                publish on the intersection of data and access in healthcare
                and finance, and operate Dispatched out of TCopyCats LLC,
                the Wyoming entity that holds the MainLine.Finance vertical
                brand portfolio. Construction (drawn.finance) is next.
              </p>

              <p className="about-founder-links">
                <a
                  href={FOUNDER_LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                {" · "}
                <a href={`mailto:angelo@dispatched.finance`}>
                  angelo@dispatched.finance
                </a>
              </p>
            </div>
          </section>

          <section className="about-org">
            <h2>The company</h2>
            <dl className="about-org-facts">
              <div>
                <dt>Legal entity</dt>
                <dd>TCopyCats LLC (operating as Dispatched)</dd>
              </div>
              <div>
                <dt>Registered address</dt>
                <dd>
                  1021 E Lincolnway, Ste 8858
                  <br />
                  Cheyenne, WY 82001
                </dd>
              </div>
              <div>
                <dt>Contact</dt>
                <dd>
                  <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
                  <br />
                  <a href="mailto:support@dispatched.finance">
                    support@dispatched.finance
                  </a>
                </dd>
              </div>
              <div>
                <dt>What we are</dt>
                <dd>
                  A matching platform. Not a lender. Not an insurer. We
                  route applications to a panel of commercial lenders and a
                  named insurance producer partner, paid by them on funded
                  loans / bound policies.
                </dd>
              </div>
              <div>
                <dt>What we are not</dt>
                <dd>
                  We do not extend credit directly. We do not bill the
                  trucker. We do not gate qualification on FICO alone &mdash;
                  panel underwriting weighs revenue, deposit flow, and
                  equipment alongside credit.
                </dd>
              </div>
            </dl>
          </section>

          <section className="about-cta">
            <h2>Have a question about how we route applications?</h2>
            <p>
              Call <a href={PHONE_TEL}>{PHONE_DISPLAY}</a> &mdash; a human
              picks up. Or read the{" "}
              <Link href="/methodology">methodology page</Link> for how
              underwriting decisions get made and how rates are observed
              across the panel.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
