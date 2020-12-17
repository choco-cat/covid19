import React, { useState, useEffect } from 'react';
import country from 'world-map-country-shapes';
import Tooltip from './tooltip';
import Legend from './legend';

import './index.scss';

const Map = ({ summaries = [], handleClickOnCountry }) => {
  const [selectedCountries, setSelectedCountries] = useState({});
  const [customStyles, setStyle] = useState({ display: 'none' });
  const [dataCountry, setDataCountry] = useState({});
  const [scaleIndex, setScaleIndex] = useState(1);
  const [legend, updateLegend] = useState([]);
  const [summariesAfterCalculation, updateSummaries] = useState([]);
  const zoomIndex = 0.25;
  const maxZoom = 8;

  const showCountry = (e, country, covidDataForCountry) => {
    setSelectedCountries({
      [country.id]: !selectedCountries[country.id]
    });

    setStyle({
      display: "block",
      left: e.pageX + 1 + 'px',
      top: e.pageY + 1 + 'px',
    });

    setDataCountry(covidDataForCountry);
  };

  const hideCountry = () => {
    setStyle({
      display: "none"
    });
  };

  const getFormatedCoefficient = (coefficient) => {
    let formattedCoefficiend = parseFloat(coefficient.toFixed(1));

    if (formattedCoefficiend > 1) formattedCoefficiend = 1;
    if (isNaN(formattedCoefficiend)) formattedCoefficiend = 0.3;
    if (formattedCoefficiend < 0.1) formattedCoefficiend = 0.3;

    return formattedCoefficiend;
  };

  useEffect(() => {
    const listOfCoef = new Set();
    const summariesWithCoef = summaries.map(summaryForCountry => {
      const coefficient = (summaryForCountry.TotalConfirmed / summaryForCountry.population * 220) / 5;
      listOfCoef.add(getFormatedCoefficient(coefficient));
      return {
        ...summaryForCountry,
        coefficient: getFormatedCoefficient(coefficient)
      }
    });
    updateSummaries(summariesWithCoef);
    updateLegend([...listOfCoef]);
  }, [summaries]);


  const mapCountries = country.map(country => {
    const covidDataForCountry = summariesAfterCalculation.find(summaryForCountry => summaryForCountry.CountryCode === country.id) || {};

    return (
      <path
        key={country.id}
        d={country.shape}
        style={{
          fill: selectedCountries[country.id] ? "#fde5bc" : `rgba(255,0,0,${covidDataForCountry.coefficient || 0.3})`,
          cursor: "pointer",
          stroke: "#ccc"
        }}
        onMouseOver={(evt) => showCountry(evt, country, covidDataForCountry)}
        onMouseOut={hideCountry}
        onClick={() => handleClickOnCountry(covidDataForCountry.Country)}
      >
      </path>
    )
  });

  const scaleMap = (newScaleParam) => {
    if (newScaleParam > zoomIndex && newScaleParam < maxZoom) {
      setScaleIndex(newScaleParam);
    }
  };

  const handleMouseWeel = (e) => {
    if (e.deltaY < 0) {
      scaleMap(scaleIndex + zoomIndex);
    } else {
      scaleMap(scaleIndex - zoomIndex);
    }
  };

  return (
    <>
      <div>
        <button
          onClick={() => scaleMap(scaleIndex - zoomIndex)}
          disabled={scaleIndex === 2 * zoomIndex}
          className='map-button'
        >
          <span>-</span>
        </button>
        <button
          onClick={() => scaleMap(scaleIndex + zoomIndex)}
          disabled={scaleIndex === maxZoom - zoomIndex}
          className='map-button'
        >
          <span>+</span>
        </button>
      </div>

      <div className='map-container' onWheel={handleMouseWeel}>
        <Tooltip customStyles={customStyles} dataCountry={dataCountry}/>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="500"
          width="700"
          viewBox="0 0 2000 1001"
          style={{transform: `scale(${scaleIndex})`}}
          className="map"
        >
          {mapCountries}
        </svg>
      </div>

      <Legend data={legend} />
    </>
  )
};


export default React.memo(Map);
