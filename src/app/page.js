export const dynamic = 'force-dynamic'; // <--- ключевая строка

import Main from "../components/Main/Main";
import fallbackStations from "../../public/assets/docs/mock-api/topclick.json";
import langJSON from '../../public/assets/docs/languages.json';
import { Poppins } from 'next/font/google';
import conf from '../../public/assets/docs/conf.json';

export const metadata = {
  title: {
    default: langJSON.translations.en.metaTitleMain,
    template: '%s | Legendary Radio',
  },
  description: langJSON.translations.en.metaDescMain,
  keywords: langJSON.translations.en.metaKeysMain,
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: '700',
});

const fetchTopRadio = async () => {
  return fallbackStations;
};

const Page = async () => {
  const topRadio = await fetchTopRadio();

  return (
    <div>
      <h1 className={poppins.className} style={{ margin: '50px 0 0 0' }}>{langJSON.translations.en.mainH1}</h1>
      <Main lang={''} stations={topRadio} />
    </div>
  );
};

export default Page;
