// Neutral demo photos of design variants D and E (step 13), in public/images.
// Public domain / CC0 from Wikimedia Commons; sources in
// docs/plans/13-modern-redesign.md. Alt texts come from the dictionary
// (`t.images`).

export type DemoImage = "columns" | "riga" | "stairs" | "books" | "detail";

/** URL of a demo photo under the base path. */
export function demoImageUrl(name: DemoImage): string {
  return `${import.meta.env.BASE_URL}images/${name}.jpg`;
}
