'use client';

import './RadioOverlay.css';
import Link from 'next/link';
import { usePlayerStore } from '@/utils/store/playerStore';
import { usePathname } from 'next/navigation';
import langJSON from '../../../public/assets/docs/languages.json';

const RadioOverlay = () => {
  const { isPlaying, handleToggle, currentStation } = usePlayerStore();
  const pathname = usePathname();

  /* скрываем оверлей на /listen‑странице или если станции ещё нет */
  if (pathname.includes('/listen')) return null;
  if (!currentStation) return null;

  /* ---------- определяем язык интерфейса так же, как в FavLink ---------- */
  const firstSegment = pathname.split('/')[1] || '';           // "az", "ru", "" ...
  const isLangValid  = langJSON.available.includes(firstSegment);
  const uiLang       = isLangValid ? firstSegment : 'en';
  const t            = langJSON.translations[uiLang];

  /* ---------- путь назад к станции ---------- */
  const listenHref = `/${uiLang}/listen/uuid-${currentStation.stationuuid}`;

  /* ---------- render ---------- */
  return (
    <div className="radio-overlay">
      <div className="icoName">
        <img src={currentStation.favicon} alt="favicon" className="favicon" />

        <span className="station-name">{currentStation.name}</span>
      </div>

      <div className="btns">
        <button onClick={handleToggle}>
          {isPlaying ? `⏸ ${t.pauseBtn}` : `▶ ${t.playBtn}`}
        </button>

        <Link href={listenHref}>
          <button className="back-btn">
            {t.backToStationTxt}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RadioOverlay;
