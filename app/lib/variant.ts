import { useMatches } from "react-router";

/** Variants A–C share the section components (`variant` prop). */
export type SharedVariant = "a" | "b" | "c";

/**
 * Design variants shown to the customer; step 11 removes all but one. D and E
 * (step 13) render their own header, sections and footer.
 */
export type Variant = SharedVariant | "d" | "e";

export function isSharedVariant(variant: Variant): variant is SharedVariant {
  return variant !== "d" && variant !== "e";
}

/** Route `handle` shape that declares the design variant of a page. */
export interface VariantHandle {
  variant: Variant;
}

function hasVariant(handle: unknown): handle is VariantHandle {
  return typeof handle === "object" && handle !== null && "variant" in handle;
}

/** The variant of the deepest matched route that declares one, else "a". */
export function useVariant(): Variant {
  const handles = useMatches()
    .map((match) => match.handle)
    .filter(hasVariant);
  return handles.at(-1)?.variant ?? "a";
}
