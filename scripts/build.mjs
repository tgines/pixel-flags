// Generates flags.json (a machine-readable manifest) and docs/index.html (the
// browsable gallery) from two sources of truth:
//   1. The flag files on disk in svg/ (the slugs)
//   2. The A–Z list in README.md (the canonical names + ISO codes)
//
// Run with `npm run build`. It validates that every README entry has all three
// formats on disk and vice versa, so the manifest, README, and gallery can
// never drift apart. Exits non-zero on any mismatch (handy for CI).

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));

const OWNER_REPO = "tgines/pixel-flags";
// Track the default branch so every flag (including ones added after the last
// release tag) resolves. Consumers who want an immutable URL can swap @main for
// a version tag like @1.0.0.
const CDN = `https://cdn.jsdelivr.net/gh/${OWNER_REPO}@main`;
const SITE = "https://tgines.github.io/pixel-flags/"; // GitHub Pages URL
const GOOGLE_SITE_VERIFICATION = "1z257rJFHBxkFQ1FmKPRbTk9BGO-48UB9987QR_ZY-U";

// --- 1. Parse the A–Z list out of the README -------------------------------
const readme = readFileSync(join(root, "README.md"), "utf8");
const block = readme.split("</summary>")[1]?.split("</details>")[0];
if (!block) throw new Error("Could not find the A–Z list in README.md");

// Each entry looks like  Name `code`  separated by commas. `—` means no code.
const nameByCode = new Map(); // code -> name  (code may be null for Mars)
let marsName = null;
for (const token of block.replace(/\s+/g, " ").split(", ")) {
  const m = token.trim().match(/^(.+?)\s+`(.+)`$/);
  if (!m) continue;
  const [, name, code] = m;
  if (code === "—") marsName = name.trim();
  else nameByCode.set(code, name.trim());
}
const codes = [...nameByCode.keys()];

// --- 2. Walk svg/ and pair each file to its code + name --------------------
const stems = readdirSync(join(root, "svg"))
  .filter((f) => f.endsWith(".svg"))
  .map((f) => f.replace(/\.svg$/, ""));

const errors = [];
const flags = [];

for (const slug of stems) {
  let code, name;
  if (slug === "mars") {
    code = null;
    name = marsName ?? "Mars";
  } else {
    // Longest matching code prefix (so `gb-eng` wins over `gb`).
    const match = codes
      .filter((c) => slug === c || slug.startsWith(c + "-"))
      .sort((a, b) => b.length - a.length)[0];
    if (!match) {
      errors.push(`No README entry matches file "svg/${slug}.svg"`);
      continue;
    }
    code = match;
    name = nameByCode.get(match);
  }

  const entry = {
    code,
    name,
    slug,
    svg: `svg/${slug}.svg`,
    png: `png/${slug}.png`,
    png2x: `png-2x/${slug}.png`,
  };

  for (const [fmt, p] of [["svg", entry.svg], ["png", entry.png], ["png-2x", entry.png2x]]) {
    if (!existsSync(join(root, p))) errors.push(`${name}: missing ${fmt} (${p})`);
  }
  flags.push(entry);
}

// Every README entry should have produced exactly one file.
const usedCodes = new Set(flags.map((f) => f.code).filter(Boolean));
for (const code of codes) {
  if (!usedCodes.has(code)) errors.push(`README lists "${nameByCode.get(code)}" \`${code}\` but no svg/ file matches`);
}

if (errors.length) {
  console.error("✗ Manifest build failed:\n" + errors.map((e) => "  - " + e).join("\n"));
  process.exit(1);
}

flags.sort((a, b) => a.name.localeCompare(b.name));

// --- 3. Write flags.json ---------------------------------------------------
const manifest = {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  homepage: pkg.homepage,
  license: pkg.license,
  count: flags.length,
  size: { width: 16, height: 12 },
  formats: ["svg", "png", "png-2x"],
  cdn: {
    // Replace {path} with any entry's svg/png/png2x value.
    jsdelivr: `${CDN}/{path}`,
  },
  flags,
};
writeFileSync(join(root, "flags.json"), JSON.stringify(manifest, null, 2) + "\n");

// --- 4. Write the gallery (docs/index.html) --------------------------------
const cards = flags
  .map((f) => {
    const codeLabel = f.code ? f.code : "—";
    return `      <figure class="flag" data-name="${f.name.toLowerCase()}" data-code="${codeLabel}">
        <img loading="lazy" width="48" height="36" src="${CDN}/${f.svg}" alt="Flag of ${f.name}">
        <figcaption><span class="name">${f.name}</span><span class="code">${codeLabel}</span></figcaption>
      </figure>`;
  })
  .join("\n");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="google-site-verification" content="${GOOGLE_SITE_VERIFICATION}">
