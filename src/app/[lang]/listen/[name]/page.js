import Listen from "@/components/Listen/Listen";
import conf from '../../../../../public/assets/docs/conf.json';
import fetchStationByUUID from "@/utils/getUuidLS";
import langJSON from '../../../../../public/assets/docs/languages.json';

export const generateMetadata = async ({ params }) => {
  const station = await fetchStationByUUID(params.name.split('-uuid-')[1]);
  
  return {
    metadataBase: new URL(conf.baseUrl),
    applicationName: 'Legendary Radio',
    generator: 'Next.js 14',
    title: {
      default: langJSON.translations[langJSON.available.includes(params.lang) ? params.lang : 'en']?.metaTitleListen.replace('{{name}}', station[0].name), 
      template: '%s | Legendary Radio',
    },
    description: langJSON.translations[langJSON.available.includes(params.lang) ? params.lang : 'en']?.metaDescListen.replace('{{name}}', station[0].name).replace('{{country}}', station[0].country),
    keywords: langJSON.translations[langJSON.available.includes(params.lang) ? params.lang : 'en']?.metaKeysListen.map(key => key.replace('{{name}}', station[0].name).replace('{{country}}', station[0].country)),
    alternates: {
      canonical: '/' + langJSON.available.includes(params.lang) ? params.lang + `/listen/${params.name}` : `en/listen/${params.name}`,
      languages: { en: `/listen/${params.name}`, ru: `/ru/listen/${params.name}`, az: `/az/listen/${params.name}` },
    },
    openGraph: {
      title: langJSON.translations[langJSON.available.includes(params.lang) ? params.lang : 'en']?.metaTitleListen.replace('{{name}}', station[0].name),
      description: langJSON.translations[langJSON.available.includes(params.lang) ? params.lang : 'en']?.metaOGDescListen.replace('{{name}}', station[0].name).replace('{{country}}', station[0].country),
      url: conf.baseUrl + langJSON.available.includes(params.lang) ? `${params.lang}/listen/${params.name}` : `/listen/${params.name}`,
      siteName: 'Legendary Radio',
      locale: params.lang + '_' + params.lang.toUpperCase(),
      type: 'website',
      images: [
        {
          url: '/assets/ico/logo.png',
          width: 1200,
          height: 630,
          alt: langJSON.translations[langJSON.available.includes(params.lang) ? params.lang : 'en']?.metaOGImgAltListen.replace('{{name}}', station[0].name).replace('{{country}}', station[0].country),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${station[0].name} - Listen Live`,
      description: `Streaming ${station[0].name} from ${station[0].country} on Legendary Radio.`,
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


const page = async ({ params }) => {
  return (
    <div>
      <Listen pathname={params.name} lang={params.lang || 'en'} />
    </div>
  );
};

export default page;
