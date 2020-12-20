import React from 'react';
import TdItem from './tdItem';

export default function Table({tableName, current, currentCountryTitle}) {
    const items = Object.values(current);
    return (
        <table className='summaries-table'>
            <caption><h2 className='title'>{tableName}</h2></caption>
            <caption><h4 className='current-country'>{currentCountryTitle}</h4></caption>
            <thead>
                <tr>
                    <th scope="col">Confirmed</th>
                    <th scope="col">Deaths</th>
                    <th scope="col">Recovered</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    {items.map((el) =>
                        <TdItem key={el.toString()} value={el} />
                    )}
                </tr>
            </tbody>
        </table>
    )
}