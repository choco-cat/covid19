import { useState } from 'react';
import Draggable from 'react-draggable';
import CovidChart from './chart';
import { ReactComponent as Expand } from '../../icons/expand.svg';
import { ReactComponent as ToggleSize } from '../../icons/small.svg';
import { filters } from "../../constants/filters";

const Graph = ({dataWorld, globalFilters, updateFilters, dataForCountry}) => {
  const [expanded, setExpanded] = useState(false);
  const [fullSize, setSize] = useState(true);
  const [compare, setCompare] = useState(false);
  const defaultPosition = {x: 0, y: 0};

  const handleToggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleToggleCompare = () => {
    setCompare(!compare);
  };

  const handleToggSize = () => {
    setSize(!fullSize);
  };

  const onSelectChange = (e) => {
    updateFilters({status: e.target.value});
  };

  const onRadioChange = (e) => {
    updateFilters({relative: e.target.value});
  };

  const onCheckChange = (e) => {
    if (e.target.checked) {
      updateFilters({geography: ""});
    } else {
      dataForCountry("Belarus");
    }
  };

  return (
    <Draggable position={expanded ? defaultPosition : null}>
      <div className={`graph-wrapper ${expanded ? 'expanded' : ''}`}>
        <div className="controls">
          <div className="title">Chart</div>
          <ToggleSize className="controls-icons" onClick={handleToggSize} style={{display: !expanded ? 'inline-block' : 'none'}} />
          <Expand className="controls-icons" onClick={handleToggleExpanded} style={{display: fullSize ? 'inline-block' : 'none'}} />
        </div>
        {
          fullSize ? (
            <>
              <h3>{globalFilters.geography ? globalFilters.geography : 'World'}</h3>
              <div>
                <select onChange={onSelectChange} value={globalFilters.status}>
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
              <div>
                <input
                  type="checkbox"
                  name="geography"
                  value=""
                  onChange={onCheckChange}
                  checked={globalFilters.geography === ''}
                />
                <label htmlFor="geography">World</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="compare"
                  name="compare"
                  value="1"
                  onChange={handleToggleCompare}
                />
                <label htmlFor="compare">Compare</label>
              </div>
              <div className="chart-container">
                <CovidChart dataWorld={dataWorld} status={globalFilters.status} compare={compare}/>
              </div>
            </>
          ) : null
        }
      </div>
    </Draggable>
  );
};

export default Graph;
