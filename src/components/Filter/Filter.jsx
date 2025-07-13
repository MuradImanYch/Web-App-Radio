'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Countries.module.css';
import './Filter.css';
import { useSearchParams, usePathname } from 'next/navigation';
import fallbackTags from '../../../public/assets/docs/mock-api/tags.json';
import fallbackLanguages from '../../../public/assets/docs/mock-api/languages.json';
import fallbackCountries from '../../../public/assets/docs/mock-api/countries.json';
import langJSON from '../../../public/assets/docs/languages.json';

export default function Filter() {
  const searchParams = useSearchParams();
  const [nameVal, setNameVal] = useState(searchParams.get('name') || '');
  const [languageVal, setLanguageVal] = useState(searchParams.get('language') || '');
  const [tagsVal, setTagsVal] = useState(searchParams.get('tag') || '');
  const [tags, setTags] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [countries, setCountries] = useState([]);
  const pathname = usePathname();

  const lang = langJSON.available.includes(pathname.split('/')[1]) ? pathname.split('/')[1] : 'en';

  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch(`https://de1.api.radio-browser.info/json/tags`, { cache: 'no-cache' });
        if (!res.ok) throw new Error('Response not OK');
        const data = await res.json();
        setTags(Array.isArray(data) && data.length > 0 ? data : fallbackTags);
      } catch {
        setTags(fallbackTags);
      }
    }

    async function fetchLanguage() {
      try {
        const res = await fetch(`https://de1.api.radio-browser.info/json/languages`, { cache: 'no-cache' });
        if (!res.ok) throw new Error('Bad response');
        const data = await res.json();
        setLanguages(Array.isArray(data) && data.length > 0 ? data : fallbackLanguages);
      } catch {
        setLanguages(fallbackLanguages);
      }
    }

    async function fetchCountries() {
      try {
        const res = await fetch(`https://de1.api.radio-browser.info/json/countries`, { cache: 'no-cache' });
        if (!res.ok) throw new Error('Bad response');
        const data = await res.json();
        setCountries(Array.isArray(data) && data.length > 0 ? data : fallbackCountries);
      } catch {
        setCountries(fallbackCountries);
      }
    }

    fetchTags();
    fetchLanguage();
    fetchCountries();
  }, []);

  const allCountriesOption = {
    name: langJSON.translations[lang]?.allCountries,
    iso_3166_1: 'ALL',
    flag: 'https://pnghunter.com/get-logo.php?id=15348',
  };

  const options = [allCountriesOption, ...countries];
  const [selectedCountry, setCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (countries.length === 0) return;
    const countryParam = searchParams.get('country');
    if (countryParam) {
      const formatted = countryParam
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      const found = countries.find(c => c.name === formatted);
      setCountry(found || allCountriesOption);
    } else {
      setCountry(allCountriesOption);
    }
  }, [countries, searchParams]);

  const toggleDropdown = () => setIsOpen(prev => !prev);
  const selectOption = (country) => {
    setCountry(country);
    setSearchTerm('');
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const reset = () => {
    setNameVal('');
    setLanguageVal('');
    setTagsVal('');
    setCountry(allCountriesOption);
  };

  const buildSearchUrl = () => {
    const qs = new URLSearchParams();
    if (nameVal.trim()) qs.set('name', nameVal.trim());
    if (languageVal) qs.set('language', languageVal);
    if (tagsVal) qs.set('tag', tagsVal);
    if (selectedCountry?.iso_3166_1 !== 'ALL') qs.set('country', selectedCountry?.name.toLowerCase());
    return `${lang !== 'en' ? '/' + lang : ''}/search?${qs.toString()}`;
  };

  const searchUrl = buildSearchUrl();
  const filteredOptions = options.filter(c => c?.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="filter">
      <input
        type="text"
        placeholder={langJSON.translations[lang]?.filterInputPH}
        value={nameVal}
        onChange={(e) => setNameVal(e.target.value)}
      />

      <div className="select-opt">
        <div className={styles.dropdown} ref={dropdownRef}>
          <div className={styles.selectBox} onClick={toggleDropdown}>
            <div className={styles.selected}>
              <Image
                src={selectedCountry?.iso_3166_1 !== 'ALL' ? `https://flagsapi.com/${selectedCountry?.iso_3166_1}/flat/64.png` : allCountriesOption.flag}
                alt={selectedCountry?.name || 'Undefined country'}
                title={selectedCountry?.name || 'Undefined country'}
                width={20}
                height={20}
              />
              <span>{selectedCountry?.name}</span>
            </div>
            <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
          </div>

          {isOpen && (
            <div className={styles.options}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {filteredOptions.map((c, i) => (
                <div key={c?.name + i} className={styles.option} onClick={() => selectOption(c)}>
                  <Image
                    src={c?.iso_3166_1 !== 'ALL' ? `https://flagsapi.com/${c?.iso_3166_1}/flat/64.png` : allCountriesOption.flag}
                    alt={c?.name || 'Undefined country'}
                    title={c?.name || 'Undefined country'}
                    width={20}
                    height={20}
                  />
                  <span>{c?.name}</span>
                </div>
              ))}
              {filteredOptions.length === 0 && (
                <div className={styles.noResult}>No countries found</div>
              )}
            </div>
          )}
        </div>

        <select value={languageVal} onChange={(e) => setLanguageVal(e.target.value)}>
          <option value="">{langJSON.translations[lang]?.allLanguages}</option>
          {languages.map((l, i) => (
            <option key={l.iso_639 + i} value={l.iso_639}>{l?.name}</option>
          ))}
        </select>

        <select value={tagsVal} onChange={(e) => setTagsVal(e.target.value)}>
          <option value="">{langJSON.translations[lang]?.allTags}</option>
          {tags.map((t, i) => (
            <option key={t?.name + i} value={t?.name}>{t?.name}</option>
          ))}
        </select>

        <Link href={nameVal || languageVal || tagsVal || selectedCountry?.iso_3166_1 !== 'ALL' ? searchUrl : '#'} className="search-btn">
          <button type="button">{langJSON.translations[lang]?.searchBtn}</button>
        </Link>

        <button type="button" onClick={reset}>{langJSON.translations[lang]?.resetBtn}</button>
      </div>
    </div>
  );
}
