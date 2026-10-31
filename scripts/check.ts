/**
 * Uçtan uca kontroller (Playwright + yerel Chrome). Çalışan bir sunucuya karşı koşar:
 *
 *   npm run build && npm start        (ayrı terminalde)
 *   npm run check -- --base http://localhost:3000
 *
 * Kontrol edilenler: bütün rotalar 360/390/768/1440 px'de yatay taşma, konsol/hidrasyon hataları,
 * noindex, iç bağlantıların durumu, 44 px dokunma hedefleri, mobil menü (Escape, odak, kaydırma kilidi),
 * galeri filtresi + lightbox (klavye), seçili kareler şeridi, randevu akışı (geri/ileri korunumu, ön seçim, kopyalama),
 * doğrudan hizmet detay URL'leri ve 404.
 */
import { existsSync } from "node:fs";
import { parseArgs } from "node:util";
import { chromium, type Browser, type Page } from "playwright-core";

const CHROME = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
].find((p) => p && existsSync(p));

const { values } = parseArgs({ options: { base: { type: "string", default: "http://localhost:3000" } } });
const BASE = values.base!;

// İçerik dosyası görsel importları içerdiği için betik onu yüklemez; hizmetler /hizmetler sayfasından okunur
let services: { slug: string; title: string }[] = [];
let routes: string[] = [];
const widths = [360, 390, 768, 1440];

let failures = 0;
const ok = (msg: string) => console.log(`  ✓ ${msg}`);
const fail = (msg: string) => {
  failures++;
  console.log(`  ✗ ${msg}`);
};
const expect = (cond: unknown, msg: string) => (cond ? ok(msg) : fail(msg));

async function newPage(browser: Browser, width: number, opts: Parameters<Browser["newContext"]>[0] = {}) {
  const mobile = width < 768;
  const ctx = await browser.newContext({ viewport: { width, height: mobile ? 800 : 900 }, isMobile: mobile, hasTouch: mobile, ...opts });
  const page = await ctx.newPage();
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error" || /hydrat/i.test(m.text())) errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(e.message));
  return { ctx, page, errors };
}

async function layoutChecks(browser: Browser) {
  console.log("\nYerleşim, konsol, noindex");
  const internal = new Set<string>();
  for (const width of widths) {
    const { ctx, page, errors } = await newPage(browser, width);
    for (const route of routes) {
      await page.goto(BASE + route, { waitUntil: "networkidle" });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 0) fail(`${width}px ${route}: yatay taşma ${overflow}px`);
      const robots = await page.getAttribute('meta[name="robots"]', "content");
      if (!robots?.includes("noindex")) fail(`${route}: noindex meta yok`);
      const h1 = await page.locator("h1:visible").count();
      if (h1 !== 1) fail(`${width}px ${route}: ${h1} adet h1`);
      if (width === 390) {
        for (const href of await page.$$eval("a[href^='/']", (as) => as.map((a) => a.getAttribute("href")!))) internal.add(href);
        const small = await page.$$eval("header a, header button, main a, main button, footer a, main label", (els) =>
          els
            .filter((el) => {
              const r = el.getBoundingClientRect();
              const style = getComputedStyle(el);
              if (r.width === 0 || style.visibility === "hidden" || el.closest(".sr-only")) return false;
              return r.height < 44 || r.width < 44;
            })
            .map((el) => `${el.tagName.toLowerCase()} "${(el.textContent ?? "").trim().slice(0, 40)}" ${Math.round(el.getBoundingClientRect().width)}×${Math.round(el.getBoundingClientRect().height)}`),
        );
        if (small.length) fail(`390px ${route}: 44px altı dokunma hedefi → ${small.join("; ")}`);
      }
    }
    if (errors.length) fail(`${width}px: konsol hataları → ${[...new Set(errors)].join(" | ")}`);
    else ok(`${width}px: ${routes.length} rota, taşma/konsol/noindex/h1 kontrolü`);
    await ctx.close();
  }

  console.log("\nİç bağlantılar");
  for (const href of internal) {
    const res = await fetch(BASE + href);
    if (res.status !== 200) fail(`${href} → ${res.status}`);
  }
  ok(`${internal.size} farklı iç bağlantı denendi`);
  const missing = await fetch(BASE + "/hizmetler/olmayan-hizmet");
  expect(missing.status === 404, `bilinmeyen hizmet URL'si 404 döner (${missing.status})`);
  const robotsTxt = await (await fetch(BASE + "/robots.txt")).text();
  expect(/Disallow: \/\s*$/m.test(robotsTxt), "robots.txt her şeyi engelliyor");
  const header = (await fetch(BASE + "/")).headers.get("x-robots-tag");
  expect(header?.includes("noindex"), `X-Robots-Tag başlığı: ${header}`);
}

