const STORAGE_KEY = 'scaleSD_utm';

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'fbclid',
] as const;

export type UTMData = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  gclid: string;
  fbclid: string;
};

const empty: UTMData = {
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_content: '',
  utm_term: '',
  gclid: '',
  fbclid: '',
};

/**
 * Reads URL params on page load. If any UTM/click-ID is present, writes the
 * full set to sessionStorage. Otherwise leaves storage alone (no-clobber).
 * Last-touch wins: any new URL with UTMs overwrites prior storage entirely.
 */
export function captureUTMs(): void {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const hasAnyUTM = UTM_KEYS.some((key) => params.has(key));

  if (!hasAnyUTM) return;

  const data: UTMData = {
    utm_source: params.get('utm_source') ?? '',
    utm_medium: params.get('utm_medium') ?? '',
    utm_campaign: params.get('utm_campaign') ?? '',
    utm_content: params.get('utm_content') ?? '',
    utm_term: params.get('utm_term') ?? '',
    gclid: params.get('gclid') ?? '',
    fbclid: params.get('fbclid') ?? '',
  };

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // best-effort attribution; never crash the page on storage failure
  }
}

/**
 * Returns stored UTM data, or empty strings if nothing's stored.
 * Called by the contact form on submit.
 */
export function getStoredUTMs(): UTMData {
  if (typeof window === 'undefined') return empty;

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    return { ...empty, ...JSON.parse(raw) };
  } catch {
    return empty;
  }
}
