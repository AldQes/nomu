import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface SiteContent {
  name: string;
  address: { street: string; country: string };
  phone: string;
  phoneHref: string;
  email: string;
  instagram: { handle: string; url: string };
  hours: { day: string; hours: string }[];
  mapEmbedUrl: string;
}

export interface HeroContent {
  image: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
}

export interface HomeContent {
  hero: HeroContent & { primaryCtaText: string; secondaryCtaText: string };
  intro: { heading: string; body: string };
  featured: {
    heading: string;
    subheading: string;
    ctaText: string;
    items: { name: string; description: string; image: string; price: string }[];
  };
  reservation: { heading: string; subheading: string };
  eventsTeaser: {
    image: string;
    imageAlt: string;
    heading: string;
    body: string;
    ctaText: string;
  };
}

export interface MenuPageContent {
  heading: string;
  subheading: string;
  notes: string[];
}

export interface ContactPageContent {
  heading: string;
  subheading: string;
  hoursHeading: string;
  mapHeading: string;
  formHeading: string;
  formSubheading: string;
}

export interface PrivateEventsContent {
  hero: HeroContent;
  metaDescription: string;
  pitch: {
    heading: string;
    body: string;
    capacityNote: string;
    extraNote: string;
    eventTypes: { title: string; description: string }[];
  };
  includes: {
    heading: string;
    items: { title: string; description: string }[];
  };
  pricing: { label: string; body: string };
  inquiry: { heading: string; body: string };
}

export interface MenuItem {
  name: string;
  price: number;
  description?: string;
  isAddOn?: boolean;
  priceNote?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  order: number;
  description?: string;
  image?: string;
  items: MenuItem[];
}

function readJson<T>(relPath: string): T {
  const fullPath = path.join(CONTENT_DIR, relPath);
  return JSON.parse(fs.readFileSync(fullPath, "utf-8")) as T;
}

export const getSite = (): SiteContent => readJson<SiteContent>("site.json");
export const getHome = (): HomeContent => readJson<HomeContent>("pages/home.json");
export const getMenuPage = (): MenuPageContent => readJson<MenuPageContent>("pages/menu.json");
export const getContactPage = (): ContactPageContent => readJson<ContactPageContent>("pages/contact.json");
export const getPrivateEvents = (): PrivateEventsContent => readJson<PrivateEventsContent>("pages/private-events.json");

export function getMenu(): MenuCategory[] {
  const dir = path.join(CONTENT_DIR, "menu");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  const categories = files.map((f) =>
    JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")) as MenuCategory
  );
  return categories.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}
