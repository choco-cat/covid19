import Map from './map';

import './index.css';

const World_map = ({ summaries }) => {
  return (
    <div className="App">
      <h4>The World Map will be built here</h4>
      <Map summaries={summaries} />
    </div>
  );
};

export default World_map;
