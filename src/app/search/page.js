import Search from "@/components/Search/Search";
import fallbackStations from "../../../public/assets/docs/mock-api/stations.json";

const API_SERVER = 'https://de1.api.radio-browser.info';

function buildSearchURL({ name, country, language, tag, strict }) {
  const url = new URL(`${API_SERVER}/json/stations/search`);
  const maybeAdd = (key, value) => value && url.searchParams.append(key, value);

  maybeAdd(strict ? 'nameExact'     : 'name',     name);
  maybeAdd(strict ? 'countryExact'  : 'country',  country);
  maybeAdd(strict ? 'languageExact' : 'language', language);
  maybeAdd(strict ? 'tagExact'      : 'tag',      tag);

  url.searchParams.append('limit', '500');
  url.searchParams.append('hidebroken', 'true');
  return url.toString();
}

function filterLocal(stations, { name, country, language, tag, strict }) {
  const matchField = (field, value) =>
    !value ? true :
    strict ? field.toLowerCase() === value.toLowerCase()
           : field.toLowerCase().includes(value.toLowerCase());

  return stations.filter(st => {
    if (!matchField(st.name,     name))     return false;
    if (!matchField(st.country,  country))  return false;
    if (!matchField(st.language, language)) return false;

    if (tag) {
      const tags = st.tags?.toLowerCase().split(',').map(t => t.trim()) || [];
      return strict
        ? tags.some(t => t === tag.toLowerCase())
        : tags.some(t => t.includes(tag.toLowerCase()));
    }

    return true;
  });
}

export default async function Page({ searchParams, params }) {
  const {
    name = '',
    country = '',
    language = '',
    tag = '',
    strict = 'false',
  } = searchParams;

  const isStrict = strict === 'true';

  let searchResults = [];

  try {
    const url = buildSearchURL({ name, country, language, tag, strict: isStrict });
    const res = await fetch(url, { cache: 'no-store' });
    if (res.ok) {
      searchResults = await res.json();
    }
  } catch (_) {
    // fallback ниже
  }

  if (searchResults.length === 0) {
    searchResults = filterLocal(fallbackStations, {
      name, country, language, tag, strict: isStrict
    });
  }

  return (
    <Search
      name={name}
      country={country}
      language={language}
      tag={tag}
      results={searchResults}
      pageNum={params.page || '1'}
      page={'search'}
    />
  );
}
