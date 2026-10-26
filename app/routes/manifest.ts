import { content } from "~/lib/content";
import { defaultLocale } from "~/lib/i18n/config";
import { themeColor } from "~/lib/seo/meta";

/** `manifest.webmanifest`. Paths are relative to the manifest, so they follow BASE_PATH. */
export async function loader() {
  const { firmName } = await content.getSiteSettings(defaultLocale);
  const manifest = {
    name: firmName,
    short_name: firmName,
    start_url: "./",
    display: "browser",
    background_color: "#ffffff",
    theme_color: themeColor,
    icons: [
      { src: "icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { "Content-Type": "application/manifest+json" },
  });
}
