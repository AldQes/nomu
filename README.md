# NOMU Zurich

All-Day Brunch & Matcha Bar — marketing website.

Calm, minimal, premium. Beige / stone tones, generous whitespace, Scandi-meets-Japanese aesthetic.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Forms:** React Hook Form
- **Email:** [Resend](https://resend.com/)
- **CMS:** [Decap CMS](https://decapcms.org/) (file-based, git-backed when deployed)

## Getting Started

### Prerequisites

- Node.js 20+ (Next.js 16 requires it)
- npm 9+

### Install

```bash
npm install
```

### Development

In **two terminals**:

```bash
# Terminal 1 — the site
npm run dev
# → http://localhost:3000

# Terminal 2 — the CMS proxy (lets the editor write to local files)
npm run cms
# → listens on http://localhost:8081 (only used by the CMS in dev)
```

The site is at <http://localhost:3000>. The content editor is at <http://localhost:3000/admin>.

### Production Build

```bash
npm run build
npm start
```

## Content Management (Decap CMS)

The site's content lives in plain `.json` files under [`content/`](./content/). The owner edits those files through a web UI at `/admin` — no need to touch code.

### What's editable

| Section | File(s) |
|---|---|
| Hours, address, phone, email, Instagram, map | `content/site.json` |
| Home page (hero, intro, featured items, events teaser) | `content/pages/home.json` |
| Menu page header & notes | `content/pages/menu.json` |
| Contact page copy | `content/pages/contact.json` |
| Private Events page (hero, pitch, what's included, pricing, inquiry) | `content/pages/private-events.json` |
| Menu categories & items | `content/menu/*.json` (one file per category) |
| Photos | uploaded to `public/images/` from the CMS |

### Production workflow (Netlify)

1. Owner goes to `https://<your-site>/admin`.
2. Logs in via Netlify Identity (email + password set from the invite link).
3. Edits text / swaps photos. Hits **Publish**.
4. Decap commits to `main` → Netlify auto-redeploys (~30–60s) → site updates.

### Local editing workflow

To edit content locally without going through Netlify, temporarily add
`local_backend: true` at the top of [`public/admin/config.yml`](./public/admin/config.yml),
then in two terminals:

```bash
npm run dev    # Terminal 1
npm run cms    # Terminal 2 — the local proxy on :8081
```

Visit <http://localhost:3000/admin>. Decap detects the local proxy and lets
you log in as "Dev User" — no password. Edits write directly to the JSON
files on disk and the site hot-reloads. Remove `local_backend: true` again
before committing.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

| Variable | Description | Default |
|---|---|---|
| `RESTAURANT_EMAIL` | Destination email for table reservations | `info@nomu-zurich.ch` |
| `EVENTS_EMAIL` | Destination email for private event inquiries | `events@nomu-zurich.ch` |
| `CONTACT_EMAIL` | Destination email for contact form messages | `info@nomu-zurich.ch` |
| `RESEND_API_KEY` | Resend API key for transactional emails | `re_` (dev mode — logs to console) |

When `RESEND_API_KEY` is unset or `"re_"`, emails are logged to the server console instead of being sent.

## Image Assets

Place image files in `public/images/`. The CMS uploads here automatically. Original source files are kept in `assets/` and are not served.

## Project Structure

```
content/                            ← editable by the CMS
├── site.json                       — hours, address, phone, socials
├── pages/
│   ├── home.json
│   ├── menu.json
│   ├── contact.json
│   └── private-events.json
└── menu/                           — one file per category
    ├── coffee.json
    ├── matcha.json
    └── ...

public/
├── admin/                          ← Decap CMS UI
│   ├── index.html
│   └── config.yml
└── images/                         ← uploaded photos

src/
├── app/
│   ├── page.tsx                    — Home page
│   ├── menu/page.tsx
│   ├── contact/page.tsx
│   ├── private-events/page.tsx
│   ├── api/                        — form submission routes
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Nav.tsx
│   ├── Footer.tsx                  — reads content/site.json
│   ├── Hero.tsx
│   ├── MenuSection.tsx
│   ├── ReservationForm.tsx
│   ├── ContactForm.tsx
│   ├── PrivateEventForm.tsx
│   └── ScrollReveal.tsx
└── lib/
    ├── content.ts                  — loads JSON files into typed objects
    └── email.ts                    — Resend email utility
```

## Notes

- English only (v1). Code structure supports future i18n via `next-intl` or similar.
- Nav links and the "NOMU" logo wordmark are intentionally not in the CMS — those rarely change.
