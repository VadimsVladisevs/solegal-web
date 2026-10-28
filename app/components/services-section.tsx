import type { Service } from "~/content/types";
import { useT } from "~/lib/i18n/use-t";
import { Heading } from "./heading";
import { Label } from "./label";
import { Rule } from "./rule";
import { Section } from "./section";

interface ServicesSectionProps {
  services: Service[];
}

/** White in every design variant: service cards, 1 column, 2 above 560px, 3 above 900px. */
export function ServicesSection({ services }: ServicesSectionProps) {
  const t = useT();
  return (
    <Section id="services" className="border-t border-line">
      <div className="flex flex-col gap-6">
        <Label>{t.services.label}</Label>
        <Heading level={2}>{t.services.title}</Heading>
        <Rule />
      </div>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.title}
            className="flex flex-col gap-2 border-t border-line pt-6"
          >
            <Heading level={3}>{service.title}</Heading>
            <p className="text-small text-muted">{service.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
