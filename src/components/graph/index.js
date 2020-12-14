import CovidChart from './chart';

const Graph = ({ dataWorld }) => {
    return (
      <div className="App">
        <h4>The graph will be built here</h4>
        <CovidChart dataWorld={dataWorld}/>
      </div>
    );
};

export default Graph;
