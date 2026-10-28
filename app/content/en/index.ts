// Demo content (dummy data).
import type { LocaleContent } from "../types";

export const en: LocaleContent = {
  siteSettings: {
    firmName: "SO Legal",
    heroLabel: "Law firm",
    heroTitle: "Clear legal advice for business and private clients",
    heroLead:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    heroCta: "Contact us",
    aboutLabel: "About",
    aboutTitle: "A small firm with deep expertise",
    aboutBody: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    ],
    metaTitle: "SO Legal — law firm",
    metaDescription:
      "Clear legal advice for business and private clients. Meet the SO Legal team and get in touch.",
  },
  services: [
    {
      title: "Corporate law",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    },
    {
      title: "Contracts",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    },
    {
      title: "Disputes and litigation",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.",
    },
    {
      title: "Employment law",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.",
    },
    {
      title: "Real estate",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    },
    {
      title: "Data protection",
      description:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
    },
  ],
  team: [
    {
      name: "Anna Bērziņa",
      role: "Managing partner",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      name: "Jānis Ozols",
      role: "Partner",
      bio: "Sed do eiusmod tempor incididunt ut labore et dolore.",
    },
    {
      name: "Elena Petrova",
      role: "Associate",
      bio: "Ut enim ad minim veniam, quis nostrud exercitation.",
    },
  ],
  contactInfo: {
    email: "info@example.com",
    phone: "+371 2000 0000",
  },
  partners: [],
};
