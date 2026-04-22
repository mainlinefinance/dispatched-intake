# Dispatched — First Production Deploy Notes

**Date:** 2026-04-21
**Shipped commit:** `6c534d1` (feat: trucking flagship at / + geo template at /trucking-loans/[state]/[city])
**Outcome:** Live on Render staging under the `dispatched-intake.onrender.com` subdomain and the `dispatched.finance` apex, pending final Let's Encrypt cert issuance for the apex.

## Service

| Field | Value |
|---|---|
| Provider | Render.com |
| Workspace | `tea-d6j2mj75r7bs73ep2bq0` (Easytrials team) |
| Service ID | `srv-d7k19l5f420s73846e70` |
| Service URL | `https://dispatched-intake.onrender.com` |
| Dashboard | `https://dashboard.render.com/web/srv-d7k19l5f420s73846e70` |
| Region | Oregon (US West) |
| Plan | Starter ($7/mo) — **upgrade to Standard before first paid-ad spend** per brief Section 7 item 10 |
| Runtime | Node 20 |
| Build command | `npm ci && npm run build` |
| Start command | `npm start` (which runs `next start -p ${PORT:-3000}`; Render sets PORT=10000) |
| Auto-deploy | On every push to `main` |
| Health check path | `/` (default) — render.yaml specifies `/healthz`; v1 ships with `/` and will be updated via dashboard later since `create_web_service` MCP doesn't expose healthCheckPath |
| Env vars | `NODE_VERSION=20`, `NEXT_TELEMETRY_DISABLED=1` |

## First deploy

- Deploy ID: `dep-d7k19ldf420s73846eg0`
- Created: 2026-04-22T00:22:45Z
- Finished: 2026-04-22T00:24:26Z
- Elapsed: **1 min 40 sec** (well under the 3–5 min estimate)
- Status: `live`

## Smoke test — `dispatched-intake.onrender.com` (pre-custom-domain)

All 8 endpoints passed against production:

| Endpoint | Result |
|---|---|
| `GET /` | HTTP 200 — flagship landing (Dispatched ×26, "Working capital" ×8) |
| `GET /apply` | HTTP 200 — intake Screen 1 (AI Capital Advisor ×3) |
| `GET /disclosures` | HTTP 200 — back-link `href="/apply"` confirmed |
| `GET /trucking-loans/texas/houston` | HTTP 200 — geo city |
| `GET /trucking-loans/alaska/nowhere` | HTTP 404 — unknown-slug fallback |
| `GET /healthz` | HTTP 200 — `{"status":"ok"}` |
| `POST /api/intake/submit` (valid) | HTTP 200 — `{"ok":true,"leadId":"fd2e558d-d729-4e9d-9f04-dbc633a2da89"}` |
| `POST /api/intake/submit` (UK phone) | HTTP 400 — `"Enter a valid US mobile number"` |

## Custom domains

| Domain | ID | Type | Verified |
|---|---|---|---|
| `dispatched.finance` | `cdm-d7k1bg2qqhas73brcf40` | apex | ✓ |
| `www.dispatched.finance` | `cdm-d7k1bg2qqhas73brcf50` | subdomain → redirects to apex | ✓ |

Added via Render REST API (`POST /v1/services/{id}/custom-domains`). MCP does not expose a custom-domain tool, so direct API was used with `$RENDER_API_KEY`.

## DNS changes at GoDaddy

Registrar: GoDaddy. Nameservers: `ns39.domaincontrol.com`, `ns40.domaincontrol.com` (unchanged).

| Record | Before | After |
|---|---|---|
| A `@` | GoDaddy parking ("WebsiteBuilder Site" → 13.248.243.5 + 76.223.105.230) | `216.24.57.1` (Render apex ingress) |
| CNAME `www` | `dispatched.finance.` | `dispatched-intake.onrender.com.` |
| CNAME `_domainconnect` | unchanged | unchanged |
| TXT `_dmarc` | unchanged | unchanged |
| NS (×2) | unchanged | unchanged |
| SOA | unchanged | unchanged |

Propagation verified within ~5 minutes against `@8.8.8.8`, `@1.1.1.1`, and the authoritative `@ns39.domaincontrol.com` — all returned `216.24.57.1` for the apex and the correct CNAME chain for www (ending at Render's Cloudflare edge IPs).

Local macOS DNS cache kept serving the old parking IPs until flushed — irrelevant for public traffic but caused misleading curl results from the dev machine during verification. Subsequent curls used `--resolve dispatched.finance:443:216.24.57.1` to bypass the cache.

## TLS / HTTPS

Render auto-provisions Let's Encrypt certificates on verified domains. Dashboard shows "Certificate Status: Unknown" immediately after verification; the handshake will start succeeding once the cert is issued. Typical window: 5–30 minutes after DNS verification. HTTP (port 80) started returning Render's Cloudflare-edge 301→HTTPS redirect as soon as DNS propagated, confirming traffic routing is already correct and only the cert is pending.

Verification command once the cert lands:

```bash
curl -sS --max-time 10 -o /dev/null -w "HTTP %{http_code}\n" https://dispatched.finance/healthz
# Expected: HTTP 200 with body {"status":"ok"}
```

## Deviations from the original deploy plan (CP1's "founder does dashboard")

At CP1 we agreed "config only, founder deploys via dashboard." This session reversed that on explicit founder request ("deploy at render... you have access to both by browser"). Workflow used:

- **Render MCP** for workspace selection, service listing, service creation, deploy watching, and verification triggering. API-backed, no browser needed.
- **Render REST API** (direct curl with `$RENDER_API_KEY`) for the custom-domain endpoints the MCP doesn't expose.
- **Claude in Chrome** for the GoDaddy DNS UI edits — explicitly authorized by founder as a one-task override of the global `CLAUDE.md` "never use mcp__claude-in-chrome__*" rule.

## Follow-ups before paid traffic

1. **Switch healthCheckPath to `/healthz`** via dashboard (Settings → Health Checks → Edit). The current default `/` works but triggers a full flagship-page render on every probe; `/healthz` returns a 15-byte JSON and is cheaper.
2. **Upgrade Render plan from Starter to Standard ($25/mo)** before first paid-ad spend — cold-start latency on Starter is fatal for paid clicks. Brief Section 7 item 10.
3. **Bind custom-domain cert verification** — once TLS handshake succeeds, re-run the full smoke suite against `https://dispatched.finance`, `https://www.dispatched.finance`, and confirm the www → apex redirect.
4. **Mobile walk-through** per the original founder plan — real phone, real signal, from a parking lot or truck stop if practical.
5. **Record a `POST /api/intake/submit` log entry** from Render's log viewer to confirm the full submit pipeline produced a structured JSON entry in production. Dashboard → Logs → filter on `intake submit`.

## Critical IDs for future reference

```
RENDER_WORKSPACE_ID=tea-d6j2mj75r7bs73ep2bq0
RENDER_SERVICE_ID=srv-d7k19l5f420s73846e70
RENDER_FIRST_DEPLOY=dep-d7k19ldf420s73846eg0
CUSTOM_DOMAIN_APEX=cdm-d7k1bg2qqhas73brcf40
CUSTOM_DOMAIN_WWW=cdm-d7k1bg2qqhas73brcf50
RENDER_APEX_TARGET_IP=216.24.57.1
RENDER_CNAME_TARGET=dispatched-intake.onrender.com
```
