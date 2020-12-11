import React, { useState } from 'react';
import country from 'world-map-country-shapes';

const Map = ({ summaries = [] }) => {
    const [selectedCountries, setSelectedCountries] = useState({});

    const onHoverCountry = (country) => {
        //TODO Вместо title сделать нормальный tooltip
        setSelectedCountries({
            [country.id]: !selectedCountries[country.id]
        });
    };

    const mapCountries = country.map(country => {
      const covidDataForCountry = summaries.find(summaryForCountry => summaryForCountry.CountryCode = country.id) || {};

      return (
        <path
            key={country.id}
            d={country.shape}
            style={{
                fill: selectedCountries[country.id] ? "tomato" : "#eee",
                cursor: "pointer",
                stroke: "#ccc"
            }}
            onMouseOver={() => onHoverCountry(country)}
        >
            <title>
              <text x="0" y="0">
                <tspan x="0" dy="1.2em">NewConfirmed: {covidDataForCountry.NewConfirmed || 0}</tspan>
                <tspan x="0" dy="1.2em">NewRecovered: {covidDataForCountry.NewRecovered || 0}</tspan>
                <tspan x="0" dy="1.2em">TotalConfirmed: {covidDataForCountry.TotalConfirmed || 0}</tspan>
                <tspan x="0" dy="1.2em">TotalDeaths: {covidDataForCountry.TotalDeaths || 0}</tspan>
                <tspan x="0" dy="1.2em">TotalRecovered: {covidDataForCountry.TotalRecovered || 0}</tspan>
              </text>
            </title>
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
