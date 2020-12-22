import React from 'react';
import Draggable from 'react-draggable';
import Table from './table';
import { calc100Men } from '../../services/calculations';
import { filters } from '../../constants/filters'
import WindowControl from '../windowControl'

class Summary extends React.Component {
  constructor(props) {
    super(props);

    const currentCountryObj = this.getByCountry(props.summariesCountries, 'Belarus');
    const population = currentCountryObj.population;

    this.state = {
      current: this.getBySelect(),

      currentTotal: this.getBySelect(this.props.summaries),
      currentCountry: this.getBySelect(currentCountryObj),

      defaultCountryTitle: 'Belarus',
      defaultPosition: { x: 0, y: 0 },

      populationWorld: 7 * 10 ** 9,
      populationCountry: population,

      checkedAbsolute: true,
      checkedPer100k: false,

      checkedAll: true,
      checkedLastday: false

    };

    this.getBySelect = this.getBySelect.bind(this);
    this.getByCountry = this.getByCountry.bind(this);

    this.handlePer100kChange = this.handlePer100kChange.bind(this);
    this.handleAbsoluteChange = this.handleAbsoluteChange.bind(this);

    this.handleLastDayChange = this.handleLastDayChange.bind(this);

  }

  getByCountry(countries, findCountry) {
    return countries.filter((el) => el.Country === findCountry).find(el => el);
  }

