import React from 'react';
import TdItem from './tdItem';

export default function Table({ tableName, current, currentCountryTitle }) {

    const thNames = ['Confirmed', 'Deaths', 'Recovered']

    const items = Object.values(current);
    return (
        <table className='summaries-table'>
            <caption><h2 className='title'>{tableName}</h2></caption>
            <caption><h4 className='current-country'>{currentCountryTitle}</h4></caption>
            <thead>
                <tr>
                    {thNames.map((el) =>
                        <th scope="col">{el}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {items.map((el, i) =>
                        <TdItem thNames = {thNames[i]} key={i} value={el} />
                    )}
                </tr>
            </tbody>
        </table>
    )
}