'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import StarCanvas from '../StarCanvas/StarCanvas';
import './FavLink.css';

import langJSON from '../../../public/assets/docs/languages.json';

const FavLink = () => {
  /* ---------- локальное состояние ---------- */
  const [count, setCount] = useState(0);

  /* ---------- определяем язык из URL ---------- */
  const pathname      = usePathname();               // напр. "/az/listen/..."
  const firstSegment  = pathname.split('/')[1] || ''; // "az" | "" | ...
  const isLangValid   = langJSON.available.includes(firstSegment);
  const basePath      = isLangValid ? `/${firstSegment}` : ''; // "/az" | ""

  /* ---------- перевод ---------- */
  const t = langJSON.translations[isLangValid ? firstSegment : 'en'];

  /* ---------- работа с localStorage ---------- */
  const updateCount = () => {
    try {
      const raw = localStorage.getItem('favoriteUuids');
      const list = raw ? JSON.parse(raw) : [];
      setCount(list.length);
    } catch {
      setCount(0);
    }
  };

  useEffect(() => {
    updateCount();
    window.addEventListener('storage', updateCount);          // изменения из других вкладок
    window.addEventListener('favoriteUuidsChanged', updateCount); // кастомное событие для той же вкладки
    return () => {
      window.removeEventListener('storage', updateCount);
      window.removeEventListener('favoriteUuidsChanged', updateCount);
    };
  }, []);

  /* ---------- render ---------- */
  return (
    <div className="fav-link">
      <Link href={`${basePath}/favorites`} className="fav-link__inner">
        <div className="star-wrapper">
          <StarCanvas place="header-fav-ico" />
          <span
            className="star-count"
            style={{ fontSize: count > 9 ? '0.6em' : '0.8em' }}
          >
            {count}
          </span>
        </div>
        {t.favoritesBtn}
      </Link>
    </div>
  );
};

export default FavLink;
