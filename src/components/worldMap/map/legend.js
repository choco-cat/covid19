import React, {useState} from 'react';
import Draggable from 'react-draggable';
import { ReactComponent as ToggleSize } from "../../../icons/small.svg";
import { ReactComponent as Expand } from "../../../icons/expand.svg";
import { getColorsFromFilters, getFilterName } from '../../../services/calculations';
import { filters } from "../../../constants/filters";
import Filters from "../../filters";

const Legend = ({ data, diffCoeff, globalFilters, updateFilters }) => {
  const [expanded, setExpanded] = useState(false);
  const [fullSize, setSize] = useState(true);
  const defaultPosition = {x: 0, y: 0};

  const handleToggleExpanded = () => {
    setExpanded(!expanded);
  };

  const options = {'status': true, 'relative': true, 'period': true};
  const handleToggSize = () => {
    setSize(!fullSize);
  };

  const roundDijit = (globalFilters.relative === filters.relative.to100men) ? 2 : 0;
  const userLang = navigator.language;

  return (
    <Draggable position={expanded ? defaultPosition : null}>
      <div className={`map-legend ${expanded ? 'expanded' : ''}`}>
        <div className="controls">
          <div className="title">Legend</div>
          <ToggleSize className="controls-icons" onClick={handleToggSize} style={{display: !expanded ? 'inline-block' : 'none'}} />
          <Expand className="controls-icons" onClick={handleToggleExpanded} style={{display: fullSize ? 'inline-block' : 'none'}} />
        </div>
        {
          fullSize ? (
              <div className="container-block">
            <table style={{margin: 'auto'}}>
              <thead>
              <tr>
                <th>Colors</th>
                <th>{getFilterName(globalFilters.status)} {getFilterName(globalFilters.relative)} {getFilterName(globalFilters.period)}</th>
              </tr>
              </thead>
              <tbody>
              {
                data.sort().map((value, index) => (
                  <tr key={index}>
                    <td style={{width: '25px', backgroundColor: `rgba(${getColorsFromFilters(globalFilters.status)},${value})`}} />
                    <td>
                      from {(new Intl.NumberFormat(userLang, { minimumFractionDigits: 0, maximumFractionDigits: 2}).format((value * diffCoeff).toFixed(roundDijit)))}
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </table>
            <Filters globalFilters={globalFilters} updateFilters={updateFilters} options={options}/>
            </div>
          ) : null
        }
      </div>
    </Draggable>
  )
};

export default React.memo(Legend);
