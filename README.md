# Girish Nalawade — Personal Portfolio

A single-page personal portfolio with a **Calm Nature** aesthetic — muted sage, mist, dusk, and dusty-rose tones — built with Next.js 15, TypeScript, Tailwind CSS v4, and Framer Motion. Designed to feel peaceful and meditative while still being innovative: scroll-linked atmospheric backdrop (morning mist to dusk), topographic line texture, drifting dust-mote canvas, sticky right-side scroll-spy nav, animated theme toggle, AI assistant widget stub, **Cmd+K command palette**, **cursor-following lantern glow**, and **subtle 3D tilt on cards**.

## Stack

- **Framework**: Next.js 15 (App Router) + React 19
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4 (single `@import "tailwindcss"` + CSS variables for theme)
- **Motion**: Framer Motion
- **Theming**: `next-themes` (class strategy, persists in `localStorage`)
- **Icons**: `lucide-react`
- **Fonts**: Inter (UI), JetBrains Mono (code/terminal), Space Grotesk (display) via `next/font/google`

## Quick start

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Production build

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Import the repo in [Vercel](https://vercel.com/new).
3. Use defaults — Next.js is auto-detected.
4. Set the production domain when ready.

## Content editing

All copy and data live in [`lib/content.ts`](./lib/content.ts). Edit that single file to update the site.

Open items flagged in `lib/content.ts`:

- `personal.linkedin` — replace placeholder with real LinkedIn URL.
- `publications` — first entry is a realistic placeholder; replace with real metadata when available.

Resume PDF lives at [`public/resume.pdf`](./public/resume.pdf) — replace the file to swap the downloadable resume.

Project images live in [`public/projects/`](./public/projects/) and are referenced by `slug.png`. Replace any file there to swap a project screenshot.

## Project structure

```
app/
  layout.tsx           # Root layout: fonts, ThemeProvider, TopBar, SideNav, AssistantWidget
  page.tsx             # Composes all sections in order
  globals.css          # Tailwind + CSS variables + aurora keyframes
components/
  layout/              # TopBar, SideNav (scroll-spy), ThemeToggle, AssistantWidget, GlobalBackground
  sections/            # Hero, Projects, Experience, Skills, Publications, Education, Contact
  effects/             # AuroraCanvas (cursor-reactive), Typewriter
  ui/                  # GlassCard, SectionHeader
  providers/           # ThemeProvider
  seo/                 # StructuredData (JSON-LD)
lib/
  content.ts           # Single source of truth for all content
  utils.ts             # cn() helper
public/
  resume.pdf
  projects/*.png
  og.png
  favicon.svg
```

## Differentiators from Claude's portfolio

- **Calm nature palette** — sage, moss, mist, dusk, dusty rose. Muted, low-saturation tones in both themes vs. Claude's cream + orange.
- **Scroll-linked atmospheric backdrop** — the background subtly shifts from cool morning mist (top) to warm dusk (bottom) as you scroll.
- **Topographic contour-line texture** under the mist — references hiking maps / nature without being noisy.
- **Right-side vertical sticky nav** with scroll-spy + animated indicator pill (not top horizontal).
- **Engineer-first section order** — Projects before Experience and About.
- **Drifting dust-mote canvas** in the hero (cursor gently parts the mist) — replaces typical bold particle fields.
- **Terminal-style typewriter** cycling through roles inside the hero.
- **Scroll-progress timeline rail** in the Experience section that fills as you scroll.
- **Sun/moon morph theme toggle** with springy slide animation.
- **Floating AI assistant widget** (popover stub).

## Interactive hooks

- **Cmd / Ctrl + K command palette** — keyboard-driven navigation between sections, theme switching, email / GitHub / LinkedIn / resume actions. Arrow keys to move, Enter to select, Esc to close. "/" also opens it from anywhere outside an input.
- **Cursor-following lantern glow** — a soft warm halo trails the cursor through the page on pointer-capable devices (disabled on touch / reduced-motion).
- **Subtle 3D card tilt** — Projects and Education cards tilt up to ~3.5deg on pointer hover, then ease back to rest.

## Accessibility

- Semantic landmarks (`<section>`, `<nav>`, `<header>`, `<footer>`, `<main>`).
- `aria-labelledby` on every section + skip-to-content link.
- Visible focus rings; keyboard accessible nav and toggles.
- Honors `prefers-reduced-motion` (canvas + global transitions).
- Color contrast tuned for both themes against `--ink` / `--ink-muted` tokens.

## Performance

- Fonts loaded via `next/font` (no FOIT, no extra network hops).
- Images served via `next/image` with explicit `sizes`.
- Canvas animation throttled to RAF and paused on reduced-motion.
- Glass surfaces use `backdrop-filter` (GPU-accelerated).

## License

Content (resume, bio, project descriptions) © Girish Nalawade. Code is MIT-licensed — free to adapt for your own portfolio. Please replace personal content before deploying as your own.
