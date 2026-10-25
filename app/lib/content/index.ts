import { localSource } from "./local-source";
import type { ContentSource } from "./source";

// The only content source for now; step 10 selects one via CONTENT_SOURCE.
export const content: ContentSource = localSource;

export type { ContentSource } from "./source";
