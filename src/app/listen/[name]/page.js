import Listen from "@/components/Listen/Listen";
import conf from '../../../../public/assets/docs/conf.json';
import fetchStationByUUID from "@/utils/getUuidLS";

export const generateMetadata = async ({ params }) => {
  const station = await fetchStationByUUID(params.name.split('-uuid-')[1]);
  
  return {
    metadataBase: new URL(conf.baseUrl),
    applicationName: 'Legendary Radio',
    generator: 'Next.js 14',
    title: {
      default: `${station[0].name} - Listen Online`,
      template: '%s | Legendary Radio',
    },
    description: `Enjoy free streaming of ${station[0].name} from ${station[0].country} — live and online without registration.`,
    keywords: `radio, online radio, ${station[0].name}, ${station[0].country} radio, listen live, Legendary Radio`,
    alternates: {
      canonical: `/listen/${params.name}`, // или с языковым префиксом, если используется
      languages: {
        en: `/listen/${params.name}`,
        ru: `/ru/listen/${params.name}`,
        az: `/az/listen/${params.name}`,
      },
    },
    openGraph: {
      title: `${station[0].name} - Live Radio from ${station[0].country}`,
      description: `Stream ${station[0].name} from ${station[0].country} instantly online at Legendary Radio.`,
      url: `${conf.baseUrl}/listen/${params.name}`,
      siteName: 'Legendary Radio',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: '/assets/ico/logo.png',
          width: 1200,
          height: 630,
          alt: `${station[0].name} - Online Streaming from ${station[0].country}`,
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
