const Tooltip = ({ dataCountry, customStyles }) => {
    return (
      <div id="tooltip" className="tooltip" style={{ display: 'none', ...customStyles }}>
          <h5>Country: {dataCountry.Country}</h5>
          <h6>Date: {dataCountry.Date}</h6>
          <table>
              <tbody>
              <tr>
                  <td>NewConfirmed</td>
                  <td>{dataCountry.NewConfirmed || 0}</td>
              </tr>
              <tr>
                  <td>NewDeaths</td>
                  <td>{dataCountry.NewDeaths || 0}</td>
              </tr>
              <tr>
                  <td>NewRecovered</td>
                  <td>{dataCountry.NewRecovered || 0}</td>
              </tr>
              <tr>
                  <td>TotalConfirmed</td>
                  <td>{dataCountry.TotalConfirmed || 0}</td>
              </tr>
              <tr>
                  <td>TotalDeaths</td>
                  <td>{dataCountry.TotalDeaths || 0}</td>
              </tr>
              <tr>
                  <td>TotalRecovered</td>
                  <td>{dataCountry.TotalRecovered || 0}</td>
              </tr>
              </tbody>
          </table>
      </div>
    );
};

export default Tooltip;
