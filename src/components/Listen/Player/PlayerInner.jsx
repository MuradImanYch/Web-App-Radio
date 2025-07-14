'use client';

import { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { usePlayerStore } from '@/utils/store/playerStore';
import PlayPause from './PlayPause/PlayPause';
import './Player.css';

export default function PlayerInner({ station }) {
  const { isPlaying, handleToggle, playerKey } = usePlayerStore();  // ← берём из store
  const [volume, setVolume] = useState(0.8);
  const [ready, setReady] = useState(false);
  const [shouldReconnect, setShouldReconnect] = useState(false);
  const playerRef = useRef(null);

  /* авто‑реконнект при ошибке */
  useEffect(() => {
    if (shouldReconnect && isPlaying) {
      const t = setTimeout(() => {
        // bump key → «живой» рестарт
        usePlayerStore.setState((s) => ({ playerKey: s.playerKey + 1 }));
        setShouldReconnect(false);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [shouldReconnect, isPlaying]);

  return (
    <div className="player-wrapper">
      {/* UI‑часть */}
      <div className="circle-volume">
        <div
          className={`circle ${isPlaying ? 'playing' : ''}`}
          onClick={handleToggle}
        >
          <div
            className={`bgImg ${isPlaying ? 'rotating' : ''}`}
            style={{
              backgroundImage: `url(${station.favicon})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div className="play-button">
            <PlayPause isPlaying={isPlaying} />
          </div>
          <div className="equalizer"><span /><span /><span /><span /></div>
        </div>

        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(+e.target.value)}
          className="volume-slider"
        />
      </div>

      {/* сам поток */}
      {ready && (
        <ReactPlayer
          key={playerKey}
          ref={playerRef}
          url={station.url}
          playing={isPlaying}
          volume={volume}
          width="0"
          height="0"
          config={{
            file: {
              forceAudio: true,          // быстрее и легче
              attributes: { preload: 'none', playsInline: true },
            },
          }}
          onError={() => setShouldReconnect(true)}
          onEnded={() => setShouldReconnect(true)}
        />
      )}

      {/* «скрытый» предварительный плеер, чтобы .onReady сработал раньше */}
      <ReactPlayer
        url={station.url}
        playing={false}
        muted
        width="0"
        height="0"
        style={{ display: 'none' }}
        onReady={() => setReady(true)}
      />
    </div>
  );
}
