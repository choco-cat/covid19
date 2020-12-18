import Map from './map';
import Tooltip from "./map/tooltip";

const WorldMap = ({ summaries, handleClickOnCountry }) => {
  return (
    <div className="world-map-container">
      <h2>The World Map</h2>
      <Map summaries={summaries} handleClickOnCountry={handleClickOnCountry} />
    </div>
  );
};

export default WorldMap;