async function menuCheck(browser: Browser) {
  console.log("\nMobil menü (390px)");
  const { ctx, page, errors } = await newPage(browser, 390);
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const trigger = page.getByRole("button", { name: "Menüyü aç" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Menü" });
  await dialog.waitFor();
  ok("menü açıldı (role=dialog)");
  const locked = await page.evaluate(() => getComputedStyle(document.body).overflow === "hidden" || document.body.hasAttribute("data-scroll-locked"));
  expect(locked, "arka plan kaydırması kilitli");
  const focusInside = await page.evaluate(() => !!document.activeElement?.closest("[role=dialog]"));
  expect(focusInside, "odak menünün içinde");
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "detached" });
  ok("Escape menüyü kapattı");
  const focusBack = await page.evaluate(() => document.activeElement?.getAttribute("aria-label"));
  expect(focusBack === "Menüyü aç", "odak tetikleyiciye döndü");
  await trigger.click();
  await dialog.getByRole("link", { name: /Portfolyo/ }).click();
  await page.waitForURL("**/galeri");
  await dialog.waitFor({ state: "detached" });
  ok("menüden bağlantı → /galeri, menü kapandı");
  expect(!errors.length, `konsol temiz ${errors.join(" | ")}`);
  await ctx.close();
}

async function galleryCheck(browser: Browser) {
  for (const width of [390, 1440]) {
    console.log(`\nGaleri (${width}px)`);
    const { ctx, page, errors } = await newPage(browser, width);
    await page.goto(BASE + "/galeri", { waitUntil: "networkidle" });
    const items = page.locator("main ul li figure");
    const badge = async (name: RegExp) => Number(await page.getByRole("button", { name }).locator("span").textContent());
    const all = await badge(/^Tümü/);
    expect((await items.count()) === all, `tümü: ${await items.count()} / ${all}`);
    const nails = await badge(/^Tırnak/);
    await page.getByRole("button", { name: /^Tırnak/ }).click();
    await page.waitForTimeout(300);
    expect((await items.count()) === nails, `Tırnak filtresi: ${await items.count()} / ${nails}`);
    expect((await page.getByRole("button", { name: /^Tırnak/ }).getAttribute("aria-pressed")) === "true", "aria-pressed güncellendi");
    await page.locator("main ul li button").first().click();
    await page.locator(".yarl__root").waitFor();
    ok("lightbox açıldı");
    const counter = () => page.locator(".yarl__counter").textContent();
    const before = await counter();
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(500);
    expect((await counter()) !== before, `→ tuşu sonraki fotoğraf (${before} → ${await counter()})`);
    await page.keyboard.press("Escape");
    await page.locator(".yarl__root").waitFor({ state: "detached" });
    ok("Escape lightbox'ı kapattı");
    expect(!errors.length, `konsol temiz ${errors.join(" | ")}`);
    await ctx.close();
  }
}

async function carouselCheck(browser: Browser) {
  console.log("\nSeçili kareler (Embla)");
  const { ctx, page } = await newPage(browser, 390);
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const track = page.locator('[aria-roledescription="carousel"] ul').first();
  await track.scrollIntoViewIfNeeded();
  const t0 = await track.evaluate((el) => getComputedStyle(el).transform);
  await page.getByRole("button", { name: "Sonraki kareler" }).click();
  await page.waitForTimeout(700);
  const t1 = await track.evaluate((el) => getComputedStyle(el).transform);
  expect(t0 !== t1, "sonraki düğmesi şeridi kaydırdı");
  await ctx.close();
}

