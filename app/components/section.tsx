import { Container } from "./container";

export type SectionTone =
  "surface" | "surface-alt" | "tint" | "brand" | "brand-strong";

const toneClasses: Record<SectionTone, string> = {
  surface: "bg-surface",
  "surface-alt": "bg-surface-alt",
  tint: "bg-tint",
  brand: "bg-brand text-on-brand",
  "brand-strong": "bg-brand-strong text-on-brand",
};

interface SectionProps {
  /** Anchor target for the header navigation. */
  id?: string;
  tone?: SectionTone;
  /** Extra classes on the section, e.g. borders. */
  className?: string;
  children: React.ReactNode;
}

/** A full-width page band with vertical padding and a centered container. */
export function Section({
  id,
  tone = "surface",
  className = "",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${toneClasses[tone]} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}
