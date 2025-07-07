'use client';

import Filter from '@/components/Filter/Filter';

export default function ClientLayout({ children }) {
  return (
    <>
      <Filter />
      {children}
    </>
  );
}
