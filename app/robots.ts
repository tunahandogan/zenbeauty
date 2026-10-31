import type { MetadataRoute } from "next";

// Konsept demo: işletme onayı gelene kadar tüm tarayıcılara kapalı
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