async function fill(page: Page) {
  await page.getByText("Zaman tercihine geç").waitFor();
  expect(await page.getByRole("button", { name: /Zaman tercihine geç/ }).isDisabled(), "hizmet seçilmeden devam edilemiyor");
  await page.locator("label", { hasText: "Kesim ve fön" }).click();
  await page.getByRole("button", { name: /Zaman tercihine geç/ }).click();
  await page.locator("label", { hasText: "Hafta sonu" }).click();
  await page.locator("label", { hasText: "Akşamüstü" }).click();
  await page.getByLabel(/^Not/).fill("Uzunluğu korumak istiyorum.");
  await page.getByRole("button", { name: /Özeti gör/ }).click();
}

async function bookingCheck(browser: Browser) {
  for (const width of [390, 1440]) {
    console.log(`\nRandevu akışı (${width}px)`);
    const { ctx, page, errors } = await newPage(browser, width, { permissions: ["clipboard-read", "clipboard-write"] });
    await page.goto(BASE + "/randevu", { waitUntil: "networkidle" });
    await fill(page);
    const text = await page.locator("#talep-metni").inputValue();
    expect(text.includes("Kesim ve fön") && text.includes("Hafta sonu") && text.includes("Akşamüstü") && text.includes("Uzunluğu korumak"), "özet metni seçimleri içeriyor");
    expect(await page.getByText("Randevu, salonun WhatsApp'tan teyidiyle kesinleşir.").first().isVisible(), "teyit uyarısı görünür");
    const body = (await page.textContent("main")) ?? "";
    expect(!/gönderildi|oluşturuldu|onaylandı/i.test(body), "sahte başarı mesajı yok");
    expect((await page.locator('a[href^="https://wa.me/905326442288"]').count()) > 0, "WhatsApp bağlantısı wa.me/905326442288");
    expect((await page.locator('a[href="tel:+904422372745"]').count()) > 0, "salon hattı (tel:+905326442288) özette");

    await page.getByRole("button", { name: /Talep metnini kopyala/ }).click();
    await page.getByText("Metin panoya kopyalandı").waitFor();
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    // Windows panosu satır sonlarını \r\n'e çevirir
    expect(clip.replace(/\r\n/g, "\n") === text, "panodaki metin özetle aynı");

    await page.getByRole("button", { name: "Geri" }).last().click();
    expect(await page.locator("label", { hasText: "Akşamüstü" }).locator("input").isChecked(), "geri: zaman tercihi korundu");
    expect((await page.getByLabel(/^Not/).inputValue()) === "Uzunluğu korumak istiyorum.", "geri: not korundu");
    await page.getByRole("button", { name: "Geri" }).click();
    expect(await page.locator("label", { hasText: "Kesim ve fön" }).locator("input").isChecked(), "geri: hizmet korundu");
    await page.getByRole("button", { name: /Zaman tercihine geç/ }).click();
    await page.getByRole("button", { name: /Özeti gör/ }).click();
    ok("ileri: özete yeniden ulaşıldı");

    await page.goto(BASE + "/hizmetler", { waitUntil: "networkidle" });
    await page.goto(BASE + "/randevu", { waitUntil: "networkidle" });
    await page.locator("#talep-metni").waitFor();
    ok("sayfadan çıkıp dönünce özet adımı ve seçimler korundu");

    const pre = await newPage(browser, width);
    await pre.page.goto(BASE + "/randevu?hizmet=gelin-ozel-gun", { waitUntil: "networkidle" });
    await pre.page.getByText("Zaman tercihine geç").waitFor();
    expect(await pre.page.locator("label", { hasText: "Gelin ve özel gün" }).locator("input").isChecked(), "?hizmet= ön seçimi çalışıyor");
    await pre.ctx.close();

    expect(!errors.length, `konsol temiz ${errors.join(" | ")}`);
    await ctx.close();
  }
}

