import React from 'react';

const Legend = ({ data }) => {
  console.log('-=-0-0', data);
  return(
    <div>
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
            data.sort().map(value => (
              <tr>
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
  )
};

export default React.memo(Legend);
