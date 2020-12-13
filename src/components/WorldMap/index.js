import Map from './map';

import './index.css';

const WorldMap = ({ summaries, handleClickOnCountry }) => {
  return (
    <div className="App">
    <div id="tooltip" display="none" />
      <h4>The World Map will be built here</h4>
      <Map summaries={summaries} handleClickOnCountry={handleClickOnCountry} />
    </div>
  );
};

export default WorldMap;
