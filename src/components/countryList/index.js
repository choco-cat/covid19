import React from 'react';
import { missedFlags, missedPopulations } from '../../constants/missed';
import { sortByParameter } from '../../services/sorting';
import { filters } from "../../constants/filters";

import './index.css';

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
            filterText: ''
        };
    }

    componentDidMount() {
        this.setState({
              sortedBy: 'total cases',
              status: this.props.filters.status,
              period: this.props.filters.period,
              relative: this.props.filters.relative,
              filterText: ''
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
            const amount = item[sortParameters[sortedBy]];

            return (
                <li className="country-list-item" key={index} onClick={() => this.props.handleClickOnCountry(Country)}>
                    <img className="country-list-item-flag" src={flag} alt="flag"/>
                    <span className="country-list-item-country">{Country} </span>
                    {amount}
                </li>
            )
        })
    }

    onSortChange = (sortedBy) => {
        //TODO Отрефакторить
        switch (sortedBy) {
            case 'total cases':
                this.setState({ sortedBy: 'new cases', status: filters.status.confirmed, relative: filters.relative.absolute, period: filters.period.lastDay } );
                break;
            case 'new cases':
                this.setState({ sortedBy: 'total deaths', status: filters.status.deaths, relative: filters.relative.absolute, period: filters.period.all } );
                break;
            case 'total deaths':
                this.setState({ sortedBy: 'new deaths', status: filters.status.deaths, relative: filters.relative.absolute, period: filters.period.lastDay } );
                break;
            case 'new deaths':
                this.setState({ sortedBy: 'total recovered', status: filters.status.recovered, relative: filters.relative.absolute, period: filters.period.all } );
                break;
            case 'total recovered':
                this.setState({ sortedBy: 'new recovered', status: filters.status.recovered, relative: filters.relative.absolute, period: filters.period.lastDay });
                break;
            case 'new recovered':
                this.setState({ sortedBy: 'total cases per 100k', status: filters.status.confirmed, relative: filters.relative.to100men, period: filters.period.all } );
                break;
            case 'total cases per 100k':
                this.setState({ sortedBy: 'new cases per 100k', status: filters.status.confirmed, relative: filters.relative.to100men, period: filters.period.lastDay } );
                break;
            case 'new cases per 100k':
                this.setState({ sortedBy: 'total deaths per 100k', status: filters.status.deaths, relative: filters.relative.to100men, period: filters.period.all } );
                break;
            case 'total deaths per 100k':
                this.setState({ sortedBy: 'new deaths per 100k', status: filters.status.deaths, relative: filters.relative.to100men, period: filters.period.lastDay } );
                break;
            case 'new deaths per 100k':
                this.setState({ sortedBy: 'total recovered per 100k', status: filters.status.recovered, relative: filters.relative.to100men, period: filters.period.all } );
                break;
            case 'total recovered per 100k':
                this.setState({ sortedBy: 'new recovered per 100k', status: filters.status.recovered, relative: filters.relative.to100men, period: filters.period.lastDay } );
                break;
            case 'new recovered per 100k':
                this.setState({ sortedBy: 'total cases', status: filters.status.confirmed, relative: filters.relative.absolute, period: filters.period.all } );
                break;
        }
    };

    onInputChange = (e) => {
        this.setState({filterText: e.target.value});
    };

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
                    <span onClick={() => this.onSortChange(sortedBy)} className="country-list-sortBy">{sortedBy}</span>
                </h2>
                <input onChange={this.onInputChange} type="text" />
                <ul className="country-list">
                    {listItems}
                </ul>
            </div>
        );
    }
}

export default CountryList;