<title>Pixel Flags — ${flags.length} tiny 16×12 country flag icons (SVG &amp; PNG)</title>
<meta name="description" content="A free open-source set of ${flags.length} country flag icons drawn as crisp 16×12 pixel-art. Download SVG, PNG, and 2× PNG, or load any flag from a CDN. MIT licensed.">
<link rel="canonical" href="https://tgines.github.io/pixel-flags/">
<meta property="og:title" content="Pixel Flags — ${flags.length} tiny pixel-art country flag icons">
<meta property="og:description" content="Free 16×12 flag icons in SVG and PNG. MIT licensed.">
<meta property="og:type" content="website">
<script type="application/ld+json">
${JSON.stringify(
  {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: "Pixel Flags",
    description: manifest.description,
    codeRepository: "https://github.com/tgines/pixel-flags",
    license: "https://opensource.org/licenses/MIT",
    programmingLanguage: "SVG",
    keywords: pkg.keywords.join(", "),
  },
  null,
  2
)}
</script>
<style>
  :root { color-scheme: light dark; }
  * { box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; padding: 2rem 1.25rem 4rem; max-width: 1100px; margin-inline: auto; line-height: 1.5; }
  h1 { font-size: 1.9rem; margin: 0 0 .25rem; }
  .lede { color: #6b7280; margin: 0 0 1.5rem; max-width: 60ch; }
  .lede code { background: #8881; padding: .1em .35em; border-radius: 4px; font-size: .9em; }
  a { color: #3273d3; }
  .search { width: 100%; max-width: 360px; padding: .6rem .8rem; font-size: 1rem; border: 1px solid #8884; border-radius: 8px; margin-bottom: 1.5rem; background: #8881; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: .6rem; }
  .flag { margin: 0; padding: .8rem .6rem; border: 1px solid #8883; border-radius: 10px; text-align: center; cursor: pointer; transition: border-color .15s, background .15s; }
  .flag:hover { border-color: #3273d3; background: #3273d311; }
  .flag img { image-rendering: auto; box-shadow: 0 0 0 1px #8882; border-radius: 2px; }
  figcaption { margin-top: .5rem; font-size: .82rem; display: flex; flex-direction: column; gap: .1rem; }
  .name { font-weight: 600; }
  .code { color: #6b7280; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .78rem; }
  .empty { color: #6b7280; padding: 2rem 0; display: none; }
  footer { margin-top: 3rem; color: #6b7280; font-size: .85rem; }
  .toast { position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%) translateY(2rem); background: #111; color: #fff; padding: .6rem 1rem; border-radius: 8px; opacity: 0; transition: opacity .2s, transform .2s; pointer-events: none; font-size: .9rem; }
  .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
</style>
</head>
<body>
  <h1>Pixel Flags</h1>
  <p class="lede">${flags.length} country (and a few extra) flags as crisp <strong>16×12</strong> pixel-art icons — in SVG, PNG, and 2× PNG. Free &amp; MIT licensed. Click any flag to copy its CDN URL. <a href="https://github.com/tgines/pixel-flags">View on GitHub →</a></p>
  <input class="search" type="search" placeholder="Search 200 flags by name or code…" aria-label="Search flags" autocomplete="off">
  <div class="grid">
${cards}
  </div>
  <p class="empty">No flags match that search.</p>
  <footer>
    Load any flag straight from a CDN — no install:<br>
    <code>${CDN}/svg/br-brazil.svg</code><br><br>
    Machine-readable index for tooling: <a href="https://github.com/tgines/pixel-flags/blob/main/flags.json">flags.json</a> ·
    Install: <code>npm i pixel-flags</code>
  </footer>
  <div class="toast" role="status" aria-live="polite"></div>
  <script>
    const search = document.querySelector(".search");
    const flags = [...document.querySelectorAll(".flag")];
    const empty = document.querySelector(".empty");
    search.addEventListener("input", () => {
      const q = search.value.trim().toLowerCase();
      let shown = 0;
      for (const f of flags) {
        const hit = !q || f.dataset.name.includes(q) || f.dataset.code.includes(q);
        f.style.display = hit ? "" : "none";
        if (hit) shown++;
      }
      empty.style.display = shown ? "none" : "block";
    });
    const toast = document.querySelector(".toast");
    let t;
    for (const f of flags) {
      f.addEventListener("click", async () => {
        const url = f.querySelector("img").src;
        try { await navigator.clipboard.writeText(url); } catch {}
        toast.textContent = "Copied " + url;
        toast.classList.add("show");
        clearTimeout(t);
        t = setTimeout(() => toast.classList.remove("show"), 1800);
      });
    }
  </script>
</body>
</html>
`;
writeFileSync(join(root, "docs", "index.html"), html);

// --- 5. Crawlability for the Pages site (sitemap + robots) -----------------
// The gallery is a single page, so the sitemap lists one URL. lastmod is
// omitted on purpose to keep the build output deterministic (no spurious diffs
// on every run). Submit this sitemap directly in Google Search Console / Bing.
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
writeFileSync(join(root, "docs", "sitemap.xml"), sitemap);

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE}sitemap.xml
`;
writeFileSync(join(root, "docs", "robots.txt"), robots);

console.log(`✓ Wrote flags.json (${flags.length} flags), docs/index.html, sitemap.xml, robots.txt`);
