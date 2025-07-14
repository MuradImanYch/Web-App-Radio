'use client';

import { usePathname } from 'next/navigation';
import Filter from '@/components/Filter/Filter';
import RadioOverlay from './RadioOverlay/RadioOverlay';
import Player from './Listen/Player/Player';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isListenPage = pathname.includes('/listen');

  return (
    <>
      <Filter />
      {children}
      {!isListenPage && <Player />}
      <RadioOverlay />
    </>
  );
}
