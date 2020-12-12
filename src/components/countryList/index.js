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
    'Lao PDR': 'https://restcountries.eu/data/lao.svg'
};

const CountryList = ({ summaries = [], flags = []}) => {
    let sortedBy = 'alphabet';
    const data = summaries.map((country) => {
        const [selectedCountry] = flags.filter(item => item.name === country.Country);
        return {
            ...country,
            flag: selectedCountry ? selectedCountry.flag : missedFlags[country.Country],
        }
    });

    const sortByParameter = (parameter) => {
        data.sort((a, b) => a[parameter] < b[parameter] ? 1 : -1)
    };

    const onSortChange = () => {
        switch (sortedBy) {
            case 'alphabet':
                sortedBy = 'total cases';
                sortByParameter('TotalConfirmed');
                break;
            case 'total cases':
                sortedBy = 'new cases';
                sortByParameter('NewConfirmed');
                break;
            case 'new cases':
                sortedBy = 'alphabet';
                sortByParameter('Country');
                break;
        }
    };

    sortByParameter('TotalConfirmed');
    sortedBy = 'total cases';

    const items = data.map((item, index) => {
        const { Country, TotalConfirmed, flag } = item;

        return (
            <li className="country-list-item" key={index}>
                <img className="country-list-item-flag" src={flag} alt="flag"/>
                <span className="country-list-item-country">{Country} </span>
                {TotalConfirmed}
            </li>
        )
    });

    return (
        <div className="country-list-container">
            <h2>Sorted by <span onClick={() => onSortChange()} className="country-list-sortBy">{sortedBy}</span></h2>
            <input type="text"/>
            <ul className="country-list">
                {items}
            </ul>
        </div>
    );
};

export default CountryList;
