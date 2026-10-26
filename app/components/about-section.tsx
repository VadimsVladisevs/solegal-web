import type { SiteSettings } from "~/content/types";
import { Heading } from "./heading";
import { Label } from "./label";
import { Rule } from "./rule";
import { Section } from "./section";

interface AboutSectionProps {
  siteSettings: SiteSettings;
}

/** White in every design variant: heading and two text columns. */
export function AboutSection({ siteSettings }: AboutSectionProps) {
  return (
    <Section id="about">
      <div className="flex flex-col gap-6">
        <Label>{siteSettings.aboutLabel}</Label>
        <Heading level={2}>{siteSettings.aboutTitle}</Heading>
        <Rule />
        <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-16">
          {siteSettings.aboutBody.map((paragraph) => (
            <p key={paragraph} className="max-w-prose">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}
