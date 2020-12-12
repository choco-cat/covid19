import React, { useState } from 'react';
import country from 'world-map-country-shapes';
import './index.css';

const Map = ({ summaries = [] }) => {
    const [selectedCountries, setSelectedCountries] = useState({});

    const mapCountries = country.map(country => {
        const covidDataForCountry = summaries.find(summaryForCountry => summaryForCountry.CountryCode === country.id) || {};

// выводим подсказки при наведении на страну
    const onHoverCountry = (e, country) => {
        let tooltip = document.getElementById("tooltip");
        //todo Добавить вывод показателя, который используется в данный момент
        tooltip.innerHTML = `${covidDataForCountry.Country} 'Добавить вывод показателя, который используется в данный момент '`;
        tooltip.style.display = "block";
        tooltip.style.left = e.pageX + 1 + 'px';
        tooltip.style.top = e.pageY + 1 + 'px';
        setSelectedCountries({
            [country.id]: !selectedCountries[country.id]
        });
    };
// прячим подсказку, если вышли за пределы страны
    const onOutCountry = (country) => {
        var tooltip = document.getElementById("tooltip");
        tooltip.style.display = "none";
    }


      return (
        <path
            key={country.id}
            d={country.shape}
            style={{
                fill: selectedCountries[country.id] ? "tomato" : "#eee",
                cursor: "pointer",
                stroke: "#ccc"
            }}
            onMouseOver= {(evt) => onHoverCountry(evt,country)}
            onMouseOut= {() => onOutCountry(country)}
        >
        </path>
      )
    });

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="500"
            width="700"
            viewBox="0 0 2000 1001"
        >
            {mapCountries}
        </svg>
    )
};


export default Map;
