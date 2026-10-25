import { useMatches } from "react-router";

/** Design variants shown to the customer; step 11 removes all but one. */
export type Variant = "a" | "b" | "c";

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
