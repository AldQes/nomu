# Website Build Brief: NOMU Zurich — All-Day Brunch & Matcha Bar

## Project Overview
Build a marketing website for NOMU Zurich, an all-day brunch café and matcha bar.
The site should reflect a calm, minimal, premium aesthetic — beige / stone tones,
warm neutrals, lots of whitespace, soft natural light feel. Think modern Scandi-
meets-Japanese café: clean typography, generous spacing, large food photography.

## Reference Assets Provided
The following images are attached and MUST be used in the build (do not
substitute with stock photos):

- **Interior shot** (`NOMU_PIC_3.jpeg`) — wide café interior with rattan
  pendant lights, olive tree, beige tones. Use as the **home hero**.
- **Matcha layered drinks on tray** (`NOMU_PIC_4.jpeg`) — two colorful
  layered matcha drinks. Use as a **menu/matcha section feature**.
- **Brunch flatlay** (`NOMU_PIC__5.jpeg` / `NOMU_PIC__7.jpeg`) — granola
  bowl, mushroom toast, iced matcha. Use for **home featured items** and
  **menu section imagery**.
- **NOMU-branded takeaway box + drinks** (`NOMU_PIC__6.jpeg`) — shows
  branded packaging. Use for **about/brand section or private events**.
- **Avocado feta toast** (`NOMU_PIC_1.jpeg`) — close-up of toast. Use
  for **toast menu section**.
- **Ribbed-glass iced matcha latte** (`NOMU_PIC_2.jpeg`) — clean
  product shot. Use for **matcha section hero or home highlight**.
- **Drinks menu** (`Menu_Drinks.jpeg`), **Toast menu** (`Menu_Toast.jpeg`),
  **Smoothies menu** (`Menu_smoothies.pdf`) — these are SOURCE DATA for
  menu content (already transcribed below). Do not display the raw images
  on the site.

When placing images, match them to the section context above. Use
`next/image` with proper width/height, lazy loading, and descriptive alt text.

## Tech Stack
- **Framework:** Next.js (App Router) with React + TypeScript
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form + a simple API route that sends emails (use Resend
  or Nodemailer — leave SMTP/API key as env vars)
- **Deployment target:** Vercel-compatible
- **Image optimization:** next/image
- **No CMS** — content hardcoded in TypeScript data files for now

