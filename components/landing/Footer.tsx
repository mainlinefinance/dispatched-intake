import Logo from "./Logo";
import { IconPhone } from "./icons";
import { PHONE_DISPLAY, PHONE_TEL } from "./Nav";

export default function Footer() {
  return (
    <footer className="footer" data-screen-label="07 Footer">
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
          </div>
          <div className="col">
            <h4>Product</h4>
            <ul>
              <li>
                <a href="#">Trucking capital</a>
              </li>
              <li>
                <a href="#">Fuel advances</a>
              </li>
              <li>
                <a href="#">Truck repair loans</a>
              </li>
              <li>
                <a href="#">Equipment loans</a>
              </li>
              <li>
                <a href="#">Construction (soon)</a>
              </li>
            </ul>
          </div>
          <div className="col">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#">About Dispatched</a>
              </li>
              <li>
                <a href="#how-it-works">How it works</a>
              </li>
              <li>
                <a href="#">Lender partners</a>
              </li>
              <li>
                <a href="#">Press &amp; newsroom</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
            </ul>
          </div>
          <div className="col">
            <h4>Support</h4>
            <ul>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
              <li>
                <a href="#">Application status</a>
              </li>
              <li>
                <a href="#">Complaints</a>
              </li>
              <li>
                <a href="#">Accessibility</a>
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
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Licenses</a>
            <a href="#">Do not sell</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
