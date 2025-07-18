import ListenClient from './ListenClient';
import langJSON from '../../../public/assets/docs/languages.json';
import fallbackStations from '../../../public/assets/docs/mock-api/stations.json';

const API = 'https://de1.api.radio-browser.info';

const fetchStationByUUID = async (uuid) => {
  try {
    const res = await fetch(`${API}/json/stations/byuuid/${uuid}`, { cache: 'no-store' });
    return await res.json();
  } catch {
    return [];
  }
};

const fetchSimilarStations = async (tags, currentUUID) => {
  const limitedTags = tags.slice(0, 3);
  const responses = await Promise.all(
    limitedTags.map(tag =>
      fetch(`${API}/json/stations/search?tag=${encodeURIComponent(tag)}&limit=200&hidebroken=true`, { cache: 'no-store' })
        .then(res => res.ok ? res.json() : [])
        .catch(() => [])
    )
  );

  const pool = responses.flat();
  const stationMap = {};

  for (const station of pool) {
    if (station.stationuuid === currentUUID) continue;
    if (!stationMap[station.stationuuid]) {
      stationMap[station.stationuuid] = { ...station, matchCount: 0 };
    }

    const stationTags = station.tags?.toLowerCase().split(',').map(t => t.trim()) || [];
    const matches = tags.filter(tag => stationTags.includes(tag));
    stationMap[station.stationuuid].matchCount += matches.length;
  }

  return Object.values(stationMap)
    .filter(s => s.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount);
};

const fallbackSimilar = (tags, currentUUID) => {
  return fallbackStations
    .filter(st => st.stationuuid !== currentUUID)
    .map(st => {
      const stationTags = st.tags?.toLowerCase().split(',').map(t => t.trim()) || [];
      const matchCount = tags.filter(tag => stationTags.includes(tag)).length;
      return { ...st, matchCount };
    })
    .filter(st => st.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount);
};

const Listen = async ({ pathname, lang }) => {
  const uuid = pathname.split('uuid-')[1];
  const foundArr = await fetchStationByUUID(uuid);
  const found = foundArr[0];

  const isLangValid = langJSON.available.includes(lang);
  const t = langJSON.translations[isLangValid ? lang : 'en'];

  if (!found) {
    return (
      <div>
        <h1 style={{ marginTop: '40px' }}>{t.stationNFTxt}</h1>
        <p style={{ color: '#fff', marginTop: '40px' }}>
          {t.searchedByTxt}: <code>{pathname}</code>
        </p>
      </div>
    );
  }

  const selectedTags = found.tags?.toLowerCase().split(',').map(tag => tag.trim()) || [];

  let similar = [];
  try {
    similar = await fetchSimilarStations(selectedTags, found.stationuuid);
  } catch {}

  if (similar.length === 0) {
    similar = fallbackSimilar(selectedTags, found.stationuuid);
  }

  return (
    <ListenClient
      found={found}
      similar={similar}
      lang={lang}
      pathname={pathname}
    />
  );
};

export default Listen;
