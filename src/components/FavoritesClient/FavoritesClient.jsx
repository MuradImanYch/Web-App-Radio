'use client';

import { useEffect, useState } from 'react';
import StationList from '@/components/StationList/StationList';
import allStations from '../../../public/assets/docs/mock-api/stations.json';
import langJSON from '../../../public/assets/docs/languages.json';

const FavoritesClient = ({ lang }) => {
  const [favoriteStations, setFavoriteStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = () => {
      const raw = localStorage.getItem('favoriteUuids');
      const uuids = raw ? JSON.parse(raw) : [];

      const filtered = allStations.filter(st => uuids.includes(st.stationuuid));
      setFavoriteStations(filtered);
      setLoading(false);
    };

    loadFavorites();
  }, []);

  if (!favoriteStations.length && !loading) {
    return <div>{langJSON.translations[lang || 'en'].favoriteStNotFound}</div>;
  }

  return (
    <StationList
      page="favorites"
      stations={favoriteStations}
      lang={lang || 'en'}
    />
  );
};

export default FavoritesClient;
