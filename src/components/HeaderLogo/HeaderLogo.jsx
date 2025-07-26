'use client';

import { usePathname } from 'next/navigation';
import Image           from 'next/image';
import Link            from 'next/link';

import logo     from '../../../public/assets/ico/logo.webp';
import langJSON from '../../../public/assets/docs/languages.json';

const HeaderLogo = () => {
  /* ---------- определяем язык из URL ---------- */
  const pathname     = usePathname();            // например "/az/listen/..."
  const firstSegment = pathname.split('/')[1];   // "az" | "" | undefined
  const isLangValid  = langJSON.available.includes(firstSegment);
  // корневая ссылка: "/az" или "/" (если язык нераспознан)
  const rootHref     = isLangValid ? `/${firstSegment}` : '/';

  /* ---------- render ---------- */
  return (
    <div className="header-logo">
      <Link href={rootHref} className="logo">
        <Image
          src={logo}
          alt="Legendary radio"
          title="Legendary radio"
          width={130}
          height={75}
          placeholder="empty"
        />
      </Link>
    </div>
  );
};

export default HeaderLogo;
