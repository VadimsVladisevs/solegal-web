export const DEFAULT_BASE_PATH = "/solegal-web/";

/**
 * Resolves the public base path from the environment.
 * GitHub Pages serves the site under `/solegal-web/`, Cloudflare Pages at `/`.
 */
export function resolveBasePath(
  env: Record<string, string | undefined>,
): string {
  const value = env.BASE_PATH || DEFAULT_BASE_PATH;
  if (!value.startsWith("/") || !value.endsWith("/")) {
    throw new Error(`BASE_PATH must start and end with "/", got "${value}"`);
  }
  return value;
}

export const basePath = resolveBasePath(process.env);
