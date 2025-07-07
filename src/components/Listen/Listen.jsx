import React from 'react';
import Player from './Player/Player';
import './Listen.css';
import StationList from '../StationList/StationList';
import fallbackStations from '../../../public/docs/mock-api/stations.json';
import Link from 'next/link';
import Image from 'next/image';

const Listen = async ({pathname}) => {
  async function fetchStationByUUID() {
    try {
      const res = await fetch(`https://de1.api.radio-browser.info/json/stations/byuuid/${pathname.split('uuid-')[1]}`, {cache: 'no-cache'});
      return await res.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  }
  async function fetchStations() {
    try {
      const res = await fetch(`https://de1.api.radio-browser.info/json/stations`, {cache: 'no-cache'});
      return await res.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  const found = await fetchStationByUUID();
  const stations = await fetchStations();

  if (!found) {
    return (
      <div>
        <h1 style={{margin: '40px 0 0 0'}}>Station is not found</h1>
        <p>Find by: <code>{pathname}</code></p>
      </div>
    );
  } 

  const selectedTags = found[0]?.tags?.toLowerCase().split(',').map(tag => tag.trim()) || [];

  const similar = stations
    .filter(station => station.stationuuid !== found[0].stationuuid)
    .map(station => {
      const stationTags = station.tags?.toLowerCase().split(',').map(tag => tag.trim()) || [];
      const matchCount = selectedTags.filter(tag => stationTags.includes(tag)).length;
      return { ...station, matchCount };
    })
    .filter(station => station.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount);
  
    return (
        <div className='listen-container'>
            <h1 style={{marginTop: '40px'}}>{found[0]?.name}</h1>
            <span style={{textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px', color: 'silver'}}>
              {found[0].country && (
                <>
                  <Image
                    className='country-flag'
                    src={`https://flagsapi.com/${found[0].countrycode}/flat/64.png`}
                    alt={found[0].country}
                    title={found[0].country}
                    placeholder='empty'
                    width={22}
                    height={22}
                  />
                  {found[0].country} •
                </>
              )}
              {found[0].state && `${found[0].state} • `}
              {found[0].language && `${found[0].language}`}
            </span>
            <div className="tags">
              {found[0].tags ? found[0].tags.split(',').map((tag, i) => (
                <div key={tag + '-' + i} className="tag"><Link href={`/search?tag=${tag}`}>{tag}</Link></div>
              )) : <div className='notag'>No tags available</div>}
            </div>
            <Player url={found[0].url_resolved} favicon={found[0]?.favicon} />
            <h2>Similar radio stations</h2>
            <StationList stations={similar} />
        </div>
    );
};

export default Listen;