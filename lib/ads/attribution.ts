// First-party ad click and campaign parameters.
//
// The live funding form is a cross-origin iframe. Mainline's loader keeps
// only five utm_* values and strips the rest of the query (including gclid)
// before it builds that frame. Internal links to /apply also drop the
// landing query. This module remembers the landing values in first-party
// storage and puts the five utm fields back on the frame as their own
// query keys, which is the shape the live widget copies onto the lead.

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export const CLICK_KEYS = ["gclid", "gbraid", "wbraid"] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type ClickKey = (typeof CLICK_KEYS)[number];

export type AdsAttribution = {
  landingUrl: string | null;
  referrer: string | null;
} & Record<UtmKey | ClickKey, string | null>;

export const EMPTY_ADS_ATTRIBUTION: AdsAttribution = {
  landingUrl: null,
  referrer: null,
  gclid: null,
  gbraid: null,
  wbraid: null,
  utm_source: null,
  utm_medium: null,
  utm_campaign: null,
  utm_term: null,
  utm_content: null,
};

const UTM_MAX = 100;
const CLICK_MAX = 200;
const URL_MAX = 1000;

const STORAGE_KEY = "df_ads_attr";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 90;

export type AdsStorage = {
  read: () => string | null;
  write: (value: string) => void;
};

function cleanToken(value: string | null, max: number): string | null {
  if (!value) return null;
  const clean = value.trim().replace(/[\u0000-\u001f\u007f]/g, "");
  if (!clean || clean.length > max) return null;
  if (/[<>"'\\]/.test(clean)) return null;
  return clean;
}

function isHttpUrl(value: string): URL | null {
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
    if (parsed.username || parsed.password) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function externalReferrer(
  value: string | null,
  siteHost = "dispatched.finance",
): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (
    trimmed === "android-app://com.reddit.frontpage" ||
    trimmed.startsWith("android-app://com.reddit.frontpage")
  ) {
    return "android-app://com.reddit.frontpage";
  }
  const parsed = isHttpUrl(trimmed);
  if (!parsed) return null;
  const host = parsed.hostname.toLowerCase();
  if (host === siteHost || host.endsWith(`.${siteHost}`)) return null;
  parsed.search = "";
  parsed.hash = "";
  const result = parsed.toString();
  return result.length <= 500 ? result : null;
}

function paramsFromHref(href: string): {
  url: URL | null;
  values: Record<UtmKey | ClickKey, string | null>;
} {
  const values = {
    gclid: null,
    gbraid: null,
    wbraid: null,
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_term: null,
    utm_content: null,
  } as Record<UtmKey | ClickKey, string | null>;
  const url = isHttpUrl(href);
  if (!url) return { url: null, values };
  for (const key of CLICK_KEYS) {
    values[key] = cleanToken(url.searchParams.get(key), CLICK_MAX);
  }
  for (const key of UTM_KEYS) {
    values[key] = cleanToken(url.searchParams.get(key), UTM_MAX);
  }
  return { url, values };
}

function hasUtm(values: Pick<AdsAttribution, UtmKey>): boolean {
  return UTM_KEYS.some((key) => values[key]);
}

function hasClick(values: Pick<AdsAttribution, ClickKey>): boolean {
  return CLICK_KEYS.some((key) => values[key]);
}

export function landingUrlFor(
  href: string,
  values: Pick<AdsAttribution, UtmKey | ClickKey>,
): string | null {
  const parsed = isHttpUrl(href);
  if (!parsed) return null;
  parsed.username = "";
  parsed.password = "";
  parsed.hash = "";
  parsed.search = "";
  for (const key of [...CLICK_KEYS, ...UTM_KEYS]) {
    const value = values[key];
    if (value) parsed.searchParams.set(key, value);
  }
  const result = parsed.toString();
  return result.length <= URL_MAX ? result : null;
}

export function attributionFromLocation(
  href: string,
  referrer: string | null,
): AdsAttribution {
  const { url, values } = paramsFromHref(href);
  const next: AdsAttribution = {
    ...EMPTY_ADS_ATTRIBUTION,
    ...values,
    referrer: externalReferrer(referrer),
  };
  if (url && (hasUtm(next) || hasClick(next))) {
    next.landingUrl = landingUrlFor(href, next);
  } else if (url) {
    next.landingUrl = landingUrlFor(href, EMPTY_ADS_ATTRIBUTION);
  }
  return next;
}

export function mergeAdsAttribution(
  previous: AdsAttribution | null,
  incoming: AdsAttribution,
): AdsAttribution {
  const base = previous ?? EMPTY_ADS_ATTRIBUTION;
  const next: AdsAttribution = { ...base };

  for (const key of CLICK_KEYS) {
    if (incoming[key]) next[key] = incoming[key];
  }

  if (hasUtm(incoming)) {
    for (const key of UTM_KEYS) next[key] = incoming[key];
  }

  if (!next.referrer && incoming.referrer) next.referrer = incoming.referrer;

  const incomingCampaign = hasUtm(incoming) || hasClick(incoming);
  if (incoming.landingUrl && (incomingCampaign || !next.landingUrl)) {
    next.landingUrl = incoming.landingUrl;
  }
  if (next.landingUrl) {
    next.landingUrl = landingUrlFor(next.landingUrl, next) ?? next.landingUrl;
  }

  return next;
}

export function serializeAdsAttribution(value: AdsAttribution): string {
  return JSON.stringify(value);
}

export function parseStoredAdsAttribution(raw: string | null): AdsAttribution | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<AdsAttribution>;
    if (!parsed || typeof parsed !== "object") return null;
    const next: AdsAttribution = { ...EMPTY_ADS_ATTRIBUTION };
    if (typeof parsed.landingUrl === "string") {
      next.landingUrl = landingUrlFor(parsed.landingUrl, {
        ...EMPTY_ADS_ATTRIBUTION,
        ...paramsFromHref(parsed.landingUrl).values,
      });
    }
    if (typeof parsed.referrer === "string") {
      next.referrer = externalReferrer(parsed.referrer);
    }
    for (const key of CLICK_KEYS) {
      next[key] = cleanToken(
        typeof parsed[key] === "string" ? parsed[key] : null,
        CLICK_MAX,
      );
    }
    for (const key of UTM_KEYS) {
      next[key] = cleanToken(
        typeof parsed[key] === "string" ? parsed[key] : null,
        UTM_MAX,
      );
    }
    if (next.landingUrl) {
      next.landingUrl = landingUrlFor(next.landingUrl, next) ?? next.landingUrl;
    }
    return next;
  } catch {
    return null;
  }
}

