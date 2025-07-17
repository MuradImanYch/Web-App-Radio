'use client';

import { useEffect, useState } from 'react';
import StationList from '@/components/StationList/StationList';
import langJSON from '../.././../public/assets/docs/languages.json';

const API = 'https://de1.api.radio-browser.info';

const FavoritesClient = ({lang}) => {
  const [favoriteStations, setFavoriteStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStationByUUID = async (uuid) => {
      try {
        const res = await fetch(`${API}/json/stations/byuuid/${uuid}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Fetch error');
        return await res.json();
      } catch {
        return null;
      }
    };

    const loadFavorites = async () => {
      const raw = localStorage.getItem('favoriteUuids');
      const uuids = raw ? JSON.parse(raw) : [];
      const stations = await Promise.all(uuids.map(fetchStationByUUID));
      const flatStations = stations.filter(Boolean).flat();
      setFavoriteStations(flatStations);
      setLoading(false);
    };

    loadFavorites();
  }, []);

  if (!favoriteStations.length && !loading) {
    return <div>{langJSON.translations.en.favoriteStNotFound}</div>;
  }

  return <StationList page={'favorites'} stations={favoriteStations} lang={lang} />;
};

export default FavoritesClient;
