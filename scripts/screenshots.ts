/**
 * Ekran görüntüleri: screenshots/ altına
 *   <sayfa>-<genişlik>-ilk-ekran.png  → ilk açılan ekran (animasyonlar açık)
 *   <sayfa>-<genişlik>-tam.png        → tam sayfa ("hareketi azalt" modunda: kaydırmayla açılan öğeler son hâlinde)
 *   ana-sayfa-secim-gecisi-<g>.png    → giriş seçiminde "Saç" paneli genişlerken
 *   ana-sayfa-<bölüm>-<g>-ilk-ekran.png → saç / gelin seçiliyken ilk ekran
 *
 *   npm run build && npm start        (ayrı terminalde)
 *   npm run screenshots -- --base http://localhost:3000
 */
import { existsSync, mkdirSync } from "node:fs";
import { parseArgs } from "node:util";
import { chromium, type Page } from "playwright-core";

const CHROME = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
].find((p) => p && existsSync(p));

const { values } = parseArgs({
  options: {
    base: { type: "string", default: "http://localhost:3000" },
    out: { type: "string", default: "screenshots" },
    pages: { type: "string", default: "/,/randevu" },
  },
});

const viewports = [
  { w: 390, h: 844, mobile: true },
  { w: 1440, h: 900, mobile: false },
] as const;

async function settle(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState("networkidle");
}

const slug = (path: string) => (path === "/" ? "ana-sayfa" : path.replace(/^\//, "").replaceAll("/", "-"));

async function main() {
  if (!CHROME) throw new Error("Chrome bulunamadı. CHROME_PATH ile yolunu verin.");
  mkdirSync(values.out!, { recursive: true });
  const browser = await chromium.launch({ executablePath: CHROME });

  for (const path of values.pages!.split(",")) {
    for (const { w, h, mobile } of viewports) {
      const name = `${values.out}/${slug(path)}-${w}`;

      const live = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
      const p1 = await live.newPage();
      await p1.goto(values.base + path, { waitUntil: "networkidle" });
      await settle(p1);
      await p1.waitForTimeout(1500);
      await p1.screenshot({ path: `${name}-ilk-ekran.png` });
      await live.close();

      // Tam sayfa 1x: 2x'te uzun sayfa Chrome'un 16384 px görüntü sınırını aşabilir
      const still = await browser.newContext({ viewport: { width: w, height: h }, isMobile: mobile, hasTouch: mobile, reducedMotion: "reduce" });
      const p2 = await still.newPage();
      await p2.goto(values.base + path, { waitUntil: "networkidle" });
      await settle(p2);
      // tembel yüklenen görseller için sona kadar kaydır
      await p2.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 80));
        }
        window.scrollTo(0, 0);
      });
      await settle(p2);
      await p2.screenshot({ path: `${name}-tam.png`, fullPage: true });
      await still.close();
      console.log("✓", name);

      // Ana sayfa: giriş seçiminin animasyon ortası ve iki bölümün ilk ekranı
      if (path === "/") {
        const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
        const p = await ctx.newPage();
        await p.goto(values.base + path, { waitUntil: "networkidle" });
        await settle(p);
        await p.waitForTimeout(1500);
        await p.locator("a[aria-label^='Saç bölümünü seç']").click();
        await p.waitForTimeout(380);
        await p.screenshot({ path: `${values.out}/ana-sayfa-secim-gecisi-${w}.png` });
        for (const bolum of ["kuafor", "guzellik"]) {
          await p.evaluate((b) => localStorage.setItem("salon-bolum", b), bolum);
          await p.goto(values.base + path, { waitUntil: "networkidle" });
          await settle(p);
          await p.waitForTimeout(1500);
          await p.screenshot({ path: `${values.out}/ana-sayfa-${bolum}-${w}-ilk-ekran.png` });
        }
        await ctx.close();
        console.log("✓", `ana sayfa bölüm varyantları ${w}`);
      }
    }
  }
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
