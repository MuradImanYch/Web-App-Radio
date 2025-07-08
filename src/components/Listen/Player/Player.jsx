'use client';

import { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import './Player.css';
import PlayPause from './PlayPause/PlayPause';

const Player = ({ url, favicon }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [ready, setReady] = useState(false);
  const [playerKey, setPlayerKey] = useState(0);
  const [shouldReconnect, setShouldReconnect] = useState(false);
  const playerRef = useRef(null);

  const togglePlay = () => {
    if (!isPlaying) {
      setPlayerKey(prev => prev + 1); // Перезапуск потока
    }
    setIsPlaying(prev => !prev);
  };

  const handleError = (e) => {
    console.warn('Player error:', e);
    if (isPlaying) {
      setShouldReconnect(true); // Запустить реконнект позже
    }
  };

  const handleEnded = () => {
    console.warn('Stream ended');
    if (isPlaying) {
      setShouldReconnect(true); // Запустить реконнект
    }
  };

  useEffect(() => {
    if (shouldReconnect) {
      const timeout = setTimeout(() => {
        setPlayerKey(prev => prev + 1); // Пересоздать плеер
        setShouldReconnect(false);
      }, 3000); // Подождать 3 секунды

      return () => clearTimeout(timeout);
    }
  }, [shouldReconnect]);

  return (
    <div className="player-wrapper">
      <div className="circle-volume">
        <div
          className={`circle ${isPlaying ? 'playing' : ''}`}
          onClick={togglePlay}
        >
          <div
            className={`bgImg ${isPlaying ? 'rotating' : ''}`}
            style={{
              backgroundImage: `url(${favicon})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>

          <div className="play-button">
            <PlayPause isPlaying={isPlaying} />
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
          key={playerKey}
          ref={playerRef}
          url={url}
          playing={isPlaying}
          volume={volume}
          controls={false}
          width="0"
          height="0"
          onError={handleError}
          onEnded={handleEnded}
        />
      )}

      <ReactPlayer
        url={url}
        playing={false}
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
