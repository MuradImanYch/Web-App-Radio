import Main from "../components/Main/Main";
import fallbackStations from "../../public/assets/docs/mock-api/topclick.json"; // путь может отличаться в зависимости от структуры проекта

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

const Page = async () => {
  const topRadio = await fetchTopRadio();

  return (
    <div>
      <h1 style={{ margin: '50px 0 0 0' }}>
        Discover Live FM and AM Radio Stations from Around the World
      </h1>
      <Main stations={topRadio} />
    </div>
  );
};

export default Page;
