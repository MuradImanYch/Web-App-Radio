'use client';

import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import './Player.css'; // подключаем стили

const Player = ({ url, favicon }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [ready, setReady] = useState(false);
  const playerRef = useRef(null);

  const togglePlay = () => setIsPlaying(prev => !prev);

  return (
    <div className="player-wrapper">
      <div className='circle-volume'>
        <div className={`circle ${isPlaying ? 'playing' : ''}`} onClick={togglePlay}>
          <div className="bgImg" style={{
    backgroundImage: `url(${favicon})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}></div>
        <div className="play-button">
          {isPlaying ? <div className='pause'>⏸</div> : <div className='play'>▶</div>}
        </div>
        
        <div className="equalizer">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="volume-slider"
        />
      </div>

      {ready && (
        <ReactPlayer
          ref={playerRef}
          url={url}
          playing={isPlaying}
          volume={volume}
          controls={false}
          width="0"
          height="0"
        />
      )}

      <ReactPlayer
        url={url}
        playing={false} // чтобы компонент смонтировался и был "ready"
        onReady={() => setReady(true)}
        muted
        width="0"
        height="0"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default Player;
