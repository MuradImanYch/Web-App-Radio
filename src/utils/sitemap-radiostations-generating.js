const fs = require("fs");
const axios = require("axios");
const path = require("path");
const langJSON = require("../../public/assets/docs/languages.json");

const RADIO_BROWSER_HOSTS = [
  "https://de1.api.radio-browser.info",
  "https://nl1.api.radio-browser.info",
  "https://fr1.api.radio-browser.info",
  "https://at1.api.radio-browser.info",
];

const LANGS = langJSON.available;
const BASE_URL = "https://legradio.com";
const SITEMAP_DIR = path.join(__dirname, "sitemaps");
const URLS_PER_FILE = 40000;
const LIMIT = 500;

// Ensure output directory exists
if (!fs.existsSync(SITEMAP_DIR)) {
  fs.mkdirSync(SITEMAP_DIR);
}

function generateSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/--+/g, "-");
}

async function fetchAllStations() {
  let stations = [];
  let offset = 0;
  let currentHostIndex = 0;

  while (true) {
    const url = `${RADIO_BROWSER_HOSTS[currentHostIndex]}/json/stations?limit=${LIMIT}&offset=${offset}`;

    try {
      console.log(`Fetching ${url}`);
      const { data } = await axios.get(url, { timeout: 10000 });

      if (!Array.isArray(data)) throw new Error("Invalid response");

      if (data.length === 0) break;

      stations = stations.concat(data);
      offset += LIMIT;
    } catch (err) {
      console.warn(`Host failed: ${RADIO_BROWSER_HOSTS[currentHostIndex]}`);
      currentHostIndex++;

      if (currentHostIndex >= RADIO_BROWSER_HOSTS.length) {
        console.error("❌ All Radio Browser hosts are unavailable.");
        break;
      }
    }
  }

  return stations;
}

function generateUrlsForStation(station) {
  const now = new Date().toISOString();
  const countrySlug = generateSlug(station.country || "unknown-country");
  const nameSlug = generateSlug(station.name || "unknown-station");
  const slug = `${countrySlug}-${nameSlug}-uuid-${station.stationuuid}`;

  const urls = [
    `
  <url>
    <loc>${BASE_URL}/listen/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`,
  ];

  LANGS.forEach((lang) => {
    urls.push(`
  <url>
    <loc>${BASE_URL}/${lang}/listen/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`);
  });

  return urls;
}

function wrapWithUrlSet(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;
}

function wrapWithIndex(fileNames) {
  const now = new Date().toISOString();

  const sitemapEntries = fileNames
    .map((file) => {
      return `
  <sitemap>
    <loc>${BASE_URL}/sitemaps/${file}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`;
}

async function generateSitemap() {
  try {
    const stations = await fetchAllStations();

    if (stations.length === 0) {
      console.warn("⛔️ No stations fetched.");
      return;
    }

    console.log(`✅ Fetched ${stations.length} stations.`);

    const allUrls = stations.flatMap(generateUrlsForStation);
    const chunks = [];

    for (let i = 0; i < allUrls.length; i += URLS_PER_FILE) {
      chunks.push(allUrls.slice(i, i + URLS_PER_FILE));
    }

    const fileNames = [];

    chunks.forEach((chunk, index) => {
      const fileName = `sitemap-radiostations-${index + 1}.xml`;
      const filePath = path.join(SITEMAP_DIR, fileName);
      fs.writeFileSync(filePath, wrapWithUrlSet(chunk).trim());
      fileNames.push(fileName);
      console.log(`📄 Created: ${fileName}`);
    });

    // Генерируем индекс
    const indexContent = wrapWithIndex(fileNames);
    fs.writeFileSync(path.join(SITEMAP_DIR, "sitemap-index.xml"), indexContent);
    console.log(`📂 Sitemap index created at sitemap-index.xml`);

  } catch (error) {
    console.error("❌ Sitemap generation error:", error.message);
  }
}

generateSitemap();
