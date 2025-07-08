import Player from './Player/Player';
import './Listen.css';
import StationList from '../StationList/StationList';
import fallbackStations from '../../../public/assets/docs/mock-api/stations.json';
import Link from 'next/link';
import Image from 'next/image';
import StarCanvas from '../StarCanvas/StarCanvas';

const API = 'https://de1.api.radio-browser.info';

// Получаем станцию по UUID
const fetchStationByUUID = async (uuid) => {
  try {
    const res = await fetch(`${API}/json/stations/byuuid/${uuid}`, {
      cache: 'no-store',
    });
    return await res.json();
  } catch (err) {
    console.error('Error fetching station by UUID:', err);
    return [];
  }
};

// Получаем похожие станции по тегам (через API)
const fetchSimilarStations = async (tags, currentUUID) => {
  const limitedTags = tags.slice(0, 3); // ограничиваем число запросов

  const responses = await Promise.all(
    limitedTags.map(tag =>
      fetch(`${API}/json/stations/search?tag=${encodeURIComponent(tag)}&limit=200&hidebroken=true`, {
        cache: 'no-store',
      }).then(res => res.ok ? res.json() : [])
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

// Fallback если API не сработало
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

const Listen = async ({ pathname }) => {
  const uuid = pathname.split('uuid-')[1];
  const foundArr = await fetchStationByUUID(uuid);
  const found = foundArr[0];

  if (!found) {
    return (
      <div>
        <h1 style={{ marginTop: '40px' }}>Station is not found</h1>
        <p>Find by: <code>{pathname}</code></p>
      </div>
    );
  }

  const selectedTags = found.tags?.toLowerCase().split(',').map(tag => tag.trim()) || [];

  let similar = [];
  try {
    similar = await fetchSimilarStations(selectedTags, found.stationuuid);
  } catch {
    // ignore error
  }

  if (similar.length === 0) {
    similar = fallbackSimilar(selectedTags, found.stationuuid);
  }

  const countryGenres = [found.country, found.state, found.language].filter(Boolean);

  return (
    <div className='listen-container'>
      <h1 style={{ marginTop: '40px' }}><StarCanvas stationuuid={found.stationuuid} size={30} /> {found.name}</h1>

      <span style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {found.country && (
          <>
            <Image
              className='country-flag'
              src={`https://flagsapi.com/${found.countrycode}/flat/64.png`}
              alt={found.country ? found.country : 'Undefined country'}
              title={found.country ? found.country : 'Undefined country'}
              width={22}
              height={22}
            />
          </>
        )}
        <h2 className="country-genres">{countryGenres.join(' • ')}</h2>
      </span>

      <div className="tags">
        {found.tags ? found.tags.split(',').map((tag, i) => (
          <div key={tag + '-' + i} className="tag">
            <Link href={`/search?tag=${encodeURIComponent(tag)}`}>{tag}</Link>
          </div>
        )) : (
          <div className='notag'>No tags available</div>
        )}
      </div>

      <Player url={found.url_resolved} favicon={found.favicon} />

      <h2>Similar radio stations</h2>
      <StationList page={'listen'} stations={similar} />
    </div>
  );
};

export default Listen;
