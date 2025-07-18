const fetchStationByUUID = async (uuid) => {
  try {
    const res = await fetch(`https://de1.api.radio-browser.info/json/stations/byuuid/${uuid}`, { cache: 'no-store' });
    return await res.json();
  } catch {
    return [];
  }
};

module.exports = fetchStationByUUID;