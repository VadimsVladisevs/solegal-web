// Demo content (dummy data).
import type { LocaleContent } from "../types";

export const ru: LocaleContent = {
  siteSettings: {
    firmName: "SO Legal",
    heroLabel: "Юридическая фирма",
    heroTitle: "Понятные юридические консультации для бизнеса и частных лиц",
    heroLead:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    heroCta: "Связаться с нами",
    aboutLabel: "О нас",
    aboutTitle: "Небольшая фирма с глубокой экспертизой",
    aboutBody: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    ],
    metaTitle: "SO Legal — юридическая фирма",
    metaDescription:
      "Понятные юридические консультации для бизнеса и частных лиц. Познакомьтесь с командой SO Legal и свяжитесь с нами.",
  },
  services: [
    {
      title: "Корпоративное право",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    },
    {
      title: "Договоры",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    },
    {
      title: "Споры и судебные процессы",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.",
    },
    {
      title: "Трудовое право",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.",
    },
    {
      title: "Недвижимость",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    },
    {
      title: "Защита данных",
      description:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
    },
  ],
  team: [
    {
      name: "Анна Берзиня",
      role: "Управляющий партнёр",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      name: "Янис Озолс",
      role: "Партнёр",
      bio: "Sed do eiusmod tempor incididunt ut labore et dolore.",
    },
    {
      name: "Елена Петрова",
      role: "Юрист",
      bio: "Ut enim ad minim veniam, quis nostrud exercitation.",
    },
  ],
  contactInfo: {
    email: "info@example.com",
    phone: "+371 2000 0000",
  },
  partners: [],
};
