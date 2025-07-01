'use client';

import Filter from '@/components/Filter/Filter';
import countries from '../../public/docs/mock-api/countries.json';
import languages from '../../public/docs/mock-api/languages.json';
import tags from '../../public/docs/mock-api/tags.json';

export default function ClientLayout({ children }) {
  return (
    <>
      <Filter countries={countries} languages={languages} tags={tags} />
      {children}
    </>
  );
}
