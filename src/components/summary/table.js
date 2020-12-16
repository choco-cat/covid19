import React from 'react';
import TdItem from './tdItem';

export default function Table(props) {
    const items = Object.values(props);
    return (
        <table className='totalTable'>
            <caption><h2>Total</h2></caption>
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
                        <TdItem key={el.toString()}
                            value={el} />
                    )}
                </tr>
            </tbody>
        </table>
    )
}


       



