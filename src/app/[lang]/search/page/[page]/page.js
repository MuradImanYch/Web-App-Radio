import Search from "@/components/Search/Search";
import fallbackStations from "../../../../../../public/assets/docs/mock-api/stations.json";
import langJSON from '../../../../../../public/assets/docs/languages.json';
import conf from '../../../../../../public/assets/docs/conf.json';

export const generateMetadata = ({ searchParams, params }) => {
  const {
    name = '',
    country = '',
    language = '',
    tag = ''
  } = searchParams;

  const lang = langJSON.available.includes(params.lang) ? params.lang : 'en';
  const translations = langJSON.translations[lang];

  const filters = [
    name     && `${translations.nameTxt} – ${name}`,
    country  && `${translations.countryTxt} – ${country}`,
    language && `${translations.languageTxt} – ${language}`,
    tag      && `${translations.tagTxt} – ${tag}`
  ].filter(Boolean).join(' • ') || 'Radio';

  const queryFormatted = filters.charAt(0).toUpperCase() + filters.slice(1);

  const queryParams = new URLSearchParams();
  if (name) queryParams.set('name', name);
  if (language) queryParams.set('language', language);
  if (tag) queryParams.set('tag', tag);
  if (country) queryParams.set('country', country);

  const queryStr = decodeURIComponent(queryParams.toString());

  const fullUrl = `/${lang}/search/page/${params.page}${queryStr ? `?${queryStr}` : ''}`;

  return {
    metadataBase: new URL(conf.baseUrl),
    applicationName: 'Legendary Radio',
    generator: 'Next.js 14',
    title: {
      default: (langJSON.translations.en.metaTitleSearch + ' | ' + translations.pageTxt + ' ' + params.page).replace('{{query}}', queryFormatted),
      template: '%s | Legendary Radio',
    },
    description: (langJSON.translations.en.metaDescSearch + ' | ' + translations.pageTxt + ' ' + params.page).replace('{{query}}', queryFormatted),
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
      title: (langJSON.translations.en.metaTitleSearch + ' | ' + translations.pageTxt + ' ' + params.page).replace('{{query}}', queryFormatted),
      description: (langJSON.translations.en.metaOGDescSearch + ' | ' + translations.pageTxt + ' ' + params.page).replace('{{query}}', queryFormatted),
      url: conf.baseUrl + fullUrl,
      siteName: 'Legendary Radio',
      locale: `${lang}_${lang.toUpperCase()}`,
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

  const searchResults = filterLocal(fallbackStations, {
    name, country, language, tag, strict: isStrict
  });

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
