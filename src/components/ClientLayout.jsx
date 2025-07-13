'use client';

import Filter from '@/components/Filter/Filter';
import RadioOverlay from './RadioOverlay/RadioOverlay';
import Player from './Listen/Player/Player';

export default function ClientLayout({ children }) {
  return (
    <>
      <Filter />
      {children}
      <Player />
      <RadioOverlay />
    </>
  );
}
