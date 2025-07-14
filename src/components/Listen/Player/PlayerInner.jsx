'use client';

import { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { usePlayerStore } from '@/utils/store/playerStore';
import PlayPause from './PlayPause/PlayPause';
import './Player.css';

export default function PlayerInner({ station }) {
  const { isPlaying, togglePlay } = usePlayerStore();

  /* локальное состояние */
  const [volume, setVolume] = useState(0.8);
  const [ready, setReady] = useState(false);
  const [playerKey, setPlayerKey] = useState(0);           // ⭐
  const [shouldReconnect, setShouldReconnect] = useState(false);
  const playerRef = useRef(null);

  /* ------------------ НОВОЕ: единая кнопка Play/Pause ------------------ */
  const handleToggle = () => {
    if (!isPlaying) {
      // пользователь переводит «Pause → Play» → перезапускаем ключ,
      // чтобы ReactPlayer размонтировался и стартовал «с живой точки»
      setPlayerKey((k) => k + 1);
    }
    togglePlay();
  };

  /* ------------------ авто‑реконнект при ошибке / ended ---------------- */
  const handleError = () => setShouldReconnect(true);
  const handleEnded = () => setShouldReconnect(true);

  useEffect(() => {
    if (shouldReconnect && isPlaying) {
      const t = setTimeout(() => {
        setPlayerKey((k) => k + 1); // тоже live‑рестарт
        setShouldReconnect(false);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [shouldReconnect, isPlaying]);

  /* ------------------------- JSX ------------------------- */
  return (
    <div className="player-wrapper">
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

      {ready && (
        <ReactPlayer
          key={playerKey}
          ref={playerRef}
          url={station.url}
          playing={isPlaying}
          volume={volume}
          width="0"
          height="0"
          onError={handleError}
          onEnded={handleEnded}
        />
      )}

      {/* скрытый "pre‑loader" для более мягкого старта */}
      <ReactPlayer
        url={station.url}
        playing={false}
        onReady={() => setReady(true)}
        muted
        width="0"
        height="0"
        style={{ display: 'none' }}
      />
    </div>
  );
}