  getBySelect(object, value = filters.period.all) {

    let allowed;

    if (value === filters.period.lastDay) {
      allowed = filters.allowed.allowedNew;
    } else if (value === filters.period.all) {
      allowed = filters.allowed.allowedTotal;
    }

    return Object.keys(object || {})
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = object[key];
        return obj;
      }, {});
  }

  summariesSelect(obj, e, countrySelected = false) {

    const { getBySelect, getByCountry } = this;
    const { populationCountry, populationWorld, defaultCountryTitle } = this.state
    const { summariesCountries, globalFilters } = this.props

    const absolute = (countrySelected)
      ? getBySelect(getByCountry(summariesCountries, globalFilters.geography || defaultCountryTitle), e)
      : getBySelect(obj, e);

    const per100k = getBySelect(calc100Men([absolute], (countrySelected) ? populationCountry : populationWorld)[0], e)

    return {
      per100k,
      absolute
    }
  }

  handleAllChange(e) {

    const { checkedPer100k } = this.state;

    const totalObj = this.summariesSelect(this.props.summaries, e.target.value, false)
    const countryObj = this.summariesSelect(this.props.summariesCountries, e.target.value, true);

    this.setState({
      currentTotal: (checkedPer100k) ? totalObj.per100k : totalObj.absolute,
      currentCountry: (checkedPer100k) ? countryObj.per100k : countryObj.absolute,
      checkedAll: true,
      checkedLastday: false
    });

    this.props.updateFilters({
      period: filters.period.all
    })

  }

  handleLastDayChange(e) {

    const { checkedPer100k } = this.state;

    const totalObj = this.summariesSelect(this.props.summaries, e.target.value)
    const countryObj = this.summariesSelect(this.props.summariesCountries, e.target.value, true);

    this.setState({
      checkedAll: false,
      checkedLastday: true,
      currentTotal: (checkedPer100k) ? totalObj.per100k : totalObj.absolute,
      currentCountry: (checkedPer100k) ? countryObj.per100k : countryObj.absolute,
    });

    this.props.updateFilters({
      period: filters.period.lastDay
    })

  }

  handleAbsoluteChange() {

    const countryObj = this.getByCountry(this.props.summariesCountries, this.props.globalFilters.geography || this.state.defaultCountryTitle);

    this.setState({
      currentTotal: this.getBySelect(this.props.summaries),
      currentCountry: this.getBySelect(countryObj),
      checkedAbsolute: true,
      checkedPer100k: false,
    });

    this.props.updateFilters({
      relative: filters.relative.absolute
    })
  }

  handlePer100kChange() {

    const { getBySelect, getByCountry } = this;
    const { populationCountry, populationWorld, defaultCountryTitle } = this.state
    const { globalFilters, summaries, summariesCountries } = this.props

    const totalObj = getBySelect(summaries);
    const countryObj = getByCountry(summariesCountries, globalFilters.geography || defaultCountryTitle);

    const per100kTotal = getBySelect(calc100Men([totalObj], populationWorld)[0])
    const per100kCountry = getBySelect(calc100Men([getBySelect(countryObj)], populationCountry)[0])

    this.setState({
      currentTotal: per100kTotal,
      currentCountry: per100kCountry,
      checkedAbsolute: false,
      checkedPer100k: true
    });

    this.props.updateFilters({
      relative: filters.relative.to100men
    })
  }

  componentDidUpdate(prevProps) {

    const { getBySelect, getByCountry, handlePer100kChange, handleAbsoluteChange, handleLastDayChange, handleAllChange } = this;
    const { globalFilters, summariesCountries } = this.props;
    const { checkedPer100k, checkedAbsolute, populationCountry, populationWorld, defaultCountryTitle } = this.state;

    const countryObj = getByCountry(summariesCountries, globalFilters.geography || defaultCountryTitle);
    const per100kCountry = getBySelect(calc100Men([getBySelect(countryObj)], populationCountry)[0]);

    if (globalFilters.relative !== prevProps.globalFilters.relative) {
      if (globalFilters.relative === filters.relative.to100men) {
        handlePer100kChange();
      } else if (globalFilters.relative === filters.relative.absolute) {
        handleAbsoluteChange();
      }
    }

    if (globalFilters.period !== prevProps.globalFilters.period) {
      if (globalFilters.period === filters.period.lastDay) {
        handleLastDayChange({ target: { value: filters.period.lastDay } });
      } else if (globalFilters.period === filters.period.all) {
        handleAllChange({ target: { value: filters.period.all } });
      }
    }

    if (globalFilters.geography !== prevProps.globalFilters.geography) {
      if (globalFilters.geography !== prevProps.globalFilters.geography && globalFilters.geography !== '') {
        this.setState({
          currentCountry: (checkedPer100k) ? per100kCountry : this.getBySelect(countryObj),
          checkedAbsolute: checkedAbsolute,
          checkedPer100k: checkedPer100k,
          populationCountry: populationWorld || countryObj.population

        })
      }
    }
  }

  
  render() {

    const { globalFilters } = this.props;
    const { defaultCountryTitle, currentCountry, currentTotal, defaultPosition } = this.state;

    console.log()

    return (
      <Draggable position={this.props.windowControl.states.expanded ? defaultPosition : null} onMouseDown={this.props.handleOnMouseUp}>
        <div className={`summary-wrapper ${this.props.windowControl.states.expanded ? 'expanded' : ''}`}>
          <div className="controls">
            <div className="title">Summary</div>

            <WindowControl windowStates={this.props.windowControl.states} handlers = {this.props.windowControl.handlers} />

          </div>
          {
            this.props.windowControl.states.fullSize ? (
              <div className="block-inner">
                <div className="tables-wrap">
                  <div className="border-stroke">
                  <div className="filters">
                    <div className='period-wrap'>
                      <div className='absolute-change'>
                        <label>
                          <input type="radio" value={filters.relative.absolute} checked={globalFilters.relative === filters.relative.absolute} onChange={this.handleAbsoluteChange} />
                        Absolute
                      </label>
                      </div>

                      <div className="per100k-change">
                        <label>
                          <input type="radio" value={filters.relative.to100men} checked={globalFilters.relative === filters.relative.to100men} onChange={this.handlePer100kChange} />
                          Per 100k
                        </label>
                      </div>

                    </div>

                    <div className="relative-wrap">

                      <div className='all-time-change'>
                        <label>
                          <input type="radio" value={filters.period.all} checked={globalFilters.period === filters.period.all} onChange={this.handleAllChange} />
                          All Time
                        </label>
                      </div>

                      <div className="lastDay-change">
                        <label>
                          <input type="radio" value={filters.period.lastDay} checked={globalFilters.period === filters.period.lastDay} onChange={this.handleLastDayChange} />
                        Last Day
                    </label>
                      </div>

                    </div>

                  </div>
                  </div>
                  <Table tableName='Total' current={currentTotal} />

                  <Table currentCountryTitle={globalFilters.geography || defaultCountryTitle} tableName='Country' current={currentCountry} />

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
