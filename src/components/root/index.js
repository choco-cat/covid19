import Block1 from '../block1';
import CountryList from '../countryList';
import Block3 from '../block3';
import Graph from '../graph';

import './index.css';

const Root = () => {
  return (
    <div className="App">
      <Block1 />
      <CountryList />
      <Block3 />
      <Graph />
    </div>
  );
};

export default Root;
