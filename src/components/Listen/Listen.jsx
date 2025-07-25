import ListenClient from './ListenClient';
import langJSON from '../../../public/assets/docs/languages.json';
import fallbackStations from '../../../public/assets/docs/mock-api/stations.json';

const findStationByUUID = (uuid) => {
  return fallbackStations.find(st => st.stationuuid === uuid) || null;
};

const getSimilarStations = (tags, currentUUID) => {
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
  const found = findStationByUUID(uuid);

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
  const similar = getSimilarStations(selectedTags, found.stationuuid);

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
