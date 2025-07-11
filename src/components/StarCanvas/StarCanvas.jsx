'use client'

import React, { useRef, useEffect, useState } from 'react';
import langJSON from '../../../public/assets/docs/languages.json';
import { usePathname } from 'next/navigation';

const StarCanvas = ({
  size = 24,
  color = 'transparent',
  hoverColor = '#FFD700',
  strokeColor = 'orange',
  strokeWidth = 1.5,
  stationuuid,
  place
}) => {
  const canvasRef = useRef(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const currentColor = useRef(color);
  const pathname = usePathname();

  // Функция рисования звезды
  const drawStar = (ctx, cx, cy, spikes, outerRadius, innerRadius, fillColor) => {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
  };

  // Рисуем звезду с нужным цветом
  const draw = (fillColor) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    drawStar(ctx, canvas.width / 2, canvas.height / 2, 5, canvas.width / 2 - 2, canvas.width / 4, fillColor);
  };

  // При монтировании проверяем, есть ли stationuuid в localStorage
  useEffect(() => {
  if (place === 'header-fav-ico') {
    currentColor.current = '#FFA500';
    draw(currentColor.current);
    return;
  }
  try {
    const saved = localStorage.getItem('favoriteUuids');
    const arr = saved ? JSON.parse(saved) : [];
    const fav = arr.includes(stationuuid);
    setIsFavorite(fav);
    currentColor.current = fav ? hoverColor : color;
    draw(currentColor.current);
  } catch {
    currentColor.current = color;
    draw(currentColor.current);
  }
}, [stationuuid, color, hoverColor, place]);

  // Обработчики hover — меняем цвет при наведении (если не в избранном)
  useEffect(() => {
  if (place === 'header-fav-ico') return; // отключаем hover вообще

  const canvas = canvasRef.current;
  if (!canvas) return;

  const handleMouseEnter = () => {
    if (!isFavorite) {
      currentColor.current = hoverColor;
      draw(currentColor.current);
    }
  };

  const handleMouseLeave = () => {
    if (!isFavorite) {
      currentColor.current = color;
      draw(currentColor.current);
    }
  };

  canvas.addEventListener('mouseenter', handleMouseEnter);
  canvas.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    canvas.removeEventListener('mouseenter', handleMouseEnter);
    canvas.removeEventListener('mouseleave', handleMouseLeave);
  };
}, [color, hoverColor, isFavorite, place]);

  // При клике добавляем/удаляем из localStorage и меняем состояние
  const addUuid = () => {
  if (place === 'header-fav-ico') return; // ничего не делаем

  try {
    const saved = localStorage.getItem('favoriteUuids');
    let arr = saved ? JSON.parse(saved) : [];

    if (!arr.includes(stationuuid)) {
      arr.push(stationuuid);
      setIsFavorite(true);
      currentColor.current = hoverColor;
    } else {
      arr = arr.filter(id => id !== stationuuid);
      setIsFavorite(false);
      currentColor.current = color;
    }
    localStorage.setItem('favoriteUuids', JSON.stringify(arr));
    window.dispatchEvent(new Event('favoriteUuidsChanged'));
    draw(currentColor.current);
  } catch (e) {
    console.error('Error with localStorage', e);
  }
};

  return (
    <canvas
    className='star-canvas'
  onClick={addUuid}
  title={place === 'header-fav-ico' ? langJSON.translations[langJSON.available.includes(pathname.split('/')[1]) ? pathname.split('/')[1] : 'en']?.favoritesBtn : langJSON.translations[langJSON.available.includes(pathname.split('/')[1]) ? pathname.split('/')[1] : 'en']?.setAsFavorite}
  ref={canvasRef}
  width={place === 'header-fav-ico' ? size * 1.3 : size}
  height={place === 'header-fav-ico' ? size * 1.3 : size}
  style={{
    display: 'block',
    cursor: 'pointer'
  }}
/>
  );
};

export default StarCanvas;
