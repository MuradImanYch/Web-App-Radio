// Player.jsx
'use client';

import { usePlayerStore } from '@/utils/store/playerStore';
import PlayerInner from './PlayerInner';

export default function Player() {
  const { currentStation } = usePlayerStore();

  // Если нет станции — ничего не рендерим
  if (!currentStation) return null;

  return <PlayerInner station={currentStation} />;
}
