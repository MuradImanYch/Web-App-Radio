import React from 'react';
import Player from './Player/Player';
import './Listen.css';
import generateSlug from '../../utils/generateSlug';
import StationList from '../StationList/StationList';
import stations from '../../../public/docs/mock-api/stations.json';
import Link from 'next/link';

const Listen = ({pathname}) => {
    const found = stations.find((station) => {
    const fullSlug = `${generateSlug(station.country)}-${generateSlug(station.name)}`;
        return fullSlug === pathname;
    });

  if (!found) {
    return (
      <div>
        <h1>Station is not found</h1>
        <p>Find by: <code>{pathname}</code></p>
      </div>
    );
  } 
  
    return (
        <div className='listen-container'>
            <h1 style={{marginTop: '40px'}}>{found.name}</h1>
            <span style={{textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px', color: 'silver'}}>
              {found.country && found.countrycode + ' ' + `${found.country} • `}
              {found.state && `${found.state} • `}
              {found.language && `${found.language}`}
            </span>
            <div className="tags">
              {found.tags ? found.tags.split(',').map((tag, i) => (
                <div key={tag + '-' + i} className="tag"><Link href={`/search?strict=false&tag=${tag}`}>{tag}</Link></div>
              )) : <div className='notag'>No tags available</div>}
            </div>
            <Player url={found.url_resolved} />
            <h2>Similar radio stations</h2>
            <StationList stations={stations} />
        </div>
    );
};

export default Listen;