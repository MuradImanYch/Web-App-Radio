const fs = require("fs");
const axios = require("axios");
const path = require("path");

// Подключаем файл с языками и доступными префиксами
const langJSON = require("../../public/assets/docs/languages.json");

const RADIO_BROWSER_HOSTS = [
  "https://de1.api.radio-browser.info",
  "https://nl1.api.radio-browser.info",
  "https://fr1.api.radio-browser.info",
  "https://at1.api.radio-browser.info",
];

const LANGS = langJSON.available; // например ['az', 'ru']
const BASE_URL = "https://legradio.com";
const SITEMAP_PATH = path.join(__dirname, "sitemap-radiostations.xml");
const LIMIT = 500;

// Пример функции generateSlug (замени на свою реальную реализацию)
function generateSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD") // нормализация для удаления акцентов
    .replace(/[\u0300-\u036f]/g, "") // удаляем диакритические знаки
    .replace(/[^a-z0-9]+/g, "-") // заменяем все кроме a-z, 0-9 на дефис
    .replace(/^-+|-+$/g, "") // убираем дефисы в начале и конце
    .replace(/--+/g, "-"); // заменяем двойные дефисы на один
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

function generateUrlSet(stations) {
  const now = new Date().toISOString();

  const urls = stations.flatMap((station) => {
    // Подготавливаем slug для страны и названия станции
    const countrySlug = generateSlug(station.country || "unknown-country");
    const nameSlug = generateSlug(station.name || "unknown-station");
    const stationUUID = station.stationuuid;

    // Формируем основной slug с uuid
    const slug = `${countrySlug}-${nameSlug}-uuid-${stationUUID}`;

    // Массив URL для всех языков
    const urlsForStation = [];

    // Английская версия без префикса
    urlsForStation.push(`
  <url>
    <loc>${BASE_URL}/listen/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`);

    // Другие языки с префиксом
    LANGS.forEach((lang) => {
      urlsForStation.push(`
  <url>
    <loc>${BASE_URL}/${lang}/listen/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`);
    });

    return urlsForStation;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;
}

async function generateSitemap() {
  try {
    const stations = await fetchAllStations();

    if (stations.length === 0) {
      console.warn("⛔️ No stations fetched.");
      return;
    }

    console.log(`✅ Fetched ${stations.length} stations.`);

    const xmlContent = generateUrlSet(stations);
    fs.writeFileSync(SITEMAP_PATH, xmlContent.trim());

    console.log(`🎉 Sitemap generated at: ${SITEMAP_PATH}`);
  } catch (error) {
    console.error("❌ Sitemap generation error:", error.message);
  }
}

generateSitemap();
