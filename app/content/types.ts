// Content types. Each maps 1:1 to a future Sanity document schema (step 10).

export interface Image {
  src: string;
  alt: string;
}

export interface SiteSettings {
  firmName: string;
  heroLabel: string;
  heroTitle: string;
  heroLead: string;
  heroCta: string;
  aboutLabel: string;
  aboutTitle: string;
  aboutBody: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  /** Optional; the UI shows a placeholder without it. */
  photo?: Image;
}

export interface ContactInfo {
  email: string;
  /** Display string; the `tel:` link strips the spaces. */
  phone: string;
}

export interface Partner {
  name: string;
  url?: string;
  logo?: Image;
}

/** Everything one locale provides. */
export interface LocaleContent {
  siteSettings: SiteSettings;
  team: TeamMember[];
  contactInfo: ContactInfo;
  partners: Partner[];
}
