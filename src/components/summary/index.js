import React from 'react';
import Draggable from 'react-draggable';
import Table from './table';
import { ReactComponent as ToggleSize } from "../../icons/small.svg";
import { ReactComponent as Expand } from "../../icons/expand.svg";
import { sortByParameter } from '../../services/sorting';
import { calc100Men } from '../../services/calculations';

class Summary extends React.Component {
  constructor(props) {
    super(props);

    const maxCasesCountry = sortByParameter(props.summariesCountries, 'TotalConfirmed')[1].Country;
    const currentCountryObj = this.getByCountry(props.summariesCountries, maxCasesCountry);
    const population = currentCountryObj.population;

    this.state = {
      current: this.getBySelect(),
      expanded: false,
      fullSize: true,
      currentTotal: this.getBySelect(this.props.summaries),
      currentCountry: this.getBySelect(currentCountryObj),
      defaultCountryTitle: maxCasesCountry,
      defaultPosition: { x: 0, y: 0 },
      populationWorld: 7 * 10 ** 9,
      populationCountry: population,
      checkedAbsolute: true,
      checkedPer100k: false
    };

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.getBySelect = this.getBySelect.bind(this);
    this.getByCountry = this.getByCountry.bind(this);
    this.handlePer100kChange = this.handlePer100kChange.bind(this);
    this.handleAbsoluteChange = this.handleAbsoluteChange.bind(this);
    this.summariesSelect = this.summariesSelect.bind(this);
  }

  getByCountry(countries, findCountry) {
    return countries.filter((el) => el.Country === findCountry).find(el => el);
  }

  getBySelect(object, value = 'total') {

    const allowedNew = ['NewConfirmed', 'NewDeaths', 'NewRecovered'];
    const alloweTotal = ['TotalConfirmed', 'TotalDeaths', 'TotalRecovered'];

    let allowed;

    if (value === 'lastDay') {
      allowed = allowedNew;
    } else if (value === 'total') {
      allowed = alloweTotal;
    }

    return Object.keys(object || {})
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = object[key];
        return obj;
      }, {});
  }

  handleAbsoluteChange() {

    const currentCountryObj = this.getByCountry(this.props.summariesCountries, this.props.filters.geography || this.state.defaultCountryTitle);

    this.setState({
      currentTotal: this.getBySelect(this.props.summaries),
      currentCountry: this.getBySelect(currentCountryObj),
      checkedAbsolute: true,
      checkedPer100k: false,
    });

    this.props.updateFilters({
      relative: 'Absolute'
    })
  }


  handlePer100kChange(event) {
    const { getBySelect, getByCountry } = this;
    const { populationCountry, populationWorld, defaultCountryTitle } = this.state

    const { filters, summaries, summariesCountries } = this.props

    const totalObj = getBySelect(summaries);
    const countryObj = getByCountry(summariesCountries, filters.geography || defaultCountryTitle);

    const per100kTotal = getBySelect(calc100Men([totalObj], populationWorld)[0])
    const per100kCountry = getBySelect(calc100Men([getBySelect(countryObj)], populationCountry)[0])

    this.setState({
      currentTotal: per100kTotal,
      currentCountry: per100kCountry,
      checkedAbsolute: false,
      checkedPer100k: true
    });

    this.props.updateFilters({
      relative: 'To100men'
    })
  }



  summariesSelect(obj, e, countrySelected = false) {

    const { getBySelect, getByCountry } = this;
    const { populationCountry, populationWorld, defaultCountryTitle } = this.state
    const { summariesCountries, filters } = this.props

    const absolute = (countrySelected)
      ? getBySelect(getByCountry(summariesCountries, filters.geography || defaultCountryTitle), e)
      : getBySelect(obj, e);

    const per100k = getBySelect(calc100Men([absolute], (countrySelected) ? populationCountry : populationWorld)[0], e)

    return {
      per100k,
      absolute
    }
  }

  handleFilterChange(event) {

    const { checkedPer100k } = this.state;
    const totalObj = this.summariesSelect(this.props.summaries, event.target.value)
    const countryObj = this.summariesSelect(this.props.summariesCountries, event.target.value, true);

    this.setState({
      currentTotal: (checkedPer100k) ? totalObj.per100k : totalObj.absolute,
      currentCountry: (checkedPer100k) ? countryObj.per100k : countryObj.absolute
    });

  }

  componentDidUpdate(prevProps) {

    const { getBySelect, getByCountry } = this;
    const { filters, summariesCountries } = this.props;
    const { checkedPer100k, checkedAbsolute, populationCountry } = this.state;

    const countryObj = getByCountry(summariesCountries, filters.geography);
    const per100kCountry = getBySelect(calc100Men([getBySelect(countryObj)], populationCountry)[0])

    if (filters.geography !== prevProps.filters.geography && filters.geography !== '') {
      this.setState({
        currentCountry: (checkedPer100k) ? per100kCountry : this.getBySelect(countryObj),
        checkedAbsolute: checkedAbsolute,
        checkedPer100k: checkedPer100k,
        populationCountry: countryObj.population
      })
    }
  }

  handleToggleExpanded() {
    this.setState({ expanded: !this.state.expanded });
  };

  handleToggSize() {
    this.setState({ fullSize: !this.state.fullSize });
  };

  render() {

    const { filters } = this.props;
    const { defaultCountryTitle, currentCountry, currentTotal, defaultPosition } = this.state;

    return (
      <Draggable position={this.state.expanded ? defaultPosition : null} onMouseDown={this.props.handleOnMouseUp}>
        <div className={`summary-wrapper ${this.state.expanded ? 'expanded' : ''}`}>
          <div className="controls">
            <div className="title">Summary</div>
            <ToggleSize className="controls-icons" onClick={() => this.handleToggSize()} style={{ display: !this.state.expanded ? 'inline-block' : 'none' }} />
            <Expand className="controls-icons" onClick={() => this.handleToggleExpanded()} style={{ display: this.state.fullSize ? 'inline-block' : 'none' }} />
          </div>
          {
            this.state.fullSize ? (
              <div className="block-inner">
              <div className="tables-wrap">
                <div className="count-change-wrap">
                  <div className="table-filter-select-wrap">
                    <select onChange={this.handleFilterChange}>
                      <option value="total">Entire period</option>
                      <option value="lastDay">Last day</option>
                    </select>
                  </div>
                  <div className="absolute-change">
                    <label>
                      <input type="radio" value="absolute" checked={filters.relative === 'Absolute'} onChange={this.handleAbsoluteChange} />
                      Absolute count
                    </label>
                  </div>
                  <div className="per100k-change">
                    <label>
                      <input type="radio" value="per100k" checked={filters.relative === 'To100men'} onChange={this.handlePer100kChange} />
                      Per 100k
                    </label>
                  </div>
                </div>

                <Table tableName='Total' current={currentTotal} />

                <Table currentCountryTitle={filters.geography || defaultCountryTitle} tableName='Country' current={currentCountry} />

              </div>
              </div>
            ) : null
          }
        </div>
      </Draggable>
    );
  }
}

export default React.memo(Summary);
