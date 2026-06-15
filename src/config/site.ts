export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "The Bhosale Media",
  description:
    "The Bhosale Media helps ambitious businesses scale with performance marketing, brand systems, content engines, and digital experiences.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
} as const;
