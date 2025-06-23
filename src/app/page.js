import Main from "./components/Main/Main";

const page = async () => {
 const fetchTopRadio = async () => {
    try {
      const response = await fetch('https://de1.api.radio-browser.info/json/stations/topclick/20');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const topRadio = await fetchTopRadio();
  return (
    <div>
      <Main topRadio={topRadio} />
    </div>
  );
};

export default page;