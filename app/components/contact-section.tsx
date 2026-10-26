import type { ContactInfo } from "~/content/types";
import { useT } from "~/lib/i18n/use-t";
import type { Variant } from "~/lib/variant";
import { Heading } from "./heading";
import { Label } from "./label";
import { Rule } from "./rule";
import { Section, type SectionTone } from "./section";

const tones: Record<Variant, SectionTone> = {
  a: "surface",
  b: "brand-strong",
  c: "tint",
};

interface ContactSectionProps {
  variant: Variant;
  contactInfo: ContactInfo;
}

/** Email and phone as tap-to-act links. */
export function ContactSection({ variant, contactInfo }: ContactSectionProps) {
  const t = useT();
  const onBrand = variant === "b";
  const items = [
    {
      label: t.contact.email,
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
    },
    {
      label: t.contact.phone,
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone.replace(/\s/g, "")}`,
    },
  ];

  return (
    <Section id="contact" tone={tones[variant]}>
      <div className="flex flex-col gap-6">
        <Label onBrand={onBrand}>{t.contact.label}</Label>
        <Heading level={2} onBrand={onBrand}>
          {t.contact.title}
        </Heading>
        <Rule onBrand={onBrand} />
      </div>
      <dl className="mt-12 grid md:grid-cols-2 md:gap-x-12">
        {items.map((item) => (
          <div
            key={item.href}
            className={`flex flex-col gap-2 border-t py-7 ${onBrand ? "border-on-brand/20" : "border-line"}`}
          >
            <dt
              className={`text-label font-semibold tracking-label uppercase ${onBrand ? "text-on-brand-muted" : "text-muted"}`}
            >
              {item.label}
            </dt>
            <dd>
              <a
                href={item.href}
                className={`inline-flex min-h-11 items-center text-contact font-medium wrap-anywhere underline-offset-6 hover:underline ${onBrand ? "text-on-brand focus-visible:outline-on-brand" : "text-ink hover:text-brand"}`}
              >
                {item.value}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
