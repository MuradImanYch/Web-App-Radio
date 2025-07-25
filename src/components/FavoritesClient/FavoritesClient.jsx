'use client';

import { useEffect, useState } from 'react';
import StationList from '@/components/StationList/StationList';
import langJSON from '../../../public/assets/docs/languages.json';
import fetchStationByUUID from '@/utils/getUuidLS'; // путь укажи верно

const FavoritesClient = ({ lang }) => {
  const [favoriteStations, setFavoriteStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      const raw = localStorage.getItem('favoriteUuids');
      const uuids = raw ? JSON.parse(raw) : [];

      const stations = await Promise.all(uuids.map(fetchStationByUUID));
      const flatStations = stations.filter(Boolean).flat(); // так как API возвращает массив
      setFavoriteStations(flatStations);
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
