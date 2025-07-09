'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import azFlag from '../../../public/assets/ico/az.png';
import ruFlag from '../../../public/assets/ico/ru.png';
import enFlag from '../../../public/assets/ico/en.png';
import './LangSwitch.css';

const languages = [
  { code: 'en', label: 'English', flag: enFlag },
  { code: 'ru', label: 'Русский', flag: ruFlag },
  { code: 'az', label: 'Azərbaycanca', flag: azFlag },
];

const LangSwitch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  // Определение текущего языка из URL
  const currentLang = (() => {
    const parts = pathname.split('/');
    const langCandidate = parts[1];
    return ['ru', 'az'].includes(langCandidate) ? langCandidate : 'en';
  })();

  // Удаление языкового префикса для формирования базового пути
  const currentPath = (() => {
    const parts = pathname.split('/');
    if (['ru', 'az'].includes(parts[1])) {
      return '/' + parts.slice(2).join('/');
    }
    return pathname;
  })();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeLang = languages.find((l) => l.code === currentLang);

  return (
    <div className="lang-switch-container" ref={dropdownRef}>
      <button className="lang-button" onClick={toggleDropdown}>
        <Image src={activeLang.flag} alt={activeLang.label} title={activeLang.label} width={27} height={20} placeholder="empty" />
        <span className="arrow">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <ul className="lang-dropdown">
          {languages
            .filter((l) => l.code !== currentLang)
            .map((lang) => {
              const href = lang.code === 'en' ? currentPath : `/${lang.code}${currentPath}`;
              return (
                <li key={lang.code} onClick={() => setIsOpen(false)}>
                  <Link href={href}>
                    <Image src={lang.flag} alt={lang.label} title={lang.label} width={27} height={20} placeholder="empty" />
                    <span className="lang-label">{lang.label}</span>
                  </Link>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default LangSwitch;
