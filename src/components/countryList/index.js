import React from 'react';
import './index.css';

const CountryList = ({ summaries, flags }) => {

    const data = [];
    let sortedBy = 'alphabet'

    if (summaries && flags) {
        summaries.forEach(element => {
            const { Country, NewConfirmed, NewDeaths, NewRecovered, TotalConfirmed, TotalDeaths, TotalRecovered } = element;
            let Flag;
            const filterFlags = flags.filter(item => item.name === Country)
            if (filterFlags.length > 0) {
                Flag = filterFlags[0].flag;
            }
            switch (Country) {
                case 'United Kingdom':
                    Flag = 'https://restcountries.eu/data/gbr.svg'
                    break;
                case 'Iran, Islamic Republic of':
                    Flag = 'https://restcountries.eu/data/irn.svg'
                    break;
                case 'Bolivia':
                    Flag = 'https://restcountries.eu/data/bol.svg'
                    break;
                case 'Moldova':
                    Flag = 'https://restcountries.eu/data/mda.svg'
                    break;
                case 'Venezuela (Bolivarian Republic)':
                    Flag = 'https://restcountries.eu/data/ven.svg'
                    break;
                case 'Palestinian Territory':
                    Flag = 'https://restcountries.eu/data/pse.svg'
                    break;
                case 'Macedonia, Republic of':
                    Flag = 'https://restcountries.eu/data/mkd.svg'
                    break;
                case 'Korea (South)':
                    Flag = 'https://restcountries.eu/data/kor.svg'
                    break;
                case 'Congo (Kinshasa)':
                    Flag = 'https://restcountries.eu/data/cog.svg'
                    break;
                case 'Cape Verde':
                    Flag = 'https://restcountries.eu/data/cpv.svg'
                    break;
                case 'Syrian Arab Republic (Syria)':
                    Flag = 'https://restcountries.eu/data/syr.svg'
                    break;
                case 'Congo (Brazzaville)':
                    Flag = 'https://restcountries.eu/data/cog.svg'
                    break;
                case 'Taiwan, Republic of China':
                    Flag = 'https://restcountries.eu/data/twn.svg'
                    break;
                case 'Saint Vincent and Grenadines':
                    Flag = 'https://restcountries.eu/data/vct.svg'
                    break;
                case 'Holy See (Vatican City State)':
                    Flag = 'https://restcountries.eu/data/vat.svg'
                    break;
                case 'Macao, SAR China':
                    Flag = 'https://restcountries.eu/data/mac.svg'
                    break;
                case 'Lao PDR':
                    Flag = 'https://restcountries.eu/data/lao.svg'
                    break;
            }

            data.push({
                Country,
                NewConfirmed,
                NewDeaths,
                NewRecovered,
                TotalConfirmed,
                TotalDeaths,
                TotalRecovered,
                Flag
            })
        })
    }

    const sortByParameter = (parameter) => {
        data.sort((a, b) => a[parameter] < b[parameter] ? 1 : -1)
    }

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
    }

    sortByParameter('TotalConfirmed')
    sortedBy = 'total cases'

    const items = data.map((item) => {
        const { Country, TotalConfirmed, Flag, id } = item;

        return (
            <li className="country-list-item" key={id}>
                <img className="country-list-item-flag" src={Flag} alt="flag"/>
                <span className="country-list-item-country">{Country} </span>
                {TotalConfirmed}
            </li>
        )
    })

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
