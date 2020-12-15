import React, {useState} from 'react';
import country from 'world-map-country-shapes';

const Map = ({summaries = [], handleClickOnCountry}) => {
  const [selectedCountries, setSelectedCountries] = useState({});
  const tooltip = document.getElementById("tooltip");

  // выводим подсказки при наведении на страну
  const onHoverCountry = (e, country, covidDataForCountry) => {
    //todo Добавить вывод показателя, который используется в данный момент
    tooltip.innerHTML = `${covidDataForCountry.Country} 'Добавить вывод показателя, который используется в данный момент '`;
    tooltip.style.display = "block";
    tooltip.style.left = e.pageX + 1 + 'px';
    tooltip.style.top = e.pageY + 1 + 'px';
    setSelectedCountries({
      [country.id]: !selectedCountries[country.id]
    });
  };

  // прячем подсказку, если вышли за пределы страны
  const onOutCountry = (country) => {
    tooltip.style.display = "none";
  };

  const mapCountries = country.map(country => {
    const covidDataForCountry = summaries.find(summaryForCountry => summaryForCountry.CountryCode === country.id) || {};

    return (
      <path
        key={country.id}
        d={country.shape}
        style={{
          fill: selectedCountries[country.id] ? "tomato" : "#eee",
          cursor: "pointer",
          stroke: "#ccc"
        }}
        onMouseOver={(evt) => onHoverCountry(evt, country, covidDataForCountry)}
        onMouseOut={() => onOutCountry(country)}
        onClick={() => handleClickOnCountry(covidDataForCountry.Country)}
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
