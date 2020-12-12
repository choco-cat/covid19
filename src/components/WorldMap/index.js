import Map from './map';

import './index.css';

const WorldMap = ({ summaries }) => {
  return (
    <div className="App">
    <div id="tooltip" display="none"></div>
      <h4>The World Map will be built here</h4>
      <Map summaries={summaries} />
    </div>
  );
};

export default WorldMap;
