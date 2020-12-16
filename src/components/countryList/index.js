import React from 'react';
import { missedFlags, missedPopulations } from '../../constants/missed';
import { sortByParameter } from '../../services/sorting';
import { filters } from "../../constants/filters";

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
            selectedCountry: '',
        };
    }

    componentDidMount() {
        this.setState({
            sortedBy: 'total cases',
            status: this.props.filters.status,
            period: this.props.filters.period,
            relative: this.props.filters.relative,
            filterText: '',
            selectedCountry: '',
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
    }

    makeList(data = []) {
        const { sortedBy } = this.state;

        return sortByParameter(data, sortParameters[sortedBy]).map((item, index) => {
            const { Country, flag } = item;
            const { selectedCountry } = this.state;
            const amount = item[sortParameters[sortedBy]];

            let liClasses = 'country-list-item'
            if (selectedCountry === Country) {
                liClasses += ' country-list-item_selected'
            }

            return (
                <li className={liClasses} key={index} onClick={() => this.onCountryClick(Country)}>
                    <img className="country-list-item-flag" src={flag} alt="flag"/>
                    <span className="country-list-item-country">{Country} </span>
                    {amount}
                </li>
            )
        })
    }

    onSelectChange = (e) => {
        this.setState({sortedBy: e.target.value});
    };

    onInputChange = (e) => {
        this.setState({filterText: e.target.value});
    };

    onCountryClick = (Country) => {
        this.setState({selectedCountry: Country});
        this.props.handleClickOnCountry(Country);
    }

    render() {
        const { summaries = [], flags = [] } = this.props;
        const { sortedBy, filterText } = this.state;

        let data = summaries.map((country) => {
            const [selectedCountry] = flags.filter(item => item.name === country.Country);
            const population = selectedCountry ? selectedCountry.population : missedPopulations[country.Country];

            return {
                ...country,
                flag: selectedCountry ? selectedCountry.flag : missedFlags[country.Country],
                population,
                TotalConfirmedPerPopulation: Math.round((country.TotalConfirmed * 100000) / population),
                NewConfirmedPerPopulation: Math.round((country.NewConfirmed * 100000) / population),
                TotalDeathsPerPopulation: Math.round((country.TotalDeaths * 100000) / population),
                NewDeathsPerPopulation: Math.round((country.NewDeaths * 100000) / population),
                TotalRecoveredPerPopulation: Math.round((country.TotalRecovered * 100000) / population),
                NewRecoveredPerPopulation: Math.round((country.NewRecovered * 100000) / population),
            }
        });


        if (filterText !== '') {
            data = data.filter(el => el['Country'].toLowerCase().includes(filterText.toLowerCase()))
        }

        let listItems = this.makeList(data);

        return (
            <div className="country-list-container">
                <h2>
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
                <input onChange={this.onInputChange} type="text"/>
                <ul className="country-list">
                    {listItems}
                </ul>
            </div>
        );
    }
}

export default CountryList;
