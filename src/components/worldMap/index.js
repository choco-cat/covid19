import Map from './map';

const WorldMap = ({ summaries, handleClickOnCountry, isLoaded }) => {
  return (
    <div className="map-container">
      <h4>The World Map will be built here</h4>
      <Map summaries={summaries} handleClickOnCountry={handleClickOnCountry} />
    </div>
  );
};

export default WorldMap;
