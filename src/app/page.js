import Main from "../components/Main/Main";
import topRadio from '../../public/docs/mock-api/topclick.json';

const fetchTopRadio = async () => {
    try {
      // const response = await fetch('https://de1.api.radio-browser.info/json/stations/topclick/20');
      // const data = await response.json();
      // return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

const page = async () => {
  // const topRadio = await fetchTopRadio();
  return (
    <div>
      <Main stations={topRadio} />
    </div>
  );
};

export default page;