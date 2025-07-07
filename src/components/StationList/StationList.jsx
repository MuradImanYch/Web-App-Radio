import Image from 'next/image';
import Link from 'next/link';
import './StationList.css';
import generateSlug from '../../utils/generateSlug';

const StationList = ({stations}) => {
    return (
        <div className="station-list">
            <ul className="station-list">
                {stations.slice(0, 30).map((station) => {
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
                            title={station?.name || 'No name'}
                            alt={station?.name || 'Unknown station'}
                            placeholder={'empty'}
                            quality={100}
                        />
                        ) : (
                        <Image
                            width={90}
                            height={90}
                            src="https://pnghunter.com/get-logo.php?id=15348" // Убедись, что такой файл есть в public/
                            title="No image"
                            alt="Fallback image"
                            placeholder={'empty'}
                            quality={100}
                        />
                        )}
                        <div className='station-info-wrap'>
                            <h3 className={`station-name ${station?.name.length > 27 && 'marquee'}`}>{station?.name || 'Unknown station'}</h3>
                            
                            <p className="station-meta">
                                <span className="station-country">
                                <strong>Country:</strong> <Image className='country-flag-card' src={`https://flagsapi.com/${station.countrycode}/flat/64.png`} width={22}
                                height={22} alt={station.country || 'Unknown country'} title={station.country || 'Unknown country'} placeholder={'empty'} quality={100} /> {station.country || 'Unknown country'}
                                </span>
                                <br />
                                <span className="station-language">
                                <strong>Language:</strong> {station.language || 'Unknown language'}
                                </span>
                            </p>
                        </div>
                      </div>
                      {station.tags ? <div className="station-tags"><span>Tags:</span> {station.tags.split(',').map((tag, i) => {
                        return <div key={tag + '-' + i} className="tag"><Link href={`/search?tag=${tag}`}>{tag}</Link></div>
                      })}</div> : <div style={{margin: '20px 0 0 0'}}>No tags available</div>} {station.tags.split(',').length > 6 && <span title='more tags'>...</span>}
                      <div className='playBtn'><Link href={'/listen/' + generateSlug(station.country) + '-' + generateSlug(station.name) + '-uuid-' + station.stationuuid}><button>▶ Play</button></Link></div>
                  </li>
                })}
            </ul>
        </div>
    );
};

export default StationList;