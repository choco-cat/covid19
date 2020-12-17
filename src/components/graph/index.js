import CovidChart from './chart';

const Graph = ({ dataWorld , filters }) => {
    return (
      <div className="graph-wrapper">
        <h3>{filters.geography ? filters.geography : 'World'}, {filters.relative}</h3>
        <h4>{filters.status}</h4>
        <CovidChart dataWorld={dataWorld} status={filters.status}/>
      </div>
    );
};

export default Graph;
