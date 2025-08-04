'use client';

import './RadioOverlay.css';
import Link from 'next/link';
import { usePlayerStore } from '@/utils/store/playerStore';
import { usePathname } from 'next/navigation';
import langJSON from '../../../public/assets/docs/languages.json';
import generateSlug from '@/utils/generateSlug';
import getUuidLS from '@/utils/getUuidLS';
import { useEffect, useState } from 'react';

const RadioOverlay = () => {
  const { isPlaying, handleToggle, currentStation } = usePlayerStore();
  const pathname = usePathname();

  const [getByUuid, setGetByUuid] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (currentStation) {
        const data = await getUuidLS(currentStation.stationuuid);
        setGetByUuid(data);
      }
    };
    fetchData();
  }, [currentStation]);

  if (pathname.includes('/listen')) return null;
  if (!currentStation) return null;

  const firstSegment = pathname.split('/')[1] || '';
  const isLangValid = langJSON.available.includes(firstSegment);
  const uiLang = isLangValid ? firstSegment : 'en';
  const t = langJSON.translations[uiLang];

  const listenHref = `/${uiLang}/listen/${getByUuid[0].country && generateSlug(getByUuid[0].country) + '-'}${generateSlug(currentStation.name)}-uuid-${currentStation.stationuuid}`;

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
