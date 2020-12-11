import Map from './map';

import './index.css';

const Block3 = ({ summaries }) => {
  return (
    <div className="App">
      <h4>World Map</h4>
      <Map summaries={summaries} />
    </div>
  );
};

export default Block3;
