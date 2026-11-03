// Source of truth for UI strings: `Dictionary` is derived from this file.
export const en = {
  skipLink: "Skip to content",
  nav: {
    label: "Main navigation",
    about: "About",
    services: "Services",
    team: "Team",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
  },
  services: {
    label: "Services",
    title: "How we can help",
  },
  team: {
    label: "Team",
    title: "Our people",
  },
  contact: {
    label: "Contact",
    title: "Get in touch",
    email: "Email",
    phone: "Phone",
  },
  footer: {
    rights: "All rights reserved.",
  },
  designSwitcher: {
    label: "Design",
  },
  notFound: {
    label: "Error 404",
    title: "Page not found",
    text: "The page you are looking for does not exist or has moved.",
    home: "Back to home",
  },
  languageSwitcher: {
    label: "Language",
  },
  // Demo copy of design variants D and E (step 13). If one is chosen, the
  // marketing text here moves into the content layer.
  images: {
    columns: "White classical columns",
    riga: "Riga skyline across the Daugava",
    stairs: "White marble staircase",
    books: "Shelves of bound law reports",
    detail: "Classical wall detail with columns",
  },
  variants: {
    practiceAreas: "Practice areas",
    office: "Office",
    officeValue: "Riga, Latvia",
  },
  variantD: {
    heroTitle: "Clarity. Integrity. Commitment.",
    heroPlaces: "Riga / Latvia · English / Latviešu / Русский",
    heroTeam: "Our team",
    heroMore: "Learn more",
    scrollCue: "Scroll to About",
    whyTitle: "Why clients choose us",
    why: [
      {
        title: "Partner-led",
        text: "Every matter is led by a partner from the first call to the result.",
      },
      {
        title: "Three languages",
        text: "We advise in English, Latvian and Russian, in writing and in person.",
      },
      {
        title: "Clear fees",
        text: "You get an estimate before work starts and no surprises on the invoice.",
      },
      {
        title: "Local knowledge",
        text: "We know the Latvian courts, registers and authorities from daily practice.",
      },
    ],
    teamTitle: "Our professionals",
  },
  variantE: {
    carousel: "Highlights",
    chooseSlide: "Choose a slide",
    pause: "Pause slideshow",
    play: "Play slideshow",
    slides: [
      {
        label: "Three languages",
        title: "Advising in English, Latvian and Russian",
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        cta: "About us",
      },
      {
        label: "Practice areas",
        title: "From contracts to disputes, one team",
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        cta: "Our services",
      },
      {
        label: "Our people",
        title: "Partner-led from the first call",
        text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        cta: "Meet the team",
      },
    ],
    stats: [
      { value: 3, label: "languages" },
      { value: 6, label: "practice areas" },
      { value: 3, label: "lawyers" },
    ],
    teamTitle: "The people you will work with",
    contactTitle: "Tell us about your matter",
  },
};

export type Dictionary = typeof en;
