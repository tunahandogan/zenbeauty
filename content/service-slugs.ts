/**
 * Hizmet detay sayfalarının adresleri. Bağımlılığı olmayan bu küçük dosya hem içerikte (content/site.ts)
 * hem de proxy.ts içinde kullanılır; yeni hizmet eklerken önce buraya slug eklenir.
 */
export const serviceSlugs = [
  "kesim-fon",
  "renk-ombre",
  "keratin-bakim",
  "sac-kaynak",
  "gelin-ozel-gun",
  "makyaj",
  "tirnak",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];