async function bolumCheck(browser: Browser) {
  for (const width of [360, 1440]) {
    console.log(`
Bölüm seçimi (${width}px)`);
    const { ctx, page, errors } = await newPage(browser, width);
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    expect(await page.locator("#secim-baslik").isVisible(), "ilk ziyarette seçim ekranı görünür");
    expect(!(await page.locator("[data-hero]").first().isVisible()), "seçim yapılmadan bölüm hero'su gizli");
    await page.locator("a[aria-label^='Saç bölümünü seç']").click();
    await page.locator("[data-hero=kuafor]").waitFor({ state: "visible" });
    expect((await page.getAttribute("html", "data-bolum")) === "kuafor", "html data-bolum=kuafor");
    expect(await page.evaluate(() => document.activeElement?.id === "hero-kuafor"), "odak kuaför başlığına taşındı");
    expect(!(await page.locator("#secim-baslik").isVisible()), "seçim ekranı gizlendi");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow <= 0, `kuaför ana sayfada yatay taşma yok (${overflow})`);
    await page.waitForTimeout(600);
    const svc = await page.locator("#hizmetler-baslik").textContent();
    expect(svc?.includes("Saç için"), `hizmet dizini kuaföre göre: "${svc}"`);

    // Yeniden yükleme: seçim hatırlanır, seçim ekranı hiç görünmez (ilk boyamadan önce uygulanır)
    await page.goto(BASE + "/", { waitUntil: "commit" });
    await page.waitForSelector("body");
    const firstPaint = await page.evaluate(() => document.documentElement.dataset.bolum);
    expect(firstPaint === "kuafor", "yeniden yüklemede seçim ilk boyamadan önce uygulandı");
    await page.waitForLoadState("networkidle");
    expect(!(await page.locator("#secim-baslik").isVisible()), "yeniden yüklemede seçim ekranı görünmüyor");

    // Bölüm değiştir: masaüstünde üst menü, mobilde menü
    if (width >= 1024) {
      await page.locator("header").getByRole("button", { name: "Gelin" }).click();
    } else {
      await page.getByRole("button", { name: "Menüyü aç" }).click();
      await page.getByRole("dialog").getByRole("button", { name: "Gelin" }).click();
      await page.keyboard.press("Escape");
    }
    await page.locator("[data-hero=guzellik]").waitFor({ state: "visible" });
    expect(!(await page.locator("[data-hero=kuafor]").isVisible()), "anahtar: gelin hero'su görünür, kuaför gizli");
    await page.waitForTimeout(600);
    const svc2 = await page.locator("#hizmetler-baslik").textContent();
    expect(svc2?.includes("Gelin ve özel gün"), `hizmet dizini Gelin bölümüne göre: "${svc2}"`);

    await page.goto(BASE + "/hizmetler", { waitUntil: "networkidle" });
    const [yS, yG] = await Promise.all([page.locator("#sac").boundingBox(), page.locator("#guzellik").boundingBox()]);
    expect(yG!.y < yS!.y, "/hizmetler: güzellik bölümü önce");
    await page.goto(BASE + "/galeri", { waitUntil: "networkidle" });
    const second = await page.locator("[aria-label='Kategoriye göre süz'] button").nth(1).textContent();
    expect(second?.startsWith("Gelin") || second?.startsWith("Tırnak"), `/galeri: gelin filtreleri önce (${second})`);
    await page.goto(BASE + "/randevu", { waitUntil: "networkidle" });
    const legend = await page.locator("fieldset legend").first().textContent();
    expect(legend?.startsWith("Gelin"), `/randevu: gelin hizmetleri önce (${legend})`);
    await page.goto(BASE + "/iletisim", { waitUntil: "networkidle" });
    const firstPhone = await page.locator("main ul.grid li").evaluateAll((lis) =>
      lis.map((li) => ({ y: li.getBoundingClientRect().y, t: li.textContent ?? "" })).sort((a, b) => a.y - b.y)[0].t,
    );
    expect(firstPhone.includes("0442 237 27 45"), "/iletisim: salon hattı görünür");

    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Bölüm seçimini sıfırla" }).click();
    await page.locator("#secim-baslik").waitFor({ state: "visible" });
    expect((await page.getAttribute("html", "data-bolum")) === null, "sıfırlama: seçim ekranına dönüldü");
    expect(!errors.length, `konsol temiz ${errors.join(" | ")}`);
    await ctx.close();
  }
}

