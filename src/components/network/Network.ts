/** HTTP methods supported by the built-in Fetch adapter. */
export type HttpMethod = 'DELETE' | 'GET' | 'HEAD' | 'PATCH' | 'POST' | 'PUT';

/** Framework-neutral request contract used by data-aware components. */
export type HttpRequest = {
  body?: BodyInit | null;
  headers?: Readonly<Record<string, string>>;
  method?: HttpMethod;
  signal?: AbortSignal;
  timeoutMs?: number;
  url: string;
};

/** Framework-neutral response contract. */
export type HttpResponse<T> = {
  data: T;
  headers: Headers;
  ok: boolean;
  status: number;
};

/** Port that can be replaced by Axios, a generated SDK, mocks, or serverless clients. */
export interface HttpClientPort {
  request<T>(request: HttpRequest): Promise<HttpResponse<T>>;
}

/** Fetch adapter options with secure transport enabled by default. */
export type FetchHttpClientOptions = {
  allowHttpForLocalhost?: boolean;
  defaultHeaders?: Readonly<Record<string, string>>;
  defaultTimeoutMs?: number;
};

function isLocalhost(hostname: string): boolean {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
}

function assertSecureTransport(url: URL, allowHttpForLocalhost: boolean): void {
  if (url.protocol === 'https:') return;
  if (allowHttpForLocalhost && url.protocol === 'http:' && isLocalhost(url.hostname)) return;
  throw new Error(`Blocked insecure network URL: ${url.origin}`);
}

async function readResponseBody<T>(response: Response): Promise<T> {
  if (response.status === 204) return undefined as T;

  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json') || contentType.includes('+json')) {
    return (await response.json()) as T;
  }

  return (await response.text()) as T;
}

/** Creates a small HTTPS-first Fetch adapter without introducing a networking dependency. */
export function createFetchHttpClient({
  allowHttpForLocalhost = false,
  defaultHeaders = {},
  defaultTimeoutMs = 15_000,
}: FetchHttpClientOptions = {}): HttpClientPort {
  return {
    async request<T>(request: HttpRequest): Promise<HttpResponse<T>> {
      const {
        body,
        headers,
        method = 'GET',
        signal,
        timeoutMs = defaultTimeoutMs,
        url,
      } = request;
      const parsedUrl = new URL(url);
      assertSecureTransport(parsedUrl, allowHttpForLocalhost);

      const controller = new AbortController();
      const hasFiniteTimeout = Number.isFinite(timeoutMs) && timeoutMs > 0;
      const timeout = hasFiniteTimeout
        ? setTimeout(() => controller.abort(), Math.max(1, timeoutMs))
        : undefined;
      const abort = () => controller.abort();

      if (signal?.aborted) {
        controller.abort();
      } else {
        signal?.addEventListener('abort', abort, { once: true });
      }

      try {
        const response = await fetch(parsedUrl.toString(), {
          body,
          headers: { ...defaultHeaders, ...headers },
          method,
          signal: controller.signal,
        });

        return {
          data: await readResponseBody<T>(response),
          headers: response.headers,
          ok: response.ok,
          status: response.status,
        };
      } finally {
        if (timeout !== undefined) clearTimeout(timeout);
        signal?.removeEventListener('abort', abort);
      }
    },
  };
}
