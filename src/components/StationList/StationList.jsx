import Image from 'next/image';
import Link from 'next/link';
import './StationList.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '700',
});

import generateSlug from '../../utils/generateSlug';
import discLogo     from '../../../public/assets/ico/disc-logo.png';

import StarCanvas  from '../StarCanvas/StarCanvas';
import Pagination  from './Pagination/Pagination';
import langJSON    from '../../../public/assets/docs/languages.json';

const StationList = ({
  stations = [],
  page     = 'main',
  name,
  country,
  language,
  tag,
  pageNum  = 1,
  lang     // текущий сегмент языка, приходит из родительского компонента
}) => {
  /* ---------- helpers ---------- */

  // валидный ли код языка
  const isLangValid = langJSON.available.includes(lang);
  // корневая часть пути: '' | '/az' | '/ru'
  const basePath    = isLangValid ? `/${lang}` : '';
  // объект перевода (en по‑умолчанию)
  const t = langJSON.translations[isLangValid ? lang : 'en'];

  // быстрая проверка, абсолютный ли URL
  const isValidUrl = (url = '') => /^(https?:)?\/\//i.test(url);

  /* ---------- пагинация ---------- */

  const PER_PAGE    = 20;
  const start       = (pageNum - 1) * PER_PAGE;
  const end         = pageNum * PER_PAGE;

  const visibleStations =
    page === 'favorites'
      ? stations
      : page === 'listen' || page === 'main'
        ? stations.slice(0, 30)
        : stations.slice(start, end);

  /* ---------- render ---------- */

  return (
    <div
      className="station-list"
      style={stations.length < 3 ? { justifyContent: 'flex-start' } : {}}
    >
      <ul
        className="station-list"
        style={stations.length < 3 ? { justifyContent: 'flex-start' } : {}}
      >
        {visibleStations.map((st) => {
          const {
            stationuuid,
            favicon,
            name: stName,
            country: stCountry,
            countrycode = 'UN',     // fallback, если кода нет
            language: stLang,
            tags = ''
          } = st;

          const displayName  = stName     || t.unknownStationTxt;
          const displayCtry  = stCountry  || t.unknownCountryTxt;
          const displayLang  = stLang     || t.unknownLangTxt;
          const tagArray     = tags ? tags.split(',') : [];
          const tagLimit     = 6;

          /* строим ссылки */
          const listenHref   =
            `${basePath}/listen/${generateSlug(stCountry)}-${generateSlug(stName)}-uuid-${stationuuid}`;

          return (
            <li className="station-item" key={stationuuid}>
              {/* верхняя часть карточки */}
              <div className="top">
                <Image
                  width={90}
                  height={90}
                  src={isValidUrl(favicon) ? favicon.trim() : discLogo}
                  alt={displayName}
                  title={displayName}
                  placeholder="empty"
                  quality={100}
                />

                <div className="station-info-wrap">
                  {/* название */}
                  <h3 className={`station-name ${displayName.length > 27 ? 'marquee' : ''} ${poppins.className}`}>
                    {displayName}
                  </h3>

                  {/* метаданные */}
                  <p className="station-meta">
                    <span className="station-country">
                      <strong>{t.countryTxt}:</strong>&nbsp;
                      <Image
                        className="country-flag-card"
                        src={`https://flagsapi.com/${countrycode}/flat/64.png`}
                        width={22}
                        height={22}
                        alt={displayCtry}
                        title={displayCtry}
                        placeholder="empty"
                        quality={100}
                      />
                      &nbsp;{displayCtry}
                    </span>
                    <br />
                    <span className="station-language">
                      <strong>{t.languageTxt}:</strong>&nbsp;{displayLang}
                    </span>
                  </p>
                </div>
              </div>

              {/* теги */}
              {tagArray.length
                ? (
                  <div className="station-tags">
                    <span>{t.tagsTxt}:</span>
                    {tagArray.slice(0, tagLimit).map((tg, i) => (
                      <div key={`${tg}-${i}`} className="tag">
                        <Link href={`${basePath}/search?tag=${tg.trim()}`}>{tg.trim()}</Link>
                      </div>
                    ))}
                    {tagArray.length > tagLimit && <span title="more tags">…</span>}
                  </div>
                )
                : <div style={{ marginTop: 20 }}>{t.noTagsTxt}</div>
              }

              {/* кнопка «Play» + избранное */}
              <div className="playBtn">
                <Link href={listenHref}>
                  <button>
                    ▶ {t.playBtn}
                  </button>
                </Link>

                <StarCanvas
                  stationuuid={stationuuid}
                  size={40}
                  color="transparent"
                  strokeColor="#FFA500"
                  strokeWidth={2}
                />
              </div>
            </li>
          );
        })}
      </ul>

      {/* пагинация показывается только в поиске */}
      {page === 'search' && (
        <Pagination
          stations={stations}
          page={page}
          name={name}
          country={country}
          language={language}
          tag={tag}
          pageNum={pageNum}
          lang={lang}
        />
      )}
    </div>
  );
};

export default StationList;
