const ENV_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * Standard API request wrapper that handles errors, base URL resolution,
 * and fallbacks for local dev proxy if CORS is restricted.
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // Primary URL is the configured base URL
  const primaryUrl = `${ENV_BASE_URL.replace(/\/$/, '')}${cleanEndpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(primaryUrl, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData.message) errorMessage = errorData.message;
        else if (errorData.error) errorMessage = errorData.error;
      } catch {
        // Response is not JSON
      }
      throw new Error(errorMessage);
    }

    return (await response.json()) as T;
  } catch (err: unknown) {
    // If the direct call failed (e.g. browser CORS block when calling http://localhost:3000 directly),
    // and we are in a browser where relative '/api' can be proxied by Vite:
    const isNetworkOrCors = err instanceof TypeError;
    const isDifferentOrigin =
      typeof window !== 'undefined' &&
      ENV_BASE_URL.startsWith('http') &&
      !ENV_BASE_URL.startsWith(window.location.origin);

    if (isNetworkOrCors && isDifferentOrigin) {
      try {
        const fallbackUrl = `/api${cleanEndpoint}`;
        const fallbackRes = await fetch(fallbackUrl, {
          ...options,
          headers,
        });

        if (fallbackRes.ok) {
          return (await fallbackRes.json()) as T;
        }
      } catch {
        // Fallback also failed, re-throw user-friendly error
      }
    }

    throw err;
  }
}
