import Map from './map';

const WorldMap = ({ summaries, handleClickOnCountry, globalFilters, updateFilters }) => {
  return (
    <div className="world-map-container">
      <Map summaries={summaries} handleClickOnCountry={handleClickOnCountry} globalFilters={globalFilters} updateFilters={updateFilters}/>
    </div>
  );
};

export default WorldMap;
