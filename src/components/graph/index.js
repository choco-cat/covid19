import {useState, useEffect} from 'react';
import Draggable from 'react-draggable';
import CovidChart from './chart';
import { ReactComponent as Expand }  from '../../icons/expand.svg';
import { ReactComponent as ToggleSize }  from '../../icons/small.svg';
import {missedPopulations} from "../../constants/missed";
import {getData} from "../../services/calculations";
import {filters} from "../../constants/filters";
import {getSelectFilters} from "../../services/selectFilters";

const Graph = ({dataWorld, globalFilters, updateFilters}) => {
  const [expanded, setExpanded] = useState(false);
  const [fullSize, setSize] = useState(true);
  const defaultPosition = { x: 0, y: 0 };

  const handleToggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleToggSize= () => {
    setSize(!fullSize);
  };

  const onSelectChange = (e) => {
    updateFilters({status: e.target.value});
  };

  const onRadioChange = (e) => {
    updateFilters({relative: e.target.value});
  };

  return (
    <Draggable position={expanded ? defaultPosition : null}>
      <div className={`graph-wrapper ${expanded ? 'expanded' : ''}`}>
        <div className="controls">
          {
            fullSize && (
              <Expand className="controls-icons" onClick={handleToggleExpanded} />
            )
          }
          {
            !expanded && (
              <ToggleSize className="controls-icons" onClick={handleToggSize} />
            )
          }
        </div>
        <h2>Chart</h2>
        {
          fullSize ? (
            <>
              <h3>{globalFilters.geography ? globalFilters.geography : 'World'}, {globalFilters.relative}</h3>
              <div>
                <select onChange={onSelectChange} value={globalFilters.status} >
                  <option value={filters.status.confirmed}>Confirmed
                  </option>
                  <option value={filters.status.deaths}>Deaths
                  </option>
                  <option value={filters.status.recovered}>Recovered
                  </option>
                </select>
              </div>
              <div>
                <input
                  type="radio"
                  name="relative"
                  value={filters.relative.absolute}
                  checked={globalFilters.relative === filters.relative.absolute ? 'selected' : ''}
                  onChange={onRadioChange}/>
                <label htmlFor="dewey">Absolute count</label>
                <input
                  type="radio"
                  name="relative"
                  value={filters.relative.to100men}
                  onChange={onRadioChange}
                  checked={globalFilters.relative === filters.relative.to100men ? 'selected' : ''}
                />
                <label htmlFor="dewey">Per 100k</label>
              </div>
              <CovidChart dataWorld={dataWorld} status={globalFilters.status}/>
            </>
          ) : null
        }
      </div>
    </Draggable>
  );
};

export default Graph;
