import React, { useState } from 'react';
import Draggable from 'react-draggable';
import CovidChart from './chart';
import { ReactComponent as Expand } from '../../icons/expand.svg';
import { ReactComponent as ToggleSize } from '../../icons/small.svg';
import Filters from '../filters';

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

  const onCheckChange = (e) => {
    if (e.target.checked) {
      updateFilters({geography: ""});
    } else {
      if (dataForCountry) {
        dataForCountry("Belarus");
      }
    }
  };

  const handleToggSize = () => {
    setSize(!fullSize);
  };

  const options = {'status': true, 'relative': true};

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
            <div className="block-inner">
              <h4>{globalFilters.geography ? globalFilters.geography : 'World'}</h4>
              <div className="filters">
              <Filters globalFilters={globalFilters} updateFilters={updateFilters} dataForCountry={dataForCountry} options={options}/>
              <div className="adv-filters">
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
              </div>
              </div>
              <div className="chart-container">
                <CovidChart dataWorld={dataWorld} status={globalFilters.status} compare={compare}/>
              </div>
            </div>
          ) : null
        }
      </div>
    </Draggable>
  );
};

export default React.memo(Graph);
