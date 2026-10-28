import type {
  ContactInfo,
  Partner,
  Service,
  SiteSettings,
  TeamMember,
} from "~/content/types";
import type { Locale } from "~/lib/i18n/config";
import type { Dictionary } from "~/lib/i18n/dictionaries/en";

/**
 * Where pages get content from. Loaders run at build time (prerender),
 * so a Sanity implementation (step 10) is queried only during the build.
 */
export interface ContentSource {
  getDictionary(locale: Locale): Promise<Dictionary>;
  getSiteSettings(locale: Locale): Promise<SiteSettings>;
  getServices(locale: Locale): Promise<Service[]>;
  getTeam(locale: Locale): Promise<TeamMember[]>;
  getContactInfo(locale: Locale): Promise<ContactInfo>;
  getPartners(locale: Locale): Promise<Partner[]>;
}
