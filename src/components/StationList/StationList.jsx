import Image from 'next/image';
import Link from 'next/link';
import './StationList.css';
import generateSlug from '../../utils/generateSlug';
import discLogo from '../../../public/assets/ico/disc-logo.png';
import StarCanvas from '../StarCanvas/StarCanvas';
import Pagination from './Pagination/Pagination';
import langJSON from '../../../public/assets/docs/languages.json';

const StationList = ({stations, page, name, country, language, tag, pageNum, lang}) => {
    const itemsPerPage = 20;
    const start = (pageNum - 1) * itemsPerPage; // (pageNum - 1) * 20 = 40
    const end = pageNum * itemsPerPage;

    const visibleStations =
  page === 'favorites'
    ? stations.slice(0)
    : page === 'listen' ? stations.slice(0, 30) : page === 'main' ? stations.slice(0, 30) : stations.slice(start, end);

    return (
        <div className="station-list" style={stations.length < 3 ? { justifyContent: 'flex-start' } : {}}>
            <ul className="station-list" style={stations.length < 3 ? { justifyContent: 'flex-start' } : {}}>
                {visibleStations.map((station) => {
                    const isValidUrl = (url) => {
                        try {
                            // Проверяем, является ли абсолютным URL (http или https)
                            return typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'));
                        } catch (e) {
                            return false;
                        }
                    };

                  return <li className="station-item" key={station.stationuuid}>
                      <div className="top">
                        {isValidUrl(station?.favicon) ? (
                        <Image
                            width={90}
                            height={90}
                            src={station.favicon.trim()}
                            title={station?.name ? station?.name : langJSON.translations[langJSON.available.includes(lang) ? lang : 'en']?.unknownStationTxt}
                            alt={station?.name ? station?.name : langJSON.translations[langJSON.available.includes(lang) ? lang : 'en']?.unknownStationTxt}
                            placeholder={'empty'}
                            quality={100}
                        />
                        ) : (
                        <Image
                            width={90}
                            height={90}
                            src={discLogo}
                            title={station?.name ? station?.name : langJSON.translations[langJSON.available.includes(lang) ? lang : 'en']?.unknownStationTxt}
                            alt={station?.name ? station?.name : langJSON.translations[langJSON.available.includes(lang) ? lang : 'en']?.unknownStationTxt}
                            placeholder={'empty'}
                            quality={100}
                        />
                        )}
                        <div className='station-info-wrap'>
                            <h3 className={`station-name ${station?.name.length > 27 && 'marquee'}`}>{station?.name || langJSON.translations[langJSON.available.includes(lang) ? lang : 'en']?.unknownStationTxt}</h3>
                            
                            <p className="station-meta">
                                <span className="station-country">
                                <strong>{langJSON.translations[langJSON.available.includes(lang) ? lang : 'en']?.countryTxt}:</strong> <Image className='country-flag-card' src={`https://flagsapi.com/${station.countrycode}/flat/64.png`} width={22}
                                height={22} alt={station.country ? station.country : langJSON.translations[langJSON.available.includes(lang) ? lang : 'en']?.unknownCountryTxt} title={station.country ? station.country :  langJSON.translations[langJSON.available.includes(lang) ? lang : 'en']?.unknownCountryTxt} placeholder={'empty'} quality={100} /> {station.country || langJSON.translations[langJSON.available.includes(lang) ? lang : 'en']?.unknownCountryTxt}
                                </span>
                                <br />
                                <span className="station-language">
                                <strong>{langJSON.translations[langJSON.available.includes(lang) ? lang : 'en']?.languageTxt}:</strong> {station.language || langJSON.translations[langJSON.available.includes(lang) ? lang : 'en']?.unknownLangTxt}
                                </span>
                            </p>
                        </div>
                      </div>
                      {station.tags ? <div className="station-tags"><span>{langJSON.translations[langJSON.available.includes(lang) ? lang : 'en']?.tagsTxt}:</span> {station.tags.split(',').map((tag, i) => {
                        return <div key={tag + '-' + i} className="tag"><Link href={`/search?tag=${tag}`}>{tag}</Link></div>
                      })}</div> : <div style={{margin: '20px 0 0 0'}}>{langJSON.translations[langJSON.available.includes(lang) ? lang : 'en']?.noTagsTxt}</div>} {station.tags.split(',').length > 6 && <span title='more tags'>...</span>}
                      <div className='playBtn'><Link href={'/listen/' + generateSlug(station.country) + '-' + generateSlug(station.name) + '-uuid-' + station.stationuuid}><button>▶ {langJSON.translations[langJSON.available.includes(lang) ? lang : 'en']?.playBtn}</button></Link> <StarCanvas stationuuid={station.stationuuid} size={40} color="transparent" strokeColor="#FFA500" strokeWidth={2} /></div>
                  </li>
                })}
            </ul>

            {page === 'search' && <Pagination stations={stations} page={page} name={name} country={country} language={language} tag={tag} pageNum={pageNum} />}
        </div>
    );
};

export default StationList;