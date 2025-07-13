'use client';

import './RadioOverlay.css';
import Link from 'next/link';
import { usePlayerStore } from '@/utils/store/playerStore';
import { usePathname } from 'next/navigation';
import PlayPause from '../Listen/Player/PlayPause/PlayPause';
import langJSON from '../../../public/assets/docs/languages.json'; // импорт языка
import Image from 'next/image';

const RadioOverlay = () => {
  const { isPlaying, togglePlay, currentStation } = usePlayerStore();
  const pathname = usePathname();

  if (pathname.includes('/listen')) return null;
  if (!currentStation) return null;

  // Получаем язык из URL или по умолчанию 'en'
  const lang = (() => {
    const parts = pathname.split('/');
    const candidate = parts[1];
    return langJSON.available.includes(candidate) ? candidate : 'en';
  })();

  // Строим корректную ссылку
  const stationLink =
    lang === 'en'
      ? `/listen/uuid-${currentStation.stationuuid}`
      : `/${lang}/listen/uuid-${currentStation.stationuuid}`;

  return (
    <div className="radio-overlay">
      <Image width={20} height={20} src={currentStation.favicon} alt={currentStation.favicon} title={currentStation.favicon} className="favicon" quality={100} />
      <span className="station-name">{currentStation.name}</span>
      <button onClick={togglePlay}>
        <PlayPause size={10} isPlaying={isPlaying} />
      </button>
      <Link href={stationLink}>
        <button className="back-btn">Back to station</button>
      </Link>
    </div>
  );
};

export default RadioOverlay;
