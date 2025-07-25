import Search from "@/components/Search/Search";
import fallbackStations from "../../../../../public/assets/docs/mock-api/stations.json";
import langJSON from '../../../../../public/assets/docs/languages.json';
import conf from '../../../../../public/assets/docs/conf.json';

export const generateMetadata = ({ searchParams, params }) => {
  const {
    name = '',
    country = '',
    language = '',
    tag = ''
  } = searchParams;

  const filters = [
    name     && `Name – ${name}`,
    country  && `Country – ${country}`,
    language && `Language – ${language}`,
    tag      && `Tag – ${tag}`
  ].filter(Boolean).join(' • ') || 'Radio';

  const queryFormatted = filters.charAt(0).toUpperCase() + filters.slice(1);

  // Собираем query string вручную
  const queryParams = new URLSearchParams();
  if (name) queryParams.set('name', name);
  if (language) queryParams.set('language', language);
  if (tag) queryParams.set('tag', tag);
  if (country) queryParams.set('country', country);

  const queryStr = decodeURIComponent(queryParams.toString()); // ✅ это строка

  const fullUrl = `/search/page/${params.page}${queryStr ? `?${queryStr}` : ''}`;

  return {
    metadataBase: new URL(conf.baseUrl),
    applicationName: 'Legendary Radio',
    generator: 'Next.js 14',
    title: {
      default: (langJSON.translations.en.metaTitleSearch + ' | ' + langJSON.translations.en.pageTxt + ' ' + params.page).replace('{{query}}', queryFormatted),
      template: '%s | Legendary Radio',
    },
    description: (langJSON.translations.en.metaDescSearch + ' | ' + langJSON.translations.en.pageTxt + ' ' + params.page).replace('{{query}}', queryFormatted),
    keywords: langJSON.translations.en.metaKeysSearch.map(key =>
      key.replace('{{query}}', queryFormatted)
    ),
    alternates: {
      canonical: fullUrl,
      languages: {
        en: `/search/page/${params.page}?${queryStr}`,
        ru: `/ru/search/page/${params.page}?${queryStr}`,
        az: `/az/search/page/${params.page}?${queryStr}`,
      },
    },
    openGraph: {
      title: (langJSON.translations.en.metaTitleSearch + ' | ' + langJSON.translations.en.pageTxt + ' ' + params.page).replace('{{query}}', queryFormatted),
      description: (langJSON.translations.en.metaOGDescSearch + ' | ' + langJSON.translations.en.pageTxt + ' ' + params.page).replace('{{query}}', queryFormatted),
      url: `/search/page/${params.page}?${queryStr}`,
      siteName: 'Legendary Radio',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: '/assets/ico/logo.png',
          width: 1200,
          height: 630,
          alt: langJSON.translations.en.metaOGImgAltSearch.replace('{{query}}', queryFormatted),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${queryFormatted} - Legendary Radio Search`,
      description: `Explore radio stations matching "${queryFormatted}" on Legendary Radio.`,
      images: ['/assets/ico/logo.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        maxSnippet: -1,
        maxImagePreview: 'large',
        maxVideoPreview: -1,
      },
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/favicon.ico',
    },
    manifest: '/site.webmanifest',
    themeColor: '#1b1b21',
    colorScheme: 'dark light',
    viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
    authors: [{ name: 'Imanych', url: 'https://github.com/MuradImanYch' }],
    creator: 'Imanych',
    publisher: 'Legendary Radio',
  };
};

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
      lang={params.lang || 'en'}
    />
  );
}