export function persistAdsAttribution(
  href: string,
  referrer: string | null,
  storage: AdsStorage,
): AdsAttribution {
  const previous = parseStoredAdsAttribution(storage.read());
  const next = mergeAdsAttribution(
    previous,
    attributionFromLocation(href, referrer),
  );
  try {
    storage.write(serializeAdsAttribution(next));
  } catch {
    // Storage is best-effort. The in-memory value is still returned so the
    // current frame can be built even when the browser rejects the write.
  }
  return next;
}

export function widgetOriginForHost(host: string): string | null {
  const trimmed = host.trim().toLowerCase();
  if (!/^[a-z0-9.-]+$/.test(trimmed)) return null;
  if (trimmed.includes("..") || trimmed.startsWith(".") || trimmed.endsWith(".")) {
    return null;
  }
  return `https://${trimmed}`;
}

export function resolveWidgetHost(value: string | undefined): string {
  const candidate = (value ?? "").trim();
  if (candidate && widgetOriginForHost(candidate)) return candidate.toLowerCase();
  return "mainline.tryoption.ai";
}

const PARTNER_SLUG = "dispatched-finance";
const VARIANT = "standard";

export function buildMainlineWidgetSrc(input: {
  widgetHost: string;
  attribution: AdsAttribution;
}): string | null {
  const origin = widgetOriginForHost(input.widgetHost);
  if (!origin) return null;
  const page = input.attribution.landingUrl;
  if (!page) return null;
  const params = new URLSearchParams();
  params.set("page", page);
  if (input.attribution.referrer) {
    params.set("referrer", input.attribution.referrer);
  }
  params.set("variant", VARIANT);
  for (const key of UTM_KEYS) {
    const value = input.attribution[key];
    if (value) params.set(key, value);
  }
  for (const key of CLICK_KEYS) {
    const value = input.attribution[key];
    if (value) params.set(key, value);
  }
  return `${origin}/w/${PARTNER_SLUG}?${params.toString()}`;
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const pieces = document.cookie ? document.cookie.split("; ") : [];
  for (const piece of pieces) {
    const eq = piece.indexOf("=");
    if (eq === -1) continue;
    if (piece.slice(0, eq) === name) {
      try {
        return decodeURIComponent(piece.slice(eq + 1));
      } catch {
        return null;
      }
    }
  }
  return null;
}

function writeCookie(name: string, value: string): void {
  if (typeof document === "undefined") return;
  const secure =
    typeof location !== "undefined" && location.protocol === "https:"
      ? "; Secure"
      : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}

export function browserAdsStorage(): AdsStorage {
  return {
    read() {
      try {
        if (typeof sessionStorage !== "undefined") {
          const fromSession = sessionStorage.getItem(STORAGE_KEY);
          if (fromSession) return fromSession;
        }
      } catch {
        // sessionStorage can throw in hardened browsers. Fall through.
      }
      return readCookie(STORAGE_KEY);
    },
    write(value: string) {
      try {
        sessionStorage.setItem(STORAGE_KEY, value);
      } catch {
        // Ignore quota and privacy-mode failures.
      }
      try {
        writeCookie(STORAGE_KEY, value);
      } catch {
        // Ignore cookie failures.
      }
    },
  };
}

export function persistAdsAttributionFromBrowser(): AdsAttribution {
  if (typeof window === "undefined") return { ...EMPTY_ADS_ATTRIBUTION };
  return persistAdsAttribution(
    window.location.href,
    document.referrer,
    browserAdsStorage(),
  );
}
