import type { VariantHandle } from "~/lib/variant";

// Design variant C: the home page with another treatment (removed in step 11).
export { default, loader } from "./home";

export const handle: VariantHandle = { variant: "c" };
