'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();
  const dropdownRef = useRef(null);

  // Текущий язык
  const currentLang = (() => {
    const parts = pathname.split('/');
    const firstSegment = parts[1];
    return ['ru', 'az'].includes(firstSegment) ? firstSegment : 'en';
  })();

  // Путь без языкового префикса
  const currentPath = (() => {
    const parts = pathname.split('/');
    if (['ru', 'az'].includes(parts[1])) {
      const rest = parts.slice(2).join('/');
      return '/' + rest;
    }
    return pathname;
  })();

  // Текущие query параметры в строку
  const queryString = searchParams.toString();
  // Добавим ? если есть параметры
  const query = queryString ? `?${queryString}` : '';

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
      <button className="lang-button" onClick={toggleDropdown} type="button">
        <Image
          src={activeLang.flag}
          alt={activeLang.label}
          title={activeLang.label}
          width={27}
          height={20}
          placeholder="empty"
        />
        <span className="arrow">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <ul className="lang-dropdown">
          {languages
            .filter((l) => l.code !== currentLang)
            .map((lang) => {
              // Формируем href с языковым префиксом + query
              const baseHref = lang.code === 'en' ? currentPath : `/${lang.code}${currentPath}`;
              const href = `${baseHref}${query}`;

              return (
                <li key={lang.code} onClick={() => setIsOpen(false)}>
                  <Link href={href}>
                      <Image
                        src={lang.flag}
                        alt={lang.label}
                        title={lang.label}
                        width={27}
                        height={20}
                        placeholder="empty"
                      />
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
