import { ButtonLink } from "~/components/button";
import { Heading } from "~/components/heading";
import { Label } from "~/components/label";
import { Rule } from "~/components/rule";
import { Section, type SectionTone } from "~/components/section";
import { content } from "~/lib/content";
import { isLocale } from "~/lib/i18n/config";
import { useT } from "~/lib/i18n/use-t";
import { type Variant, type VariantHandle, useVariant } from "~/lib/variant";
import type { Route } from "./+types/home";

export async function loader({ params }: Route.LoaderArgs) {
  // The :lang layout already rejects unknown locales; this narrows the type.
  if (!isLocale(params.lang)) throw new Error(`Unknown locale ${params.lang}`);
  return { siteSettings: await content.getSiteSettings(params.lang) };
}

export const handle: VariantHandle = { variant: "a" };

// Section backgrounds per variant, from docs/design.md.
const tones: Record<
  Variant,
  Record<"hero" | "team" | "contact", SectionTone>
> = {
  a: { hero: "surface", team: "tint", contact: "surface" },
  b: { hero: "brand", team: "surface-alt", contact: "brand-strong" },
  c: { hero: "surface-alt", team: "surface", contact: "tint" },
};

// Temporary layout preview: placeholder sections until step 05.
export default function Home({ loaderData }: Route.ComponentProps) {
  const { siteSettings } = loaderData;
  const t = useT();
  const variant = useVariant();
  const tone = tones[variant];
  const heroOnBrand = tone.hero === "brand";
  const contactOnBrand = tone.contact === "brand-strong";

  return (
    <>
      <Section
        id="top"
        tone={tone.hero}
        className={variant === "a" ? "border-b border-line" : ""}
      >
        <div className="flex max-w-prose flex-col gap-6">
          <Label onBrand={heroOnBrand}>{siteSettings.heroLabel}</Label>
          <Heading level={1} onBrand={heroOnBrand}>
            {siteSettings.heroTitle}
          </Heading>
          <Rule onBrand={heroOnBrand} />
          <p
            className={`text-lead ${heroOnBrand ? "text-on-brand" : "text-muted"}`}
          >
            {siteSettings.heroLead}
          </p>
          <div>
            <ButtonLink href="#contact" onBrand={heroOnBrand}>
              {siteSettings.heroCta}
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section id="about">
        <div className="flex flex-col gap-6">
          <Label>{siteSettings.aboutLabel}</Label>
          <Heading level={2}>{siteSettings.aboutTitle}</Heading>
          <Rule />
          <div className="grid gap-6 md:grid-cols-2 md:gap-16">
            {siteSettings.aboutBody.map((paragraph) => (
              <p key={paragraph} className="max-w-prose">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="team"
        tone={tone.team}
        className={variant === "c" ? "border-t border-line" : ""}
      >
        <div className="flex flex-col gap-6">
          <Label>{t.team.label}</Label>
          <Heading level={2}>{t.team.title}</Heading>
          <Rule />
        </div>
      </Section>

      <Section id="contact" tone={tone.contact}>
        <div className="flex flex-col gap-6">
          <Label onBrand={contactOnBrand}>{t.contact.label}</Label>
          <Heading level={2} onBrand={contactOnBrand}>
            {t.contact.title}
          </Heading>
          <Rule onBrand={contactOnBrand} />
        </div>
      </Section>
    </>
  );
}
