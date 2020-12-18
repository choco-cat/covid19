import Draggable from 'react-draggable';
import CovidChart from './chart';

const Graph = ({ dataWorld , filters }) => {
    return (
      <Draggable>
        <div className="graph-wrapper">
          <h2>Chart</h2>
          <h3>{filters.geography ? filters.geography : 'World'}, {filters.relative}</h3>
          <h4>{filters.status}</h4>
          <CovidChart dataWorld={dataWorld} status={filters.status}/>
        </div>
      </Draggable>
    );
};

export default Graph;
