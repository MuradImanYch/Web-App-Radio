import './Search.css';
import StationList from '../StationList/StationList';

export default function Search({ name, country, language, tag, results, pageNum, page }) {
  return (
    <div className="search">
      <h1>
        Searching by:&nbsp;
        {name     && `Name – ${name}  `}
        {country  && `Country – ${country}  `}
        {language && `Language – ${language}  `}
        {tag      && `Tag – ${tag}`} |
        &nbsp;Search results ({results.length})
      </h1>

      <StationList page={page} stations={results} name={name} country={country} language={language} tag={tag} pageNum={pageNum} />
    </div>
  );
}
