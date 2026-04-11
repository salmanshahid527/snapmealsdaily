function decodeNumericHtmlEntities(text: string): string {
  return text
    .replace(/&amp;#(\d{1,7});/g, "&#$1;")
    .replace(/&amp;#x([0-9a-f]{1,6});/gi, "&#x$1;")
    .replace(/&#(\d{1,7});/g, (_, dec) => {
      const n = Number.parseInt(dec, 10);
      if (!Number.isFinite(n) || n < 1 || n > 0x10ffff) return _;
      try {
        return String.fromCodePoint(n);
      } catch {
        return _;
      }
    })
    .replace(/&#x([0-9a-f]{1,6});/gi, (_, hex) => {
      const n = Number.parseInt(hex, 16);
      if (!Number.isFinite(n) || n < 1 || n > 0x10ffff) return _;
      try {
        return String.fromCodePoint(n);
      } catch {
        return _;
      }
    });
}

/**
 * Decode HTML entities
 */
export function decodeHtmlEntities(text: string | undefined): string {
  if (!text || typeof text !== "string") return "";

  const map: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#039;": "'",
    "\u2020": "\u2020",
    "\u2021": "\u2021",
    "\u2022": "\u2022",
    "\u2026": "\u2026",
    "\u2018": "\u2018",
    "\u2019": "\u2019",
    "\u201C": "\u201C",
    "\u201D": "\u201D",
    "\u2013": "\u2013",
    "\u2014": "\u2014",
  };
  const named = text.replace(/&[a-z]+;/gi, (entity) => map[entity] || entity);
  return decodeNumericHtmlEntities(named);
}

/**
 * Strip HTML tags from text
 */
export function stripHtml(html: string | undefined): string {
  if (!html || typeof html !== 'string') return '';
  return html.replace(/<[^>]*>/g, "");
}

/**
 * Rewrite WordPress URLs to site URLs in links
 */
export function rewriteWpUrlsToSiteUrl(html: string): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  if (!apiUrl || !siteUrl) return html;

  // Extract base domain from API URL
  const wpBase = new URL(apiUrl).origin;

  return html.replace(
    new RegExp(wpBase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
    siteUrl
  );
}

/**
 * Force HTTPS for all image src attributes
 */
export function forceHttpsForImgSrc(html: string): string {
  return html.replace(/src="http:\/\//gi, 'src="https://');
}

/**
 * Sanitize HTML for prose content
 * Remove scripts, iframes, forms, event handlers
 */
export function sanitizeHtmlForProse(html: string): string {
  // Remove script tags
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

  // Remove iframe, object, embed tags
  html = html.replace(/<(iframe|object|embed)[^>]*>.*?<\/\1>/gi, "");

  // Remove form tags
  html = html.replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, "");

  // Remove event handlers from tags
  html = html.replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, "");
  html = html.replace(/\s+on\w+\s*=\s*[^\s>]*/gi, "");

  return html;
}

/**
 * Add lazy loading to prose images
 */
export function addLazyLoadingToProseImages(html: string): string {
  const lines = html.split("\n");
  let foundFirstImage = false;

  return lines
    .map((line) => {
      if (line.includes("<img")) {
        if (!foundFirstImage) {
          foundFirstImage = true;
          return line.replace(/<img/i, '<img loading="eager" decoding="async"');
        } else {
          return line.replace(/<img/i, '<img loading="lazy" decoding="async"');
        }
      }
      return line;
    })
    .join("\n");
}

/**
 * Process post body through full pipeline
 */
export function processPostBody(html: string | undefined): string | undefined {
  if (!html) return undefined;
  let processed = html;
  processed = sanitizeHtmlForProse(processed);
  processed = rewriteWpUrlsToSiteUrl(processed);
  processed = forceHttpsForImgSrc(processed);
  processed = addLazyLoadingToProseImages(processed);
  return processed;
}

/**
 * Remove featured image from body to avoid duplication
 */
export function removeFeaturedImageFromBody(
  html: string,
  featuredImageUrl?: string
): string {
  if (!featuredImageUrl) return html;

  // Remove first img tag that matches featured image URL
  const regex = new RegExp(
    `<img[^>]*src=["']${featuredImageUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'][^>]*>\\s*`,
    "i"
  );
  return html.replace(regex, "");
}

/**
 * Extract FAQ items from HTML
 * Looks for pattern: <h3>Question</h3><p>Answer</p>
 */
export function extractFAQFromHtml(html: string): Array<{ question: string; answer: string }> {
  const faqItems: Array<{ question: string; answer: string }> = [];

  // Match h3 followed by p tags
  const pattern = /<h3[^>]*>(.*?)<\/h3>\s*<p[^>]*>(.*?)<\/p>/gi;
  let match;

  while ((match = pattern.exec(html)) !== null) {
    const question = stripHtml(match[1]).trim();
    const answer = stripHtml(match[2]).trim();

    if (question && answer) {
      faqItems.push({ question, answer });
    }
  }

  return faqItems;
}
