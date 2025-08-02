'use client';

import { useEffect } from 'react';
import { usePlayerStore } from '@/utils/store/playerStore';
import Player from './Player/Player';
import StationList from '../StationList/StationList';
import StarCanvas from '../StarCanvas/StarCanvas';
import langJSON from '../../../public/assets/docs/languages.json';
import Image from 'next/image';
import Link from 'next/link';
import { Pacifico } from 'next/font/google';
import './Listen.css';

const pacifico = Pacifico({ weight: '400', subsets: ['latin'] });

export default function ListenClient({ found, similar, lang, pathname }) {
  const setStation = usePlayerStore((s) => s.setStation);

  useEffect(() => {
    setStation({
      name: found.name,
      url: found.url_resolved,
      favicon: found.favicon,
      stationuuid: found.stationuuid,
      lang,
    });
  }, [found, lang, setStation]);

  const isLangValid = langJSON.available.includes(lang);
  const t = langJSON.translations[isLangValid ? lang : 'en'];
  const countryGenres = [found.country, found.state, found.language].filter(Boolean);

  return (
    <div className="listen-container">
      <h1 className={pacifico.className} style={{ marginTop: '40px' }}>
        <StarCanvas stationuuid={found.stationuuid} size={30} /> 
        {found.country && (
          <Image
            className="country-flag"
            src={`https://flagsapi.com/${found.countrycode}/flat/64.png`}
            alt={found.country}
            title={found.country}
            width={22}
            height={22}
          />
        )}
        {found.name}
      </h1>

      <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h2 className="country-genres">{langJSON.translations[langJSON.available.includes(lang) ? lang : 'en'].h2SinglePage.replace('{{name}}', found.name).replace('{{country}}', found.country).replace('{{language}}', found.language).replace('{{tag}}', found.tags.split(',')[0] === 'music' ? found.tags.split(',')[1] : found.tags.split(',')[0])}</h2>
      </span>

      <div className="tags">
        {found.tags ? (
          found.tags.split(',').map((tag, i) => (
            <div key={tag + '-' + i} className="tag">
              <Link href={`${isLangValid ? '/' + lang : ''}/search?tag=${encodeURIComponent(tag)}`}>{tag}</Link>
            </div>
          ))
        ) : (
          <div className="notag">{t.noTagsTxt}</div>
        )}
      </div>

      <Player />

      <h2>{t.similarRadioST}</h2>
      <StationList page="listen" stations={similar} lang={lang} />
    </div>
  );
}
