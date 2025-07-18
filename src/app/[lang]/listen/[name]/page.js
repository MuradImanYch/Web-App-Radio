import Listen from "@/components/Listen/Listen";
import conf from '../../../../../public/assets/docs/conf.json';

export const generateMetadata = ({ params }) => {
  return {
    metadataBase: new URL(conf.baseUrl),
    applicationName: 'Legendary Radio',
    generator: 'Next.js 14',
    title: {
      default: '[Radio Station Name] - Listen Online',
      template: '%s | Legendary Radio',
    },
    description: 'Enjoy free streaming of [Radio Station Name] from [Country] — live and online without registration.',
    keywords: 'radio, online radio, [Radio Station Name], [Country] radio, listen live, Legendary Radio',
    alternates: {
      canonical: `/listen/[station-id]`, // или с языковым префиксом, если используется
      languages: {
        en: `/listen/[station-id]`,
        ru: `/ru/listen/[station-id]`,
        az: `/az/listen/[station-id]`,
      },
    },
    openGraph: {
      title: '[Radio Station Name] - Live Radio from [Country]',
      description: 'Stream [Radio Station Name] from [Country] instantly online at Legendary Radio.',
      url: `${conf.baseUrl}/listen/[station-id]`,
      siteName: 'Legendary Radio',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: '/assets/ico/logo.png',
          width: 1200,
          height: 630,
          alt: 'Legendary Radio - Online Streaming',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: '[Radio Station Name] - Listen Live',
      description: 'Streaming [Radio Station Name] from [Country] on Legendary Radio.',
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
