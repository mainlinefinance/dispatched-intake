import Link from "next/link";
import { HAS_SUPPORT_PHONE, PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";
import Logo from "@/components/site/Logo";
import { IconPhone } from "./icons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="top">
          <div className="brand-col">
            <Logo color="var(--color-ink-inverse)" />
            <p>
              Working capital routed to the lender most likely to fund it.
              Built for owner-operators and small fleets — construction and
              other trades next.
            </p>
            {HAS_SUPPORT_PHONE ? (
              <a href={PHONE_TEL} className="phone-cta">
                <IconPhone size={16} />
                Call {PHONE_DISPLAY}
              </a>
            ) : null}
            <address className="footer-address">
              Dispatched, Inc.
              <br />
              12895 Josey Lane #124
              <br />
              Dallas, TX 75234
              <br />
              United States
            </address>
          </div>
          <div className="col">
            <h3>Product</h3>
            <ul>
              <li>
                <Link href="/trucking-working-capital">Trucking capital</Link>
              </li>
              <li>
                <Link href="/insurance">Trucking insurance</Link>
              </li>
              <li>
                <Link href="/insurance/tools/premium-estimator">Premium estimator</Link>
              </li>
              <li>
                <Link href="/research/state-of-commercial-trucking-insurance-2026">
                  Research: State of Trucking Insurance 2026
                </Link>
              </li>
              <li>
                <Link href="/truck-repair-loans">Truck repair loans</Link>
              </li>
              <li>
                <Link href="/owner-operator-financing">
                  Owner-operator financing
                </Link>
              </li>
              <li>
                <Link href="/box-truck-financing">Box truck financing</Link>
              </li>
              <li>
                <Link href="/bad-credit-truck-financing">
                  Bad credit truck financing
                </Link>
              </li>
              <li>
                <Link href="/semi-truck-financing">Semi truck financing</Link>
              </li>
              <li>
                <Link href="/equipment-financing">Equipment financing</Link>
              </li>
              <li>
                <Link href="/trucking-working-capital">
                  Trucking working capital
                </Link>
              </li>
              <li>
                <Link href="/factoring">
                  Invoice factoring
                </Link>
              </li>
              <li>
                <Link href="/new-authority-truck-financing">
                  New authority financing
                </Link>
              </li>
            </ul>
          </div>
          <div className="col">
            <h3>Company</h3>
            <ul>
              <li>
                <Link href="/about">About Dispatched</Link>
              </li>
              <li>
                <a href="#how-it-works">How it works</a>
              </li>
              <li>
                <Link href="/methodology">Methodology</Link>
              </li>
            </ul>
          </div>
          <div className="col">
            <h3>Pulse</h3>
            <ul>
              <li>
                <Link href="/pulse">Dispatched Pulse</Link>
              </li>
              <li>
                <Link href="/pulse/diesel">Diesel prices</Link>
              </li>
              <li>
                <Link href="/research/state-of-commercial-trucking-insurance-2026">
                  Trucking insurance 2026
                </Link>
              </li>
            </ul>
          </div>
          <div className="col">
            <h3>Support</h3>
            <ul>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <Link href="/calculators">Calculators &amp; tools</Link>
              </li>
              <li>
                {HAS_SUPPORT_PHONE ? (
                  <a href={PHONE_TEL}>Contact us</a>
                ) : (
                  <a href="mailto:support@dispatched.finance">Contact us</a>
                )}
              </li>
              <li>
                <Link href="/disclosures">Disclosures</Link>
              </li>
              <li>
                <Link href="/accessibility">Accessibility</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="bottom">
          <div className="compliance">
            {/* TODO: Add state commercial loan broker / financing license
                numbers here when registrations are obtained. Until then,
                geo-exclude states that require a commercial loan broker
                license from paid Google Ads. */}
            <p>
              © 2026 Dispatched, Inc. Dispatched is a referral and introduction
              service for commercial / business financing — not a lender and not
              a consumer credit provider. We introduce eligible businesses to
              third-party financing partners. We do not claim any commercial
              loan broker or financing license on this site. Rates, fees, and
              loan amounts are set by each financing partner and depend on the
              borrower&rsquo;s business profile. You&rsquo;ll see full terms
              before signing anything. Loans are subject to credit approval;
              approval is not guaranteed. Dispatched is paid by its financing
              partners when a loan is funded; it does not charge businesses a
              fee to apply or be introduced. Partner compensation is disclosed
              on term sheets and does not change the APR you are offered.
            </p>
            <p className="footer-partners">
              Financing referrals may be introduced to partners including{" "}
              <strong>Big Think Capital</strong>. Insurance quotes routed
              through <strong>Coverdash</strong>, the licensed insurance
              producer of record. Carrier solvency ratings sourced from{" "}
              <strong>AM Best</strong>. Capital matching is for commercial /
              business financing only; no consumer credit products. Founded
              and operated by{" "}
              <Link href="/about">Angelo Orru Neto</Link>.
            </p>
          </div>
          <div className="legal-links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
