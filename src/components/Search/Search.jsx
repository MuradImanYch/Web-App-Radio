import './Search.css';
import StationList from '../StationList/StationList';
import langJSON from '../../../public/assets/docs/languages.json';

export default function Search({ name, country, language, tag, results, pageNum, page, lang }) {
  const translation = langJSON.translations[langJSON.available.includes(lang) ? lang : 'en'];

  const filters = [
    name     && `${translation.nameTxt} – ${name}`,
    country  && `${translation.countryTxt} – ${country}`,
    language && `${translation.languageTxt} – ${language}`,
    tag      && `${translation.tagTxt} – ${tag}`
  ].filter(Boolean).join(' • ');

  const searchTitle = `${translation.searchingByTxt}: ${filters} | ${translation.searchResultTxt} (${results.length})`;

  return (
    <div className="search">
      <h1>{searchTitle}</h1>
      <StationList
        page={page}
        stations={results}
        name={name}
        country={country}
        language={language}
        tag={tag}
        pageNum={pageNum}
        lang={lang}
      />
    </div>
  );
}
