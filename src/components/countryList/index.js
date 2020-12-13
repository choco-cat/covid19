import React from 'react';
import './index.css';

const missedFlags = {
    'United Kingdom': 'https://restcountries.eu/data/gbr.svg',
    'Iran, Islamic Republic of': 'https://restcountries.eu/data/irn.svg',
    'Bolivia': 'https://restcountries.eu/data/bol.svg',
    'Moldova': 'https://restcountries.eu/data/mda.svg',
    'Venezuela (Bolivarian Republic)': 'https://restcountries.eu/data/ven.svg',
    'Palestinian Territory': 'https://restcountries.eu/data/pse.svg',
    'Macedonia, Republic of': 'https://restcountries.eu/data/mkd.svg',
    'Korea (South)': 'https://restcountries.eu/data/kor.svg',
    'Congo (Kinshasa)': 'https://restcountries.eu/data/cog.svg',
    'Cape Verde': 'https://restcountries.eu/data/cpv.svg',
    'Syrian Arab Republic (Syria)': 'https://restcountries.eu/data/syr.svg',
    'Congo (Brazzaville)': 'https://restcountries.eu/data/cog.svg',
    'Taiwan, Republic of China': 'https://restcountries.eu/data/twn.svg',
    'Saint Vincent and Grenadines': 'https://restcountries.eu/data/vct.svg',
    'Holy See (Vatican City State)': 'https://restcountries.eu/data/vat.svg',
    'Macao, SAR China': 'https://restcountries.eu/data/mac.svg',
    'Lao PDR': 'https://restcountries.eu/data/lao.svg',
};

const missedPopulations = {
    'United Kingdom': 65110000,
    'Iran, Islamic Republic of': 79369900,
    'Bolivia': 10985059,
    'Moldova': 3553100,
    'Venezuela (Bolivarian Republic)': 31028700,
    'Palestinian Territory': 4682467,
    'Macedonia, Republic of': 2058539,
    'Korea (South)': 50801405,
    'Congo (Kinshasa)': 4741000,
    'Cape Verde': 531239,
    'Syrian Arab Republic (Syria)': 18564000,
    'Congo (Brazzaville)': 4741000,
    'Taiwan, Republic of China': 23503349,
    'Saint Vincent and Grenadines': 109991,
    'Holy See (Vatican City State)': 451,
    'Macao, SAR China': 649100,
    'Lao PDR': 6492400,
};

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
            filterText: ''
        }
    }

    sortByParameter = (data, parameter) => {
        if (parameter === 'Country') return data.sort((a, b) => a[parameter] > b[parameter] ? 1 : -1)
        else return data.sort((a, b) => a[parameter] < b[parameter] ? 1 : -1)
    };

    makeList(data = []) {
        const { sortedBy } = this.state
        data = this.sortByParameter(data, sortParameters[sortedBy]);
        return data.map((item, index) => {
            const { Country, flag } = item;
            let amount = item[sortParameters[sortedBy]];
            return (
                <li className="country-list-item" key={index}>
                    <img className="country-list-item-flag" src={flag} alt="flag"/>
                    <span className="country-list-item-country">{Country} </span>
                    {amount}
                </li>
            )
        })
    }

    onSortChange = () => {
        const { sortedBy } = this.state
        switch (sortedBy) {
            case 'total cases':
                this.setState({ sortedBy: 'new cases'} );
                break;
            case 'new cases':
                this.setState({ sortedBy: 'total deaths'} );
                break;
            case 'total deaths':
                this.setState({ sortedBy: 'new deaths'} );
                break;
            case 'new deaths':
                this.setState({ sortedBy: 'total recovered'} );
                break;
            case 'total recovered':
                this.setState({ sortedBy: 'new recovered'} );
                break;
            case 'new recovered':
                this.setState({ sortedBy: 'total cases per 100k'} );
                break;
            case 'total cases per 100k':
                this.setState({ sortedBy: 'new cases per 100k'} );
                break;
            case 'new cases per 100k':
                this.setState({ sortedBy: 'total deaths per 100k'} );
                break;
            case 'total deaths per 100k':
                this.setState({ sortedBy: 'new deaths per 100k'} );
                break;
            case 'new deaths per 100k':
                this.setState({ sortedBy: 'total recovered per 100k'} );
                break;
            case 'total recovered per 100k':
                this.setState({ sortedBy: 'new recovered per 100k'} );
                break;
            case 'new recovered per 100k':
                this.setState({ sortedBy: 'total cases'} );
                break;
        }
    };

    onInputChange = (e) => {
        this.setState({filterText: e.target.value})
    }

    render() {
        const { summaries, flags } = this.props
        let data
        let listItems = []
        if (summaries && flags) {
            data = summaries.map((country) => {
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
            })
            const { filterText } = this.state
            if (filterText !== '') {
                data = data.filter(el => el['Country'].toLowerCase().includes(filterText.toLowerCase()))
            }
            listItems = this.makeList(data)
        }
        const { sortedBy } = this.state
        return (
            <div className="country-list-container">
                <h2>Sorted by <span onClick={() => this.onSortChange()} className="country-list-sortBy">{sortedBy}</span></h2>
                <input onChange={this.onInputChange} type="text"/>
                <ul className="country-list">
                    {listItems}
                </ul>
            </div>
        );
    }
};

export default CountryList;
