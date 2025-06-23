'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './Countries.module.css';

const Countries = ({ countries }) => {
  const allCountriesOption = {
    code: 'ALL',
    name: 'All countries',
    flag: 'https://pnghunter.com/get-logo.php?id=15348',
  };

  const options = [allCountriesOption, ...countries];

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(allCountriesOption);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null); // 👈 создаём ref

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const selectOption = (country) => {
    setSelected(country);
    setSearchTerm('');
    setIsOpen(false);
  };

  const filteredOptions = options.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 👇 useEffect для закрытия по клику вне
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles.selectBox} onClick={toggleDropdown}>
        <div className={styles.selected}>
          <Image
            src={
              selected.code !== 'ALL'
                ? `https://flagsapi.com/${selected.iso_3166_1}/flat/64.png`
                : allCountriesOption.flag
            }
            alt={selected.name}
            title={selected.name}
            width={20}
            height={20}
            placeholder={'empty'}
          />
          <span>{selected.name}</span>
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
          {filteredOptions.map((country) => (
            <div
              key={country.code}
              className={styles.option}
              onClick={() => selectOption(country)}
            >
              <Image
                src={
                  country.code !== 'ALL'
                    ? `https://flagsapi.com/${country.iso_3166_1}/flat/64.png`
                    : allCountriesOption.flag
                }
                alt={country.name}
                width={20}
                height={20}
                placeholder={'empty'}
                title={'empty'}
              />
              <span>{country.name}</span>
            </div>
          ))}
          {filteredOptions.length === 0 && (
            <div className={styles.noResult}>No countries found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Countries;
