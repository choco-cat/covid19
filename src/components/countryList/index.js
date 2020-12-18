import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Draggable from 'react-draggable';
import { missedFlags, missedPopulations } from '../../constants/missed';
import { sortByParameter } from '../../services/sorting';
import { getSelectFilters } from "../../services/selectFilters";

const sortParameters = {
    'total cases': 'TotalConfirmed',
    'new cases': 'NewConfirmed',
    'total deaths': 'TotalDeaths',
    'new deaths': 'NewDeaths',
    'total recovered': 'TotalRecovered',
    'new recovered': 'NewRecovered',
    'total cases per 100k': 'TotalConfirmedPerPopulation',
    'new cases per 100k': 'NewConfirmedPerPopulation',
    'total deaths per 100k': 'TotalDeathsPerPopulation',
    'new deaths per 100k': 'NewDeathsPerPopulation',
    'total recovered per 100k': 'TotalRecoveredPerPopulation',
    'new recovered per 100k': 'NewRecoveredPerPopulation',
};

class CountryList extends React.Component {
    constructor() {
        super();

        this.state = {
            sortedBy: 'total cases',
            status: '',
            period: '',
            relative: '',
            filterText: '',
            geography: '',
        };

        this.listRef = React.createRef();
        this.containerRef = React.createRef();
    }

    componentDidMount() {
        this.setState({
            sortedBy: 'total cases',
            status: this.props.filters.status,
            period: this.props.filters.period,
            relative: this.props.filters.relative,
            geography: this.props.filters.geography,
            filterText: '',
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.sortedBy !== this.state.sortedBy) {
            this.props.updateFilter({
                status: this.state.status,
                period: this.state.period,
                relative: this.state.relative,
                sortedBy: this.state.sortedBy,
            });
        }
        if (this.props.filters.status !== this.state.status || this.props.filters.period !== this.state.period || this.props.filters.relative !== this.state.relative) {
            this.setState({status: this.props.filters.status, period: this.props.filters.period, relative: this.props.filters.relative});
        }
        if (this.props.filters.geography !== this.state.geography) {
            this.setState({geography: this.props.filters.geography});
            const countryIdx = sortByParameter(this.props.summaries, sortParameters[this.state.sortedBy]).findIndex(el => el['Country'] === this.props.filters.geography);
            this.listRef.current.children[0].children[0].children[countryIdx].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }

    makeList(data = []) {
        const { sortedBy } = this.state;

        const userLang = navigator.language;

        return sortByParameter(data, sortParameters[sortedBy]).map((item, index) => {
            const { Country, flag } = item;
            const { geography } = this.state;
            let amount = item[sortParameters[sortedBy]];
            amount = new Intl.NumberFormat(userLang, { minimumFractionDigits: 0, maximumFractionDigits: 2}).format(amount);

            return (
                <li className={`country-list-item ${geography === Country ? 'country-list-item_selected' : ''}`} key={index} onClick={() => this.onCountryClick(Country)}>
                    <img className="country-list-item-flag" src={flag} alt="flag"/>
                    <span className="country-list-item-country">{Country} </span>
                    {amount}
                </li>
            )
        })
    }

    onSelectChange = (e) => {
        const optionNumber = e.target.selectedIndex;
        const { status, period, relative } = getSelectFilters(optionNumber);
        this.setState({sortedBy: e.target.value, status, period, relative});
    };

    onInputChange = (e) => {
        this.setState({filterText: e.target.value});
    };

    onCountryClick = (Country) => {
        this.setState({geography: Country});
        this.props.handleClickOnCountry(Country);
    };

    onFullscreenButtonClick = () => {
        this.containerRef.current.classList.toggle('country-list-container-fullscreen');
        this.listRef.current.children[0].children[0].classList.toggle('country-list-fullscreen');
    }

    render() {
        const { summaries = [], flags = [] } = this.props;
        const { sortedBy, filterText } = this.state;

        let data = summaries.map((country) => {
            const [geography] = flags.filter(item => item.name === country.Country);
            const population = geography ? geography.population : missedPopulations[country.Country];

            return {
                ...country,
                flag: geography ? geography.flag : missedFlags[country.Country],
                population,
                TotalConfirmedPerPopulation: ((country.TotalConfirmed * 100000) / population),
                NewConfirmedPerPopulation: ((country.NewConfirmed * 100000) / population),
                TotalDeathsPerPopulation: ((country.TotalDeaths * 100000) / population),
                NewDeathsPerPopulation: ((country.NewDeaths * 100000) / population),
                TotalRecoveredPerPopulation: ((country.TotalRecovered * 100000) / population),
                NewRecoveredPerPopulation: ((country.NewRecovered * 100000) / population),
            }
        });


        if (filterText !== '') {
            data = data.filter(el => el['Country'].toLowerCase().includes(filterText.toLowerCase()))
        }

        let listItems = this.makeList(data);

        return (
          <Draggable>
              <div ref={this.containerRef} className="country-list-container">
                  <h2 className="country-list-header">
                      <span>Sorted by </span>
                      <select onChange={this.onSelectChange}>
                          <option defaultValue="total cases">total cases</option>
                          <option value="new cases">new cases</option>
                          <option value="total deaths">total deaths</option>
                          <option value="new deaths">new deaths</option>
                          <option value="total recovered">total recovered</option>
                          <option value="new recovered">new recovered</option>
                          <option value="total cases per 100k">total cases per 100k</option>
                          <option value="new cases per 100k">new cases per 100k</option>
                          <option value="total deaths per 100k">total deaths per 100k</option>
                          <option value="new deaths per 100k">new deaths per 100k</option>
                          <option value="total recovered per 100k">total recovered per 100k</option>
                          <option value="new recovered per 100k">new recovered per 100k</option>
                      </select>
                  </h2>
                  <input onChange={this.onInputChange} placeholder="Search..." type="text" />
                  <ul ref={this.listRef} className="country-list">
                      <Scrollbars style={{width: 'auto', height: '65vh'}}>
                          {listItems}
                      </Scrollbars>

                  </ul>
                  <button className="fullscreen-button" onClick={() => this.onFullscreenButtonClick()}><img className="fullscreen-image" src="https://icon-icons.com/icons2/1848/PNG/128/fullscreen_116387.png" alt="fullscreen"/></button>
              </div>
          </Draggable>
        );
    }
}

export default CountryList;
