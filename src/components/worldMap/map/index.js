import React, { useState } from 'react';
import country from 'world-map-country-shapes';
import Tooltip from './tooltip'

const Map = ({ summaries = [], handleClickOnCountry }) => {

  const [selectedCountries, setSelectedCountries] = useState({});
  const [style, setStyle] = useState({ display: 'none' });
  const [dataCountry, setDataCountry] = useState({});

  const showCountry = (e, country, covidDataForCountry) => {

    //todo Добавить вывод показателя, который используется в данный момент
    setSelectedCountries({
      [country.id]: !selectedCountries[country.id]
    });

    setStyle({
      display: "block",
      left: e.pageX + 1 + 'px',
      top: e.pageY + 1 + 'px',
    });

    setDataCountry({
      data: `${covidDataForCountry.Country} 'Добавить вывод показателя, который используется в данный момент '`
    });

  };

  const hideCountry = (country) => {
    setStyle({
      display: "none"
    });
  };

  const mapCountries = country.map(country => {
    const covidDataForCountry = summaries.find(summaryForCountry => summaryForCountry.CountryCode === country.id) || {};
    let coefficient = (covidDataForCountry.TotalConfirmed / covidDataForCountry.population * 220) / 5;
    if (coefficient > 1) coefficient = 1;
    if (isNaN(coefficient)) coefficient = 0.3;
    if (coefficient < 0.1) coefficient = 0.3;
    return (
      <path
        key={country.id}
        d={country.shape}
        style={{
          fill: selectedCountries[country.id] ? "lightgrey" : `rgba(255,0,0,${coefficient})`,
          cursor: "pointer",
          stroke: "#ccc"
        }}
        onMouseOver={(evt) => showCountry(evt, country, covidDataForCountry)}
        onMouseOut={() => hideCountry(country)}
        onClick={() => handleClickOnCountry(covidDataForCountry.Country)}
      >
      </path>
    )
  });

  return (
    <div>
      <Tooltip style={style} dataCountry={dataCountry} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="500"
        width="700"
        viewBox="0 0 2000 1001"
      >
        {mapCountries}
      </svg>
    </div>

  )
};


export default Map;
