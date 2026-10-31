import { business } from "@/content/site";

const PLACEHOLDER = /\[DOLDURULACAK/;

export function JsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const phone = business.phones[0];
  const hoursKnown = !business.hours.some((h) => PLACEHOLDER.test(h.time));

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: business.legalName,
    alternateName: business.displayName,
    url: siteUrl,
    telephone: phone?.e164,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
    sameAs: [business.instagram.url],
    hasMap: business.mall.sourceUrl,
  };
  // openingHours yalnızca doğrulanmış saatler varsa eklenir (şu an yer tutucu). aggregateRating bilerek yok.
  if (hoursKnown) data.openingHours = business.hours.map((h) => `${h.days} ${h.time}`);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
