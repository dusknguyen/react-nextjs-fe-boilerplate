/** URL schemes permitted by the safe external-link helper. */
export type SafeUrlScheme = 'http:' | 'https:' | 'mailto:' | 'tel:';

/** Options for validating user-controlled links before navigation. */
export type SafeUrlOptions = {
  allowCredentialsInUrl?: boolean;
  allowHttpForLocalhost?: boolean;
  allowedHosts?: readonly string[];
  allowedSchemes?: readonly SafeUrlScheme[];
};

/** Parses and validates a URL before it reaches a navigation or Linking adapter. */
export function parseSafeUrl(
  value: string,
  {
    allowCredentialsInUrl = false,
    allowHttpForLocalhost = false,
    allowedHosts,
    allowedSchemes = ['https:', 'mailto:', 'tel:'],
  }: SafeUrlOptions = {},
): URL {
  const url = new URL(value);
  const isAllowed = allowedSchemes.includes(url.protocol as SafeUrlScheme);
  const isLocalHttp =
    allowHttpForLocalhost &&
    url.protocol === 'http:' &&
    ['localhost', '127.0.0.1', '::1'].includes(url.hostname);

  if (!isAllowed && !isLocalHttp) {
    throw new Error(`Blocked URL scheme: ${url.protocol}`);
  }

  if (!allowCredentialsInUrl && (url.username || url.password)) {
    throw new Error('Blocked URL containing embedded credentials');
  }

  const normalizedAllowedHosts = allowedHosts?.map((host) => host.toLowerCase());
  if (
    normalizedAllowedHosts &&
    (url.protocol === 'http:' || url.protocol === 'https:') &&
    !normalizedAllowedHosts.includes(url.hostname.toLowerCase())
  ) {
    throw new Error(`Blocked URL host: ${url.hostname}`);
  }

  return url;
}

/** Redacts common authorization headers before logging or telemetry. */
export function redactSensitiveHeaders(
  headers: Readonly<Record<string, string>>,
): Record<string, string> {
  const sensitive = new Set(['authorization', 'cookie', 'proxy-authorization', 'set-cookie']);

  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [
      key,
      sensitive.has(key.toLowerCase()) ? '[REDACTED]' : value,
    ]),
  );
}