async function detailCheck(browser: Browser) {
  console.log("\nDoğrudan hizmet detay URL'leri");
  const { ctx, page } = await newPage(browser, 390);
  for (const s of services) {
    await page.goto(`${BASE}/hizmetler/${s.slug}`, { waitUntil: "domcontentloaded" });
    const h1 = await page.locator("h1").textContent();
    if (h1 !== s.title) fail(`/hizmetler/${s.slug}: h1 "${h1}"`);
    const cta = await page.locator(`a[href="/randevu?hizmet=${s.slug}"]`).count();
    if (!cta) fail(`/hizmetler/${s.slug}: randevu bağlantısı yok`);
  }
  ok(`${services.length} detay sayfası doğrudan açıldı, h1 ve randevu bağlantısı var`);
  await ctx.close();
}

async function animasyonCheck(browser: Browser) {
  console.log("\nZorunlu animasyon URL'si (reducedMotion: reduce altında)");
  const { ctx, page, errors } = await newPage(browser, 1440, { reducedMotion: "reduce" });
  await page.goto(`${BASE}/animasyon`, { waitUntil: "networkidle" });
  expect((await page.getAttribute("html", "data-hareket")) === "acik", "/animasyon → html[data-hareket=acik]");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow <= 0, `/animasyon yatay taşma yok (${overflow}px)`);
  const animDuration = await page.locator("#secim-baslik").evaluate((el) => getComputedStyle(el).animationDuration);
  expect(animDuration !== "0.00001s" && parseFloat(animDuration) > 0.1, `OS animasyonları kapalıyken bile CSS animasyonu aktif (${animDuration})`);

  await page.getByRole("button", { name: "Saç Hero" }).click();
  await page.locator("[data-hero=kuafor]").waitFor({ state: "visible" });
  expect((await page.getAttribute("html", "data-bolum")) === "kuafor", "stüdyo çubuğundan Saç Hero seçildi");

  await page.goto(`${BASE}/hizmetler?animasyon=1`, { waitUntil: "networkidle" });
  expect((await page.getAttribute("html", "data-hareket")) === "acik", "?animasyon=1 → html[data-hareket=acik]");
  expect(await page.getByRole("complementary", { name: "Animasyon kontrol paneli" }).isVisible(), "yüzen animasyon kontrol paneli görünür");

  await page.goto(`${BASE}/?animasyon=0`, { waitUntil: "networkidle" });
  expect((await page.getAttribute("html", "data-hareket")) === null, "?animasyon=0 → zorunlu mod kapatıldı");
  expect(!errors.length, `konsol temiz ${errors.join(" | ")}`);
  await ctx.close();
}

async function main() {
  if (!CHROME) throw new Error("Chrome bulunamadı. CHROME_PATH ile yolunu verin.");
  const browser = await chromium.launch({ executablePath: CHROME });
  const list = await browser.newPage();
  await list.goto(BASE + "/hizmetler", { waitUntil: "domcontentloaded" });
  services = await list.$$eval("main article h3", (hs) =>
    hs.map((h) => ({ title: h.textContent!.trim(), slug: h.closest("article")!.querySelector("a[href^='/hizmetler/']")!.getAttribute("href")!.split("/")[2] })),
  );
  await list.close();
  routes = ["/", "/hizmetler", ...services.map((s) => `/hizmetler/${s.slug}`), "/fiyatlar", "/galeri", "/salon", "/iletisim", "/randevu"];
  console.log(`${services.length} hizmet bulundu: ${services.map((s) => s.slug).join(", ")}`);
  await layoutChecks(browser);
  await menuCheck(browser);
  await galleryCheck(browser);
  await carouselCheck(browser);
  await bookingCheck(browser);
  await bolumCheck(browser);
  await detailCheck(browser);
  await animasyonCheck(browser);
  await browser.close();
  console.log(failures ? `\n${failures} kontrol başarısız.` : "\nBütün kontroller geçti.");
  process.exit(failures ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

