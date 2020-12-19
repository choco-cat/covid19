import Map from './map';

const WorldMap = ({ summaries, handleClickOnCountry, globalFilters }) => {
  return (
    <div className="world-map-container">
      <h2>The World Map</h2>
      <Map summaries={summaries} handleClickOnCountry={handleClickOnCountry} globalFilters={globalFilters} />
    </div>
  );
};

export default WorldMap;
