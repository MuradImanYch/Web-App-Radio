import React from 'react';
import Player from './Player/Player';
import './Listen.css'; // подключаем стили

const topRadio = [
  {
    "changeuuid": "9c558331-be05-4812-b844-fb88d4d6b9cb",
    "stationuuid": "34800c3f-87a1-4e77-932c-21bfc89a325d",
    "serveruuid": "05385b79-1041-472c-a225-9bd5ea9ccc3b",
    "name": "Media Fm 105.5",
    "url": "https://icecast.livetv.az/mediafm",
    "url_resolved": "https://icecast.livetv.az/mediafm",
    "homepage": "https://icecast.livetv.az/mediafm",
    "favicon": "",
    "tags": "",
    "country": "Azerbaijan",
    "countrycode": "AZ",
    "iso_3166_2": "",
    "state": "",
    "language": "azerbaijani",
    "languagecodes": "az",
    "votes": 1346,
    "lastchangetime": "2025-06-13 00:13:57",
    "lastchangetime_iso8601": "2025-06-13T00:13:57Z",
    "codec": "MP3",
    "bitrate": 192,
    "hls": 0,
    "lastcheckok": 1,
    "lastchecktime": "2025-06-24 07:16:00",
    "lastchecktime_iso8601": "2025-06-24T07:16:00Z",
    "lastcheckoktime": "2025-06-24 07:16:00",
    "lastcheckoktime_iso8601": "2025-06-24T07:16:00Z",
    "lastlocalchecktime": "2025-06-24 03:53:19",
    "lastlocalchecktime_iso8601": "2025-06-24T03:53:19Z",
    "clicktimestamp": "2025-06-23 23:09:58",
    "clicktimestamp_iso8601": "2025-06-23T23:09:58Z",
    "clickcount": 30,
    "clicktrend": 0,
    "ssl_error": 0,
    "geo_lat": null,
    "geo_long": null,
    "geo_distance": null,
    "has_extended_info": false
  },
  {
    "changeuuid": "9e8c5269-7ae0-48ef-96b4-b75b84a83469",
    "stationuuid": "98adecf7-2683-4408-9be7-02d3f9098eb8",
    "serveruuid": "8d656655-9d44-4034-99f3-91ab2d94be89",
    "name": "BBC World Service",
    "url": "http://stream.live.vc.bbcmedia.co.uk/bbc_world_service",
    "url_resolved": "http://stream.live.vc.bbcmedia.co.uk/bbc_world_service",
    "homepage": "https://www.bbc.co.uk/programmes/w172xzjgf6lxp7y",
    "favicon": "http://cdn-profiles.tunein.com/s24948/images/logoq.jpg?t=1",
    "tags": "news,talk",
    "country": "The United Kingdom Of Great Britain And Northern Ireland",
    "countrycode": "GB",
    "iso_3166_2": "",
    "state": "",
    "language": "english",
    "languagecodes": "en",
    "votes": 129849,
    "lastchangetime": "2025-06-12 22:14:59",
    "lastchangetime_iso8601": "2025-06-12T22:14:59Z",
    "codec": "MP3",
    "bitrate": 56,
    "hls": 0,
    "lastcheckok": 1,
    "lastchecktime": "2025-06-23 20:40:50",
    "lastchecktime_iso8601": "2025-06-23T20:40:50Z",
    "lastcheckoktime": "2025-06-23 20:40:50",
    "lastcheckoktime_iso8601": "2025-06-23T20:40:50Z",
    "lastlocalchecktime": "2025-06-23 19:36:20",
    "lastlocalchecktime_iso8601": "2025-06-23T19:36:20Z",
    "clicktimestamp": "2025-06-24 06:07:49",
    "clicktimestamp_iso8601": "2025-06-24T06:07:49Z",
    "clickcount": 7667,
    "clicktrend": -153,
    "ssl_error": 0,
    "geo_lat": null,
    "geo_long": null,
    "geo_distance": null,
    "has_extended_info": false
  },
  {
    "changeuuid": "2dbac53b-7d88-4267-b7f7-f04c81e80d02",
    "stationuuid": "d1a54d2e-623e-4970-ab11-35f7b56c5ec3",
    "serveruuid": "0e0984cc-83a8-46cf-a3b4-13e47ea36557",
    "name": "Classic Vinyl HD",
    "url": "https://icecast.walmradio.com:8443/classic",
    "url_resolved": "https://icecast.walmradio.com:8443/classic",
    "homepage": "https://walmradio.com/classic",
    "favicon": "https://icecast.walmradio.com:8443/classic.jpg",
    "tags": "1930,1940,1950,1960,beautiful music,big band,classic hits,crooners,easy,easy listening,hd,jazz,light orchestral,lounge,oldies,orchestral,otr,relaxation,strings,swing,unwind,walm",
    "country": "The United States Of America",
    "countrycode": "US",
    "iso_3166_2": "US-NY",
    "state": "New York NY",
    "language": "english",
    "languagecodes": "en",
    "votes": 196347,
    "lastchangetime": "2025-06-13 04:55:13",
    "lastchangetime_iso8601": "2025-06-13T04:55:13Z",
    "codec": "MP3",
    "bitrate": 320,
    "hls": 0,
    "lastcheckok": 1,
    "lastchecktime": "2025-06-24 05:35:36",
    "lastchecktime_iso8601": "2025-06-24T05:35:36Z",
    "lastcheckoktime": "2025-06-24 05:35:36",
    "lastcheckoktime_iso8601": "2025-06-24T05:35:36Z",
    "lastlocalchecktime": "2025-06-24 05:35:36",
    "lastlocalchecktime_iso8601": "2025-06-24T05:35:36Z",
    "clicktimestamp": "2025-06-24 06:08:12",
    "clicktimestamp_iso8601": "2025-06-24T06:08:12Z",
    "clickcount": 6997,
    "clicktrend": 6,
    "ssl_error": 0,
    "geo_lat": 40.75166,
    "geo_long": -73.97538,
    "geo_distance": null,
    "has_extended_info": true
  },
  {
    "changeuuid": "59bf7291-808a-4ee3-9270-faf9b78baa5e",
    "stationuuid": "78012206-1aa1-11e9-a80b-52543be04c81",
    "serveruuid": "c8b13261-671c-4e5a-98d8-58b7c18d8ae6",
    "name": "MANGORADIO",
    "url": "https://mangoradio.stream.laut.fm/mangoradio",
    "url_resolved": "https://mangoradio.stream.laut.fm/mangoradio",
    "homepage": "https://mangoradio.de/",
    "favicon": "https://mangoradio.de/wp-content/uploads/cropped-Logo-192x192.webp",
    "tags": "music,variety",
    "country": "Germany",
    "countrycode": "DE",
    "iso_3166_2": "DE-RP",
    "state": "Rheinland-Pfalz",
    "language": "german",
    "languagecodes": "DE,EN",
    "votes": 742513,
    "lastchangetime": "2025-06-24 02:33:08",
    "lastchangetime_iso8601": "2025-06-24T02:33:08Z",
    "codec": "MP3",
    "bitrate": 128,
    "hls": 0,
    "lastcheckok": 1,
    "lastchecktime": "2025-06-24 02:33:11",
    "lastchecktime_iso8601": "2025-06-24T02:33:11Z",
    "lastcheckoktime": "2025-06-24 02:33:11",
    "lastcheckoktime_iso8601": "2025-06-24T02:33:11Z",
    "lastlocalchecktime": "2025-06-24 02:33:11",
    "lastlocalchecktime_iso8601": "2025-06-24T02:33:11Z",
    "clicktimestamp": "2025-06-24 06:11:40",
    "clicktimestamp_iso8601": "2025-06-24T06:11:40Z",
    "clickcount": 6419,
    "clicktrend": -116,
    "ssl_error": 0,
    "geo_lat": null,
    "geo_long": null,
    "geo_distance": null,
    "has_extended_info": false
  },
  {
    "changeuuid": "2a506c87-3d80-48ed-a6cd-d76d08bdac86",
    "stationuuid": "5c6c092b-2b8b-4ac1-a8d0-090f87037fd9",
    "serveruuid": "2cb3e012-aa5d-4574-9a4b-fe177e14b713",
    "name": "iraninternational",
    "url": "https://radio.iraninternational.app/iintl_c",
    "url_resolved": "http://n04.radiojar.com/dfnrphnr5f0uv?rj-ttl=5&rj-tok=AAABl5waTIMAGbDgo3THE_enzg",
    "homepage": "https://iranintl.com/",
    "favicon": "https://iranintl.com/favicon.ico",
    "tags": "iran,news,persian",
    "country": "Islamic Republic Of Iran",
    "countrycode": "IR",
    "iso_3166_2": "",
    "state": "",
    "language": "persian",
    "languagecodes": "fa",
    "votes": 68122,
    "lastchangetime": "2025-06-13 07:25:20",
    "lastchangetime_iso8601": "2025-06-13T07:25:20Z",
    "codec": "MP3",
    "bitrate": 0,
    "hls": 0,
    "lastcheckok": 1,
    "lastchecktime": "2025-06-23 09:14:35",
    "lastchecktime_iso8601": "2025-06-23T09:14:35Z",
    "lastcheckoktime": "2025-06-23 09:14:35",
    "lastcheckoktime_iso8601": "2025-06-23T09:14:35Z",
    "lastlocalchecktime": "2025-06-23 09:14:35",
    "lastlocalchecktime_iso8601": "2025-06-23T09:14:35Z",
    "clicktimestamp": "2025-06-24 06:08:35",
    "clicktimestamp_iso8601": "2025-06-24T06:08:35Z",
    "clickcount": 6012,
    "clicktrend": 3,
    "ssl_error": 0,
    "geo_lat": null,
    "geo_long": null,
    "geo_distance": null,
    "has_extended_info": false
  },
  {
    "changeuuid": "aa5f8aeb-1c0f-4441-859d-808f7fe1819d",
    "stationuuid": "9617a958-0601-11e8-ae97-52543be04c81",
    "serveruuid": "c9535fed-5044-429b-9ada-16cf61243efc",
    "name": "Radio Paradise Main Mix (EU) 320k AAC",
    "url": "http://stream-uk1.radioparadise.com/aac-320",
    "url_resolved": "http://stream-uk1.radioparadise.com/aac-320",
    "homepage": "https://radioparadise.com/",
    "favicon": "https://radioparadise.com/apple-touch-icon.png",
    "tags": "california,eclectic,free,internet,non-commercial,paradise,radio",
    "country": "The United States Of America",
    "countrycode": "US",
    "iso_3166_2": "US-CA",
    "state": "California",
    "language": "english",
    "languagecodes": "EN",
    "votes": 239647,
    "lastchangetime": "2025-06-23 23:22:25",
    "lastchangetime_iso8601": "2025-06-23T23:22:25Z",
    "codec": "AAC",
    "bitrate": 320,
    "hls": 0,
    "lastcheckok": 1,
    "lastchecktime": "2025-06-23 23:22:33",
    "lastchecktime_iso8601": "2025-06-23T23:22:33Z",
    "lastcheckoktime": "2025-06-23 23:22:33",
    "lastcheckoktime_iso8601": "2025-06-23T23:22:33Z",
    "lastlocalchecktime": "2025-06-23 10:33:27",
    "lastlocalchecktime_iso8601": "2025-06-23T10:33:27Z",
    "clicktimestamp": "2025-06-24 06:10:07",
    "clicktimestamp_iso8601": "2025-06-24T06:10:07Z",
    "clickcount": 5853,
    "clicktrend": -28,
    "ssl_error": 0,
    "geo_lat": 40.785114,
    "geo_long": -124.183922,
    "geo_distance": null,
    "has_extended_info": false
  },
  {
    "changeuuid": "accfc78a-04bd-437d-9867-0641faf757d6",
    "stationuuid": "1c3e8be2-5b14-4933-bad3-87cbc227cba4",
    "serveruuid": "047671d1-8b7d-4aa8-8d6e-d27bddd5766e",
    "name": "Deutschlandfunk | DLF | MP3 128k",
    "url": "https://st01.sslstream.dlf.de/dlf/01/128/mp3/stream.mp3?aggregator=web",
    "url_resolved": "https://f111.rndfnk.com/ard/dlf/01/mp3/128/stream.mp3?aggregator=web&cid=01FBPWZ12X2XN8SDSMBZ7X0ZTT&sid=2yvvKk0UoVcbaQIHWpJtFx86sRj&token=NujhnaL3PKzCOq4oRNksaX5LBM3IZKCPfklyjRVzaKQ&tvf=CfJjh03pSxhmMTExLnJuZGZuay5jb20",
    "homepage": "https://www.deutschlandfunk.de/",
    "favicon": "https://www.deutschlandfunk.de/static/img/deutschlandfunk/icons/apple-touch-icon-128x128.png",
    "tags": "culture,news,public service,information",
    "country": "Germany",
    "countrycode": "DE",
    "iso_3166_2": "DE-BE",
    "state": "Berlin",
    "language": "german",
    "languagecodes": "DE",
    "votes": 6404,
    "lastchangetime": "2025-06-24 01:16:54",
    "lastchangetime_iso8601": "2025-06-24T01:16:54Z",
    "codec": "MP3",
    "bitrate": 128,
    "hls": 0,
    "lastcheckok": 1,
    "lastchecktime": "2025-06-24 01:16:56",
    "lastchecktime_iso8601": "2025-06-24T01:16:56Z",
    "lastcheckoktime": "2025-06-24 01:16:56",
    "lastcheckoktime_iso8601": "2025-06-24T01:16:56Z",
    "lastlocalchecktime": "2025-06-24 01:16:56",
    "lastlocalchecktime_iso8601": "2025-06-24T01:16:56Z",
    "clicktimestamp": "2025-06-24 06:14:36",
    "clicktimestamp_iso8601": "2025-06-24T06:14:36Z",
    "clickcount": 5501,
    "clicktrend": 11,
    "ssl_error": 0,
    "geo_lat": 52.4802578,
    "geo_long": 13.3347639,
    "geo_distance": null,
    "has_extended_info": false
  }
];

function generateSlug(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const Listen = ({pathname}) => {
    const found = topRadio.find((station) => {
    const fullSlug = `${generateSlug(station.country)}-${generateSlug(station.name)}`;
        return fullSlug === pathname;
    });

  if (!found) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Station is not found</h1>
        <p>Find by: <code>{pathname}</code></p>
      </div>
    );
  } 
  
    return (
        <div className='listen-container'>
            <h1 style={{marginTop: '40px'}}>{found.name}</h1>
            <span style={{textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px', color: 'silver'}}>
              {found.country && `${found.country} • `}
              {found.state && `${found.state} • `}
              {found.language && `${found.language}`}
            </span>
            <div className="tags">
              {found.tags && found.tags.split(',').map((tag, i) => (
                <div key={tag + '-' + i} className="tag">{tag}</div>
              ))}
            </div>
            <Player url={found.url_resolved} />
        </div>
    );
};

export default Listen;