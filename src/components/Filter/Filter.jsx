'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Countries.module.css';
import './Filter.css';
import { useSearchParams } from 'next/navigation';
import countriesJson from '../../../public/docs/mock-api/countries.json';

export default function Filter({ countries, languages, tags }) {
  const searchParams = useSearchParams();
  const [nameVal, setNameVal] = useState(searchParams.get('name') || '');
  const [languageVal, setLanguageVal] = useState(searchParams.get('language') || '');
  const [tagsVal, setTagsVal] = useState(searchParams.get('tag') || '');
  const [strictMatchesOnly, setStrictMode] = useState(searchParams.get('strict') === 'true');

  const allCountriesOption = {
    code: 'ALL',
    name: 'All countries',
    iso_3166_1: 'UN',
    flag: 'https://pnghunter.com/get-logo.php?id=15348',
  };

  const options = [allCountriesOption, ...countries];
  const [selectedCountry, setCountry] = useState(searchParams.get('country') ? countriesJson.find(country => country.name === searchParams.get('country').split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  .join(' ')) : allCountriesOption);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    setStrictMode(false);
  };

  // Сборка строки запроса для <Link href={...}>
  const buildSearchUrl = () => {
    const qs = new URLSearchParams();
    qs.set('strict', strictMatchesOnly);

    if (nameVal.trim()) qs.set('name', nameVal.trim());
    if (languageVal) qs.set('language', languageVal);
    if (tagsVal) qs.set('tag', tagsVal);
    if (selectedCountry.code !== 'ALL') qs.set('country', selectedCountry.name.toLowerCase());

    return `/search?${qs.toString()}`;
  };

  const searchUrl = buildSearchUrl();

  const filteredOptions = options.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Search for a station"
        value={nameVal}
        onChange={(e) => {
          setNameVal(e.target.value);
          setLanguageVal('');
          setTagsVal('');
        }}
      />

      <div className="select-opt">
        {/* --- Country Dropdown --- */}
        <div className={styles.dropdown} ref={dropdownRef}>
          <div className={styles.selectBox} onClick={toggleDropdown}>
            <div className={styles.selected}>
              <Image
                src={
                  selectedCountry.code !== 'ALL'
                    ? `https://flagsapi.com/${selectedCountry.iso_3166_1}/flat/64.png`
                    : allCountriesOption.flag
                }
                alt={selectedCountry.name}
                width={20}
                height={20}
              />
              <span>{selectedCountry.name}</span>
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
                <div
                  key={c.name + i}
                  className={styles.option}
                  onClick={() => selectOption(c)}
                >
                  <Image
                    src={
                      c.code !== 'ALL'
                        ? `https://flagsapi.com/${c.iso_3166_1}/flat/64.png`
                        : allCountriesOption.flag
                    }
                    alt={c.name}
                    width={20}
                    height={20}
                  />
                  <span>{c.name}</span>
                </div>
              ))}
              {filteredOptions.length === 0 && (
                <div className={styles.noResult}>No countries found</div>
              )}
            </div>
          )}
        </div>

        <select value={languageVal} onChange={(e) => setLanguageVal(e.target.value)}>
          <option value="">All languages</option>
          {languages.map((l, i) => (
            <option key={l.iso_639 + i} value={l.iso_639}>
              {l.name}
            </option>
          ))}
        </select>

        <select value={tagsVal} onChange={(e) => setTagsVal(e.target.value)}>
          <option value="">All tags</option>
          {tags.map((t, i) => (
            <option key={t.name + i} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>

        <label className="strict-cb">
          <input
            type="checkbox"
            checked={strictMatchesOnly}
            onChange={(e) => setStrictMode(e.target.checked)}
          />
          Strict matches only
        </label>

        <Link href={searchUrl}>
          <button type="button">Search</button>
        </Link>

        <button type="button" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
