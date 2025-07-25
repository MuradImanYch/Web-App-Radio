import Main from "@/components/Main/Main";
import fallbackStations from "../../../public/assets/docs/mock-api/topclick.json";
import langJSON from '../../../public/assets/docs/languages.json';
import { Poppins } from 'next/font/google';
import conf from '../../../public/assets/docs/conf.json';

export const generateMetadata = ({ params }) => {
  return {
    metadataBase: new URL(conf.baseUrl),
    applicationName: 'Legendary Radio',
    generator: 'Next.js 14',
    title: {
      default: langJSON.translations[langJSON.available.includes(params.lang) ? params.lang : 'en']?.metaTitleMain,
      template: '%s | Legendary Radio',
    },
    description: langJSON.translations[langJSON.available.includes(params.lang) ? params.lang : 'en']?.metaDescMain,
    keywords: langJSON.translations[langJSON.available.includes(params.lang) ? params.lang : 'en']?.metaKeysMain,
    alternates: {
      canonical: langJSON.available.includes(params.lang) ? '/' + params.lang : '/en',
      languages: { en: '/', ru: '/ru', az: '/az' },
    },
    openGraph: {
      title: langJSON.translations[langJSON.available.includes(params.lang) ? params.lang : 'en']?.metaTitleMain,
      description: langJSON.translations[langJSON.available.includes(params.lang) ? params.lang : 'en']?.metaOGDescMain,
      url: conf.baseUrl + langJSON.available.includes(params.lang) ? '/' + params.lang : '/en',
      siteName: 'Legendary Radio',
      locale: params.lang + '_' + params.lang.toUpperCase(),
      type: 'website',
      images: [
        {
          url: '/assets/ico/logo.png',
          width: 1200,
          height: 630,
          alt: langJSON.translations[langJSON.available.includes(params.lang) ? params.lang : 'en']?.metaOGImgAltMain,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: langJSON.translations[langJSON.available.includes(params.lang) ? params.lang : 'en']?.metaTitleMain,
      description: langJSON.translations[langJSON.available.includes(params.lang) ? params.lang : 'en']?.metaOGDescMain,
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
  }
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: '700',
});

const fetchTopRadio = async () => {
  return fallbackStations; // всегда используем локальные данные
};

const Page = async ({params}) => {
  const topRadio = await fetchTopRadio();

  return (
    <div>
      <h1 className={poppins.className} style={{ margin: '50px 0 0 0' }}>{langJSON.translations[params.lang]?.mainH1}</h1>
      <Main lang={params.lang} stations={topRadio} />
    </div>
  );
};

export default Page;
