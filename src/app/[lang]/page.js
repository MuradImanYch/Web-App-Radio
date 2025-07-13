import Main from "@/components/Main/Main";
import fallbackStations from "../../../public/assets/docs/mock-api/topclick.json";
import langJSON from '../../../public/assets/docs/languages.json';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '700',
});

const fetchTopRadio = async () => {
  try {
    const response = await fetch('https://de1.api.radio-browser.info/json/stations/topclick/30', { cache: 'no-cache' });
    if (!response.ok) throw new Error("Response not OK");

    const data = await response.json();
    
    // Если API вернул пустой массив, использовать локальные данные
    if (!Array.isArray(data) || data.length === 0) {
      console.warn("API вернул пустой массив. Используем резервные данные.");
      return fallbackStations;
    }

    return data;
  } catch (error) {
    console.error("Ошибка при получении данных с API. Используем резервные данные.", error);
    return fallbackStations;
  }
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
