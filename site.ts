export const DEFAULT_SITE_URL = "https://vadimsvladisevs.github.io";

/**
 * Resolves the site origin for absolute URLs (canonical, hreflang, sitemap).
 * The full URL of a page is SITE_URL + BASE_PATH + path.
 */
export function resolveSiteUrl(
  env: Record<string, string | undefined>,
): string {
  const value = env.SITE_URL || DEFAULT_SITE_URL;
  if (!/^https?:\/\/[^/]+$/.test(value)) {
    throw new Error(
      `SITE_URL must be an origin without a path or trailing "/", got "${value}"`,
    );
  }
  return value;
}

/** Search engines may index the site only when SITE_INDEXABLE is "true". */
export function resolveIndexable(
  env: Record<string, string | undefined>,
): boolean {
  return env.SITE_INDEXABLE === "true";
}

export const siteUrl = resolveSiteUrl(process.env);
export const indexable = resolveIndexable(process.env);
