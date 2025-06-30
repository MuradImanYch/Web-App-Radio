import React from 'react';
import Player from './Player/Player';
import './Listen.css';
import generateSlug from '../../utils/generateSlug';
import StationList from '../StationList/StationList';
import topRadio from '../../../public/docs/mock-api/topclick.json';
import Link from 'next/link';

const Listen = ({pathname}) => {
    const found = topRadio.find((station) => {
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
                <div key={tag + '-' + i} className="tag"><Link href={'#'}>{tag}</Link></div>
              )) : <div className='notag'>No tags available</div>}
            </div>
            <Player url={found.url_resolved} />
            <h2>Similar radio stations</h2>
            <StationList stations={topRadio} />
        </div>
    );
};

export default Listen;