import Image from 'next/image';
import radioIco from '../../../public/radioIco.png'
import Link from 'next/link';
import './StationList.css';
import generateSlug from '../../utils/generateSlug';

const StationList = ({stations}) => {
    return (
        <div className="station-list">
            <ul className="station-list">
                {stations.map((station) => {
                  return <li className="station-item" key={station.stationuuid}>
                      <div className="top">
                          <Image width={100} height={100} src={radioIco} title={station.name} alt={station.name} placeholder={'empty'} />
                          <p>
                              {station.name ? <span className="station-name">{station.name}</span> : <span className="station-name">Unknown station</span>}
                              {station.country ? <span className="station-country"><span>Country: </span> {station.countrycode + ' ' + station.country}</span> : <span className="station-country">Unknown country</span>}
                              {station.language ? <span className="station-language"><span>Language:</span> {station.language}</span> : <span className="station-language">Unknown language</span>}
                          </p>
                      </div>
                      {station.tags ? <span className="station-tags"><span>Tags:</span> {station.tags.split(',').map((tag, i) => {
                        return <div key={tag + '-' + i} className="tag"><Link href="#">{tag}</Link></div>
                      })}</span> : <div style={{margin: '20px 0 0 0'}}>No tags available</div>}
                      <div className='playBtn'><Link href={'/listen/' + generateSlug(station.country) + '-' + generateSlug(station.name)}><button>▶ Play</button></Link></div>
                      {/* <audio controls>
                      <source src={station.url_resolved} type="audio/mpeg" />
                      Your browser does not support audio.
                      </audio> */}
                  </li>
                })}
            </ul>
        </div>
    );
};

export default StationList;