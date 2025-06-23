import Listen from "@/components/Listen/Listen";

const topRadio = [
  {
    stationuuid: "98adecf7-2683-4408-9be7-02d3f9098eb8",
    name: "BBC World Service",
    country: "The United Kingdom Of Great Britain And Northern Ireland",
    url_resolved: "http://stream.live.vc.bbcmedia.co.uk/bbc_world_service",
  },
  {
    stationuuid: "d1a54d2e-623e-4970-ab11-35f7b56c5ec3",
    name: "Classic Vinyl HD",
    country: "The United States Of America",
    url_resolved: "https://icecast.walmradio.com:8443/classic",
  },
  {
    stationuuid: "78012206-1aa1-11e9-a80b-52543be04c81",
    name: "MANGORADIO",
    country: "Germany",
    url_resolved: "https://mangoradio.stream.laut.fm/mangoradio",
  }
];

function generateSlug(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const page = ({ params }) => {
  const { name } = params;

  const found = topRadio.find((station) => {
    const fullSlug = `${generateSlug(station.country)}-${generateSlug(station.name)}`;
    return fullSlug === name;
  });

  if (!found) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Station is not found</h1>
        <p>Find by: <code>{name}</code></p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{found.name}</h1>
      <p><strong>Country:</strong> {found.country}</p>
      <p><strong>Stream URL:</strong> <a href={found.url_resolved} target="_blank">{found.url_resolved}</a></p>

      <audio controls style={{ marginTop: 20 }}>
        <source src={found.url_resolved} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <Listen />
    </div>
  );
};

export default page;
