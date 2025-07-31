'use client';

import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { usePlayerStore } from '@/utils/store/playerStore';
import PlayPause from './PlayPause/PlayPause';
import './Player.css';

export default function PlayerInner({ station }) {
  const { isPlaying, handleToggle, playerKey } = usePlayerStore();
  const [volume, setVolume] = useState(0.8);
  const [ready, setReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldReconnect, setShouldReconnect] = useState(false);
  const playerRef = useRef(null);

  // Reconnect stream on error
  useEffect(() => {
    if (shouldReconnect && isPlaying) {
      const t = setTimeout(() => {
        usePlayerStore.setState((s) => ({
          playerKey: s.playerKey + 1,
        }));
        setShouldReconnect(false);
        setIsLoading(true);
        setReady(false);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [shouldReconnect, isPlaying]);

  // Start playing after ready
  useEffect(() => {
    if (ready && isPlaying) {
      playerRef.current?.getInternalPlayer()?.play?.();
    }
  }, [ready, isPlaying]);

  return (
    <div className="player-wrapper">
      <div className="circle-volume">
        <div
          className={`circle ${!isLoading ? 'playing' : ''}`}
          onClick={handleToggle}
        >
          <div
            className={`bgImg ${!isLoading ? 'rotating' : ''}`}
            style={{
              backgroundImage: `url(${station.favicon})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div className="play-button">
            {isLoading ? (
              <div className="loader" />
            ) : (
              <PlayPause isPlaying={isPlaying} />
            )}
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

      {/* Поток аудио */}
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
              forceAudio: true,
              attributes: { preload: 'auto', playsInline: true },
            },
          }}
          onError={() => setShouldReconnect(true)}
          onEnded={() => setShouldReconnect(true)}
          onStart={() => setIsLoading(false)}
        />
      )}

      {/* Промежуточный "скрытый" preload-плеер */}
      {!ready && (
        <ReactPlayer
          url={station.url}
          playing={false}
          muted
          width="0"
          height="0"
          style={{ display: 'none' }}
          onReady={() => {
            setReady(true);
            setIsLoading(false);
          }}
        />
      )}
    </div>
  );
}
