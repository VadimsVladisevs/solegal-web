// Demo content (dummy data).
import type { LocaleContent } from "../types";

export const lv: LocaleContent = {
  siteSettings: {
    firmName: "SO Legal",
    heroLabel: "Juridiskais birojs",
    heroTitle: "Skaidras juridiskās konsultācijas uzņēmumiem un privātpersonām",
    heroLead:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    heroCta: "Sazināties",
    aboutLabel: "Par mums",
    aboutTitle: "Neliels birojs ar dziļām zināšanām",
    aboutBody: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    ],
    metaTitle: "SO Legal — juridiskais birojs",
    metaDescription:
      "Skaidras juridiskās konsultācijas uzņēmumiem un privātpersonām. Iepazīstieties ar SO Legal komandu un sazinieties ar mums.",
  },
  team: [
    {
      name: "Anna Bērziņa",
      role: "Vadošā partnere",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      name: "Jānis Ozols",
      role: "Partneris",
      bio: "Sed do eiusmod tempor incididunt ut labore et dolore.",
    },
    {
      name: "Jeļena Petrova",
      role: "Juriste",
      bio: "Ut enim ad minim veniam, quis nostrud exercitation.",
    },
  ],
  contactInfo: {
    email: "info@example.com",
    phone: "+371 2000 0000",
  },
  partners: [],
};
