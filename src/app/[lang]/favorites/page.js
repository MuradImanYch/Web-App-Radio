import FavoritesClient from '@/components/FavoritesClient/FavoritesClient';
import langJSON from '../../../../public/assets/docs/languages.json';
import conf from '../../../../public/assets/docs/conf.json';

export const generateMetadata = ({ params }) => {
  return {
    metadataBase: new URL(conf.baseUrl),
    applicationName: 'Legendary Radio',
    generator: 'Next.js 14',
    title: {
      default: langJSON.translations[langJSON.available.includes(params.lang) ? params.lang : 'en']?.metaTitleFavorites,
      template: '%s | Legendary Radio',
    },
    description: langJSON.translations[langJSON.available.includes(params.lang) ? params.lang : 'en']?.metaDescFavorites,
    keywords: langJSON.translations[langJSON.available.includes(params.lang) ? params.lang : 'en']?.metaKeysFavorites,
    alternates: {
      canonical: '/' + langJSON.available.includes(params.lang) ? params.lang + '/favorites' : 'en/favorites',
      languages: { en: '/favorites', ru: '/ru/favorites', az: '/az/favorites' },
    },
    openGraph: {
      title: langJSON.translations[langJSON.available.includes(params.lang) ? params.lang : 'en']?.metaTitleFavorites,
      description: langJSON.translations[langJSON.available.includes(params.lang) ? params.lang : 'en']?.metaOGDescFavorites,
      url: conf.baseUrl + langJSON.available.includes(params.lang) ? `${params.lang}/favorites` : '/favorites',
      siteName: 'Legendary Radio',
      locale: params.lang + '_' + params.lang.toUpperCase(),
      type: 'website',
      images: [
        {
          url: '/assets/ico/logo.webp',
          width: 1200,
          height: 630,
          alt: langJSON.translations[langJSON.available.includes(params.lang) ? params.lang : 'en']?.metaOGImgAltFavorites,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: langJSON.translations[langJSON.available.includes(params.lang) ? params.lang : 'en']?.metaTitleFavorites,
      description: langJSON.translations[langJSON.available.includes(params.lang) ? params.lang : 'en']?.metaOGDescFavorites,
      images: ['/assets/ico/logo.webp'],
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
  }
}

export default function FavoritesPage({params}) {
  return (
    <div>
      <h1 style={{margin: '50px 0 40px 0'}}>{langJSON.translations[langJSON.available.includes(params.lang) ? params.lang : 'en']?.favoritesBtn}</h1>
      <FavoritesClient lang={params.lang} />
    </div>
  );
}
