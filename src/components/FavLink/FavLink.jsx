'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import StarCanvas from '../StarCanvas/StarCanvas';
import './FavLink.css';

const FavLink = () => {
  const [count, setCount] = useState(0);

  const updateCountFromLocalStorage = () => {
    try {
      const raw = localStorage.getItem('favoriteUuids');
      const arr = raw ? JSON.parse(raw) : [];
      setCount(arr.length);
    } catch {
      setCount(0);
    }
  };

  useEffect(() => {
    updateCountFromLocalStorage();

    // Событие storage сработает только при изменениях в других вкладках
    window.addEventListener('storage', updateCountFromLocalStorage);

    return () => {
      window.removeEventListener('storage', updateCountFromLocalStorage);
    };
  }, []);

  // Можно добавить кастомный event для обновления count внутри одной вкладки,
  // если в другом компоненте меняешь localStorage

  useEffect(() => {
    const onFavoriteUuidsChanged = () => {
      updateCountFromLocalStorage();
    };

    window.addEventListener('favoriteUuidsChanged', onFavoriteUuidsChanged);

    return () => {
      window.removeEventListener('favoriteUuidsChanged', onFavoriteUuidsChanged);
    };
  }, []);

  return (
    <div className="fav-link">
      <Link href="/favorites" className="fav-link__inner">
        <div className="star-wrapper">
          <StarCanvas place="header-fav-ico" />
          <span className="star-count" style={{ fontSize: count > 9 ? '0.6em' : '0.8em' }}>
            {count}
          </span>
        </div>
        Favorites
      </Link>
    </div>

  );
};

export default FavLink;
