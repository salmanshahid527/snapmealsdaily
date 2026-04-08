export const SITE_NAME = "SnapMealsDaily";
export const SITE_DESCRIPTION =
  "Discover delicious, easy-to-make recipes and food inspiration — weeknight dinners, brunches, desserts, and Pinterest-ready ideas.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://snapmealsdaily.com";

export const DEFAULT_OG_IMAGE =
  "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200&h=630&fit=crop&q=80";
export const LOGO_PATH = "/logo.svg";
export const FAVICON_PATH = "/favicon.svg";

export const POSTS_PER_PAGE = 12;
export const POSTS_PER_CATEGORY_HOME = 4;

export const CATEGORIES_HOME = [
  "breakfast",
  "lunch",
  "dinner",
  "desserts",
  "quick-meals",
];

export const NAV_EXCLUDED_PAGE_SLUGS: readonly string[] = [
  "blog",
  "sample-page",
  "hello-world",
  "recipes",
];

export const SLUG_TO_PATH: Record<string, string> = {
  about: "/about",
  "about-us": "/about",
  contact: "/contact",
  "contact-us": "/contact",
  "privacy-policy": "/privacy",
  "privacy-policy-2": "/privacy",
  recipes: "/recipes",
  "our-recipes": "/recipes",
};

export const SLUG_FALLBACKS: Record<string, string[]> = {
  about: ["about-us"],
  contact: ["contact-us"],
  privacy: ["privacy-policy", "privacy-policy-2"],
  recipes: ["our-recipes"],
};

export const SOCIAL = {
  pinterest: "https://www.pinterest.com/snapmealsdaily",
  instagram: "https://www.instagram.com/snapmealsdaily",
  facebook: "https://www.facebook.com/snapmealsdaily",
};
