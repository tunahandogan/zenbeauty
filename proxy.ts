import { NextResponse, type NextRequest } from "next/server";
import { serviceSlugs } from "@/content/service-slugs";

const known = new Set<string>(serviceSlugs);

/**
 * Bilinmeyen hizmet adresleri gerçek 404 durum koduyla dönsün.
 * (Cache Components açıkken sayfa içindeki notFound() akış başladıktan sonra çalışır ve 200 kalır.)
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !known.has(decodeURIComponent(slug))) {
    return NextResponse.rewrite(new URL("/_bulunamadi", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: "/hizmetler/:slug" };
