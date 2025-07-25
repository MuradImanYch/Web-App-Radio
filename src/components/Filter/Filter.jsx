'use client';

import { useEffect, useState } from 'react';
import StationList from '@/components/StationList/StationList';
import allStations from '../../../public/assets/docs/mock-api/stations.json';
import langJSON from '../../../public/assets/docs/languages.json';

const FavoritesClient = ({ lang = 'en' }) => {
  const [favoriteStations, setFavoriteStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = () => {
      try {
        const raw = localStorage.getItem('favoriteUuids');
        const uuids = raw ? JSON.parse(raw) : [];

        // Защита от повреждённых данных
        if (!Array.isArray(uuids)) throw new Error('Invalid UUIDs');

        const filtered = allStations.filter(st => uuids.includes(st.stationuuid));
        setFavoriteStations(filtered);
      } catch (err) {
        console.warn('Ошибка при загрузке избранного:', err);
        setFavoriteStations([]);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  if (!loading && favoriteStations.length === 0) {
    return <div>{langJSON.translations[lang]?.favoriteStNotFound || 'No favorites found'}</div>;
  }

  return (
    <StationList
      page="favorites"
      stations={favoriteStations}
      lang={lang}
    />
  );
};

export default FavoritesClient;
