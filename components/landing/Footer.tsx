import Link from "next/link";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";
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
            <a href={PHONE_TEL} className="phone-cta">
              <IconPhone size={16} />
              Call {PHONE_DISPLAY}
            </a>
            <address className="footer-address">
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
                <span className="soon" aria-disabled="true">
                  Fuel advances <span className="soon-tag">Soon</span>
                </span>
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
                <Link href="/invoice-factoring-for-truckers">
                  Invoice factoring
                </Link>
              </li>
              <li>
                <Link href="/new-authority-truck-financing">
                  New authority financing
                </Link>
              </li>
              <li>
                <span className="soon" aria-disabled="true">
                  Construction <span className="soon-tag">Soon</span>
                </span>
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
                <span className="soon" aria-disabled="true">
                  Lender partners <span className="soon-tag">Soon</span>
                </span>
              </li>
              <li>
                <span className="soon" aria-disabled="true">
                  Press &amp; newsroom <span className="soon-tag">Soon</span>
                </span>
              </li>
              <li>
                <span className="soon" aria-disabled="true">
                  Careers <span className="soon-tag">Soon</span>
                </span>
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
                <a href={PHONE_TEL}>Contact us</a>
              </li>
              <li>
                <span className="soon" aria-disabled="true">
                  Application status <span className="soon-tag">Soon</span>
                </span>
              </li>
              <li>
                <span className="soon" aria-disabled="true">
                  Complaints <span className="soon-tag">Soon</span>
                </span>
              </li>
              <li>
                <span className="soon" aria-disabled="true">
                  Accessibility <span className="soon-tag">Soon</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="bottom">
          <div className="compliance">
            <p>
              © 2026 Dispatched, Inc. Dispatched is not a lender. We are a
              commercial loan matching service. We route eligible borrower
              applications to third-party lenders on our panel. Rates, fees,
              and loan amounts are determined by each lender and depend on the
              borrower&rsquo;s business profile. You&rsquo;ll see full terms
              before signing anything. Loans subject to credit approval.
              Dispatched receives a flat referral fee from lenders on funded
              loans; this fee is disclosed on every term sheet and does not
              affect the APR you are offered.
            </p>
            <p>
              Statistics footnotes: <sup>1</sup> Principal volume funded to
              Dispatched-matched borrowers between Mar 20 and Apr 19, 2026, as
              reported by panel lenders. Includes new originations; excludes
              renewals. <sup>2</sup> Median time (not mean) from completed
              application to originating lender wire, measured across funded
              loans in the trailing 90 days. Individual results vary based on
              documentation completeness, lender underwriting queue, and
              banking-partner cutoff times.
            </p>
            <p>
              Commercial loan broker registrations pending in applicable
              states. State-specific licensing information will be listed
              here prior to launch. Dispatched does not broker loans to
              consumers and does not extend credit directly.
            </p>
          </div>
          <div className="legal-links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/licenses">Licenses</Link>
            <Link href="/methodology">Methodology</Link>
            <Link href="/do-not-sell">Do not sell</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
