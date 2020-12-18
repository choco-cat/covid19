import React from 'react';
import Draggable from 'react-draggable';

const Legend = ({ data }) => {
  return(
    <Draggable>
      <div className="map-legend">
        <h5>Legend:</h5>
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
      </div>
    </Draggable>
  )
};

export default React.memo(Legend);
