import Block1 from '../block1';
import Block2 from '../block2';
import Block3 from '../block3';
import Graph from '../graph';

import './index.css';

const Root = () => {
  return (
    <div className="App">
      <Block1 />
      <Block2 />
      <Block3 />
      <Graph />
    </div>
  );
};

export default Root;
