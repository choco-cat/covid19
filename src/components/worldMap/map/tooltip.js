import {getFilterName} from "../../../services/calculations";
const userLang = navigator.language;

const Tooltip = ({ dataCountry, customStyles, status }) => {
    return (
      <div id="tooltip" className="tooltip" style={{ display: 'none', ...customStyles }}>
          <h5>Country: {dataCountry.Country}</h5>
          <table>
              <tbody>
              <tr>
                  <td>{getFilterName(status)}</td>
                  <td>{new Intl.NumberFormat(userLang, { minimumFractionDigits: 0, maximumFractionDigits: 2}).format((dataCountry.Data || 0).toFixed(0))}</td>
              </tr>
              </tbody>
          </table>
      </div>
    );
};

export default Tooltip;
