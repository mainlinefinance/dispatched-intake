# Vendors

Single source of truth for third-party accounts. Credentials live in 1Password, **never** in this repo.

> **Status:** to populate as accounts open.

## Stack
| Category | Vendor | Status | Account owner | 1Password entry |
|---|---|---|---|---|
| Email (transactional + lifecycle) | **Resend** (Section 9 decision 2) | not yet | Angelo | — |
| SMS + 10DLC | **Twilio** | not yet | Angelo | — |
| Hosting + deploy | **Render.com** | active (staging) | Angelo | — |
| Error monitoring | **Sentry** | not yet | Angelo | — |
| Product analytics | **PostHog** (Section 9 decision 3) | not yet | Angelo | — |
| Domain + DNS | (TBD — Cloudflare or Namecheap) | active | Angelo | — |
| Source control | **GitHub** (`aondaai/dispatched-intake`) | active | Angelo | — |

## Sub-processors (feeds privacy policy)
Every vendor that touches borrower data goes on the sub-processor list in the privacy policy. Keep this table and that list in sync.

## Contracts needed before launch
- DPA with each lender partner (see `/01_strategy/compliance_plan.md`)
- Twilio 10DLC registration (2–4 weeks)
