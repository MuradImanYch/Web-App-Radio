'use client';

import { useState, useRef, useEffect } from 'react';
import './Filter.css';
import Image from 'next/image';
import styles from './Countries.module.css';

const Filter = ({ countries, languages, tags }) => {
    const [nameVal, setNameVal] = useState('');
    const [languageVal, setLanguageVal] = useState('');
    const [tagsVal, setTagsVal] = useState('');
    const [strictMatchesOnly, setStrictMatchesOnly] = useState(false);

    const reset = () => {
        setNameVal('');
        setLanguageVal('');
        setTagsVal('');
        selectOption(allCountriesOption);
    }

    const allCountriesOption = {
        code: 'ALL',
        name: 'All countries',
        flag: 'https://pnghunter.com/get-logo.php?id=15348',
    };

  const options = [allCountriesOption, ...countries];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(allCountriesOption);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const selectOption = (country) => {
    setSelectedCountry(country);
    setSearchTerm('');
    setIsOpen(false);
  };

  const filteredOptions = options.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const search = () => {
    console.log(nameVal);
    console.log(languageVal);
    console.log(tagsVal);
    console.log(selectedCountry);
    console.log(strictMatchesOnly);
  }

  const handleCheckboxChange = (e) => {
    setStrictMatchesOnly(e.target.checked);
  };

    return (
        <div className='filter'>
            <input type="text" placeholder='Search for a station' onChange={(e) => {setNameVal(e.target.value)}} value={nameVal} />
            <div className="select-opt">
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
                        title={selectedCountry.name}
                        width={20}
                        height={20}
                        placeholder={'empty'}
                    />
                    <span>{selectedCountry.name}</span>
                    </div>
                    {<span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>}
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
                    {filteredOptions.map((country, i) => {
                        return <div
                        key={country.name + i}
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
                    })}
                    {filteredOptions.length === 0 && (
                        <div className={styles.noResult}>No countries found</div>
                    )}
                    </div>
                )}
                </div>
                <select name="languages" id="" onInput={(e) => {setLanguageVal(e.target.value)}} value={languageVal}>
                    <option value="">All languages</option>
                    {languages?.map((lang, i) => (
                        <option key={lang.iso_639 + i} value={lang.iso_639}>
                            {lang.name}
                        </option>
                    ))}
                </select>
                <select name="tags" id="" onInput={(e) => {setTagsVal(e.target.value)}} value={tagsVal}>
                    <option value="">All tags</option>
                    {tags?.map((tag, i) => (
                        <option key={tag.name + i} value={tag.name}>
                            {tag.name}
                        </option>
                    ))}
                </select>
                <div className="strict-cb"><label htmlFor="checkbox">Strict matches only</label> <input type="checkbox" id='checkbox' checked={strictMatchesOnly} onChange={handleCheckboxChange} /></div>
                <button onClick={search}>Search</button>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
};

export default Filter;