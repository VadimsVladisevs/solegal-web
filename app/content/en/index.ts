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
  },
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
