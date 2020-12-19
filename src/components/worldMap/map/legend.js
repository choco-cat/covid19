import React, {useState} from 'react';
import Draggable from 'react-draggable';
import { ReactComponent as ToggleSize } from "../../../icons/small.svg";
import { ReactComponent as Expand } from "../../../icons/expand.svg";

const Legend = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  const [fullSize, setSize] = useState(true);
  const defaultPosition = {x: 0, y: 0};

  const handleToggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleToggSize = () => {
    setSize(!fullSize);
  };

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
            <table style={{margin: 'auto'}}>
              <thead>
              <tr>
                <th>Colors</th>
                <th>Total cases per 100k</th>
              </tr>
              </thead>
              <tbody>
              {
                data.sort().map((value, index) => (
                  <tr key={index}>
                    <td style={{width: '25px', backgroundColor: `rgba(255,0,0,${value || 0.3})`}} />
                    <td>
                      {(value * 5 / 220 * 10**5).toFixed(1)}
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </table>
          ) : null
        }
      </div>
    </Draggable>
  )
};

export default React.memo(Legend);
