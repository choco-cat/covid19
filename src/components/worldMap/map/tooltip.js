const Tooltip = ({ dataCountry, customStyles, status }) => {
    return (
      <div id="tooltip" className="tooltip" style={{ display: 'none', ...customStyles }}>
          <h5>Country: {dataCountry.Country}</h5>
          <table>
              <tbody>
              <tr>
                  <td>{status}</td>
                  <td>{dataCountry.Data || 0}</td>
              </tr>
              </tbody>
          </table>
      </div>
    );
};

export default Tooltip;
