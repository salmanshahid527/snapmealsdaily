// Site Configuration
export const SITE_NAME = "SnapMealsDaily";
export const SITE_DESCRIPTION = "Discover delicious, easy-to-make recipes and food inspiration daily. Pinterest-friendly food blogging with beautiful photography and step-by-step guides.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://snapmealsdaily.com";
export const DEFAULT_OG_IMAGE = "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200&h=630&fit=crop";
export const LOGO_PATH = "/logo.svg";
export const FAVICON_PATH = "/favicon.svg";

// Pagination
export const POSTS_PER_PAGE = 12;
export const POSTS_PER_CATEGORY_HOME = 4;

// Featured Categories on Homepage
export const CATEGORIES_HOME = [
  "breakfast",
  "lunch",
  "dinner",
  "desserts",
  "quick-meals",
];

// Navigation - Pages to exclude from menu
export const NAV_EXCLUDED_PAGE_SLUGS = [
  "blog",
  "sample-page",
  "hello-world",
  "recipes",
];

// Slug Mapping - Convert WP slug to app route
export const SLUG_TO_PATH: Record<string, string> = {
  about: "/about",
  "about-us": "/about",
  contact: "/contact",
  "contact-us": "/contact",
  recipes: "/recipes",
  "our-recipes": "/recipes",
};

// Fallback slugs - try these if primary slug not found
export const SLUG_FALLBACKS: Record<string, string[]> = {
  about: ["about-us"],
  contact: ["contact-us"],
  recipes: ["our-recipes"],
};

// Social Media
export const SOCIAL = {
  pinterest: "https://www.pinterest.com/snapmealsdaily",
  instagram: "https://www.instagram.com/snapmealsdaily",
  facebook: "https://www.facebook.com/snapmealsdaily",
  tiktok: "https://www.tiktok.com/@snapmealsdaily",
};

// Color Scheme - Food/Pinterest inspired
export const COLORS = {
  primary: "#FF6B6B",      // Warm red - appetizing
  secondary: "#FFA07A",    // Light salmon - food-friendly
  accent: "#4ECDC4",       // Teal - complementary
  success: "#95E1D3",      // Mint - fresh
  warning: "#FFB84D",      // Amber - warm
  danger: "#FF6B6B",       // Red
  light: "#F8F9FA",        // Off-white
  dark: "#1A1A1A",         // Dark charcoal
  muted: "#6C757D",        // Gray
};

// Category Colors - for visual distinction
export const CATEGORY_COLORS: Record<string, string> = {
  breakfast: "#FF6B6B",
  lunch: "#FFA07A",
  dinner: "#4ECDC4",
  desserts: "#FFB84D",
  "quick-meals": "#95E1D3",
  snacks: "#B19CD9",
  drinks: "#FFB6C1",
  vegetarian: "#90EE90",
  vegan: "#98D98E",
};