## Brand & Visual Direction
- **Palette:** beige (#F5EFE6 / #E8DFD3 base), warm stone (#C9BFB2),
  soft white (#FBF9F5), deep charcoal text (#2B2A26), subtle sage accent (#A8B5A0)
- **Typography:** a clean modern serif for headings (e.g. Fraunces, Cormorant,
  or Playfair) + a humanist sans for body (e.g. Inter or DM Sans)
- **Imagery:** large hero photos, generous padding, soft shadows, rounded
  corners (rounded-2xl), no harsh borders
- **Motion:** subtle fade-ins on scroll, no flashy animations
- **Mobile-first**, fully responsive

## Pages & Routes

### 1. Home (`/`)
- Full-bleed hero using the **interior shot** + tagline + two CTAs:
  "Reserve a Table" (scrolls to reservation form) and "View Menu"
- Short intro section about the café (all-day brunch + matcha bar)
- Featured menu highlights (3–4 items using the **provided food photos**)
- "Reserve a Table" inline form section (date, time, party size, name,
  email, phone, optional notes) — submits to /api/reserve
- Private events teaser block linking to /private-events
- Footer with hours, address, social, contact

### 2. Menu (`/menu`)
Single page with anchor navigation between categories. Use the data below
verbatim. Each category clearly separated with section headers in the serif font.
Use provided food photos inline within their corresponding sections (toast
photo in the toast section, matcha drink photo in the matcha section, etc.).

**Coffee**
- Espresso — 4.00
- Cappuccino — 5.70
- Latte macchiato — 5.70
- Milchkaffee — 4.80
- Americano — 4.20

**Iced Coffee**
- Iced latte — 6.00
- Iced Caramel latte — 7.20
- Iced Vanilla latte — 7.20
- Iced Cinnamon latte — 7.40

**Matcha**
- Iced matcha latte — 6.90
- Strawberry Kiss — 8.90
- Vanilla Dream — 8.90
- Mango Matcha — 8.90
- Cherry Vanilla — 9.90
- White Choco — 8.90
- Black Mulberry — 9.90
- Coco Cloud — 9.90

**Hojicha**
- Iced vanilla Hojicha — 7.90
- Coco Hojicha Cloud — 8.90

**Add-ons**
- Vanilla Cold Foam — +1 CHF
- Extra Shot — +1 CHF
- Extra Syrup — +1 CHF

**Smoothies**
- Blue Sky — 13.70 (mango, blueberry, banana, coconut, blue spirulina)
- Banana Protein Crush — 12.80 (peanut butter, vanilla, banana, protein powder)
- Hojicha Hug — 13.70 (hojicha powder, honey, dates, vanilla, banana, cinnamon)
- Aloha Collagen — 12.80 (strawberry, raspberry, mango, collagen powder,
  Greek yoghurt, coconut)

**Healthy Bowls**
- Yoghurt Granola Bowl — 8.60

**All Day Toast** (all on traditional Swiss Pane Maggie bread)
- Creamy Burrata — 17.60 (homemade guacamole, burrata, cherry tomatoes,
  balsamico, seed mix, chili flakes)
- Truffle Dream — 18.90 (homemade truffle cream cheese, mushrooms, parmesan)
- Pinkado — 16.50 (homemade beetroot hummus, avocado, feta, pomegranate,
  basilicum oil, seed mix)
- Smokey Salmon — 18.70 (cream cheese, smoked salmon, cucumber, basilicum
  oil, chickpeas)

Note: "Vegan alternative available — simply ask our staff."
Note: "Please notify us of any allergies before ordering."

### 3. Private Events (`/private-events`)
- Hero using the **interior shot** (or another atmospheric photo)
- Short pitch: rent the whole space for private events (birthdays, corporate,
  baby showers, brand activations, etc.)
- What's included (capacity, food & drink options, duration)
- Inquiry form: name, email, phone, preferred date, event type, expected
  guest count, message — submits to /api/private-events-inquiry
- "Price on request" line — no fixed price displayed

### 4. Contact & Location (`/contact`)
- Address, phone, email
- Opening hours table
- Embedded map (Google Maps iframe, address placeholder for now)
- Simple contact form (name, email, message) — submits to /api/contact

## Reservation Form Behavior
- Fields: date (date picker, min = today), time, party size (1–12),
  name, email, phone, optional message
- Client-side validation (required fields, valid email)
- On submit: POST to /api/reserve
- API route sends an email to a configured RESTAURANT_EMAIL env var with
  the reservation details
- Success state: friendly confirmation message ("We'll confirm your
  reservation by email shortly")
- Error state: friendly error + retry

Same pattern for private events inquiry form and contact form — three
separate API routes, three separate destination emails (configurable).

## Components to Build
- `<Nav />` — sticky, transparent over hero, solid beige on scroll
- `<Hero />` — reusable for home + private events
- `<MenuSection />` — category header + item list, optional image slot
- `<ReservationForm />`, `<PrivateEventForm />`, `<ContactForm />`
- `<Footer />` — hours, address, socials (Instagram placeholder), copyright

## Content Placeholders
For copy you don't have, use realistic café-appropriate placeholder text
and clearly mark TODOs in comments.

## Deliverables
- Full Next.js project, ready to `npm install && npm run dev`
- `.env.example` with all required env vars
- README with setup instructions, including how to configure the email
  provider and where to drop the provided image assets (e.g. `/public/images/`)
- Clean component structure, no inline styles, accessible markup
  (semantic HTML, alt text, aria where needed)

## Out of Scope
- CMS integration
- Multi-language (English only for v1, but structure code so i18n can be
  added later)
- Online ordering / payments
- User accounts