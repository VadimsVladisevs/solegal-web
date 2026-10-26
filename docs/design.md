# Design

Visual identity and look & feel for solegal-web. Decided in [02-design-discussion](plans/02-design-discussion.md). Step [04](plans/04-layout-design-system.md) implements it.

**Preview:** [three-variant mockup](https://claude.ai/artifact/Vff4ZYdpChpUMyqu9GBFWT) (private artifact; it shows the look, not production code).

## Direction

- **Modern minimal.** White and off-white surfaces, generous whitespace, one brand green used as an accent.
- **Echo the logo.** It uses a geometric sans-serif, a thin horizontal rule, and widely tracked capitals ("L E G A L"). The site repeats these: Montserrat, thin rules as dividers, and small uppercase labels with wide tracking.
- **Sharp, flat.** Corner radius is 0–2px, there are no shadows, and separation comes from thin `line` borders and background changes.
- **Light theme only.**
- **Mobile-first.** Designed for phones first, then scaled up to tablet and desktop; see [Mobile & responsive](#mobile--responsive).

## Site structure

A **one-page scrolling site** per locale (`en`, `lv`, `ru`). The header navigation scrolls to anchors.

| # | Section | Anchor | Content |
|---|---|---|---|
| 1 | Header (sticky) | — | logo, nav (About, Team, Contact), language switcher `EN · LV · RU`; on mobile a "Menu" button |
| 2 | Hero / Main | `#top` | label, H1, lead paragraph, "Contact us" button → `#contact` |
| 3 | About | `#about` | label, H2, 2 text paragraphs (2 columns on desktop) |
| 4 | Team | `#team` | label, H2, 3 member cards: photo (4:5), role, name, short bio |
| 5 | Contact | `#contact` | label, H2, email (`mailto:`) and phone (`tel:`) |
| 6 | Footer | — | small logo, © year + firm name, language switcher |

**404 page:** one `404.html` for every unknown URL, in the "quiet" layout of hero A: label "Error 404", H1, rule, short text and a "Back to home" button to `/{lang}/`, between the normal header and footer. Its locale comes from the URL prefix (`/lv/…`, `/ru/…`, otherwise `en`), picked client-side; without JS it is English.

Services are not part of the site for now. Partners will come later as a new section (step 08).

### Content fields (for the content layer and the future Sanity schemas)

| Type | Fields |
|---|---|
| `SiteSettings` | `firmName`, `heroLabel`, `heroTitle`, `heroLead`, `heroCta`, `aboutLabel`, `aboutTitle`, `aboutBody: string[]`, `metaTitle` and `metaDescription` (optional; default to `firmName` and `heroLead`) |
| `TeamMember` | `name`, `role`, `bio`, `photo` (`{ src, alt }`, optional → placeholder) |
| `ContactInfo` | `email`, `phone` (display string; `tel:` link derived without spaces) |

Section labels and fixed UI text (nav, "Contact us", "Email", "Phone", copyright) come from the i18n dictionaries. Demo content is lorem ipsum / dummy data in all three locales.

## Color tokens

| Token | Hex | Use |
|---|---|---|
| `brand` | `#2D5703` | brand green (from `docs/images/main-color.jpg`): buttons, green blocks, rules |
| `brand-strong` | `#1F3D02` | hover/active on brand; dark green band |
| `brand-soft` | `#3A6F05` | small labels, role names, focus ring |
| `tint` | `#F2F5EC` | soft green background for sections |
| `surface` | `#FFFFFF` | page background |
| `surface-alt` | `#F7F8F4` | alternate background |
| `ink` | `#111111` | headings, logo |
| `text` | `#2A2A2A` | body text |
| `muted` | `#5B5B5B` | secondary text, contact labels |
| `line` | `#D9DCD3` | dividers, borders |
| `on-brand` | `#FFFFFF` | text on `brand` / `brand-strong` |
| `on-brand-muted` | `#B9CFA0` | labels on green backgrounds |
| `photo-bg` / `photo-fg` | `#E3E8DA` / `#C6D1B6` | placeholder photo only (decorative, no text) |

### Contrast (WCAG 2.x)

Every text/background pair the design uses. AA needs ≥ 4.5:1 for normal text.

| Pair | Ratio | Level |
|---|---|---|
| `text` on `surface` | 14.4:1 | AAA |
| `ink` on `surface` | 18.9:1 | AAA |
| `muted` on `surface` | 6.8:1 | AA |
| `brand-soft` on `surface` | 6.1:1 | AA |
| `brand` on `surface` | 8.5:1 | AAA |
| `text` on `surface-alt` | 13.5:1 | AAA |
| `ink` on `surface-alt` | 17.7:1 | AAA |
| `muted` on `surface-alt` | 6.4:1 | AA |
| `brand-soft` on `surface-alt` | 5.7:1 | AA |
| `text` on `tint` | 13.0:1 | AAA |
| `ink` on `tint` | 17.1:1 | AAA |
| `muted` on `tint` | 6.2:1 | AA |
| `brand-soft` on `tint` | 5.5:1 | AA |
| `brand` on `tint` | 7.7:1 | AAA |
| `on-brand` on `brand` | 8.5:1 | AAA |
| `on-brand` on `brand-strong` | 12.2:1 | AAA |
| `on-brand-muted` on `brand` | 5.0:1 | AA |
| `on-brand-muted` on `brand-strong` | 7.2:1 | AAA |
| `brand` on `on-brand` (white button on green) | 8.5:1 | AAA |

Do not use `brand-soft` or `muted` text on `brand` backgrounds.

## Typography

- **Family:** Montserrat (OFL), self-hosted via `@fontsource-variable/montserrat`. `unicode-range` loads only the subsets a page needs: `latin`, `latin-ext` (Latvian), `cyrillic` (Russian). No requests to Google.
- **Fallback stack:** `"Montserrat Variable", "Segoe UI", "Helvetica Neue", Arial, sans-serif`.
- **Weights:** 400 (body), 500 (nav, contact values), 600 (headings, labels, buttons). 700 only for the decorative "SO" watermark in variant B.

| Role | Size | Weight | Line height | Notes |
|---|---|---|---|---|
| Label / eyebrow | 12px | 600 | — | uppercase, tracking 0.2em |
| Nav, button | 13px | 500 / 600 | — | uppercase, tracking 0.12–0.14em |
| Small / bio | 15px | 400 | 1.65 | |
| Body | 16px | 400 | 1.65 | max ~65 characters per line |
| Lead | 18px | 400 | 1.65 | |
| H3 (member name) | 20px | 600 | 1.3 | |
| Contact value | 20 → 28px | 500 | 1.3 | fluid |
| H2 | 26 → 36px | 600 | 1.2 | fluid |
| H1 | 32 → 52px | 600 | 1.12 | fluid, tracking −0.01em |

Headings use `text-wrap: balance`.

## Spacing, layout, shape

- **Spacing:** Tailwind's default 4px scale.
- **Container:** max 1200px; side gutter ≥ 16px.
- **Section padding (vertical):** 96px desktop, 64px at ≤ 720px.
- **Grid gaps:** 32px (cards), 64px (text columns).
- **Breakpoints:** team 3 columns → 2 at ≤ 900px → 1 at ≤ 560px; about/contact 2 columns → 1 at ≤ 720px; nav collapses at ≤ 720px.
- **Radius:** 0 (2px allowed for inputs if they appear later). **Shadows:** none.
- **Rule:** a short divider, 56 × 2px in `brand`, under hero and section headings.
- **Focus:** 2px `brand-soft` outline, 3px offset, on every interactive element.

## Mobile & responsive

The site must work on phones, tablets and desktops.

- **Mobile-first.** Base styles target small screens. Wider layouts are added at the breakpoints above.
- **Minimum width:** 320px. No horizontal scrolling at any width.
- **Touch targets:** at least 44 × 44px for nav links, the menu button, the language switcher, buttons and `mailto:`/`tel:` links. Padding can supply the size when the visible text is smaller.
- **Zoom:** never blocked. The viewport meta stays `width=device-width, initial-scale=1`.
- **Safe areas:** the sticky header and the mobile menu respect `env(safe-area-inset-*)` on notched phones.
- **Contact:** email and phone are tap-to-act links (`mailto:`, `tel:`).
- **Reference viewports:** 360 × 800 (phone), 768 × 1024 (tablet), 1280 × 800 (desktop).
- **Testing:** Playwright runs on a desktop project and a mobile project (`devices["Pixel 7"]`, Chromium emulation). A manual check on a real phone (iOS Safari and Android Chrome) happens on the deployed site in step 07.

## Logo

Source: `docs/images/logo.jpg`. Vector versions, rebuilt from Montserrat glyph outlines (SemiBold "SO", Bold "LEGAL") and fitted to the original's proportions:

| File | Color | Use on |
|---|---|---|
| `docs/images/logo.svg` | `ink` `#111111` | white / light backgrounds |
| `docs/images/logo-white.svg` | `#FFFFFF` | `brand`, `brand-strong` backgrounds |
| `docs/images/logo-green.svg` | `brand` `#2D5703` | light backgrounds, when an accent is wanted |

- **Minimum width:** 64px (below this, "LEGAL" is no longer readable).
- **Clear space:** at least the cap height of "LEGAL" on every side.
- Don't stretch, recolor outside these three versions, or add effects.
- These are reconstructions. Replace them with official vector files if the firm has them.

## Imagery

- **Team photos:** 4:5 portrait. Neutral or light background, consistent framing (head and shoulders). Should work when converted to grayscale.
- **Demo:** a placeholder silhouette (`photo-bg` / `photo-fg`), stored locally. No external image hosts.
- **Icons:** none needed for now.

## Design variants (pending customer choice)

Three variants are built so the customer can choose. They share **all tokens, typography, content and section order**; only the treatment differs.

| | A · Quiet white (default) | B · Green hero | C · Split |
|---|---|---|---|
| URL | `/{lang}/` | `/{lang}/b` | `/{lang}/c` |
| Header | white, `line` bottom border, black logo | `brand` background, white logo and nav | white, black logo |
| Hero | white; `ink` H1, `muted` lead, green button; `line` bottom border | full-width `brand`; white text, white button with green text; large faint "SO" watermark (decorative) | two columns: text on `surface-alt` (left), `brand` panel with the white logo (right); on mobile the panel stacks on top |
| About | white | white | white |
| Team | `tint` background | `surface-alt` background | white with a `line` top border; photo has a 3px `brand` bottom border |
| Contact | white, `line` rules between items | `brand-strong` band; white values, `on-brand-muted` labels | `tint` background |
| Footer | same for all: white, `line` top border, `muted` text | | |

### Variant mechanism

- Section components take one prop, `variant: "a" | "b" | "c"`. It only switches styling and the variant-only pieces (B's watermark, C's logo panel). Content and data are identical.
- Routes: the home route renders variant A; thin routes `/{lang}/b` and `/{lang}/c` render the same page with B / C. That makes 9 prerendered pages.
- A small floating **design switcher** ("Design A · B · C") links between the variant URLs in the same locale. It is a "light pill" fixed bottom-right (with safe-area insets): white, `line` border, `muted` label, and three 44 × 44px links; the current one is filled `brand` with `on-brand` text and has `aria-current="page"`. The language switcher keeps the current variant.
- **Removal:** once the customer picks one, step [11](plans/11-final-design-variant.md) makes the chosen treatment the only one at `/{lang}/`. It deletes the `b`/`c` routes, the `variant` prop and its branches, the switcher, and this section.
