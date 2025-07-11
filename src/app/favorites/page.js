'use client';

import { useEffect, useState } from 'react';
import StationList from '@/components/StationList/StationList';
import langJSON from '../../../public/assets/docs/languages.json';

const API = 'https://de1.api.radio-browser.info';

const FavoritesPage = () => {
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

      // Запускаем параллельные запросы
      const stations = await Promise.all(uuids.map(uuid => fetchStationByUUID(uuid)));

      // Фильтруем успешные ответы
      const flatStations = stations
        .filter(Boolean)          // отфильтровать null
        .flat()                   // "развернуть" массив массивов в один массив
      setFavoriteStations(flatStations);
      setLoading(false);
    };

    loadFavorites();
  }, []);

  if (favoriteStations.length === 0) return <div>{langJSON.translations.en.favoriteStNotFound}</div>;

  return <StationList page={'favorites'} stations={favoriteStations} />;
};

export default FavoritesPage;
